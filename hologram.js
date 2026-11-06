/* Style Nebula Atlas · Hologram
   The atlas as a hologram standing on a printed square: the map flat on the table, time rising upward.
   Works on iPhone and Android in the browser, with no app: the camera finds the black-framed QR square
   (AR.js marker tracking) and the atlas is pinned to it. Without a camera it can be looked at on screen.
   It reads the file saved with "Save a copy to share" (atlas.html by default; see config.js). */
(function(){
"use strict";
const $ = id => document.getElementById(id);
const HOLO = new THREE.Color("#7fe3ff"), COLD = new THREE.Color("#9cc4ff");
const START_SCALE = .6;   // the hologram first appears at this size: its disc is about 2.4 marker-widths across
const R0 = 2.0, Y0 = .32, YH = 2.15;              // in marker widths: the map's radius, the lowest year's height, the height of time
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const KIND = {star:"Building", planet:"Book or text", comet:"Installation or artwork", meteor:"Temporary work"};
const BODY = {star:"Star", planet:"Planet", comet:"Comet", meteor:"Meteor"};

/* ---------- reading the shared atlas file ---------- */
async function loadAtlas(){
  const file = window.ATLAS_FILE || "atlas.html";
  const r = await fetch(file, {cache:"no-store"});
  if (!r.ok) throw new Error("Couldn't find " + file + " next to this page. Save a copy to share from the atlas, rename it " + file + " and put it in this folder.");
  const t = await r.text();
  if (/^\s*\{/.test(t)) return JSON.parse(t);
  const k = "window.ATLAS_DATA = ", i = t.indexOf(k);
  if (i < 0) throw new Error(file + " isn't a shared atlas file. Use the file made by Save a copy to share.");
  const j = t.indexOf(";</script>", i);
  return JSON.parse(t.slice(i + k.length, j));
}

/* ---------- scales: crowded places spread out, empty stretches of time squeezed ---------- */
function warp(vals, lo, hi, alpha){
  const span = (hi - lo) || 1, u = [...new Set(vals.map(v => Math.round(v*1000)/1000))].sort((a, b) => a - b), m = u.length;
  if (m < 2) return v => (v - lo)/span;
  const l0 = (u[0] - lo)/span, l1 = (u[m-1] - lo)/span, P = u.map((v, i) => (1 - alpha)*(v - lo)/span + alpha*(l0 + (l1 - l0)*i/(m - 1)));
  return v => { if (v <= u[0]) return P[0] + (v - u[0])/span; if (v >= u[m-1]) return P[m-1] + (v - u[m-1])/span; let i = 1; while (u[i] < v) i++; return P[i-1] + (P[i] - P[i-1])*(v - u[i-1])/(u[i] - u[i-1]); };
}
function gapScale(vals, lo, hi, cap){
  const u = [...new Set(vals)].sort((a, b) => a - b), K = [lo].concat(u.filter(v => v > lo && v < hi), [hi]), P = [0], gaps = [];
  for (let i = 1; i < K.length; i++){ const d = K[i] - K[i-1]; P.push(P[i-1] + Math.min(d, cap)); if (d > cap + 1) gaps.push([K[i-1], K[i]]); }
  const T = P[P.length-1] || 1;
  const f = v => { if (v <= K[0]) return 0; if (v >= K[K.length-1]) return 1; let i = 1; while (K[i] < v) i++; return (P[i-1] + (P[i] - P[i-1])*(v - K[i-1])/((K[i] - K[i-1]) || 1))/T; };
  return {f, gaps};
}
const wrap180 = d => ((d + 540) % 360) - 180;
function hashStr(s){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rnd(seed){ let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0)/4294967296; }; }

/* ---------- small textures drawn once ---------- */
function canvasTex(w, h, draw){ const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.needsUpdate = true; return t; }
const TEX = {
  glow: canvasTex(128, 128, (g, w) => { const gr = g.createRadialGradient(w/2, w/2, 0, w/2, w/2, w/2); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(.18, "rgba(255,255,255,.55)"); gr.addColorStop(.5, "rgba(255,255,255,.12)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, w, w); }),
  spike: canvasTex(256, 256, (g, w) => { g.translate(w/2, w/2); for (const [L, W, a] of [[w/2, 3, 0], [w/2, 3, Math.PI/2], [w/3.2, 1.6, Math.PI/4], [w/3.2, 1.6, -Math.PI/4]]){ g.save(); g.rotate(a); const gr = g.createLinearGradient(-L, 0, L, 0); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(.5, "rgba(255,255,255,1)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(-L, 0); g.lineTo(0, -W); g.lineTo(L, 0); g.lineTo(0, W); g.fill(); g.restore(); } }),
  reticle: canvasTex(256, 256, (g, w) => { g.strokeStyle = "#fff"; g.lineWidth = 6; g.beginPath(); g.arc(w/2, w/2, w*.42, 0, Math.PI*2); g.setLineDash([22, 18]); g.stroke(); g.setLineDash([]); g.lineWidth = 3; for (let i = 0; i < 4; i++){ const a = i*Math.PI/2; g.beginPath(); g.moveTo(w/2 + Math.cos(a)*w*.3, w/2 + Math.sin(a)*w*.3); g.lineTo(w/2 + Math.cos(a)*w*.48, w/2 + Math.sin(a)*w*.48); g.stroke(); } })
};
function labelSprite(text, sub, color){
  const fs = 44, pad = 18, c = document.createElement("canvas"), g = c.getContext("2d");
  g.font = fs + "px Tahoma, Verdana, sans-serif"; const w1 = g.measureText(text).width; g.font = (fs*.62) + "px Tahoma, Verdana, sans-serif"; const w2 = sub ? g.measureText(sub).width : 0;
  c.width = Math.ceil(Math.max(w1, w2) + pad*2 + 10); c.height = Math.ceil(fs*(sub ? 1.95 : 1.3) + pad);
  g.fillStyle = "rgba(4,8,16,.55)"; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = color; g.fillRect(0, 0, 5, c.height);
  g.font = fs + "px Tahoma, Verdana, sans-serif"; g.fillStyle = "#eef6ff"; g.textBaseline = "top"; g.fillText(text, pad, pad*.6);
  if (sub){ g.font = (fs*.62) + "px Tahoma, Verdana, sans-serif"; g.fillStyle = "#9fd6ea"; g.fillText(sub, pad, pad*.6 + fs*1.15); }
  const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({map:t, transparent:true, depthWrite:false, depthTest:false, opacity:.92}));
  const h = .075; sp.scale.set(h*c.width/c.height, h, 1); sp.center.set(0, -.6); sp.renderOrder = 20;
  return sp;
}
function photoTex(url){
  return new Promise(res => {
    if (!url) return res(null);
    const img = new Image(); img.crossOrigin = "anonymous";
    img.onload = () => { const S = 256, c = document.createElement("canvas"); c.width = S*2; c.height = S; const g = c.getContext("2d");
      // the photo wrapped around a planet: drawn twice across so the seam lands at the back
      const k = Math.max(S/img.naturalHeight, S/img.naturalWidth); const w = img.naturalWidth*k, h = img.naturalHeight*k;
      g.drawImage(img, (S - w)/2, (S - h)/2, w, h); g.drawImage(img, S + (S - w)/2, (S - h)/2, w, h);
      const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter; res(t); };
    img.onerror = () => res(null); img.src = url;
  });
}

/* ---------- the hologram material: the photo lit from within, a rim in the style's color, scanlines ---------- */
const UNI = {time:{value:0}, fade:{value:1}};
function holoMat(color, tex, s, cold, dark){
  return new THREE.ShaderMaterial({
    uniforms:{time:UNI.time, fade:UNI.fade, map:{value:tex}, hasMap:{value:tex ? 1 : 0}, col:{value:new THREE.Color(color)}, s:{value:s}, cold:{value:cold ? 1 : 0}, dark:{value:dark ? 1 : 0}},
    vertexShader:"varying vec2 vUv;varying vec3 vN;varying vec3 vV;varying float vY;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);vY=(modelMatrix*vec4(position,1.)).y;gl_Position=projectionMatrix*mv;}",
    fragmentShader:"uniform float time,fade,hasMap,s,cold,dark;uniform sampler2D map;uniform vec3 col;varying vec2 vUv;varying vec3 vN;varying vec3 vV;varying float vY;"+
      "void main(){float fr=pow(1.-abs(dot(vN,vV)),2.2);vec3 base=vec3(0.);if(hasMap>.5){base=texture2D(map,vUv).rgb;}"+
      "if(cold>.5){float l=dot(base,vec3(.3,.59,.11));base=mix(base,vec3(.55,.75,1.)*l,.75);}"+
      "float lit=.35+.75*s;vec3 c=base*lit+col*fr*(1.1+1.6*s);if(dark>.5){c=base*.18+vec3(.6,.8,1.)*pow(fr,3.)*2.;}"+
      "float scan=.82+.18*sin(vY*260.-time*5.);c*=scan;float a=(hasMap>.5||dark>.5)?.92:clamp(.25+fr*1.2,0.,1.);gl_FragColor=vec4(c,a*fade);}",
    transparent:true
  });
}
const addMat = (color, op) => new THREE.MeshBasicMaterial({color, transparent:true, opacity:op, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide});
const lineMat = (color, op) => new THREE.LineBasicMaterial({color, transparent:true, opacity:op, blending:THREE.AdditiveBlending, depthWrite:false});
const spriteMat = (tex, color, op) => new THREE.SpriteMaterial({map:tex, color, transparent:true, opacity:op, blending:THREE.AdditiveBlending, depthWrite:false});

/* ---------- building the hologram from the atlas ---------- */
async function buildHolo(payload){
  const holo = new THREE.Group(); holo.name = "holo";
  const works = (payload.works || []).filter(w => w && w.title);
  const colors = payload.styleColors || {};
  const styleOf = w => (w.noStyle || !w.style) ? [] : String(w.style).split(/\s*[,;/]\s*/).filter(Boolean);
  const colorOf = name => colors[name] || ("hsl(" + (hashStr(name) % 360) + ",62%,62%)");
  const real = works.filter(w => !w.void && isFinite(w.lon) && isFinite(w.lat) && isFinite(w.year));
  const voids = works.filter(w => !real.includes(w));
  // the map: centered on the works, the same scale both ways, crowded places opened up a little
  let lonC = 0;
  if (real.length){ const ls = real.map(w => w.lon).sort((a, b) => a - b); let best = 0, gap = -1; for (let i = 0; i < ls.length; i++){ const g = (i ? ls[i] - ls[i-1] : ls[0] + 360 - ls[ls.length-1]); if (g > gap){ gap = g; best = i; } } lonC = wrap180(ls[best] - gap/2 + 180); }
  const L = w => wrap180(w.lon - lonC);
  let lo = Math.min(...real.map(L), -15), hi = Math.max(...real.map(L), 15), la = Math.min(...real.map(w => w.lat), 0), lb = Math.max(...real.map(w => w.lat), 0);
  if (real.length){ lo = Math.min(...real.map(L)); hi = Math.max(...real.map(L)); la = Math.min(...real.map(w => w.lat)); lb = Math.max(...real.map(w => w.lat)); }
  const sx = Math.max(hi - lo, 20), sy = Math.max(lb - la, 12), cx = (lo + hi)/2, cy = (la + lb)/2, Rm = R0*.78, k = 2*Rm/Math.max(sx, sy);
  const fx = warp(real.map(L), cx - sx/2, cx + sx/2, .45), fy = warp(real.map(w => w.lat), cy - sy/2, cy + sy/2, .45);
  const X = lon => (fx(lon) - .5)*sx*k, Z = lat => -(fy(lat) - .5)*sy*k;
  const years = real.map(w => w.year), yLo = years.length ? Math.min(...years) : 1900, yHi = years.length ? Math.max(...years) : 2000;
  const gs = gapScale(years, yLo, Math.max(yHi, yLo + 1), 5), Y = yr => Y0 + gs.f(yr)*YH;

  // the projector: rings on the table, a faint column of light, the map's coastlines
  const base = new THREE.Group(); holo.add(base);
  const ring = (r1, r2, op, col) => { const m = new THREE.Mesh(new THREE.RingGeometry(r1, r2, 128), addMat(col || HOLO, op)); m.rotation.x = -Math.PI/2; return m; };
  base.add(ring(R0*1.0, R0*1.02, .55), ring(R0*.995, R0*1.0, .9), ring(R0*.62, R0*.625, .14), ring(R0*.32, R0*.323, .12), ring(R0*1.16, R0*1.165, .18));
  const ticks = new THREE.BufferGeometry(), tp = [];
  for (let i = 0; i < 72; i++){ const a = i/72*Math.PI*2, r1 = R0*(i % 6 ? 1.03 : 1.04), r2 = R0*1.07; tp.push(Math.cos(a)*r1, .001, Math.sin(a)*r1, Math.cos(a)*r2, .001, Math.sin(a)*r2); }
  ticks.setAttribute("position", new THREE.Float32BufferAttribute(tp, 3)); base.add(new THREE.LineSegments(ticks, lineMat(HOLO, .45)));
  const spin = new THREE.Group(); base.add(spin);
  for (let i = 0; i < 3; i++){ const m = new THREE.Mesh(new THREE.RingGeometry(R0*1.085, R0*1.1, 64, 1, i*Math.PI*2/3, Math.PI/3), addMat(HOLO, .35)); m.rotation.x = -Math.PI/2; spin.add(m); }
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(R0, R0, Y0 + YH + .3, 96, 1, true), new THREE.ShaderMaterial({
    uniforms:{time:UNI.time, fade:UNI.fade, col:{value:HOLO}}, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, side:THREE.DoubleSide,
    vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform float time,fade;uniform vec3 col;varying vec2 vUv;void main(){float a=pow(1.-vUv.y,2.5)*.10*(.85+.15*sin(vUv.x*80.+time*1.5));gl_FragColor=vec4(col,a*fade);}"}));
  beam.position.y = (Y0 + YH + .3)/2; base.add(beam);
  // coastlines, kept within the disc
  const cp = [], inDisc = (x, z) => x*x + z*z < (R0*.99)*(R0*.99);
  for (const r of (window.ATLAS_COAST || [])){
    let px = null, pz = null, pl = null;
    for (let i = 0; i < r.length; i += 2){
      const lon = wrap180(r[i]/10 - lonC), x = X(lon), z = Z(r[i+1]/10);
      if (px !== null && Math.abs(lon - pl) < 90 && inDisc(x, z) && inDisc(px, pz)) cp.push(px, .002, pz, x, .002, z);
      px = x; pz = z; pl = lon;
    }
  }
  if (cp.length){ const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(cp, 3)); base.add(new THREE.LineSegments(g, lineMat(HOLO, .4))); }
  // the time pillar at the front left, with its years
  const pa = Math.PI*.75, pxp = Math.cos(pa)*R0*1.0, pzp = Math.sin(pa)*R0*1.0;
  const pil = new THREE.BufferGeometry(); const pp = [pxp, 0, pzp, pxp, Y0 + YH + .12, pzp];
  const yrs = []; for (let y = Math.ceil(yLo/10)*10; y <= yHi; y += 10) if (!gs.gaps.some(([a, b]) => y > a + 1 && y < b - 1)) yrs.push(y);
  if (!yrs.includes(yLo)) yrs.unshift(yLo); if (!yrs.includes(yHi)) yrs.push(yHi);
  let lastY = -1;
  yrs.forEach(y => { const h = Y(y); pp.push(pxp - .05, h, pzp, pxp + .05, h, pzp); if (h - lastY > .09){ const lab = labelSprite(String(y), "", "#7fe3ff"); lab.scale.multiplyScalar(.7); lab.center.set(1.15, .5); lab.position.set(pxp, h, pzp); lab.material.opacity = .75; base.add(lab); lastY = h; } });
  pil.setAttribute("position", new THREE.Float32BufferAttribute(pp, 3)); base.add(new THREE.LineSegments(pil, lineMat(HOLO, .6)));

  // the works
  const items = [], byKey = new Map();
  const spots = new Map();
  real.forEach(w => { const key = Math.round(X(L(w))*25) + "," + Math.round(Z(w.lat)*25) + "," + Math.round(Y(w.year)*25); (spots.get(key) || spots.set(key, []).get(key)).push(w); });
  const pos = new Map();
  spots.forEach(list => list.forEach((w, i) => { const n = list.length, a = i/n*Math.PI*2, rr = n > 1 ? .07*Math.sqrt(n) : 0; pos.set(w, new THREE.Vector3(X(L(w)) + Math.cos(a)*rr, Y(w.year), Z(w.lat) + Math.sin(a)*rr)); }));
  voids.forEach((w, i) => { const a = Math.PI*1.5 + (i + .5)/voids.length*Math.PI*2, rt = isFinite(w.rating) ? w.rating : 0; pos.set(w, new THREE.Vector3(Math.cos(a)*R0*1.16, Y0 + YH*(.5 + rt/24), Math.sin(a)*R0*1.16)); });
  const stems = [];
  await Promise.all(works.map(async w => {
    const p = pos.get(w), rating = isFinite(w.rating) && w.rating !== null ? +w.rating : null, s = rating === null ? .3 : clamp((Math.abs(rating) - 1)/9, 0, 1), neg = rating !== null && rating < 0;
    const sts = styleOf(w), col = new THREE.Color(sts.length ? colorOf(sts[0]) : "#c9c1b5"), tint = neg ? COLD : col;
    const r = .05*(1 + .5*s), g = new THREE.Group(); g.position.copy(p); holo.add(g);
    const tex = await photoTex(w.photoUrl);
    const black = w.void && neg, nova = w.void && !neg;
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 20), holoMat(tint, tex, s, neg, black)); g.add(sphere);
    const halo = new THREE.Sprite(spriteMat(TEX.glow, tint, (.18 + .7*s)*(black ? .6 : 1))); halo.scale.setScalar(r*(nova ? 9 + 7*s : 5 + 6*s)); g.add(halo);
    if (black){ const disk = new THREE.Mesh(new THREE.TorusGeometry(r*(1.6 + .6*s), r*.18, 8, 64), addMat(COLD, .8)); disk.rotation.x = Math.PI/2.4; g.add(disk); }
    if (nova || (w.kind === "star" && !neg)){ const sp = new THREE.Sprite(spriteMat(TEX.spike, nova ? col : new THREE.Color("#ffffff"), .25 + .7*s)); sp.scale.setScalar(r*(6 + 12*s)); g.add(sp); }
    if (!w.void && w.kind === "planet"){ const n = s >= .9 ? 3 : s >= .6 ? 2 : 1; for (let i = 0; i < n; i++){ const m = new THREE.Mesh(new THREE.RingGeometry(r*(1.5 + .35*i), r*(1.62 + .35*i), 64), addMat(tint, .75 - .15*i)); m.rotation.x = -Math.PI/2 + .45; g.add(m); } }
    if (!w.void && (w.kind === "comet" || w.kind === "meteor")){ const len = r*(w.kind === "comet" ? 5 + 9*s : 3 + 6*s), cone = new THREE.Mesh(new THREE.ConeGeometry(r*(w.kind === "comet" ? .75 : .45), len, 16, 1, true), addMat(tint, .12 + .12*s)); cone.position.set(0, -len/2, 0); cone.rotation.z = Math.PI; g.add(cone); }
    if (neg && !w.void){ const rr = rnd(hashStr(w.key || w.title)); for (let i = 0; i < 4 + Math.round(6*s); i++){ const m = new THREE.Mesh(new THREE.TetrahedronGeometry(r*(.16 + .12*rr())), addMat(COLD, .45)); const a = rr()*Math.PI*2, e = (rr() - .5)*1.6, d = r*(1.5 + 1.2*s*rr()); m.position.set(Math.cos(a)*d, e*r, Math.sin(a)*d); g.add(m); } }
    const hit = new THREE.Mesh(new THREE.SphereGeometry(Math.max(r*2.6, .1), 10, 8), new THREE.MeshBasicMaterial({visible:false})); hit.userData.item = null; g.add(hit);
    if (!w.void) stems.push(p.x, p.y - r, p.z, p.x, 0, p.z);
    const it = {w, g, sphere, halo, hit, r, s, neg, col:"#" + col.getHexString(), styles:sts.map(n => ({name:n, color:colorOf(n)})), spin:(rnd(hashStr(w.title))() - .5)*.6};
    hit.userData.item = it; items.push(it); if (w.key) byKey.set(w.key, it);
  }));
  if (stems.length){ const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(stems, 3)); holo.add(new THREE.LineSegments(g, lineMat(HOLO, .16))); }
  // references: arcs from a work to the works it draws on
  const links = [];
  items.forEach(a => (a.w.refs || []).forEach(k => { const b = byKey.get(k); if (!b || b === a) return; links.push([a, b]);
    const p0 = a.g.position, p1 = b.g.position, mid = p0.clone().add(p1).multiplyScalar(.5); mid.y += p0.distanceTo(p1)*.25;
    const curve = new THREE.QuadraticBezierCurve3(p0.clone(), mid, p1.clone()), geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
    holo.add(new THREE.Line(geo, lineMat(new THREE.Color(a.col), .5))); }));
  return {holo, items, byKey, links, spin};
}

/* ---------- the stage: camera AR, or an on-screen look ---------- */
let renderer, scene, camera, anchor, H, mode = null, selected = null, reticle = null, labelsOn = false, lastSeen = 0, ctxAR = null, srcAR = null, markerRoot = null;
const clock = new THREE.Clock();
function initRenderer(){
  renderer = new THREE.WebGLRenderer({canvas:$("gl"), antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(innerWidth, innerHeight); renderer.setClearColor(0x000000, 0);
  scene = new THREE.Scene(); anchor = new THREE.Group(); scene.add(anchor);
}
async function startAR(payload){
  initRenderer();
  document.documentElement.style.background = "transparent"; document.body.style.background = "transparent";
  camera = new THREE.Camera(); scene.add(camera);
  srcAR = new THREEx.ArToolkitSource({sourceType:"webcam", sourceWidth:1280, sourceHeight:960, displayWidth:innerWidth, displayHeight:innerHeight});
  await new Promise((res, rej) => srcAR.init(() => { setTimeout(res, 400); }, err => rej(err)));
  ctxAR = new THREEx.ArToolkitContext({cameraParametersUrl:"data/camera_para.dat", detectionMode:"mono", patternRatio:MARKER.RATIO, maxDetectionRate:30, canvasWidth:640, canvasHeight:480});
  await new Promise(res => ctxAR.init(() => { camera.projectionMatrix.copy(ctxAR.getProjectionMatrix()); res(); }));
  markerRoot = new THREE.Group(); scene.add(markerRoot);
  const patt = URL.createObjectURL(new Blob([MARKER.patt(MARKER.url())], {type:"text/plain"}));
  new THREEx.ArMarkerControls(ctxAR, markerRoot, {type:"pattern", patternUrl:patt, changeMatrixMode:"modelViewMatrix", smooth:true, smoothCount:6, smoothTolerance:.01, smoothThreshold:2, minConfidence:.45});
  anchor.matrixAutoUpdate = false; anchor.visible = false;
  const fit = () => { srcAR.onResizeElement(); srcAR.copyElementSizeTo(renderer.domElement); if (ctxAR.arController) srcAR.copyElementSizeTo(ctxAR.arController.canvas); };
  addEventListener("resize", () => setTimeout(fit, 200)); setTimeout(fit, 300); setTimeout(fit, 1500);
  mode = "ar"; await populate(payload);
}
async function startPreview(payload){
  initRenderer();
  camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, .01, 100); scene.add(camera);
  // the printed square and a dark table, so the look is the same as on paper
  const mk = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(MARKER.full(MARKER.url(), 512))})); mk.rotation.x = -Math.PI/2; anchor.add(mk);
  const grid = new THREE.GridHelper(10, 40, 0x1b2a3a, 0x0f1824); grid.position.y = -.001; anchor.add(grid);
  addEventListener("resize", () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); });
  mode = "preview"; orbit.apply(); await populate(payload);
}
const orbit = {az:.35, el:.55, dist:8.5, apply(){ camera.position.set(Math.sin(this.az)*Math.cos(this.el)*this.dist, 1.1 + Math.sin(this.el)*this.dist, Math.cos(this.az)*Math.cos(this.el)*this.dist); camera.lookAt(0, 1.1, 0); }};
async function populate(payload){
  H = await buildHolo(payload);
  anchor.add(H.holo); H.holo.scale.setScalar(START_SCALE);
  reticle = new THREE.Sprite(spriteMat(TEX.reticle, HOLO, .9)); reticle.visible = false; reticle.renderOrder = 19; H.holo.add(reticle);
  $("hud").hidden = false; $("hint").hidden = false; setTimeout(() => $("hint").style.opacity = "0", 9000);
  if (mode === "preview") setStatus(true, "On-screen view · drag to turn");
  renderer.setAnimationLoop(frame);
}
function setStatus(lock, text){ $("status").classList.toggle("lock", !!lock); $("status").querySelector("span").textContent = text; }
function frame(){
  const dt = Math.min(clock.getDelta(), .1), t = clock.elapsedTime; UNI.time.value = t;
  if (mode === "ar" && srcAR.ready !== false){
    ctxAR.update(srcAR.domElement);
    if (markerRoot.visible){ anchor.matrix.copy(markerRoot.matrix); anchor.visible = true; if (!lastSeen || performance.now() - lastSeen > 600) setStatus(true, "Locked on the square"); lastSeen = performance.now(); }
    else if (lastSeen && performance.now() - lastSeen > 700){ setStatus(false, "Bring the square back into view"); }
    const lost = lastSeen ? performance.now() - lastSeen : 1e9;
    UNI.fade.value += ((lost < 700 ? 1 : .35) - UNI.fade.value)*.08;
  }
  if (H){
    H.spin.rotation.y += dt*.15;
    H.items.forEach(it => { it.sphere.rotation.y += dt*it.spin; it.halo.material.opacity = it.halo.material.opacity*.98 + (.18 + .7*it.s)*(.9 + .1*Math.sin(t*2 + it.r*400))*.02; });
    if (selected){ reticle.position.copy(selected.g.position); reticle.scale.setScalar(selected.r*6); reticle.material.rotation = t*.8; }
  }
  renderer.render(scene, camera);
}

/* ---------- touch: tap to pick, drag to move, pinch to scale, twist to turn ---------- */
const touches = new Map(); let gesture = null;
function ndc(x, y){ const r = renderer.domElement.getBoundingClientRect(); return new THREE.Vector2((x - r.left)/r.width*2 - 1, -((y - r.top)/r.height)*2 + 1); }
function rayAt(x, y){
  const v = ndc(x, y), rc = new THREE.Raycaster();
  if (mode === "preview") rc.setFromCamera(v, camera);
  else { const inv = camera.projectionMatrix.clone().invert(), d = new THREE.Vector3(v.x, v.y, .5).applyMatrix4(inv).normalize(); rc.set(new THREE.Vector3(0, 0, 0), d); }
  return rc;
}
function tablePoint(x, y){
  const rc = rayAt(x, y); anchor.updateMatrixWorld(true);
  const n = new THREE.Vector3(0, 1, 0).transformDirection(anchor.matrixWorld), o = new THREE.Vector3().setFromMatrixPosition(anchor.matrixWorld);
  const p = rc.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(n, o), new THREE.Vector3());
  return p ? anchor.worldToLocal(p) : null;
}
function pick(x, y){
  if (!H) return; const rc = rayAt(x, y); H.holo.updateMatrixWorld(true);
  const hits = rc.intersectObjects(H.items.map(i => i.hit), false);
  if (hits.length) select(hits[0].object.userData.item); else closeCard();
}
const cv = () => $("gl");
addEventListener("DOMContentLoaded", () => {
  const el = cv();
  el.addEventListener("pointerdown", e => { el.setPointerCapture(e.pointerId); touches.set(e.pointerId, {x:e.clientX, y:e.clientY, x0:e.clientX, y0:e.clientY, t0:performance.now()}); startGesture(); });
  el.addEventListener("pointermove", e => { const p = touches.get(e.pointerId); if (!p) return; p.x = e.clientX; p.y = e.clientY; moveGesture(); });
  const end = e => { const p = touches.get(e.pointerId); touches.delete(e.pointerId);
    if (p && touches.size === 0 && gesture && gesture.n === 1 && Math.hypot(p.x - p.x0, p.y - p.y0) < 10 && performance.now() - p.t0 < 350) pick(p.x, p.y);
    startGesture(); };
  el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
  el.addEventListener("wheel", e => { e.preventDefault(); if (mode === "preview"){ orbit.dist = clamp(orbit.dist*Math.exp(e.deltaY*.001), 1.5, 20); orbit.apply(); } else if (H) H.holo.scale.multiplyScalar(Math.exp(-e.deltaY*.001)); }, {passive:false});
});
function startGesture(){
  const ps = [...touches.values()]; if (!H || !ps.length){ gesture = null; return; }
  if (ps.length === 1) gesture = {n:1, x:ps[0].x, y:ps[0].y, p:mode === "ar" ? tablePoint(ps[0].x, ps[0].y) : null, pos:H.holo.position.clone(), az:orbit.az, el:orbit.el};
  else { const [a, b] = ps; gesture = {n:2, d:Math.hypot(a.x - b.x, a.y - b.y), ang:Math.atan2(b.y - a.y, b.x - a.x), sc:H.holo.scale.x, rot:H.holo.rotation.y, dist:orbit.dist}; }
}
function moveGesture(){
  const ps = [...touches.values()]; if (!gesture || !H) return;
  if (gesture.n === 1 && ps.length === 1){
    if (mode === "preview"){ orbit.az = gesture.az - (ps[0].x - gesture.x)*.008; orbit.el = clamp(gesture.el + (ps[0].y - gesture.y)*.006, .05, 1.45); orbit.apply(); return; }
    if (!gesture.p) return; const q = tablePoint(ps[0].x, ps[0].y); if (!q) return;
    H.holo.position.set(gesture.pos.x + q.x - gesture.p.x, 0, gesture.pos.z + q.z - gesture.p.z);
  } else if (gesture.n === 2 && ps.length >= 2){
    const [a, b] = ps, d = Math.hypot(a.x - b.x, a.y - b.y), ang = Math.atan2(b.y - a.y, b.x - a.x);
    const sc = clamp(gesture.sc*d/(gesture.d || 1), .15, 8); H.holo.scale.setScalar(sc);
    H.holo.rotation.y = gesture.rot - (ang - gesture.ang);
  }
}

/* ---------- the card ---------- */
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"}[c])); }
function select(it){
  selected = it; reticle.visible = true;
  if (it.label) it.label.visible = true; else { it.label = labelSprite(it.w.title, (it.w.artists || []).join(", ") + (isFinite(it.w.year) ? " · " + it.w.year : ""), it.col); it.label.position.y = it.r*1.6; it.g.add(it.label); }
  H.items.forEach(o => { if (o !== it && o.label && !labelsOn) o.label.visible = false; });
  const w = it.w, photos = [w.photoUrl].concat(w.photoMore || []).filter(Boolean);
  const rating = isFinite(w.rating) && w.rating !== null ? +w.rating : null;
  const rate = rating === null ? "Unrated" : (rating > 0 ? "+" : "−") + Math.abs(rating);
  const kind = w.void ? (rating !== null && rating < 0 ? "Black hole" : "Supernova") + " · no single date or place" : (BODY[w.kind] || "Star") + " · " + (w.type || KIND[w.kind] || "");
  const refsOut = (w.refs || []).map(k => H.byKey.get(k)).filter(Boolean), refsIn = H.items.filter(o => (o.w.refs || []).includes(w.key));
  let h = "";
  if (photos.length) h += '<div class="ph" id="ph">' + photos.map((p, i) => '<img src="' + esc(p) + '" alt="" style="display:' + (i ? "none" : "block") + '">').join("") + '<div class="scan"></div>' + (photos.length > 1 ? '<div class="dots">' + photos.map((p, i) => '<b' + (i ? "" : ' class="on"') + '></b>').join("") + '</div>' : "") + '</div>';
  if (w.photoCaption && !/^n\.?\/?a\.?$/i.test(w.photoCaption)) h += '<div class="capt">' + esc(w.photoCaption) + '</div>';
  h += '<div class="txt"><p class="kind">' + esc(kind) + '</p><h2>' + esc(w.title) + '</h2>';
  h += '<p class="meta"><span class="rate" style="color:' + (rating !== null && rating < 0 ? "#9cc4ff" : it.col) + '">' + esc(rate) + '</span> · ' + esc((w.artists || []).join(", ")) + (w.noYear || !isFinite(w.year) ? " · Undated" : " · " + w.year) + '</p>';
  h += '<p class="meta">' + esc(w.noPlace ? "No single place" : (w.place || "")) + '</p>';
  if (it.styles.length) h += '<div class="sty">' + it.styles.map(s => '<span style="color:' + s.color + ';border-color:' + s.color + '">' + esc(s.name) + '</span>').join("") + '</div>';
  if (w.notes) h += '<p class="notes">' + esc(w.notes) + '</p>';
  if (refsOut.length || refsIn.length){ h += '<div class="rel">'; if (refsOut.length) h += '<div>Draws on</div>' + refsOut.map(o => '<button data-k="' + esc(o.w.key) + '">' + esc(o.w.title) + '</button>').join(""); if (refsIn.length) h += '<div style="margin-top:8px">Drawn on by</div>' + refsIn.map(o => '<button data-k="' + esc(o.w.key) + '">' + esc(o.w.title) + '</button>').join(""); h += '</div>'; }
  h += '</div>';
  $("cardBody").innerHTML = h; $("cardBody").scrollTop = 0; $("card").classList.add("open");
  $("cardBody").querySelectorAll(".rel button").forEach(b => b.addEventListener("click", () => { const o = H.byKey.get(b.dataset.k); if (o) select(o); }));
  const ph = $("ph"); if (ph && photos.length > 1){ let i = 0; ph.addEventListener("click", () => { const imgs = ph.querySelectorAll("img"), dots = ph.querySelectorAll(".dots b"); imgs[i].style.display = "none"; dots[i].classList.remove("on"); i = (i + 1) % imgs.length; imgs[i].style.display = "block"; dots[i].classList.add("on"); }); }
}
function closeCard(){ $("card").classList.remove("open"); selected = null; if (reticle) reticle.visible = false; if (H && !labelsOn) H.items.forEach(o => { if (o.label) o.label.visible = false; }); }

/* ---------- start ---------- */
let PAYLOAD = null;
addEventListener("DOMContentLoaded", async () => {
  const msg = $("msg");
  try { PAYLOAD = await loadAtlas(); const t = (PAYLOAD.share && PAYLOAD.share.title) || window.AR_TITLE; if (t){ $("title").textContent = t; document.title = t + " · Hologram"; } }
  catch(e){ msg.textContent = e.message; }
  const go = async ar => {
    if (!PAYLOAD){ msg.textContent = msg.textContent || "The atlas file hasn't loaded."; return; }
    msg.textContent = "";
    try {
      if (ar){
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("This browser can't open the camera here. Open the page from its https address in Safari (iPhone) or Chrome (Android).");
        $("start").style.display = "none"; await startAR(PAYLOAD);
      } else { $("start").style.display = "none"; await startPreview(PAYLOAD); }
    } catch(e){ $("start").style.display = ""; msg.textContent = "The camera didn't start: " + (e && (e.message || e.name) || e) + ". Allow camera access for this site and try again."; }
  };
  $("goCam").addEventListener("click", () => go(true));
  $("goPreview").addEventListener("click", () => go(false));
  $("cardX").addEventListener("click", closeCard);
  $("bHelp").addEventListener("click", () => $("help").classList.add("on"));
  $("bReset").addEventListener("click", () => { if (!H) return; H.holo.position.set(0, 0, 0); H.holo.scale.setScalar(START_SCALE); H.holo.rotation.set(0, 0, 0); if (mode === "preview"){ orbit.az = .35; orbit.el = .55; orbit.dist = 8.5; orbit.apply(); } });
  $("bLabels").addEventListener("click", () => {
    if (!H) return; labelsOn = !labelsOn; $("bLabels").setAttribute("aria-pressed", String(labelsOn));
    H.items.forEach(it => { if (labelsOn && !it.label){ it.label = labelSprite(it.w.title, isFinite(it.w.year) && !it.w.noYear ? String(it.w.year) : "", it.col); it.label.position.y = it.r*1.6; it.label.scale.multiplyScalar(.8); it.g.add(it.label); } if (it.label) it.label.visible = labelsOn || it === selected; });
  });
  // ?preview opens the on-screen look straight away (handy on a computer)
  if (/[?&]preview\b/.test(location.search)) go(false);
});
})();
