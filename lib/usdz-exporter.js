(()=>{var Nt=Object.create;var xt=Object.defineProperty;var Xt=Object.getOwnPropertyDescriptor;var Yt=Object.getOwnPropertyNames;var _t=Object.getPrototypeOf,qt=Object.prototype.hasOwnProperty;var Jt=(t,n)=>()=>(n||t((n={exports:{}}).exports,n),n.exports);var Kt=(t,n,e,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of Yt(n))!qt.call(t,i)&&i!==e&&xt(t,i,{get:()=>n[i],enumerable:!(r=Xt(n,i))||r.enumerable});return t};var Qt=(t,n,e)=>(e=t!=null?Nt(_t(t)):{},Kt(n||!t||!t.__esModule?xt(e,"default",{value:t,enumerable:!0}):e,t));var $t=Jt((Dn,dt)=>{dt.exports=window.THREE});var Ht=Qt($t());var Mt=function(t){return URL.createObjectURL(new Blob([t],{type:"text/javascript"}))},bt=function(t){return new Worker(t)};try{URL.revokeObjectURL(Mt(""))}catch{Mt=function(n){return"data:application/javascript;charset=UTF-8,"+encodeURI(n)},bt=function(n){return new Worker(n,{type:"module"})}}var M=Uint8Array,$=Uint16Array,Y=Uint32Array,ct=new M([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),pt=new M([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),zt=new M([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),kt=function(t,n){for(var e=new $(31),r=0;r<31;++r)e[r]=n+=1<<t[r-1];for(var i=new Y(e[30]),r=1;r<30;++r)for(var o=e[r];o<e[r+1];++o)i[o]=o-e[r]<<5|r;return[e,i]},Ct=kt(ct,2),tn=Ct[0],ft=Ct[1];tn[28]=258,ft[258]=28;var Et=kt(pt,0),kn=Et[0],St=Et[1],ut=new $(32768);for(v=0;v<32768;++v)H=(v&43690)>>>1|(v&21845)<<1,H=(H&52428)>>>2|(H&13107)<<2,H=(H&61680)>>>4|(H&3855)<<4,ut[v]=((H&65280)>>>8|(H&255)<<8)>>>1;var H,v,K=function(t,n,e){for(var r=t.length,i=0,o=new $(n);i<r;++i)++o[t[i]-1];var f=new $(n);for(i=0;i<n;++i)f[i]=f[i-1]+o[i-1]<<1;var l;if(e){l=new $(1<<n);var c=15-n;for(i=0;i<r;++i)if(t[i])for(var s=i<<4|t[i],a=n-t[i],u=f[t[i]-1]++<<a,h=u|(1<<a)-1;u<=h;++u)l[ut[u]>>>c]=s}else for(l=new $(r),i=0;i<r;++i)t[i]&&(l[i]=ut[f[t[i]-1]++]>>>15-t[i]);return l},W=new M(288);for(v=0;v<144;++v)W[v]=8;var v;for(v=144;v<256;++v)W[v]=9;var v;for(v=256;v<280;++v)W[v]=7;var v;for(v=280;v<288;++v)W[v]=8;var v,nt=new M(32);for(v=0;v<32;++v)nt[v]=5;var v,nn=K(W,9,0);var rn=K(nt,5,0);var Ot=function(t){return(t/8|0)+(t&7&&1)},Pt=function(t,n,e){(n==null||n<0)&&(n=0),(e==null||e>t.length)&&(e=t.length);var r=new(t instanceof $?$:t instanceof Y?Y:M)(e-n);return r.set(t.subarray(n,e)),r};var j=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>>8},q=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>>8,t[r+2]|=e>>>16},st=function(t,n){for(var e=[],r=0;r<t.length;++r)t[r]&&e.push({s:r,f:t[r]});var i=e.length,o=e.slice();if(!i)return[vt,0];if(i==1){var f=new M(e[0].s+1);return f[e[0].s]=1,[f,1]}e.sort(function(C,U){return C.f-U.f}),e.push({s:-1,f:25001});var l=e[0],c=e[1],s=0,a=1,u=2;for(e[0]={s:-1,f:l.f+c.f,l,r:c};a!=i-1;)l=e[e[s].f<e[u].f?s++:u++],c=e[s!=a&&e[s].f<e[u].f?s++:u++],e[a++]={s:-1,f:l.f+c.f,l,r:c};for(var h=o[0].s,r=1;r<i;++r)o[r].s>h&&(h=o[r].s);var g=new $(h+1),w=lt(e[a-1],g,0);if(w>n){var r=0,m=0,S=w-n,I=1<<S;for(o.sort(function(U,y){return g[y.s]-g[U.s]||U.f-y.f});r<i;++r){var T=o[r].s;if(g[T]>n)m+=I-(1<<w-g[T]),g[T]=n;else break}for(m>>>=S;m>0;){var G=o[r].s;g[G]<n?m-=1<<n-g[G]++-1:++r}for(;r>=0&&m;--r){var A=o[r].s;g[A]==n&&(--g[A],++m)}w=n}return[new M(g),w]},lt=function(t,n,e){return t.s==-1?Math.max(lt(t.l,n,e+1),lt(t.r,n,e+1)):n[t.s]=e},At=function(t){for(var n=t.length;n&&!t[--n];);for(var e=new $(++n),r=0,i=t[0],o=1,f=function(c){e[r++]=c},l=1;l<=n;++l)if(t[l]==i&&l!=n)++o;else{if(!i&&o>2){for(;o>138;o-=138)f(32754);o>2&&(f(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(f(i),--o;o>6;o-=6)f(8304);o>2&&(f(o-3<<5|8208),o=0)}for(;o--;)f(i);o=1,i=t[l]}return[e.subarray(0,r),n]},J=function(t,n){for(var e=0,r=0;r<n.length;++r)e+=t[r]*n[r];return e},tt=function(t,n,e){var r=e.length,i=Ot(n+2);t[i]=r&255,t[i+1]=r>>>8,t[i+2]=t[i]^255,t[i+3]=t[i+1]^255;for(var o=0;o<r;++o)t[i+o+4]=e[o];return(i+4+r)*8},Ut=function(t,n,e,r,i,o,f,l,c,s,a){j(n,a++,e),++i[256];for(var u=st(i,15),h=u[0],g=u[1],w=st(o,15),m=w[0],S=w[1],I=At(h),T=I[0],G=I[1],A=At(m),C=A[0],U=A[1],y=new $(19),p=0;p<T.length;++p)y[T[p]&31]++;for(var p=0;p<C.length;++p)y[C[p]&31]++;for(var V=st(y,7),E=V[0],b=V[1],D=19;D>4&&!E[zt[D-1]];--D);var N=s+5<<3,O=J(i,W)+J(o,nt)+f,P=J(i,h)+J(o,m)+f+14+3*D+J(y,E)+(2*y[16]+3*y[17]+7*y[18]);if(N<=O&&N<=P)return tt(n,a,t.subarray(c,c+s));var F,x,Z,L;if(j(n,a,1+(P<O)),a+=2,P<O){F=K(h,g,0),x=h,Z=K(m,S,0),L=m;var it=K(E,b,0);j(n,a,G-257),j(n,a+5,U-1),j(n,a+10,D-4),a+=14;for(var p=0;p<D;++p)j(n,a+3*p,E[zt[p]]);a+=3*D;for(var R=[T,C],_=0;_<2;++_)for(var X=R[_],p=0;p<X.length;++p){var B=X[p]&31;j(n,a,it[B]),a+=E[B],B>15&&(j(n,a,X[p]>>>5&127),a+=X[p]>>>12)}}else F=nn,x=W,Z=rn,L=nt;for(var p=0;p<l;++p)if(r[p]>255){var B=r[p]>>>18&31;q(n,a,F[B+257]),a+=x[B+257],B>7&&(j(n,a,r[p]>>>23&31),a+=ct[B]);var k=r[p]&31;q(n,a,Z[k]),a+=L[k],k>3&&(q(n,a,r[p]>>>5&8191),a+=pt[k])}else q(n,a,F[r[p]]),a+=x[r[p]];return q(n,a,F[256]),a+x[256]},en=new Y([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),vt=new M(0),on=function(t,n,e,r,i,o){var f=t.length,l=new M(r+f+5*(1+Math.ceil(f/7e3))+i),c=l.subarray(r,l.length-i),s=0;if(!n||f<8)for(var a=0;a<=f;a+=65535){var u=a+65535;u<f?s=tt(c,s,t.subarray(a,u)):(c[a]=o,s=tt(c,s,t.subarray(a,f)))}else{for(var h=en[n-1],g=h>>>13,w=h&8191,m=(1<<e)-1,S=new $(32768),I=new $(m+1),T=Math.ceil(e/3),G=2*T,A=function(at){return(t[at]^t[at+1]<<T^t[at+2]<<G)&m},C=new Y(25e3),U=new $(288),y=new $(32),p=0,V=0,a=0,E=0,b=0,D=0;a<f;++a){var N=A(a),O=a&32767,P=I[N];if(S[O]=P,I[N]=O,b<=a){var F=f-a;if((p>7e3||E>24576)&&F>423){s=Ut(t,c,0,C,U,y,V,E,D,a-D,s),E=p=V=0,D=a;for(var x=0;x<286;++x)U[x]=0;for(var x=0;x<30;++x)y[x]=0}var Z=2,L=0,it=w,R=O-P&32767;if(F>2&&N==A(a-R))for(var _=Math.min(g,F)-1,X=Math.min(32767,a),B=Math.min(258,F);R<=X&&--it&&O!=P;){if(t[a+Z]==t[a+Z-R]){for(var k=0;k<B&&t[a+k]==t[a+k-R];++k);if(k>Z){if(Z=k,L=R,k>_)break;for(var Vt=Math.min(R,k-2),gt=0,x=0;x<Vt;++x){var ot=a-R+x+32768&32767,Wt=S[ot],wt=ot-Wt+32768&32767;wt>gt&&(gt=wt,P=ot)}}}O=P,P=S[O],R+=O-P+32768&32767}if(L){C[E++]=268435456|ft[Z]<<18|St[L];var mt=ft[Z]&31,yt=St[L]&31;V+=ct[mt]+pt[yt],++U[257+mt],++y[yt],b=a+Z,++p}else C[E++]=t[a],++U[t[a]]}}s=Ut(t,c,o,C,U,y,V,E,D,a-D,s),!o&&s&7&&(s=tt(c,s+1,vt))}return Pt(l,0,r+Ot(s)+i)},an=function(){for(var t=new Y(256),n=0;n<256;++n){for(var e=n,r=9;--r;)e=(e&1&&3988292384)^e>>>1;t[n]=e}return t}(),sn=function(){var t=-1;return{p:function(n){for(var e=t,r=0;r<n.length;++r)e=an[e&255^n[r]]^e>>>8;t=e},d:function(){return~t}}};var fn=function(t,n,e,r,i){return on(t,n.level==null?6:n.level,n.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):12+n.mem,e,r,!i)},Zt=function(t,n){var e={};for(var r in t)e[r]=t[r];for(var r in n)e[r]=n[r];return e};var d=function(t,n,e){for(;e;++n)t[n]=e,e>>>=8};function un(t,n){return fn(t,n||{},0,0)}var It=function(t,n,e,r){for(var i in t){var o=t[i],f=n+i;o instanceof M?e[f]=[o,r]:Array.isArray(o)?e[f]=[o[0],Zt(r,o[1])]:It(o,f+"/",e,r)}},Tt=typeof TextEncoder<"u"&&new TextEncoder,ln=typeof TextDecoder<"u"&&new TextDecoder,hn=0;try{ln.decode(vt,{stream:!0}),hn=1}catch{}function Q(t,n){if(n){for(var e=new M(t.length),r=0;r<t.length;++r)e[r]=t.charCodeAt(r);return e}if(Tt)return Tt.encode(t);for(var i=t.length,o=new M(t.length+(t.length>>1)),f=0,l=function(a){o[f++]=a},r=0;r<i;++r){if(f+5>o.length){var c=new M(f+8+(i-r<<1));c.set(o),o=c}var s=t.charCodeAt(r);s<128||n?l(s):s<2048?(l(192|s>>6),l(128|s&63)):s>55295&&s<57344?(s=65536+(s&1047552)|t.charCodeAt(++r)&1023,l(240|s>>18),l(128|s>>12&63),l(128|s>>6&63),l(128|s&63)):(l(224|s>>12),l(128|s>>6&63),l(128|s&63))}return Pt(o,0,f)}var ht=function(t){var n=0;if(t)for(var e in t){var r=t[e].length;if(r>65535)throw"extra field too long";n+=r+4}return n},Dt=function(t,n,e,r,i,o,f,l){var c=r.length,s=e.extra,a=l&&l.length,u=ht(s);d(t,n,f!=null?33639248:67324752),n+=4,f!=null&&(t[n++]=20,t[n++]=e.os),t[n]=20,n+=2,t[n++]=e.flag<<1|(o==null&&8),t[n++]=i&&8,t[n++]=e.compression&255,t[n++]=e.compression>>8;var h=new Date(e.mtime==null?Date.now():e.mtime),g=h.getFullYear()-1980;if(g<0||g>119)throw"date not in range 1980-2099";if(d(t,n,g<<25|h.getMonth()+1<<21|h.getDate()<<16|h.getHours()<<11|h.getMinutes()<<5|h.getSeconds()>>>1),n+=4,o!=null&&(d(t,n,e.crc),d(t,n+4,o),d(t,n+8,e.size)),d(t,n+12,c),d(t,n+14,u),n+=16,f!=null&&(d(t,n,a),d(t,n+6,e.attrs),d(t,n+10,f),n+=14),t.set(r,n),n+=c,u)for(var w in s){var m=s[w],S=m.length;d(t,n,+w),d(t,n+2,S),t.set(m,n+4),n+=4+S}return a&&(t.set(l,n),n+=a),n},cn=function(t,n,e,r,i){d(t,n,101010256),d(t,n+8,e),d(t,n+10,e),d(t,n+12,r),d(t,n+16,i)};function Ft(t,n){n||(n={});var e={},r=[];It(t,"",e,n);var i=0,o=0;for(var f in e){var l=e[f],c=l[0],s=l[1],a=s.level==0?0:8,u=Q(f),h=u.length,g=s.comment,w=g&&Q(g),m=w&&w.length,S=ht(s.extra);if(h>65535)throw"filename too long";var I=a?un(c,s):c,T=I.length,G=sn();G.p(c),r.push(Zt(s,{size:c.length,crc:G.d(),c:I,f:u,m:w,u:h!=f.length||w&&g.length!=m,o:i,compression:a})),i+=30+h+S+T,o+=76+2*(h+S)+(m||0)+T}for(var A=new M(o+22),C=i,U=o-i,y=0;y<r.length;++y){var u=r[y];Dt(A,u.o,u,u.f,u.u,u.c.length);var p=30+u.f.length+ht(u.extra);A.set(u.c,u.o+p),Dt(A,i,u,u.f,u.u,u.c.length,u.o,u.m),i+=16+p+(u.m?u.m.length:0)}return cn(A,i,r.length,U,C),A}var et=class{async parse(n,e={ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:"horizontal"}}}){let r={},i="model.usda";r[i]=null;let o=jt();o+=gn(e);let f={},l={};n.traverseVisible(s=>{if(s.isMesh){let a=s.geometry,u=s.material;if(u.isMeshStandardMaterial){let h="geometries/Geometry_"+a.id+".usd";if(!(h in r)){let g=xn(a);r[h]=mn(g)}u.uuid in f||(f[u.uuid]=u),o+=yn(s,a,u)}else console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",s)}else s.isCamera&&(o+=Un(s))}),e.sceneExtra&&(o+=e.sceneExtra),o+=wn(),o+=Sn(f,l),r[i]=Q(o),o=null;for(let s in l){let a=l[s],u=s.split("_")[1],h=a.format===1023,g=vn(a.image,u,a.flipY),w=await new Promise(m=>g.toBlob(m,h?"image/png":"image/jpeg",.86));r[`textures/Texture_${s}.${h?"png":"jpg"}`]=new Uint8Array(await w.arrayBuffer())}let c=0;for(let s in r){let a=r[s],u=34+s.length;c+=u;let h=c&63;if(h!==4){let g=64-h,w=new Uint8Array(g);r[s]=[a,{extra:{12345:w}}]}c=a.length}return Ft(r,{level:0})}};function vn(t,n,e){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let r=1024/Math.max(t.width,t.height),i=document.createElement("canvas");i.width=t.width*Math.min(1,r),i.height=t.height*Math.min(1,r);let o=i.getContext("2d");if(e===!0&&(o.translate(0,i.height),o.scale(1,-1)),o.drawImage(t,0,0,i.width,i.height),n!==void 0){let f=parseInt(n,16),l=(f>>16&255)/255,c=(f>>8&255)/255,s=(f&255)/255,a=o.getImageData(0,0,i.width,i.height),u=a.data;for(let h=0;h<u.length;h+=4)u[h+0]=u[h+0]*l,u[h+1]=u[h+1]*c,u[h+2]=u[h+2]*s;o.putImageData(a,0,0)}return i}}var z=7;function jt(){return`#usda 1.0
(
    customLayerData = {
        string creator = "Three.js USDZExporter"
    }
    metersPerUnit = 1
    upAxis = "Y"
)

`}function gn(t){return`def Xform "Root"
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
        token preliminary:anchoring:type = "${t.ar.anchoring.type}"
        token preliminary:planeAnchoring:alignment = "${t.ar.planeAnchoring.alignment}"

`}function wn(){return`
        }
    }
}

`}function mn(t){let n=jt();return n+=t,Q(n)}function yn(t,n,e){let r="Object_"+t.id,i=Lt(t.matrixWorld);return t.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",t),`def Xform "${r}" (
    prepend references = @./geometries/Geometry_${n.id}.usd@</Geometry>
)
{
    matrix4d xformOp:transform = ${i}
    uniform token[] xformOpOrder = ["xformOp:transform"]

    rel material:binding = </Materials/Material_${e.id}>
}

`}function Lt(t){let n=t.elements;return`( ${rt(n,0)}, ${rt(n,4)}, ${rt(n,8)}, ${rt(n,12)} )`}function rt(t,n){return`(${t[n+0]}, ${t[n+1]}, ${t[n+2]}, ${t[n+3]})`}function xn(t){return`
def "Geometry"
{
  ${dn(t)}
}
`}function dn(t){let n="Geometry",e=t.attributes,r=e.position.count;return`
    def Mesh "${n}"
    {
        int[] faceVertexCounts = [${$n(t)}]
        int[] faceVertexIndices = [${Mn(t)}]
        normal3f[] normals = [${Rt(e.normal,r)}] (
            interpolation = "vertex"
        )
        point3f[] points = [${Rt(e.position,r)}]
        float2[] primvars:st = [${zn(e.uv,r)}] (
            interpolation = "vertex"
        )
        uniform token subdivisionScheme = "none"
    }
`}function $n(t){let n=t.index!==null?t.index.count:t.attributes.position.count;return Array(n/3).fill(3).join(", ")}function Mn(t){let n=t.index,e=[];if(n!==null)for(let r=0;r<n.count;r++)e.push(n.getX(r));else{let r=t.attributes.position.count;for(let i=0;i<r;i++)e.push(i)}return e.join(", ")}function Rt(t,n){if(t===void 0)return console.warn("USDZExporter: Normals missing."),Array(n).fill("(0, 0, 0)").join(", ");let e=[];for(let r=0;r<t.count;r++){let i=t.getX(r),o=t.getY(r),f=t.getZ(r);e.push(`(${i.toPrecision(z)}, ${o.toPrecision(z)}, ${f.toPrecision(z)})`)}return e.join(", ")}function zn(t,n){if(t===void 0)return console.warn("USDZExporter: UVs missing."),Array(n).fill("(0, 0)").join(", ");let e=[];for(let r=0;r<t.count;r++){let i=t.getX(r),o=t.getY(r);e.push(`(${i.toPrecision(z)}, ${1-o.toPrecision(z)})`)}return e.join(", ")}function Sn(t,n){let e=[];for(let r in t){let i=t[r];e.push(An(i,n))}return`def "Materials"
{
${e.join("")}
}

`}function An(t,n){let e="            ",r=[],i=[];function o(f,l,c){let s=f.id+(c?"_"+c.getHexString():""),a=f.format===1023;return n[s]=f,`
        def Shader "Transform2d_${l}" (
            sdrMetadata = {
                string role = "math"
            }
        )
        {
            uniform token info:id = "UsdTransform2d"
            float2 inputs:in.connect = </Materials/Material_${t.id}/uvReader_st.outputs:result>
            float2 inputs:scale = ${Gt(f.repeat)}
            float2 inputs:translation = ${Gt(f.offset)}
            float2 outputs:result
        }

        def Shader "Texture_${f.id}_${l}"
        {
            uniform token info:id = "UsdUVTexture"
            asset inputs:file = @textures/Texture_${s}.${a?"png":"jpg"}@
            float2 inputs:st.connect = </Materials/Material_${t.id}/Transform2d_${l}.outputs:result>
            token inputs:wrapS = "repeat"
            token inputs:wrapT = "repeat"
            float outputs:r
            float outputs:g
            float outputs:b
            float3 outputs:rgb
            ${t.transparent||t.alphaTest>0?"float outputs:a":""}
        }`}return t.side===Ht.DoubleSide&&console.warn("THREE.USDZExporter: USDZ does not support double sided materials",t),t.map!==null?(r.push(`${e}color3f inputs:diffuseColor.connect = </Materials/Material_${t.id}/Texture_${t.map.id}_diffuse.outputs:rgb>`),t.transparent?r.push(`${e}float inputs:opacity.connect = </Materials/Material_${t.id}/Texture_${t.map.id}_diffuse.outputs:a>`):t.alphaTest>0&&(r.push(`${e}float inputs:opacity.connect = </Materials/Material_${t.id}/Texture_${t.map.id}_diffuse.outputs:a>`),r.push(`${e}float inputs:opacityThreshold = ${t.alphaTest}`)),i.push(o(t.map,"diffuse",t.color))):r.push(`${e}color3f inputs:diffuseColor = ${Bt(t.color)}`),t.emissiveMap!==null?(r.push(`${e}color3f inputs:emissiveColor.connect = </Materials/Material_${t.id}/Texture_${t.emissiveMap.id}_emissive.outputs:rgb>`),i.push(o(t.emissiveMap,"emissive"))):t.emissive.getHex()>0&&r.push(`${e}color3f inputs:emissiveColor = ${Bt(t.emissive)}`),t.normalMap!==null&&(r.push(`${e}normal3f inputs:normal.connect = </Materials/Material_${t.id}/Texture_${t.normalMap.id}_normal.outputs:rgb>`),i.push(o(t.normalMap,"normal"))),t.aoMap!==null&&(r.push(`${e}float inputs:occlusion.connect = </Materials/Material_${t.id}/Texture_${t.aoMap.id}_occlusion.outputs:r>`),i.push(o(t.aoMap,"occlusion"))),t.roughnessMap!==null&&t.roughness===1?(r.push(`${e}float inputs:roughness.connect = </Materials/Material_${t.id}/Texture_${t.roughnessMap.id}_roughness.outputs:g>`),i.push(o(t.roughnessMap,"roughness"))):r.push(`${e}float inputs:roughness = ${t.roughness}`),t.metalnessMap!==null&&t.metalness===1?(r.push(`${e}float inputs:metallic.connect = </Materials/Material_${t.id}/Texture_${t.metalnessMap.id}_metallic.outputs:b>`),i.push(o(t.metalnessMap,"metallic"))):r.push(`${e}float inputs:metallic = ${t.metalness}`),t.alphaMap!==null?(r.push(`${e}float inputs:opacity.connect = </Materials/Material_${t.id}/Texture_${t.alphaMap.id}_opacity.outputs:r>`),r.push(`${e}float inputs:opacityThreshold = 0.0001`),i.push(o(t.alphaMap,"opacity"))):r.push(`${e}float inputs:opacity = ${t.opacity}`),t.isMeshPhysicalMaterial&&(r.push(`${e}float inputs:clearcoat = ${t.clearcoat}`),r.push(`${e}float inputs:clearcoatRoughness = ${t.clearcoatRoughness}`),r.push(`${e}float inputs:ior = ${t.ior}`)),`
    def Material "Material_${t.id}"
    {
        def Shader "PreviewSurface"
        {
            uniform token info:id = "UsdPreviewSurface"
${r.join(`
`)}
            int inputs:useSpecularWorkflow = 0
            token outputs:surface
        }

        token outputs:surface.connect = </Materials/Material_${t.id}/PreviewSurface.outputs:surface>
        token inputs:frame:stPrimvarName = "st"

        def Shader "uvReader_st"
        {
            uniform token info:id = "UsdPrimvarReader_float2"
            token inputs:varname.connect = </Materials/Material_${t.id}.inputs:frame:stPrimvarName>
            float2 inputs:fallback = (0.0, 0.0)
            float2 outputs:result
        }

${i.join(`
`)}

    }
`}function Bt(t){return`(${t.r}, ${t.g}, ${t.b})`}function Gt(t){return`(${t.x}, ${t.y})`}function Un(t){let n=t.name?t.name:"Camera_"+t.id,e=Lt(t.matrixWorld);return t.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",t),t.isOrthographicCamera?`def Camera "${n}"
		{
			matrix4d xformOp:transform = ${e}
			uniform token[] xformOpOrder = ["xformOp:transform"]
	
			float2 clippingRange = (${t.near.toPrecision(z)}, ${t.far.toPrecision(z)})
			float horizontalAperture = ${((Math.abs(t.left)+Math.abs(t.right))*10).toPrecision(z)}
			float verticalAperture = ${((Math.abs(t.top)+Math.abs(t.bottom))*10).toPrecision(z)}
			token projection = "orthographic"
		}
	
	`:`def Camera "${n}"
		{
			matrix4d xformOp:transform = ${e}
			uniform token[] xformOpOrder = ["xformOp:transform"]
	
			float2 clippingRange = (${t.near.toPrecision(z)}, ${t.far.toPrecision(z)})
			float focalLength = ${t.getFocalLength().toPrecision(z)}
			float focusDistance = ${t.focus.toPrecision(z)}
			float horizontalAperture = ${t.getFilmWidth().toPrecision(z)}
			token projection = "perspective"
			float verticalAperture = ${t.getFilmHeight().toPrecision(z)}
		}
	
	`}window.USDZExporter=et;})();
/*! Bundled license information:

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
