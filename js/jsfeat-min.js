var jsfeat=jsfeat||{REVISION:"ALPHA"};self.Int32Array=self.Int32Array||Array;self.Uint32Array=self.Uint32Array||Array;self.Uint8Array=self.Uint8Array||Array;self.Float32Array=self.Float32Array||Array;(function(k){var g=256,e=512,d=1024,o=2048,n=4096;var r=1,h=2,a=3,i=4;var q=new Int32Array([-1,1,4,-1,4,-1,-1,-1,8,-1,-1,-1,-1,-1,-1,-1,8]);var p=(function(){return function(s){return(s&65280)}})();var f=(function(){return function(s){return(s&255)}})();var b=(function(){return function(s){return q[(s&65280)>>8]}})();var m=(function(){function s(t){this.size=t|0;this.buffer=new ArrayBuffer(t);this.u8=new Uint8Array(this.buffer);this.i32=new Int32Array(this.buffer);this.f32=new Float32Array(this.buffer)}return s})();var j=(function(){function s(v,t,u){this.type=p(u)|0;this.channel=f(u)|0;this.cols=v|0;this.rows=t|0;this.buffer=new m((v*b(u)*f(u))*t);this.data=this.type&g?this.buffer.u8:(this.type&e?this.buffer.i32:this.buffer.f32)}s.prototype.set_data_type=function(t){this.type=p(t)|0;this.channel=f(t)|0;delete this.data;delete this.buffer;this.buffer=new m((this.cols*b(t)*f(t))*this.rows);this.data=this.type&g?this.buffer.u8:(this.type&e?this.buffer.i32:this.buffer.f32)};return s})();var l=(function(){function s(t){this.levels=t|0;this.data=new Array(t);this.pyrdown=jsfeat.imgproc.pyrdown}s.prototype.allocate=function(t,v,w){var u=this.levels;while(--u>=0){this.data[u]=new j(t>>u,v>>u,w)}};s.prototype.build=function(w,v){if(typeof v==="undefined"){v=true}var y=2,u=w,t=this.data[0];if(!v){var x=w.cols*w.rows;while(--x>=0){t.data[x]=w.data[x]}}t=this.data[1];this.pyrdown(u,t);for(;y<this.levels;++y){u=t;t=this.data[y];this.pyrdown(u,t)}};return s})();var c=(function(){function s(t,w,u,v){if(typeof t==="undefined"){t=0}if(typeof w==="undefined"){w=0}if(typeof u==="undefined"){u=0}if(typeof v==="undefined"){v=0}this.x=t;this.y=w;this.score=u;this.level=v}return s})();k.U8_t=g;k.S32_t=e;k.F32_t=d;k.S64_t=o;k.F64_t=n;k.C1_t=r;k.C2_t=h;k.C3_t=a;k.C4_t=i;k.get_data_type=p;k.get_channel=f;k.get_data_type_size=b;k.data_t=m;k.matrix_t=j;k.pyramid_t=l;k.point2d_t=c})(jsfeat);(function(b){var a=(function(){var f=(function(){function g(h){this.next=null;this.size=h|0;this.buffer=new ArrayBuffer(h);this.u8=new Uint8Array(this.buffer);this.i32=new Int32Array(this.buffer);this.f32=new Float32Array(this.buffer)}return g})();var e,c;var d=0;return{allocate:function(g,k){e=c=new f(k);for(var h=0;h<g;++h){var j=new f(k);c=c.next=j;d++}},get_buffer:function(g){var h=e;e=e.next;d--;if(g>h.size){h.buffer=new ArrayBuffer(g);h.u8=new Uint8Array(h.buffer);h.i32=new Int32Array(h.buffer);h.f32=new Float32Array(h.buffer);h.size=g}return h},put_buffer:function(g){c=c.next=g;d++}}})();b.cache=a;a.allocate(30,640*4)})(jsfeat);(function(b){var a=(function(){var c=new Int32Array(48*2);return{get_gaussian_kernel:function(p,m,e,l){var f=0,j=0,o=0,n=0,d=0;var g=0;var h=jsfeat.cache.get_buffer(p<<2);var k=h.f32;if((p&1)==1&&p<=7&&m<=0){switch(p>>1){case 0:k[0]=1;g=1;break;case 1:k[0]=0.25,k[1]=0.5,k[2]=0.25;g=0.25+0.5+0.25;break;case 2:k[0]=0.0625,k[1]=0.25,k[2]=0.375,k[3]=0.25,k[4]=0.0625;g=0.0625+0.25+0.375+0.25+0.0625;break;case 3:k[0]=0.03125,k[1]=0.109375,k[2]=0.21875,k[3]=0.28125,k[4]=0.21875,k[5]=0.109375,k[6]=0.03125;g=0.03125+0.109375+0.21875+0.28125+0.21875+0.109375+0.03125;break}}else{n=m>0?m:((p-1)*0.5-1)*0.3+0.8;d=-0.5/(n*n);for(;f<p;++f){j=f-(p-1)*0.5;o=Math.exp(d*j*j);k[f]=o;g+=o}}if(l&jsfeat.U8_t){g=256/g;for(f=0;f<p;++f){e[f]=(k[f]*g+0.5)|0}}else{g=1/g;for(f=0;f<p;++f){e[f]=k[f]*g}}jsfeat.cache.put_buffer(h)},qsort:function(o,J,s,u){var D=7;var v,r,q,p;var C=0,j=0,G=0,B=0,z=0,A=0,e=0,y=0,E=0;var x=0,w=0,h=0,g=0,l=0,I=0,H=0,F=0,f=0;var k=c;if((s-J+1)<=1){return}k[0]=J;k[1]=s;while(C>=0){j=k[C<<1];G=k[(C<<1)+1];C--;for(;;){z=(G-j)+1;if(z<=D){for(e=j+1;e<=G;e++){for(y=e;y>j&&u(o[y],o[y-1]);y--){v=o[y];o[y]=o[y-1];o[y-1]=v}}break}else{f=0;x=j;h=G;l=j+(z>>1);if(z>40){E=z>>3;I=j,H=j+E,F=j+(E<<1);r=o[I],q=o[H],p=o[F];j=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));I=l-E,H=l,F=l+E;r=o[I],q=o[H],p=o[F];l=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));I=G-(E<<1),H=G-E,F=G;r=o[I],q=o[H],p=o[F];G=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F))}I=j,H=l,F=G;r=o[I],q=o[H],p=o[F];l=u(r,q)?(u(q,p)?H:(u(r,p)?F:I)):(u(p,q)?H:(u(r,p)?I:F));if(l!=x){v=o[l];o[l]=o[x];o[x]=v;l=x}j=w=x+1;G=g=h;r=o[l];for(;;){while(j<=G&&!u(r,o[j])){if(!u(o[j],r)){if(j>w){v=o[w];o[w]=o[j];o[j]=v}f=1;w++}j++}while(j<=G&&!u(o[G],r)){if(!u(r,o[G])){if(G<g){v=o[g];o[g]=o[G];o[G]=v}f=1;g--}G--}if(j>G){break}v=o[j];o[j]=o[G];o[G]=v;f=1;j++;G--}if(f==0){j=x,G=h;for(e=j+1;e<=G;e++){for(y=e;y>j&&u(o[y],o[y-1]);y--){v=o[y];o[y]=o[y-1];o[y-1]=v}}break}z=Math.min((w-x),(j-w));A=(j-z)|0;for(B=0;B<z;++B,++A){v=o[x+B];o[x+B]=o[A];o[A]=v}z=Math.min((h-g),(g-G));A=(h-z+1)|0;for(B=0;B<z;++B,++A){v=o[j+B];o[j+B]=o[A];o[A]=v}z=(j-w);A=(g-G);if(z>1){if(A>1){if(z>A){++C;k[C<<1]=x;k[(C<<1)+1]=x+z-1;j=h-A+1,G=h}else{++C;k[C<<1]=h-A+1;k[(C<<1)+1]=h;j=x,G=x+z-1}}else{j=x,G=x+z-1}}else{if(A>1){j=h-A+1,G=h}else{break}}}}}},median:function(k,d,i){var e;var f=0,j=0,g=0,h=(d+i)>>1;for(;;){if(i<=d){return k[h]}if(i==(d+1)){if(k[d]>k[i]){e=k[d];k[d]=k[i];k[i]=e}return k[h]}f=((d+i)>>1);if(k[f]>k[i]){e=k[f];k[f]=k[i];k[i]=e}if(k[d]>k[i]){e=k[d];k[d]=k[i];k[i]=e}if(k[f]>k[d]){e=k[f];k[f]=k[d];k[d]=e}j=(d+1);e=k[f];k[f]=k[j];k[j]=e;g=i;for(;;){do{++j}while(k[d]>k[j]);do{--g}while(k[g]>k[d]);if(g<j){break}e=k[j];k[j]=k[g];k[g]=e}e=k[d];k[d]=k[g];k[g]=e;if(g<=h){d=j}else{if(g>=h){i=(g-1)}}}return 0}}})();b.math=a})(jsfeat);(function(b){var a=(function(){return{affine_3point_transform:function(l,h,o,f,m,g,n,d,j,e,k,c,i){},perspective_4point_transform:function(B,w,ac,s,Z,v,ab,r,W,u,aa,p,U,t,Y,m,S){var J=w;var I=u;var H=ab;var G=J*I*H;var F=Y;var E=J*F;var D=I*E;var C=aa;var o=J*C;var l=v;var h=ac;var f=t;var d=h*f;var au=d*l;var T=f*l*C;var R=f*H;var O=f*C;var N=I*H;var M=F*I;var L=F*l;var K=C*l;var A=1/(R-O-N+M-L+K);var y=J*f;var x=h*l;var q=H*J;var n=F*q;var k=h*I;var g=d*C;var c=h*C*l;var V=H*F*I;var Q=F*h;var at=-(D-G+o*l-l*E-d*I+au-T+R*I)*A;var ar=(G-D-y*H+y*C+au-I*x+L*I-T)*A;var aq=J;var ap=(-C*E+n+k*H-d*H+g-c+L*C-V)*A;var ao=(-n+q*C-Q*I+g-c+Q*l+V-R*C)*A;var am=h;var ak=(-o+q+k-x+O-R-M+L)*A;var ai=(-E+o+d-k+L-K-R+N)*A;J=s;I=p;H=W;G=J*I*H;F=S;E=J*F;D=I*E;C=U;o=J*C;l=r;h=Z;f=m;d=h*f;au=d*l;T=f*l*C;R=f*H;O=f*C;N=I*H;M=F*I;L=F*l;K=C*l;A=1/(R-O-N+M-L+K);y=J*f;x=h*l;q=H*J;n=F*q;k=h*I;g=d*C;c=h*C*l;V=H*F*I;Q=F*h;var an=-(D-G+o*l-l*E-d*I+au-T+R*I)*A;var al=(G-D-y*H+y*C+au-I*x+L*I-T)*A;var aj=J;var ah=(-C*E+n+k*H-d*H+g-c+L*C-V)*A;var ag=(-n+q*C-Q*I+g-c+Q*l+V-R*C)*A;var af=h;var ae=(-o+q+k-x+O-R-M+L)*A;var ad=(-E+o+d-k+L-K-R+N)*A;I=ao-ai*am;H=at*ao;G=at*am;E=ap*ar;D=aq*ap;o=ar*ak;var j=aq*ak;f=1/(H-G*ai-E+D*ai+o*am-j*ao);au=-ap+am*ak;var P=-ap*ai+ao*ak;K=-ar+aq*ai;var z=at-j;x=at*ai-o;q=-ar*am+aq*ao;var i=G-D;var e=H-E;c=I*f;var av=K*f;var X=q*f;B[0]=an*c+al*(au*f)-aj*(P*f);B[1]=an*av+al*(z*f)-aj*(x*f);B[2]=-an*X-al*(i*f)+aj*(e*f);B[3]=ah*c+ag*(au*f)-af*(P*f);B[4]=ah*av+ag*(z*f)-af*(x*f);B[5]=-ah*X-ag*(i*f)+af*(e*f);B[6]=ae*c+ad*(au*f)-P*f;B[7]=ae*av+ad*(z*f)-x*f;B[8]=-ae*X-ad*(i*f)+e*f},invert_affine_transform:function(c,k){var i=c[0],h=c[1],g=c[2];var f=c[3],e=c[4],d=c[5];var j=1/(i*e-h*f);k[0]=j*e;k[1]=j*-h;k[2]=j*(h*d-g*e);k[3]=j*-f;k[4]=j*i;k[5]=j*(g*f-i*d)},invert_perspective_transform:function(c,k){var i=c[0],h=c[1],g=c[2];var f=c[3],e=c[4],d=c[5];var n=c[6],m=c[7],l=c[8];var j=1/(i*(e*l-d*m)-h*(f*l-d*n)+g*(f*m-e*n));k[0]=j*(e*l-d*m);k[1]=j*(g*m-h*l);k[2]=j*(h*d-g*e);k[3]=j*(d*n-f*l);k[4]=j*(i*l-g*n);k[5]=j*(g*f-i*d);k[6]=j*(f*m-e*n);k[7]=j*(h*n-i*m);k[8]=j*(i*e-h*f)}}})();b.transform=a})(jsfeat);(function(b){var a=(function(){var c=function(q,R,O,p){var z=[],r=0;var y=q.channel,v=q.cols,J=q.rows;var P=q.data,m=R.data;var I=v/O,H=J/p;var n=(I*H*65536)|0;var x=0,u=0,C=0,A=0,t=0,s=0,G=0,F=0,D=0,B=0;var Q=0,N=0,K=0,o=0,M=0,E=0;var l=jsfeat.cache.get_buffer((O*y)<<2);var g=jsfeat.cache.get_buffer((O*y)<<2);var L=l.i32;var j=g.i32;for(;x<O;x++){D=x*I,B=D+I;t=(D+1-0.000001)|0,s=B|0;t=Math.min(t,v-1);s=Math.min(s,v-1);if(t>D){z[r++]={si:((t-1)*y)|0,di:(x*y)|0,alpha:((t-D)*256)|0}}for(C=t;C<s;C++){z[r++]={si:(C*y)|0,di:(x*y)|0,alpha:256}}if(B-s>0.001){z[r++]={si:(s*y)|0,di:(x*y)|0,alpha:((B-s)*256)|0}}}for(x=0;x<O*y;x++){L[x]=j[x]=0}u=0;for(A=0;A<J;A++){Q=v*A;for(F=0;F<r;F++){K=z[F].di;o=z[F].alpha;t=z[F].si;for(G=0;G<y;G++){L[K+G]+=P[Q+t+G]*o}}if((u+1)*H<=A+1||A==J-1){M=(Math.max(A+1-(u+1)*H,0)*256)|0;E=256-M;N=O*u;if(M<=0){for(x=0;x<O*y;x++){m[N+x]=Math.min(Math.max((j[x]+L[x]*256)/n,0),255);j[x]=L[x]=0}}else{for(x=0;x<O*y;x++){m[N+x]=Math.min(Math.max((j[x]+L[x]*E)/n,0),255);j[x]=L[x]*M;L[x]=0}}u++}else{for(x=0;x<O*y;x++){j[x]+=L[x]*256;L[x]=0}}}jsfeat.cache.put_buffer(g);jsfeat.cache.put_buffer(l)};var f=function(p,R,N,o){var y=[],q=0;var x=p.channel,u=p.cols,I=p.rows;var O=p.data,m=R.data;var H=u/N,G=I/o;var Q=1/(H*G);var v=0,t=0,B=0,z=0,s=0,r=0,F=0,E=0,C=0,A=0;var P=0,M=0,J=0,n=0,L=0,D=0;var l=jsfeat.cache.get_buffer((N*x)<<2);var g=jsfeat.cache.get_buffer((N*x)<<2);var K=l.f32;var j=g.f32;for(;v<N;v++){C=v*H,A=C+H;s=(C+1-0.000001)|0,r=A|0;s=Math.min(s,u-1);r=Math.min(r,u-1);if(s>C){y[q++]={si:((s-1)*x)|0,di:(v*x)|0,alpha:(s-C)*Q}}for(B=s;B<r;B++){y[q++]={si:(B*x)|0,di:(v*x)|0,alpha:Q}}if(A-r>0.001){y[q++]={si:(r*x)|0,di:(v*x)|0,alpha:(A-r)*Q}}}for(v=0;v<N*x;v++){K[v]=j[v]=0}t=0;for(z=0;z<I;z++){P=u*z;for(E=0;E<q;E++){J=y[E].di;n=y[E].alpha;s=y[E].si;for(F=0;F<x;F++){K[J+F]+=O[P+s+F]*n}}if((t+1)*G<=z+1||z==I-1){L=Math.max(z+1-(t+1)*G,0);D=1-L;M=N*t;if(Math.abs(L)<0.001){for(v=0;v<N*x;v++){m[M+v]=j[v]+K[v];j[v]=K[v]=0}}else{for(v=0;v<N*x;v++){m[M+v]=j[v]+K[v]*D;j[v]=K[v]*L;K[v]=0}}t++}else{for(v=0;v<N*x;v++){j[v]+=K[v];K[v]=0}}}jsfeat.cache.put_buffer(g);jsfeat.cache.put_buffer(l)};var e=function(D,F,m,s,B,t,g,n){var z=0,y=0,x=0,A=0,u=0,l=0,G=0,E=0,C=0,v=t[0],r=0;var q=s<<1,p=s*3,o=s<<2;for(;z<B;++z){l=F[A];for(y=0;y<n;++y){D[y]=l}for(y=0;y<=s-2;y+=2){D[y+n]=F[A+y];D[y+n+1]=F[A+y+1]}for(;y<s;++y){D[y+n]=F[A+y]}l=F[A+s-1];for(y=s;y<n+s;++y){D[y+n]=l}for(y=0;y<=s-4;y+=4){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u+y]=l>>8;m[u+y+1]=G>>8;m[u+y+2]=E>>8;m[u+y+3]=C>>8}for(;y<s;++y){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u+y]=l>>8}A+=s;u+=s}for(z=0;z<s;++z){l=m[z];for(y=0;y<n;++y){D[y]=l}x=z;for(y=0;y<=B-2;y+=2,x+=q){D[y+n]=m[x];D[y+n+1]=m[x+s]}for(;y<B;++y,x+=s){D[y+n]=m[x]}l=m[(B-1)*s+z];for(y=B;y<n+B;++y){D[y+n]=l}u=z;for(y=0;y<=B-4;y+=4,u+=o){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u]=l>>8;m[u+s]=G>>8;m[u+q]=E>>8;m[u+p]=C>>8}for(;y<B;++y,u+=s){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u]=l>>8}}};var d=function(D,F,m,s,B,t,g,n){var z=0,y=0,x=0,A=0,u=0,l=0,G=0,E=0,C=0,v=t[0],r=0;var q=s<<1,p=s*3,o=s<<2;for(;z<B;++z){l=F[A];for(y=0;y<n;++y){D[y]=l}for(y=0;y<=s-2;y+=2){D[y+n]=F[A+y];D[y+n+1]=F[A+y+1]}for(;y<s;++y){D[y+n]=F[A+y]}l=F[A+s-1];for(y=s;y<n+s;++y){D[y+n]=l}for(y=0;y<=s-4;y+=4){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u+y]=l;m[u+y+1]=G;m[u+y+2]=E;m[u+y+3]=C}for(;y<s;++y){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u+y]=l}A+=s;u+=s}for(z=0;z<s;++z){l=m[z];for(y=0;y<n;++y){D[y]=l}x=z;for(y=0;y<=B-2;y+=2,x+=q){D[y+n]=m[x];D[y+n+1]=m[x+s]}for(;y<B;++y,x+=s){D[y+n]=m[x]}l=m[(B-1)*s+z];for(y=B;y<n+B;++y){D[y+n]=l}u=z;for(y=0;y<=B-4;y+=4,u+=o){l=D[y]*v,G=D[y+1]*v,E=D[y+2]*v,C=D[y+3]*v;for(x=1;x<g;++x){r=t[x];l+=D[x+y]*r;G+=D[x+y+1]*r;E+=D[x+y+2]*r;C+=D[x+y+3]*r}m[u]=l;m[u+s]=G;m[u+q]=E;m[u+p]=C}for(;y<B;++y,u+=s){l=D[y]*v;for(x=1;x<g;++x){l+=D[x+y]*t[x]}m[u]=l}}};return{grayscale:function(g,p){var k=g.length|0,q=(k-16)|0;var m=0;var o=4899,h=9617,l=1868;for(var n=0;n<=q;n+=16,m+=4){p[m]=(g[n]*o+g[n+1]*h+g[n+2]*l+8192)>>14;p[m+1]=(g[n+4]*o+g[n+5]*h+g[n+6]*l+8192)>>14;p[m+2]=(g[n+8]*o+g[n+9]*h+g[n+10]*l+8192)>>14;p[m+3]=(g[n+12]*o+g[n+13]*h+g[n+14]*l+8192)>>14}for(;n<k;n+=4,++m){p[m]=(g[n]*o+g[n+1]*h+g[n+2]*l+8192)>>14}},resample:function(l,m,i,k){var j=l.rows,g=l.cols;if(j>k&&g>i){if(l.type&jsfeat.U8_t&&m.type&jsfeat.U8_t&&j*g/(k*i)<256){c(l,m,i,k)}else{f(l,m,i,k)}}},box_blur:function(q,H,A,G){if(typeof G==="undefined"){G=1}var p=(2*A+1)|0;var t=q.cols,D=q.rows;var n=q.type;var g,s=(t*p+t)|0,E=q.data,o=H.data;var v=(t*p)|0;var z=0,F=0;var C=0,B=0,l,k;var x,y;var u=0,r=(t*A-A)|0;var m=jsfeat.cache.get_buffer(s<<2);if((n&jsfeat.U8_t)||(n&jsfeat.S32_t)){g=m.i32}else{g=m.f32}for(;C<t;++C){g[v+C]=0}for(C=0;C<D;++C){x=0;y=u;for(B=0;B<p-1;++B){x+=E[u+B]}for(;B<=t-2;B+=2){x+=E[u+B];g[z+B]=x;g[v+B]+=x;x-=E[y++];x+=E[u+B+1];g[z+B+1]=x;g[v+B+1]+=x;x-=E[y++]}for(;B<t;++B){x+=E[u+B];g[z+B]=x;g[v+B]+=x;x-=E[y++]}if(C>=p-1){for(B=p-1;B<=t-2;B+=2){l=g[v+B];k=g[v+B+1];o[r+B]=l*G;o[r+B+1]=k*G;g[v+B]=l-g[F+B];g[v+B+1]=k-g[F+B+1]}for(;B<t;++B){l=g[v+B];o[r+B]=l*G;g[v+B]=l-g[F+B]}r+=t;F+=t;F=(F<v)*F}u+=t;z+=t;z=(z<v)*z}jsfeat.cache.put_buffer(m)},gaussian_blur:function(g,s,r,v){if(typeof v==="undefined"){v=0}if(typeof r==="undefined"){r=0}r=r==0?(Math.max(1,(4*v+1-1e-8))*2+1)|0:r;var x=r>>1;var t=g.cols,p=g.rows;var u=g.type,n=u&jsfeat.U8_t;var m=g.data,j=s.data;var k,i,q=(r+Math.max(p,t))|0;var l=jsfeat.cache.get_buffer(q<<2);var o=jsfeat.cache.get_buffer(r<<2);if(n){k=l.u8;i=o.i32}else{if(u&jsfeat.S32_t){k=l.i32;i=o.f32}else{k=l.f32;i=o.f32}}jsfeat.math.get_gaussian_kernel(r,v,i,u);if(n){e(k,m,j,t,p,i,r,x)}else{d(k,m,j,t,p,i,r,x)}jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(o)},pyrdown:function(i,o){var r=i.cols,m=i.rows;var l=r>>1,n=m>>1;var q=0,p=0,g=0,t=0,s=0;var k=i.data,j=o.data;for(p=0;p<n;++p){t=g;for(q=0;q<=l-2;q+=2,s+=2,t+=4){j[s]=(k[t]+k[t+1]+k[t+r]+k[t+r+1]+2)>>2;j[s+1]=(k[t+2]+k[t+3]+k[t+r+2]+k[t+r+3]+2)>>2}for(;q<l;++q,++s,t+=2){j[s]=(k[t]+k[t+1]+k[t+r]+k[t+r+1]+2)>>2}g+=r<<1}},scharr_derivatives:function(i,F){var o=i.cols,r=i.rows;var G=o<<1,n=0,l=0,t=0,D,C,B,A,z,v;var u=0,s=0,q=0,g=0;var m,k;var E=i.data;var j=jsfeat.cache.get_buffer((o+2)<<2);var p=jsfeat.cache.get_buffer((o+2)<<2);if(i.type&jsfeat.U8_t||i.type&jsfeat.S32_t){m=j.i32;k=p.i32}else{m=j.f32;k=p.f32}for(;l<r;++l,s+=o){u=((l>0?l-1:1)*o)|0;q=((l<r-1?l+1:r-2)*o)|0;g=(l*G)|0;for(n=0,t=1;n<=o-2;n+=2,t+=2){D=E[u+n],C=E[q+n];m[t]=((D+C)*3+(E[s+n])*10);k[t]=(C-D);D=E[u+n+1],C=E[q+n+1];m[t+1]=((D+C)*3+(E[s+n+1])*10);k[t+1]=(C-D)}for(;n<o;++n,++t){D=E[u+n],C=E[q+n];m[t]=((D+C)*3+(E[s+n])*10);k[t]=(C-D)}n=(o+1)|0;m[0]=m[1];m[n]=m[o];k[0]=k[1];k[n]=k[o];for(n=0;n<=o-4;n+=4){D=k[n+2],C=k[n+1],B=k[n+3],A=k[n+4],z=m[n+2],v=m[n+3];F[g++]=(z-m[n]);F[g++]=((D+k[n])*3+C*10);F[g++]=(v-m[n+1]);F[g++]=((B+C)*3+D*10);F[g++]=((m[n+4]-z));F[g++]=(((A+D)*3+B*10));F[g++]=((m[n+5]-v));F[g++]=(((k[n+5]+B)*3+A*10))}for(;n<o;++n){F[g++]=((m[n+2]-m[n]));F[g++]=(((k[n+2]+k[n])*3+k[n+1]*10))}}jsfeat.cache.put_buffer(j);jsfeat.cache.put_buffer(p)},sobel_derivatives:function(i,F){var o=i.cols,r=i.rows;var G=o<<1,n=0,l=0,t=0,D,C,B,A,z,v;var u=0,s=0,q=0,g=0;var m,k;var E=i.data;var j=jsfeat.cache.get_buffer((o+2)<<2);var p=jsfeat.cache.get_buffer((o+2)<<2);if(i.type&jsfeat.U8_t||i.type&jsfeat.S32_t){m=j.i32;k=p.i32}else{m=j.f32;k=p.f32}for(;l<r;++l,s+=o){u=((l>0?l-1:1)*o)|0;q=((l<r-1?l+1:r-2)*o)|0;g=(l*G)|0;for(n=0,t=1;n<=o-2;n+=2,t+=2){D=E[u+n],C=E[q+n];m[t]=((D+C)+(E[s+n]*2));k[t]=(C-D);D=E[u+n+1],C=E[q+n+1];m[t+1]=((D+C)+(E[s+n+1]*2));k[t+1]=(C-D)}for(;n<o;++n,++t){D=E[u+n],C=E[q+n];m[t]=((D+C)+(E[s+n]*2));k[t]=(C-D)}n=(o+1)|0;m[0]=m[1];m[n]=m[o];k[0]=k[1];k[n]=k[o];for(n=0;n<=o-4;n+=4){D=k[n+2],C=k[n+1],B=k[n+3],A=k[n+4],z=m[n+2],v=m[n+3];F[g++]=(z-m[n]);F[g++]=(D+k[n]+C*2);F[g++]=(v-m[n+1]);F[g++]=(B+C+D*2);F[g++]=(m[n+4]-z);F[g++]=(A+D+B*2);F[g++]=(m[n+5]-v);F[g++]=(k[n+5]+B+A*2)}for(;n<o;++n){F[g++]=(m[n+2]-m[n]);F[g++]=(k[n+2]+k[n]+k[n+1]*2)}}jsfeat.cache.put_buffer(j);jsfeat.cache.put_buffer(p)},compute_integral_image:function(g,l,y,u){var t=g.cols,w=g.rows,o=g.data;var r=t+1;var B,z,h,x,q=0,n=0,A,m;if(l&&y){for(;q<r;++q){l[q]=0,y[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){B=z=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){A=o[m];B+=A,z+=A*A;l[h]=l[x]+B;y[h]=y[x]+z;A=o[m+1];B+=A,z+=A*A;l[h+1]=l[x+1]+B;y[h+1]=y[x+1]+z}for(;n<t;++n,++m,++h,++x){A=o[m];B+=A,z+=A*A;l[h]=l[x]+B;y[h]=y[x]+z}}}else{if(l){for(;q<r;++q){l[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){B=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){B+=o[m];l[h]=l[x]+B;B+=o[m+1];l[h+1]=l[x+1]+B}for(;n<t;++n,++m,++h,++x){B+=o[m];l[h]=l[x]+B}}}else{if(y){for(;q<r;++q){y[q]=0}h=(r+1)|0,x=1;for(q=0,m=0;q<w;++q,++h,++x){z=0;for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){A=o[m];z+=A*A;y[h]=y[x]+z;A=o[m+1];z+=A*A;y[h+1]=y[x+1]+z}for(;n<t;++n,++m,++h,++x){A=o[m];z+=A*A;y[h]=y[x]+z}}}}}if(u){for(q=0;q<r;++q){u[q]=0}h=(r+1)|0,x=0;for(q=0,m=0;q<w;++q,++h,++x){for(n=0;n<=t-2;n+=2,m+=2,h+=2,x+=2){u[h]=o[m]+u[x];u[h+1]=o[m+1]+u[x+1]}for(;n<t;++n,++m,++h,++x){u[h]=o[m]+u[x]}}h=(r+t)|0,x=t;for(q=0;q<w;++q,h+=r,x+=r){u[h]+=u[x]}for(n=t-1;n>0;--n){h=n+w*r,x=h-r;for(q=w;q>0;--q,h-=r,x-=r){u[h]+=u[x]+u[x+1]}}}},equalize_histogram:function(j,r){var s=j.cols,q=j.rows,o=j.data,l=r.data,t=s*q;var p=0,n=0,k,g;var m=jsfeat.cache.get_buffer(256<<2);k=m.i32;for(;p<256;++p){k[p]=0}for(p=0;p<t;++p){++k[o[p]]}n=k[0];for(p=1;p<256;++p){n=k[p]+=n}g=255/t;for(p=0;p<t;++p){l[p]=(k[o[p]]*g+0.5)|0}jsfeat.cache.put_buffer(m)},canny:function(t,U,D,k){var B=t.cols,K=t.rows,R=t.data,n=U.data;var J=0,G=0,p=0,z=B<<1,Q=0,I=0,M=0,v=0,u=0,C=0;var g=0,T=0;var o=jsfeat.cache.get_buffer((K*z)<<2);var l=jsfeat.cache.get_buffer((3*(B+2))<<2);var m=jsfeat.cache.get_buffer(((K+2)*(B+2))<<2);var r=jsfeat.cache.get_buffer((K*B)<<2);var P=l.i32;var S=m.i32;var q=r.i32;var F=o.i32;var O=1,N=(B+2+1)|0,L=(2*(B+2)+1)|0,A=(B+2)|0,H=(A+1)|0,E=0;this.sobel_derivatives(t,F);if(D>k){J=D;D=k;k=J}J=(3*(B+2))|0;while(--J>=0){P[J]=0}J=((K+2)*(B+2))|0;while(--J>=0){S[J]=0}for(;G<B;++G,p+=2){v=F[p],u=F[p+1];P[N+G]=((v^(v>>31))-(v>>31))+((u^(u>>31))-(u>>31))}for(J=1;J<=K;++J,p+=z){if(J==K){G=L+B;while(--G>=L){P[G]=0}}else{for(G=0;G<B;G++){v=F[p+(G<<1)],u=F[p+(G<<1)+1];P[L+G]=((v^(v>>31))-(v>>31))+((u^(u>>31))-(u>>31))}}Q=(p-z)|0;S[H-1]=0;I=0;for(G=0;G<B;++G,Q+=2){M=P[N+G];if(M>D){v=F[Q];u=F[Q+1];C=v^u;v=((v^(v>>31))-(v>>31))|0;u=((u^(u>>31))-(u>>31))|0;g=v*13573;T=g+((v+v)<<15);u<<=15;if(u<g){if(M>P[N+G-1]&&M>=P[N+G+1]){if(M>k&&!I&&S[H+G-A]!=2){S[H+G]=2;I=1;q[E++]=H+G}else{S[H+G]=1}continue}}else{if(u>T){if(M>P[O+G]&&M>=P[L+G]){if(M>k&&!I&&S[H+G-A]!=2){S[H+G]=2;I=1;q[E++]=H+G}else{S[H+G]=1}continue}}else{C=C<0?-1:1;if(M>P[O+G-C]&&M>P[L+G+C]){if(M>k&&!I&&S[H+G-A]!=2){S[H+G]=2;I=1;q[E++]=H+G}else{S[H+G]=1}continue}}}}S[H+G]=0;I=0}S[H+B]=0;H+=A;G=O;O=N;N=L;L=G}G=H-A-1;for(J=0;J<A;++J,++G){S[G]=0}while(E>0){H=q[--E];H-=A+1;if(S[H]==1){S[H]=2,q[E++]=H}H+=1;if(S[H]==1){S[H]=2,q[E++]=H}H+=1;if(S[H]==1){S[H]=2,q[E++]=H}H+=A;if(S[H]==1){S[H]=2,q[E++]=H}H-=2;if(S[H]==1){S[H]=2,q[E++]=H}H+=A;if(S[H]==1){S[H]=2,q[E++]=H}H+=1;if(S[H]==1){S[H]=2,q[E++]=H}H+=1;if(S[H]==1){S[H]=2,q[E++]=H}}H=A+1;O=0;for(J=0;J<K;++J,H+=A){for(G=0;G<B;++G){n[O++]=(S[H+G]==2)*255}}jsfeat.cache.put_buffer(o);jsfeat.cache.put_buffer(l);jsfeat.cache.put_buffer(m);jsfeat.cache.put_buffer(r)},warp_perspective:function(q,Q,u,P){if(typeof P==="undefined"){P=0}var C=q.cols,F=q.rows,o=Q.cols,D=Q.rows;var K=q.data,l=Q.data;var t=0,s=0,O=0,v=0,G=0,r=0,E=0,w=0,i=0,h=0,g=0,M=0,J=0,k=0,j=0;var B=u[0],A=u[1],z=u[2],N=u[3],L=u[4],I=u[5],p=u[6],n=u[7],m=u[8];for(var H=0;s<D;++s){w=A*s+z,i=L*s+I,h=n*s+m;for(t=0;t<o;++t,++H,w+=B,i+=N,h+=p){g=1/h;r=w*g,E=i*g;v=r|0,G=E|0;if(r>0&&E>0&&v<(C-1)&&G<(F-1)){M=Math.max(r-v,0);J=Math.max(E-G,0);O=C*G+v;k=K[O]+M*(K[O+1]-K[O]);j=K[O+C]+M*(K[O+C+1]-K[O+C]);l[H]=k+J*(j-k)}else{l[H]=P}}}},warp_affine:function(k,J,o,I){if(typeof I==="undefined"){I=0}var t=k.cols,w=k.rows,j=J.cols,u=J.rows;var D=k.data,i=J.data;var n=0,m=0,H=0,p=0,z=0,l=0,v=0,F=0,C=0,h=0,g=0;var s=o[0],r=o[1],q=o[2],G=o[3],E=o[4],B=o[5];for(var A=0;m<u;++m){l=r*m+q;v=E*m+B;for(n=0;n<j;++n,++A,l+=s,v+=G){p=l|0;z=v|0;if(l>0&&v>0&&p<(t-1)&&z<(w-1)){F=Math.max(l-p,0);C=Math.max(v-z,0);H=t*z+p;h=D[H]+F*(D[H+1]-D[H]);g=D[H+t]+F*(D[H+t+1]-D[H+t]);i[A]=h+C*(g-h)}else{i[A]=I}}}}}})();b.imgproc=a})(jsfeat);(function(a){var b=(function(){var m=new Int32Array([0,3,1,3,2,2,3,1,3,0,3,-1,2,-2,1,-3,0,-3,-1,-3,-2,-2,-3,-1,-3,0,-3,1,-2,2,-1,3]);var e=new Int32Array([0,2,1,2,2,1,2,0,2,-1,1,-2,0,-2,-1,-2,-2,-1,-2,0,-2,1,-1,2]);var c=new Int32Array([0,1,1,1,1,0,1,-1,0,-1,-1,-1,-1,0,-1,1]);var f=new Uint8Array(512);var k=new Int32Array(25);var i=new Int32Array(25);var l=function(o,q,r){var n=0;var p=r==16?m:(r==12?e:c);for(;n<r;++n){o[n]=p[n<<1]+p[(n<<1)+1]*q}for(;n<25;++n){o[n]=o[n-r]}},d=function(n,q,o,u,s){var t=13,r=0,z=n[q];var p=s,x=0,y=0,w=0;for(;r<t;++r){u[r]=z-n[q+o[r]]}for(r=0;r<8;r+=2){x=Math.min(u[r+1],u[r+2]);if(x<=p){continue}x=Math.min(x,u[r+3]);x=Math.min(x,u[r+4]);p=Math.max(p,Math.min(x,u[r]));p=Math.max(p,Math.min(x,u[r+5]))}y=-p;for(r=0;r<8;r+=2){w=Math.max(u[r+1],u[r+2]);w=Math.max(w,u[r+3]);if(w>=y){continue}w=Math.max(w,u[r+4]);y=Math.min(y,Math.max(w,u[r]));y=Math.min(y,Math.max(w,u[r+5]))}return -y-1},j=function(n,q,o,u,s){var t=19,r=0,z=n[q];var p=s,x=0,y=0,w=0;for(;r<t;++r){u[r]=z-n[q+o[r]]}for(r=0;r<12;r+=2){x=Math.min(u[r+1],u[r+2]);if(x<=p){continue}x=Math.min(x,u[r+3]);x=Math.min(x,u[r+4]);x=Math.min(x,u[r+5]);x=Math.min(x,u[r+6]);p=Math.max(p,Math.min(x,u[r]));p=Math.max(p,Math.min(x,u[r+7]))}y=-p;for(r=0;r<12;r+=2){w=Math.max(u[r+1],u[r+2]);w=Math.max(w,u[r+3]);w=Math.max(w,u[r+4]);if(w>=y){continue}w=Math.max(w,u[r+5]);w=Math.max(w,u[r+6]);y=Math.min(y,Math.max(w,u[r]));y=Math.min(y,Math.max(w,u[r+7]))}return -y-1},h=function(n,q,o,u,s){var t=25,r=0,z=n[q];var p=s,x=0,y=0,w=0;for(;r<t;++r){u[r]=z-n[q+o[r]]}for(r=0;r<16;r+=2){x=Math.min(u[r+1],u[r+2]);x=Math.min(x,u[r+3]);if(x<=p){continue}x=Math.min(x,u[r+4]);x=Math.min(x,u[r+5]);x=Math.min(x,u[r+6]);x=Math.min(x,u[r+7]);x=Math.min(x,u[r+8]);p=Math.max(p,Math.min(x,u[r]));p=Math.max(p,Math.min(x,u[r+9]))}y=-p;for(r=0;r<16;r+=2){w=Math.max(u[r+1],u[r+2]);w=Math.max(w,u[r+3]);w=Math.max(w,u[r+4]);w=Math.max(w,u[r+5]);if(w>=y){continue}w=Math.max(w,u[r+6]);w=Math.max(w,u[r+7]);w=Math.max(w,u[r+8]);y=Math.min(y,Math.max(w,u[r]));y=Math.min(y,Math.max(w,u[r+9]))}return -y-1};var g=20;return{set_threshold:function(n){g=Math.min(Math.max(n,0),255);for(var o=-255;o<=255;++o){f[(o+255)]=(o<-g?1:(o>g?2:0))}return g},detect:function(P,L,F,I){if(typeof I==="undefined"){I=16}else{if(I!=16&&I!=12&&I!=8){I=16}}if(typeof F==="undefined"){F=3}var C=(I>>1),y=(I+C+1)|0;var z=P.data,aa=P.cols,av=P.rows;var at=0,aq=0,ao=0,G=0,Z=0,au=0;var D=jsfeat.cache.get_buffer(3*aa);var R=jsfeat.cache.get_buffer(((aa+1)*3)<<2);var M=D.u8;var H=R.i32;var Q=k;var O=i;var A=Math.max(3,F);var ac=Math.min((av-2),(av-F));var B=Math.max(3,F);var ad=Math.min((aa-3),(aa-F));var ak=0,S=0,E;var T=I==16?h:(I==12?j:d);var J=f;var r=g;var ab=0,ar=0,ax=0,az=0,X=0,Y=0,ay=0,U=0,aw=0;var W=0,V=0,q=0;l(Q,aa,I);var ap=Q[0];var an=Q[1];var am=Q[2];var al=Q[3];var aj=Q[4];var ai=Q[5];var ah=Q[6];var ag=Q[7];var af=Q[8];var ae=Q[9];var u=Q[10];var t=Q[11];var s=Q[12];var p=Q[13];var o=Q[14];var n=Q[15];for(at=0;at<aa*3;++at){M[at]=0}for(at=A;at<ac;++at){ay=((at*aa)+B)|0;au=(at-3)%3;Y=(au*aa)|0;X=(au*(aa+1))|0;for(aq=0;aq<aa;++aq){M[Y+aq]=0}az=0;if(at<(ac-1)){aq=B;for(;aq<ad;++aq,++ay){ab=z[ay];ar=(-ab+255);ax=(J[ar+z[ay+ap]]|J[ar+z[ay+af]]);if(ax==0){continue}ax&=(J[ar+z[ay+am]]|J[ar+z[ay+u]]);ax&=(J[ar+z[ay+aj]]|J[ar+z[ay+s]]);ax&=(J[ar+z[ay+ah]]|J[ar+z[ay+o]]);if(ax==0){continue}ax&=(J[ar+z[ay+an]]|J[ar+z[ay+ae]]);ax&=(J[ar+z[ay+al]]|J[ar+z[ay+t]]);ax&=(J[ar+z[ay+ai]]|J[ar+z[ay+p]]);ax&=(J[ar+z[ay+ag]]|J[ar+z[ay+n]]);if(ax&1){G=(ab-r);ak=0;for(ao=0;ao<y;++ao){Z=z[(ay+Q[ao])];if(Z<G){++ak;if(ak>C){++az;H[X+az]=aq;M[Y+aq]=T(z,ay,Q,O,r);break}}else{ak=0}}}if(ax&2){G=(ab+r);ak=0;for(ao=0;ao<y;++ao){Z=z[(ay+Q[ao])];if(Z>G){++ak;if(ak>C){++az;H[X+az]=aq;M[Y+aq]=T(z,ay,Q,O,r);break}}else{ak=0}}}}}H[X+aa]=az;if(at==A){continue}au=(at-4+3)%3;U=(au*aa)|0;X=(au*(aa+1))|0;au=(at-5+3)%3;aw=(au*aa)|0;az=H[X+aa];for(ao=0;ao<az;++ao){aq=H[X+ao];W=(aq+1)|0;V=(aq-1)|0;q=M[U+aq];if((q>M[U+W]&&q>M[U+V]&&q>M[aw+V]&&q>M[aw+aq]&&q>M[aw+W]&&q>M[Y+V]&&q>M[Y+aq]&&q>M[Y+W])){E=L[S];E.x=aq,E.y=(at-1),E.score=q;S++}}}jsfeat.cache.put_buffer(D);jsfeat.cache.put_buffer(R);return S}}})();a.fast_corners=b;b.set_threshold(20)})(jsfeat);(function(b){var a=(function(){var c=jsfeat.imgproc.scharr_derivatives;return{track:function(n,u,ao,aK,k,N,R,K,f,q){if(typeof R==="undefined"){R=30}if(typeof K==="undefined"){K=new Uint8Array(k)}if(typeof f==="undefined"){f=0.01}if(typeof q==="undefined"){q=0.0001}var e=(N-1)*0.5;var h=(N*N)|0;var Z=h<<1;var r=n.data,S=u.data;var g=r[0].data,F=S[0].data;var M=r[0].cols,aA=r[0].rows,ax=0,aG=0;var ay=jsfeat.cache.get_buffer(h<<2);var s=jsfeat.cache.get_buffer(Z<<2);var t=jsfeat.cache.get_buffer((aA*(M<<1))<<2);var w=ay.i32;var ab=s.i32;var az=t.i32;var aa=0,I=0,aL=0,ar=0,aH=0,at=0;var al=0,aE=0,aC=0,ae=0,ad=0;var E=0,z=0,X=0,V=0;var p=0,o=0,aD=0,aB=0;var Q=0,P=0,J=0,H=0,ah=0,aj=0,l=0;var d=0,A=0,O=0;var U=0,T=0,av=0,au=0;var ag=14;var C=14;var Y=C-5;var aw=(1<<((Y)-1));var ac=(1<<ag);var m=(1<<((C)-1));var W=1/(1<<20);var aJ=0,aI=0,aq=0,ap=0,ak=0,v=0,B=0;var an=0,am=0,af=0,ai=0,aF=0;var G=1.1920929e-7;f*=f;for(;Q<k;++Q){K[Q]=1}var L=(n.levels-1)|0;ah=L;for(;ah>=0;--ah){al=(1/(1<<ah));ax=M>>ah;aG=aA>>ah;aa=ax<<1;g=r[ah].data;F=S[ah].data;A=(ax-N)|0;O=(aG-N)|0;c(r[ah],az);for(aj=0;aj<k;++aj){Q=aj<<1;P=Q+1;aE=ao[Q]*al;aC=ao[P]*al;if(ah==L){ae=aE;ad=aC}else{ae=aK[Q]*2;ad=aK[P]*2}aK[Q]=ae;aK[P]=ad;aE-=e;aC-=e;p=aE|0;o=aC|0;J=(p<=d)|(p>=A)|(o<=d)|(o>=O);if(J!=0){if(ah==0){K[aj]=0}continue}U=aE-p;T=aC-o;aJ=(((1-U)*(1-T)*ac)+0.5)|0;aI=((U*(1-T)*ac)+0.5)|0;aq=(((1-U)*T*ac)+0.5)|0;ap=(ac-aJ-aI-aq);an=0,am=0,af=0;for(H=0;H<N;++H){I=((H+o)*ax+p)|0;aL=I<<1;ar=(H*N)|0;aH=ar<<1;for(J=0;J<N;++J,++I,++ar,aL+=2){ak=((g[I])*aJ+(g[I+1])*aI+(g[I+ax])*aq+(g[I+ax+1])*ap);ak=(((ak)+aw)>>(Y));v=(az[aL]*aJ+az[aL+2]*aI+az[aL+aa]*aq+az[aL+aa+2]*ap);v=(((v)+m)>>(C));B=(az[aL+1]*aJ+az[aL+3]*aI+az[aL+aa+1]*aq+az[aL+aa+3]*ap);B=(((B)+m)>>(C));w[ar]=ak;ab[aH++]=v;ab[aH++]=B;an+=v*v;am+=v*B;af+=B*B}}an*=W;am*=W;af*=W;ai=an*af-am*am;aF=(af+an-Math.sqrt((an-af)*(an-af)+4*am*am))/Z;if(aF<q||ai<G){if(ah==0){K[aj]=0}continue}ai=1/ai;ae-=e;ad-=e;E=0;z=0;for(l=0;l<R;++l){aD=ae|0;aB=ad|0;J=(aD<=d)|(aD>=A)|(aB<=d)|(aB>=O);if(J!=0){if(ah==0){K[aj]=0}break}U=ae-aD;T=ad-aB;aJ=(((1-U)*(1-T)*ac)+0.5)|0;aI=((U*(1-T)*ac)+0.5)|0;aq=(((1-U)*T*ac)+0.5)|0;ap=(ac-aJ-aI-aq);av=0,au=0;for(H=0;H<N;++H){at=((H+aB)*ax+aD)|0;ar=(H*N)|0;aH=ar<<1;for(J=0;J<N;++J,++at,++ar){ak=((F[at])*aJ+(F[at+1])*aI+(F[at+ax])*aq+(F[at+ax+1])*ap);ak=(((ak)+aw)>>(Y));ak=(ak-w[ar]);av+=ak*ab[aH++];au+=ak*ab[aH++]}}av*=W;au*=W;X=((am*au-af*av)*ai);V=((am*av-an*au)*ai);ae+=X;ad+=V;aK[Q]=ae+e;aK[P]=ad+e;if(X*X+V*V<=f){break}if(l>0&&Math.abs(X+E)<0.01&&Math.abs(V+z)<0.01){aK[Q]-=X*0.5;aK[P]-=V*0.5;break}E=X;z=V}}}jsfeat.cache.put_buffer(ay);jsfeat.cache.put_buffer(s);jsfeat.cache.put_buffer(t)}}})();b.optical_flow_lk=a})(jsfeat);(function(b){var a=(function(){var c=function(e,d){var f=(e.width*0.25+0.5)|0;return d.x<=e.x+f&&d.x>=e.x-f&&d.y<=e.y+f&&d.y>=e.y-f&&d.width<=(e.width*1.5+0.5)|0&&(d.width*1.5+0.5)|0>=e.width};return{edges_density:0.07,detect_single_scale:function(E,ad,af,q,d,f,D,B){var z=(B.size[0]*D)|0,N=(B.size[1]*D)|0,V=(0.5*D+1.5)|0,U=V;var Z,X,W,Q,O,T=(d-z)|0,R=(f-N)|0;var H=(d+1)|0,w,p,r,S;var e=1/(z*N);var t,o,l,u,s,ae,A,g=true,L,h,n,G,m;var M,K,J,I,v,C;var ac=0,ab=z,aa=N*H,Y=aa+z;var F=((z*N)*255*this.edges_density)|0;var P=[];for(O=0;O<R;O+=U){ac=O*H;for(Q=0;Q<T;Q+=V,ac+=V){p=E[ac]-E[ac+ab]-E[ac+aa]+E[ac+Y];if(q){w=(q[ac]-q[ac+ab]-q[ac+aa]+q[ac+Y]);if(w<F||p<20){Q+=V,ac+=V;continue}}p*=e;r=(ad[ac]-ad[ac+ab]-ad[ac+aa]+ad[ac+Y])*e-p*p;S=r>0?Math.sqrt(r):1;t=B.complexClassifiers;s=t.length;g=true;for(Z=0;Z<s;++Z){o=t[Z];L=o.threshold;l=o.simpleClassifiers;ae=l.length;h=0;for(X=0;X<ae;++X){u=l[X];n=0;m=u.features;A=m.length;if(u.tilted===1){for(W=0;W<A;++W){G=m[W];M=~~(Q+G[0]*D)+~~(O+G[1]*D)*H;v=~~(G[2]*D);C=~~(G[3]*D);K=v*H;J=C*H;n+=(af[M]-af[M+v+K]-af[M-C+J]+af[M+v-C+K+J])*G[4]}}else{for(W=0;W<A;++W){G=m[W];M=~~(Q+G[0]*D)+~~(O+G[1]*D)*H;v=~~(G[2]*D);C=~~(G[3]*D);J=C*H;n+=(E[M]-E[M+v]-E[M+J]+E[M+J+v])*G[4]}}h+=(n*e<u.threshold*S)?u.left_val:u.right_val}if(h<L){g=false;break}}if(g){P.push({x:Q,y:O,width:z,height:N,neighbor:1,confidence:h});Q+=V,ac+=V}}}return P},detect_multi_scale:function(e,m,f,h,d,n,i,g,k){if(typeof g==="undefined"){g=1.2}if(typeof k==="undefined"){k=1}var o=i.size[0];var j=i.size[1];var l=[];while(k*o<d&&k*j<n){l=l.concat(this.detect_single_scale(e,m,f,h,d,n,k,i));k*=g}return l},group_rectangles:function(g,l){if(typeof l==="undefined"){l=1}var y,v,q=g.length;var r=[];for(y=0;y<q;++y){r[y]={parent:-1,element:g[y],rank:0}}for(y=0;y<q;++y){if(!r[y].element){continue}var t=y;while(r[t].parent!=-1){t=r[t].parent}for(v=0;v<q;++v){if(y!=v&&r[v].element&&c(r[y].element,r[v].element)){var s=v;while(r[s].parent!=-1){s=r[s].parent}if(s!=t){if(r[t].rank>r[s].rank){r[s].parent=t}else{r[t].parent=s;if(r[t].rank==r[s].rank){r[s].rank++}t=s}var A,d=v;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}d=y;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}}}}}var w=[];var o=0;for(y=0;y<q;y++){v=-1;var e=y;if(r[e].element){while(r[e].parent!=-1){e=r[e].parent}if(r[e].rank>=0){r[e].rank=~o++}v=~r[e].rank}w[y]=v}var m=[];for(y=0;y<o+1;++y){m[y]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0}}for(y=0;y<q;++y){var z=g[y];var k=w[y];if(m[k].neighbors==0){m[k].confidence=z.confidence}++m[k].neighbors;m[k].x+=z.x;m[k].y+=z.y;m[k].width+=z.width;m[k].height+=z.height;m[k].confidence=Math.max(m[k].confidence,z.confidence)}var h=[];for(y=0;y<o;++y){q=m[y].neighbors;if(q>=l){h.push({x:(m[y].x*2+q)/(2*q),y:(m[y].y*2+q)/(2*q),width:(m[y].width*2+q)/(2*q),height:(m[y].height*2+q)/(2*q),neighbors:m[y].neighbors,confidence:m[y].confidence})}}var p=[];q=h.length;for(y=0;y<q;++y){var z=h[y];var x=true;for(v=0;v<q;++v){var u=h[v];var f=(u.width*0.25+0.5)|0;if(y!=v&&z.x>=u.x-f&&z.y>=u.y-f&&z.x+z.width<=u.x+u.width+f&&z.y+z.height<=u.y+u.height+f&&(u.neighbors>Math.max(3,z.neighbors)||z.neighbors<3)){x=false;break}}if(x){p.push(z)}}return p}}})();b.haar=a})(jsfeat);(function(a){var b=(function(){var c=function(e,d){var f=(e.width*0.25+0.5)|0;return d.x<=e.x+f&&d.x>=e.x-f&&d.y<=e.y+f&&d.y>=e.y-f&&d.width<=(e.width*1.5+0.5)|0&&(d.width*1.5+0.5)|0>=e.width};return{interval:4,scale:1.1486,next:5,scale_to:1,prepare_cascade:function(f){var l=f.stage_classifier.length;for(var g=0;g<l;g++){var i=f.stage_classifier[g].feature;var d=f.stage_classifier[g].count;var h=f.stage_classifier[g]._feature=new Array(d);for(var e=0;e<d;e++){h[e]={size:i[e].size,px:new Array(i[e].size),pz:new Array(i[e].size),nx:new Array(i[e].size),nz:new Array(i[e].size)}}}},build_pyramid:function(e,p,x,t,m){if(typeof t==="undefined"){t=4}if(typeof m==="undefined"){m=true}if(m){var l=e.getContext("2d");var n=e.width*e.height;var v=l.getImageData(0,0,e.width,e.height);var k=v.data;var o=new Uint32Array(k.buffer);var j=jsfeat.cache.get_buffer(n);var f=j.u8;jsfeat.imgproc.grayscale(k,f);var h=(255<<24);var r=n,d=0;while(--r>=0){d=f[r];o[r]=h|(d<<16)|(d<<8)|d}l.putImageData(v,0,0);jsfeat.cache.put_buffer(j)}this.interval=t;this.scale=Math.pow(2,1/(this.interval+1));this.next=(this.interval+1)|0;this.scale_to=(Math.log(Math.min(e.width/p,e.height/x))/Math.log(this.scale))|0;var q=document.createElement("canvas");q.width=e.width;q.height=e.height;var s=q.getContext("2d");var w=new Array((this.scale_to+this.next*2)*4);w[0]={width:e.width,height:e.height,data:e.getContext("2d").getImageData(0,0,e.width,e.height).data};var u,g;for(r=1;r<=this.interval;++r){u=(e.width/Math.pow(this.scale,r))|0;g=(e.height/Math.pow(this.scale,r))|0;s.drawImage(e,0,0,e.width,e.height,0,0,u,g);w[r*4]={width:u,height:g,data:s.getImageData(0,0,u,g).data}}for(r=this.next;r<this.scale_to+this.next*2;++r){u=w[r*4-this.next*4].width>>1;g=w[r*4-this.next*4].height>>1;s.drawImage(e,0,0,e.width,e.height,0,0,u,g);w[r*4]={width:u,height:g,data:s.getImageData(0,0,u,g).data}}for(r=this.next*2;r<this.scale_to+this.next*2;++r){u=w[r*4-this.next*4].width>>1;g=w[r*4-this.next*4].height>>1;s.drawImage(e,1,0,e.width-1,e.height,0,0,u-2,g);w[r*4+1]={width:u,height:g,data:s.getImageData(0,0,u,g).data};s.drawImage(e,0,1,e.width,e.height-1,0,0,u,g-2);w[r*4+2]={width:u,height:g,data:s.getImageData(0,0,u,g).data};s.drawImage(e,1,1,e.width-1,e.height-1,0,0,u-2,g-2);w[r*4+3]={width:u,height:g,data:s.getImageData(0,0,u,g).data}}return w},detect:function(z,H){var g=this.interval;var J=this.scale;var l=this.next;var h=this.scale_to;var X=0,W=0,V=0,S=0,O=0,N=0,Q=0,w=0,F=0,E=0,R=0,Z=0,I=0,Y=0,t=0,U=0,e=0;var B=0,T,M,A,D,C,K=true,m=true;var u=1,s=1;var r=[0,1,0,1];var o=[0,0,1,1];var G=[];var v=[],d=[0,0,0];var L=[0,0,0];var P=[0,0,0];for(X=0;X<h;X++){t=(X<<2);U=z[t+(l<<3)].width-(H.width>>2);e=z[t+(l<<3)].height-(H.height>>2);L[0]=z[t].width<<2;L[1]=z[t+(l<<2)].width<<2;L[2]=z[t+(l<<3)].width<<2;P[0]=(z[t].width<<4)-(U<<4);P[1]=(z[t+(l<<2)].width<<3)-(U<<3);P[2]=(z[t+(l<<3)].width<<2)-(U<<2);w=H.stage_classifier.length;for(W=0;W<w;W++){A=H.stage_classifier[W].feature;M=H.stage_classifier[W]._feature;F=H.stage_classifier[W].count;for(V=0;V<F;V++){D=M[V];C=A[V];E=C.size|0;for(Q=0;Q<E;Q++){D.px[Q]=(C.px[Q]<<2)+C.py[Q]*L[C.pz[Q]];D.pz[Q]=C.pz[Q];D.nx[Q]=(C.nx[Q]<<2)+C.ny[Q]*L[C.nz[Q]];D.nz[Q]=C.nz[Q]}}}v[0]=z[t].data;v[1]=z[t+(l<<2)].data;for(Q=0;Q<4;Q++){v[2]=z[t+(l<<3)+Q].data;d[0]=(r[Q]<<3)+o[Q]*(z[t].width<<3);d[1]=(r[Q]<<2)+o[Q]*(z[t+(l<<2)].width<<2);d[2]=0;for(N=0;N<e;N++){for(O=0;O<U;O++){B=0;K=true;w=H.stage_classifier.length;for(W=0;W<w;W++){B=0;T=H.stage_classifier[W].alpha;M=H.stage_classifier[W]._feature;F=H.stage_classifier[W].count;for(V=0;V<F;V++){D=M[V];Z=v[D.pz[0]][d[D.pz[0]]+D.px[0]];I=v[D.nz[0]][d[D.nz[0]]+D.nx[0]];if(Z<=I){B+=T[V<<1]}else{m=true;E=D.size;for(Y=0;Y<E;Y++){if(D.pz[Y]>=0){R=v[D.pz[Y]][d[D.pz[Y]]+D.px[Y]];if(R<Z){if(R<=I){m=false;break}Z=R}}if(D.nz[Y]>=0){S=v[D.nz[Y]][d[D.nz[Y]]+D.nx[Y]];if(S>I){if(Z<=S){m=false;break}I=S}}}B+=(m)?T[(V<<1)+1]:T[V<<1]}}if(B<H.stage_classifier[W].threshold){K=false;break}}if(K){G.push({x:(O*4+r[Q]*2)*u,y:(N*4+o[Q]*2)*s,width:H.width*u,height:H.height*s,neighbor:1,confidence:B})}d[0]+=16;d[1]+=8;d[2]+=4}d[0]+=P[0];d[1]+=P[1];d[2]+=P[2]}}u*=J;s*=J}return G},group_rectangles:function(g,l){if(typeof l==="undefined"){l=1}var y,v,q=g.length;var r=[];for(y=0;y<q;++y){r[y]={parent:-1,element:g[y],rank:0}}for(y=0;y<q;++y){if(!r[y].element){continue}var t=y;while(r[t].parent!=-1){t=r[t].parent}for(v=0;v<q;++v){if(y!=v&&r[v].element&&c(r[y].element,r[v].element)){var s=v;while(r[s].parent!=-1){s=r[s].parent}if(s!=t){if(r[t].rank>r[s].rank){r[s].parent=t}else{r[t].parent=s;if(r[t].rank==r[s].rank){r[s].rank++}t=s}var A,d=v;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}d=y;while(r[d].parent!=-1){A=d;d=r[d].parent;r[A].parent=t}}}}}var w=[];var o=0;for(y=0;y<q;y++){v=-1;var e=y;if(r[e].element){while(r[e].parent!=-1){e=r[e].parent}if(r[e].rank>=0){r[e].rank=~o++}v=~r[e].rank}w[y]=v}var m=[];for(y=0;y<o+1;++y){m[y]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0}}for(y=0;y<q;++y){var z=g[y];var k=w[y];if(m[k].neighbors==0){m[k].confidence=z.confidence}++m[k].neighbors;m[k].x+=z.x;m[k].y+=z.y;m[k].width+=z.width;m[k].height+=z.height;m[k].confidence=Math.max(m[k].confidence,z.confidence)}var h=[];for(y=0;y<o;++y){q=m[y].neighbors;if(q>=l){h.push({x:(m[y].x*2+q)/(2*q),y:(m[y].y*2+q)/(2*q),width:(m[y].width*2+q)/(2*q),height:(m[y].height*2+q)/(2*q),neighbors:m[y].neighbors,confidence:m[y].confidence})}}var p=[];q=h.length;for(y=0;y<q;++y){var z=h[y];var x=true;for(v=0;v<q;++v){var u=h[v];var f=(u.width*0.25+0.5)|0;if(y!=v&&z.x>=u.x-f&&z.y>=u.y-f&&z.x+z.width<=u.x+u.width+f&&z.y+z.height<=u.y+u.height+f&&(u.neighbors>Math.max(3,z.neighbors)||z.neighbors<3)){x=false;break}}if(x){p.push(z)}}return p}}})();a.bbf=b})(jsfeat);