(()=>{var Xn=Object.create;var dn=Object.defineProperty;var _n=Object.getOwnPropertyDescriptor;var Yn=Object.getOwnPropertyNames;var qn=Object.getPrototypeOf,Jn=Object.prototype.hasOwnProperty;var Kn=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var Qn=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Yn(t))!Jn.call(n,i)&&i!==e&&dn(n,i,{get:()=>t[i],enumerable:!(r=_n(t,i))||r.enumerable});return n};var bn=(n,t,e)=>(e=n!=null?Xn(qn(n)):{},Qn(t||!n||!n.__esModule?dn(e,"default",{value:n,enumerable:!0}):e,n));var Mn=Kn((Dt,$n)=>{$n.exports=window.THREE});var jn=bn(Mn());var zn=function(n){return URL.createObjectURL(new Blob([n],{type:"text/javascript"}))},nt=function(n){return new Worker(n)};try{URL.revokeObjectURL(zn(""))}catch{zn=function(t){return"data:application/javascript;charset=UTF-8,"+encodeURI(t)},nt=function(t){return new Worker(t,{type:"module"})}}var M=Uint8Array,$=Uint16Array,_=Uint32Array,pn=new M([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),vn=new M([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Sn=new M([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Cn=function(n,t){for(var e=new $(31),r=0;r<31;++r)e[r]=t+=1<<n[r-1];for(var i=new _(e[30]),r=1;r<30;++r)for(var o=e[r];o<e[r+1];++o)i[o]=o-e[r]<<5|r;return[e,i]},En=Cn(pn,2),tt=En[0],un=En[1];tt[28]=258,un[258]=28;var On=Cn(vn,0),kt=On[0],An=On[1],ln=new $(32768);for(v=0;v<32768;++v)H=(v&43690)>>>1|(v&21845)<<1,H=(H&52428)>>>2|(H&13107)<<2,H=(H&61680)>>>4|(H&3855)<<4,ln[v]=((H&65280)>>>8|(H&255)<<8)>>>1;var H,v,K=function(n,t,e){for(var r=n.length,i=0,o=new $(t);i<r;++i)++o[n[i]-1];var f=new $(t);for(i=0;i<t;++i)f[i]=f[i-1]+o[i-1]<<1;var l;if(e){l=new $(1<<t);var h=15-t;for(i=0;i<r;++i)if(n[i])for(var s=i<<4|n[i],a=t-n[i],u=f[n[i]-1]++<<a,p=u|(1<<a)-1;u<=p;++u)l[ln[u]>>>h]=s}else for(l=new $(r),i=0;i<r;++i)n[i]&&(l[i]=ln[f[n[i]-1]++]>>>15-n[i]);return l},W=new M(288);for(v=0;v<144;++v)W[v]=8;var v;for(v=144;v<256;++v)W[v]=9;var v;for(v=256;v<280;++v)W[v]=7;var v;for(v=280;v<288;++v)W[v]=8;var v,tn=new M(32);for(v=0;v<32;++v)tn[v]=5;var v,rt=K(W,9,0);var et=K(tn,5,0);var Pn=function(n){return(n/8|0)+(n&7&&1)},Zn=function(n,t,e){(t==null||t<0)&&(t=0),(e==null||e>n.length)&&(e=n.length);var r=new(n instanceof $?$:n instanceof _?_:M)(e-t);return r.set(n.subarray(t,e)),r};var j=function(n,t,e){e<<=t&7;var r=t/8|0;n[r]|=e,n[r+1]|=e>>>8},q=function(n,t,e){e<<=t&7;var r=t/8|0;n[r]|=e,n[r+1]|=e>>>8,n[r+2]|=e>>>16},fn=function(n,t){for(var e=[],r=0;r<n.length;++r)n[r]&&e.push({s:r,f:n[r]});var i=e.length,o=e.slice();if(!i)return[gn,0];if(i==1){var f=new M(e[0].s+1);return f[e[0].s]=1,[f,1]}e.sort(function(C,U){return C.f-U.f}),e.push({s:-1,f:25001});var l=e[0],h=e[1],s=0,a=1,u=2;for(e[0]={s:-1,f:l.f+h.f,l,r:h};a!=i-1;)l=e[e[s].f<e[u].f?s++:u++],h=e[s!=a&&e[s].f<e[u].f?s++:u++],e[a++]={s:-1,f:l.f+h.f,l,r:h};for(var p=o[0].s,r=1;r<i;++r)o[r].s>p&&(p=o[r].s);var g=new $(p+1),w=hn(e[a-1],g,0);if(w>t){var r=0,m=0,S=w-t,I=1<<S;for(o.sort(function(U,y){return g[y.s]-g[U.s]||U.f-y.f});r<i;++r){var T=o[r].s;if(g[T]>t)m+=I-(1<<w-g[T]),g[T]=t;else break}for(m>>>=S;m>0;){var G=o[r].s;g[G]<t?m-=1<<t-g[G]++-1:++r}for(;r>=0&&m;--r){var A=o[r].s;g[A]==t&&(--g[A],++m)}w=t}return[new M(g),w]},hn=function(n,t,e){return n.s==-1?Math.max(hn(n.l,t,e+1),hn(n.r,t,e+1)):t[n.s]=e},Un=function(n){for(var t=n.length;t&&!n[--t];);for(var e=new $(++t),r=0,i=n[0],o=1,f=function(h){e[r++]=h},l=1;l<=t;++l)if(n[l]==i&&l!=t)++o;else{if(!i&&o>2){for(;o>138;o-=138)f(32754);o>2&&(f(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(f(i),--o;o>6;o-=6)f(8304);o>2&&(f(o-3<<5|8208),o=0)}for(;o--;)f(i);o=1,i=n[l]}return[e.subarray(0,r),t]},J=function(n,t){for(var e=0,r=0;r<t.length;++r)e+=n[r]*t[r];return e},nn=function(n,t,e){var r=e.length,i=Pn(t+2);n[i]=r&255,n[i+1]=r>>>8,n[i+2]=n[i]^255,n[i+3]=n[i+1]^255;for(var o=0;o<r;++o)n[i+o+4]=e[o];return(i+4+r)*8},Tn=function(n,t,e,r,i,o,f,l,h,s,a){j(t,a++,e),++i[256];for(var u=fn(i,15),p=u[0],g=u[1],w=fn(o,15),m=w[0],S=w[1],I=Un(p),T=I[0],G=I[1],A=Un(m),C=A[0],U=A[1],y=new $(19),c=0;c<T.length;++c)y[T[c]&31]++;for(var c=0;c<C.length;++c)y[C[c]&31]++;for(var V=fn(y,7),E=V[0],b=V[1],D=19;D>4&&!E[Sn[D-1]];--D);var N=s+5<<3,O=J(i,W)+J(o,tn)+f,P=J(i,p)+J(o,m)+f+14+3*D+J(y,E)+(2*y[16]+3*y[17]+7*y[18]);if(N<=O&&N<=P)return nn(t,a,n.subarray(h,h+s));var F,x,Z,L;if(j(t,a,1+(P<O)),a+=2,P<O){F=K(p,g,0),x=p,Z=K(m,S,0),L=m;var on=K(E,b,0);j(t,a,G-257),j(t,a+5,U-1),j(t,a+10,D-4),a+=14;for(var c=0;c<D;++c)j(t,a+3*c,E[Sn[c]]);a+=3*D;for(var R=[T,C],Y=0;Y<2;++Y)for(var X=R[Y],c=0;c<X.length;++c){var B=X[c]&31;j(t,a,on[B]),a+=E[B],B>15&&(j(t,a,X[c]>>>5&127),a+=X[c]>>>12)}}else F=rt,x=W,Z=et,L=tn;for(var c=0;c<l;++c)if(r[c]>255){var B=r[c]>>>18&31;q(t,a,F[B+257]),a+=x[B+257],B>7&&(j(t,a,r[c]>>>23&31),a+=pn[B]);var k=r[c]&31;q(t,a,Z[k]),a+=L[k],k>3&&(q(t,a,r[c]>>>5&8191),a+=vn[k])}else q(t,a,F[r[c]]),a+=x[r[c]];return q(t,a,F[256]),a+x[256]},it=new _([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),gn=new M(0),ot=function(n,t,e,r,i,o){var f=n.length,l=new M(r+f+5*(1+Math.ceil(f/7e3))+i),h=l.subarray(r,l.length-i),s=0;if(!t||f<8)for(var a=0;a<=f;a+=65535){var u=a+65535;u<f?s=nn(h,s,n.subarray(a,u)):(h[a]=o,s=nn(h,s,n.subarray(a,f)))}else{for(var p=it[t-1],g=p>>>13,w=p&8191,m=(1<<e)-1,S=new $(32768),I=new $(m+1),T=Math.ceil(e/3),G=2*T,A=function(sn){return(n[sn]^n[sn+1]<<T^n[sn+2]<<G)&m},C=new _(25e3),U=new $(288),y=new $(32),c=0,V=0,a=0,E=0,b=0,D=0;a<f;++a){var N=A(a),O=a&32767,P=I[N];if(S[O]=P,I[N]=O,b<=a){var F=f-a;if((c>7e3||E>24576)&&F>423){s=Tn(n,h,0,C,U,y,V,E,D,a-D,s),E=c=V=0,D=a;for(var x=0;x<286;++x)U[x]=0;for(var x=0;x<30;++x)y[x]=0}var Z=2,L=0,on=w,R=O-P&32767;if(F>2&&N==A(a-R))for(var Y=Math.min(g,F)-1,X=Math.min(32767,a),B=Math.min(258,F);R<=X&&--on&&O!=P;){if(n[a+Z]==n[a+Z-R]){for(var k=0;k<B&&n[a+k]==n[a+k-R];++k);if(k>Z){if(Z=k,L=R,k>Y)break;for(var Wn=Math.min(R,k-2),wn=0,x=0;x<Wn;++x){var an=a-R+x+32768&32767,Nn=S[an],mn=an-Nn+32768&32767;mn>wn&&(wn=mn,P=an)}}}O=P,P=S[O],R+=O-P+32768&32767}if(L){C[E++]=268435456|un[Z]<<18|An[L];var yn=un[Z]&31,xn=An[L]&31;V+=pn[yn]+vn[xn],++U[257+yn],++y[xn],b=a+Z,++c}else C[E++]=n[a],++U[n[a]]}}s=Tn(n,h,o,C,U,y,V,E,D,a-D,s),!o&&s&7&&(s=nn(h,s+1,gn))}return Zn(l,0,r+Pn(s)+i)},at=function(){for(var n=new _(256),t=0;t<256;++t){for(var e=t,r=9;--r;)e=(e&1&&3988292384)^e>>>1;n[t]=e}return n}(),st=function(){var n=-1;return{p:function(t){for(var e=n,r=0;r<t.length;++r)e=at[e&255^t[r]]^e>>>8;n=e},d:function(){return~n}}};var ft=function(n,t,e,r,i){return ot(n,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):12+t.mem,e,r,!i)},In=function(n,t){var e={};for(var r in n)e[r]=n[r];for(var r in t)e[r]=t[r];return e};var d=function(n,t,e){for(;e;++t)n[t]=e,e>>>=8};function ut(n,t){return ft(n,t||{},0,0)}var Fn=function(n,t,e,r){for(var i in n){var o=n[i],f=t+i;o instanceof M?e[f]=[o,r]:Array.isArray(o)?e[f]=[o[0],In(r,o[1])]:Fn(o,f+"/",e,r)}},Dn=typeof TextEncoder<"u"&&new TextEncoder,lt=typeof TextDecoder<"u"&&new TextDecoder,ht=0;try{lt.decode(gn,{stream:!0}),ht=1}catch{}function Q(n,t){if(t){for(var e=new M(n.length),r=0;r<n.length;++r)e[r]=n.charCodeAt(r);return e}if(Dn)return Dn.encode(n);for(var i=n.length,o=new M(n.length+(n.length>>1)),f=0,l=function(a){o[f++]=a},r=0;r<i;++r){if(f+5>o.length){var h=new M(f+8+(i-r<<1));h.set(o),o=h}var s=n.charCodeAt(r);s<128||t?l(s):s<2048?(l(192|s>>6),l(128|s&63)):s>55295&&s<57344?(s=65536+(s&1047552)|n.charCodeAt(++r)&1023,l(240|s>>18),l(128|s>>12&63),l(128|s>>6&63),l(128|s&63)):(l(224|s>>12),l(128|s>>6&63),l(128|s&63))}return Zn(o,0,f)}var cn=function(n){var t=0;if(n)for(var e in n){var r=n[e].length;if(r>65535)throw"extra field too long";t+=r+4}return t},kn=function(n,t,e,r,i,o,f,l){var h=r.length,s=e.extra,a=l&&l.length,u=cn(s);d(n,t,f!=null?33639248:67324752),t+=4,f!=null&&(n[t++]=20,n[t++]=e.os),n[t]=20,t+=2,n[t++]=e.flag<<1|(o==null&&8),n[t++]=i&&8,n[t++]=e.compression&255,n[t++]=e.compression>>8;var p=new Date(e.mtime==null?Date.now():e.mtime),g=p.getFullYear()-1980;if(g<0||g>119)throw"date not in range 1980-2099";if(d(n,t,g<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>>1),t+=4,o!=null&&(d(n,t,e.crc),d(n,t+4,o),d(n,t+8,e.size)),d(n,t+12,h),d(n,t+14,u),t+=16,f!=null&&(d(n,t,a),d(n,t+6,e.attrs),d(n,t+10,f),t+=14),n.set(r,t),t+=h,u)for(var w in s){var m=s[w],S=m.length;d(n,t,+w),d(n,t+2,S),n.set(m,t+4),t+=4+S}return a&&(n.set(l,t),t+=a),t},ct=function(n,t,e,r,i){d(n,t,101010256),d(n,t+8,e),d(n,t+10,e),d(n,t+12,r),d(n,t+16,i)};function Rn(n,t){t||(t={});var e={},r=[];Fn(n,"",e,t);var i=0,o=0;for(var f in e){var l=e[f],h=l[0],s=l[1],a=s.level==0?0:8,u=Q(f),p=u.length,g=s.comment,w=g&&Q(g),m=w&&w.length,S=cn(s.extra);if(p>65535)throw"filename too long";var I=a?ut(h,s):h,T=I.length,G=st();G.p(h),r.push(In(s,{size:h.length,crc:G.d(),c:I,f:u,m:w,u:p!=f.length||w&&g.length!=m,o:i,compression:a})),i+=30+p+S+T,o+=76+2*(p+S)+(m||0)+T}for(var A=new M(o+22),C=i,U=o-i,y=0;y<r.length;++y){var u=r[y];kn(A,u.o,u,u.f,u.u,u.c.length);var c=30+u.f.length+cn(u.extra);A.set(u.c,u.o+c),kn(A,i,u,u.f,u.u,u.c.length,u.o,u.m),i+=16+c+(u.m?u.m.length:0)}return ct(A,i,r.length,U,C),A}var en=class{async parse(t,e={ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:"horizontal"}}}){let r={},i="model.usda";r[i]=null;let o=Ln();o+=gt(e);let f={},l={};t.traverseVisible(s=>{if(s.isMesh){let a=s.geometry,u=s.material;if(u.isMeshStandardMaterial){let p="geometries/Geometry_"+a.id+".usd";if(!(p in r)){let g=xt(a);r[p]=mt(g)}u.uuid in f||(f[u.uuid]=u),o+=yt(s,a,u)}else console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",s)}else s.isCamera&&(o+=Ut(s))}),e.sceneExtra&&(o+=e.sceneExtra),o+=wt(),o+=St(f,l),r[i]=Q(o),o=null;for(let s in l){let a=l[s],u=s.split("_")[1],p=a.format===1023,g=vt(a.image,u),w=await new Promise(m=>g.toBlob(m,p?"image/png":"image/jpeg",.86));r[`textures/Texture_${s}.${p?"png":"jpg"}`]=new Uint8Array(await w.arrayBuffer())}let h=0;for(let s in r){let a=r[s],u=34+s.length;h+=u;let p=h&63;if(p!==4){let g=64-p,w=new Uint8Array(g);r[s]=[a,{extra:{12345:w}}]}h=a.length}return Rn(r,{level:0})}};function vt(n,t){if(typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&n instanceof ImageBitmap){let e=1024/Math.max(n.width,n.height),r=document.createElement("canvas");r.width=n.width*Math.min(1,e),r.height=n.height*Math.min(1,e);let i=r.getContext("2d");if(i.drawImage(n,0,0,r.width,r.height),t!==void 0){let o=parseInt(t,16),f=(o>>16&255)/255,l=(o>>8&255)/255,h=(o&255)/255,s=i.getImageData(0,0,r.width,r.height),a=s.data;for(let u=0;u<a.length;u+=4)a[u+0]=a[u+0]*f,a[u+1]=a[u+1]*l,a[u+2]=a[u+2]*h;i.putImageData(s,0,0)}return r}}var z=7;function Ln(){return`#usda 1.0
(
    customLayerData = {
        string creator = "Three.js USDZExporter"
    }
    metersPerUnit = 1
    upAxis = "Y"
)

`}function gt(n){return`def Xform "Root"
{
    def Scope "Scenes" (
        kind = "sceneLibrary"
    )
    {
        def Xform "Scene" (
            customData = {
                bool preliminary_collidesWithEnvironment = 0
                string sceneName = "Scene"
            }
            sceneName = "Scene"
        )
        {
        token preliminary:anchoring:type = "${n.ar.anchoring.type}"
        token preliminary:planeAnchoring:alignment = "${n.ar.planeAnchoring.alignment}"

`}function wt(){return`
        }
    }
}

`}function mt(n){let t=Ln();return t+=n,Q(t)}function yt(n,t,e){let r="Object_"+n.id,i=Vn(n.matrixWorld);return n.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",n),`def Xform "${r}" (
    prepend references = @./geometries/Geometry_${t.id}.usd@</Geometry>
)
{
    matrix4d xformOp:transform = ${i}
    uniform token[] xformOpOrder = ["xformOp:transform"]

    rel material:binding = </Materials/Material_${e.id}>
}

`}function Vn(n){let t=n.elements;return`( ${rn(t,0)}, ${rn(t,4)}, ${rn(t,8)}, ${rn(t,12)} )`}function rn(n,t){return`(${n[t+0]}, ${n[t+1]}, ${n[t+2]}, ${n[t+3]})`}function xt(n){return`
def "Geometry"
{
  ${dt(n)}
}
`}function dt(n){let t="Geometry",e=n.attributes,r=e.position.count;return`
    def Mesh "${t}"
    {
        int[] faceVertexCounts = [${$t(n)}]
        int[] faceVertexIndices = [${Mt(n)}]
        normal3f[] normals = [${Bn(e.normal,r)}] (
            interpolation = "vertex"
        )
        point3f[] points = [${Bn(e.position,r)}]
        float2[] primvars:st = [${zt(e.uv,r)}] (
            interpolation = "vertex"
        )
        uniform token subdivisionScheme = "none"
    }
`}function $t(n){let t=n.index!==null?n.index.count:n.attributes.position.count;return Array(t/3).fill(3).join(", ")}function Mt(n){let t=n.index,e=[];if(t!==null)for(let r=0;r<t.count;r++)e.push(t.getX(r));else{let r=n.attributes.position.count;for(let i=0;i<r;i++)e.push(i)}return e.join(", ")}function Bn(n,t){if(n===void 0)return console.warn("USDZExporter: Normals missing."),Array(t).fill("(0, 0, 0)").join(", ");let e=[];for(let r=0;r<n.count;r++){let i=n.getX(r),o=n.getY(r),f=n.getZ(r);e.push(`(${i.toPrecision(z)}, ${o.toPrecision(z)}, ${f.toPrecision(z)})`)}return e.join(", ")}function zt(n,t){if(n===void 0)return console.warn("USDZExporter: UVs missing."),Array(t).fill("(0, 0)").join(", ");let e=[];for(let r=0;r<n.count;r++){let i=n.getX(r),o=n.getY(r);e.push(`(${i.toPrecision(z)}, ${1-o.toPrecision(z)})`)}return e.join(", ")}function St(n,t){let e=[];for(let r in n){let i=n[r];e.push(At(i,t))}return`def "Materials"
{
${e.join("")}
}

`}function At(n,t){let e="            ",r=[],i=[];function o(f,l,h){let s=f.id+(h?"_"+h.getHexString():""),a=f.format===1023;return t[s]=f,`
        def Shader "Transform2d_${l}" (
            sdrMetadata = {
                string role = "math"
            }
        )
        {
            uniform token info:id = "UsdTransform2d"
            float2 inputs:in.connect = </Materials/Material_${n.id}/uvReader_st.outputs:result>
            float2 inputs:scale = ${Hn(f.repeat)}
            float2 inputs:translation = ${Hn(f.offset)}
            float2 outputs:result
        }

        def Shader "Texture_${f.id}_${l}"
        {
            uniform token info:id = "UsdUVTexture"
            asset inputs:file = @textures/Texture_${s}.${a?"png":"jpg"}@
            float2 inputs:st.connect = </Materials/Material_${n.id}/Transform2d_${l}.outputs:result>
            token inputs:wrapS = "repeat"
            token inputs:wrapT = "repeat"
            float outputs:r
            float outputs:g
            float outputs:b
            float3 outputs:rgb
            ${n.transparent||n.alphaTest>0?"float outputs:a":""}
        }`}return n.side===jn.DoubleSide&&console.warn("THREE.USDZExporter: USDZ does not support double sided materials",n),n.map!==null?(r.push(`${e}color3f inputs:diffuseColor.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:rgb>`),n.transparent?r.push(`${e}float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:a>`):n.alphaTest>0&&(r.push(`${e}float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:a>`),r.push(`${e}float inputs:opacityThreshold = ${n.alphaTest}`)),i.push(o(n.map,"diffuse",n.color))):r.push(`${e}color3f inputs:diffuseColor = ${Gn(n.color)}`),n.emissiveMap!==null?(r.push(`${e}color3f inputs:emissiveColor.connect = </Materials/Material_${n.id}/Texture_${n.emissiveMap.id}_emissive.outputs:rgb>`),i.push(o(n.emissiveMap,"emissive"))):n.emissive.getHex()>0&&r.push(`${e}color3f inputs:emissiveColor = ${Gn(n.emissive)}`),n.normalMap!==null&&(r.push(`${e}normal3f inputs:normal.connect = </Materials/Material_${n.id}/Texture_${n.normalMap.id}_normal.outputs:rgb>`),i.push(o(n.normalMap,"normal"))),n.aoMap!==null&&(r.push(`${e}float inputs:occlusion.connect = </Materials/Material_${n.id}/Texture_${n.aoMap.id}_occlusion.outputs:r>`),i.push(o(n.aoMap,"occlusion"))),n.roughnessMap!==null&&n.roughness===1?(r.push(`${e}float inputs:roughness.connect = </Materials/Material_${n.id}/Texture_${n.roughnessMap.id}_roughness.outputs:g>`),i.push(o(n.roughnessMap,"roughness"))):r.push(`${e}float inputs:roughness = ${n.roughness}`),n.metalnessMap!==null&&n.metalness===1?(r.push(`${e}float inputs:metallic.connect = </Materials/Material_${n.id}/Texture_${n.metalnessMap.id}_metallic.outputs:b>`),i.push(o(n.metalnessMap,"metallic"))):r.push(`${e}float inputs:metallic = ${n.metalness}`),n.alphaMap!==null?(r.push(`${e}float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.alphaMap.id}_opacity.outputs:r>`),r.push(`${e}float inputs:opacityThreshold = 0.0001`),i.push(o(n.alphaMap,"opacity"))):r.push(`${e}float inputs:opacity = ${n.opacity}`),n.isMeshPhysicalMaterial&&(r.push(`${e}float inputs:clearcoat = ${n.clearcoat}`),r.push(`${e}float inputs:clearcoatRoughness = ${n.clearcoatRoughness}`),r.push(`${e}float inputs:ior = ${n.ior}`)),`
    def Material "Material_${n.id}"
    {
        def Shader "PreviewSurface"
        {
            uniform token info:id = "UsdPreviewSurface"
${r.join(`
`)}
            int inputs:useSpecularWorkflow = 0
            token outputs:surface
        }

        token outputs:surface.connect = </Materials/Material_${n.id}/PreviewSurface.outputs:surface>
        token inputs:frame:stPrimvarName = "st"

        def Shader "uvReader_st"
        {
            uniform token info:id = "UsdPrimvarReader_float2"
            token inputs:varname.connect = </Materials/Material_${n.id}.inputs:frame:stPrimvarName>
            float2 inputs:fallback = (0.0, 0.0)
            float2 outputs:result
        }

${i.join(`
`)}

    }
`}function Gn(n){return`(${n.r}, ${n.g}, ${n.b})`}function Hn(n){return`(${n.x}, ${n.y})`}function Ut(n){let t=n.name?n.name:"Camera_"+n.id,e=Vn(n.matrixWorld);return n.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",n),n.isOrthographicCamera?`def Camera "${t}"
		{
			matrix4d xformOp:transform = ${e}
			uniform token[] xformOpOrder = ["xformOp:transform"]
	
			float2 clippingRange = (${n.near.toPrecision(z)}, ${n.far.toPrecision(z)})
			float horizontalAperture = ${((Math.abs(n.left)+Math.abs(n.right))*10).toPrecision(z)}
			float verticalAperture = ${((Math.abs(n.top)+Math.abs(n.bottom))*10).toPrecision(z)}
			token projection = "orthographic"
		}
	
	`:`def Camera "${t}"
		{
			matrix4d xformOp:transform = ${e}
			uniform token[] xformOpOrder = ["xformOp:transform"]
	
			float2 clippingRange = (${n.near.toPrecision(z)}, ${n.far.toPrecision(z)})
			float focalLength = ${n.getFocalLength().toPrecision(z)}
			float focusDistance = ${n.focus.toPrecision(z)}
			float horizontalAperture = ${n.getFilmWidth().toPrecision(z)}
			token projection = "perspective"
			float verticalAperture = ${n.getFilmHeight().toPrecision(z)}
		}
	
	`}window.USDZExporter=en;})();
/*! Bundled license information:

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
