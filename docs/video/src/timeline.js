/* POUR 홍보영상 v2 — 원본 대본·장면 유지, 순서/길이/사진 시퀀스만 재구성
   1920x1080 / 30fps / 86초                                              */
const FPS = 30, DURATION = 86;
let T = 0;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const eo=x=>1-Math.pow(1-x,3);
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const lerp=(a,b,t)=>a+(b-a)*t;
const $=s=>document.querySelector(s);
const prog=(a,b)=>cl((T-a)/(b-a),0,1);

function seg(el,a,b,o){
  o=Object.assign({fi:.45,fo:.35,y:28,x:0,sc:1,base:''},o||{});
  if(!el) return 0;
  if(T<a-1e-6||T>b+1e-6){el.style.opacity=0;el.style.visibility='hidden';return 0;}
  el.style.visibility='visible';
  const pi=o.fi>0?cl((T-a)/o.fi,0,1):1, po=o.fo>0?cl((b-T)/o.fo,0,1):1, e=eo(pi);
  el.style.opacity=Math.min(e,eo(po)).toFixed(4);
  el.style.transform=`${o.base} translate(${lerp(o.x,0,e).toFixed(2)}px,${lerp(o.y,0,e).toFixed(2)}px) scale(${lerp(o.sc,1,e).toFixed(4)})`;
  return e;
}

/* ===== 5가지 서비스 : 원본 POUR SUPPORT 01~05 그대로 ===== */
const SERVICES = [
  { no:'01', name:'기술개발 · 자재생산',          img:'assets/photo_product.jpg', a:30.4, b:34.5 },
  { no:'02', name:'공법설명회',                  img:'assets/photo_seminar.jpg', a:34.3, b:37.5 },
  { no:'03', name:'현장 맞춤 기술자료',           img:'assets/photo_docs.jpg',    a:37.3, b:40.5 },
  { no:'04', name:'정확한 기술검토<br>빠른 현장지원', img:null, a:40.3, b:45.3,
    body:`<div class="rowl">
            <div class="ri"><b>01</b><span>드론 현장진단</span></div>
            <div class="ri"><b>02</b><span>현장 데이터</span></div>
            <div class="ri"><b>03</b><span>AI 분석</span></div>
            <div class="ri"><b>04</b><span>기술검토</span></div>
          </div>` },
  { no:'05', name:'공사 전 · 중 · 후 현장관리',    img:null, a:45.1, b:49.8,
    body:`<div class="ph3">
            <div class="pc"><div class="h">공사 전</div><div class="d">현장 공유<br>커뮤니케이션</div></div>
            <div class="pcar">→</div>
            <div class="pc"><div class="h">공사 중</div><div class="d">옥상 방수<br>도장 작업</div></div>
            <div class="pcar">→</div>
            <div class="pc"><div class="h">공사 후</div><div class="d">NETFORM<br>준공 공문</div></div>
          </div>` },
];
const cardEls = SERVICES.map(s=>{
  const d=document.createElement('div');
  d.className='card'+(s.img?'':' doc');
  d.innerHTML = (s.img ? `<img src="${s.img}" alt="">` : `<div class="body">${s.body}</div>`)
    + `<div class="scrim"></div><div class="no">${s.no}</div><div class="nm">${s.name}</div>`;
  $('#cCards').appendChild(d); return d;
});

/* ===== 자막 : 원본 영상 문구 그대로 ===== */
const CAPS = [
  [ 0.6,  2.5, '시공사가 새로운 공법을 찾는 이유는 분명합니다.'],
  [ 2.6,  4.1, '더 나은 현장을 만들고,'],
  [ 4.1,  5.6, '새로운 기회를 준비하고,'],
  [ 5.6,  7.4, '시장에서 경쟁력을 갖추기 위해서입니다.'],
  [ 7.7,  9.4, '하지만 좋은 기술을 선택하는 것만으로'],
  [ 9.4, 11.3, '모든 가능성이 현실이 되는 것은 아닙니다.'],
  [11.5, 13.2, '현장에 적합한 기술을 검토하고,'],
  [13.2, 15.0, '필요한 자료와 적용 방안을 준비해'],
  [15.0, 16.8, '실제 시공까지 연결하는 과정이 필요합니다.'],
  [16.9, 18.9, 'POUR는 기술이 현장에 닿기까지의 과정을 생각합니다.'],
  [19.3, 21.4, '260만 세대의 현장에서 쌓아온 경험과 데이터를 바탕으로'],
  [21.6, 23.4, '현장의 조건과 요구사항을 먼저 살펴봅니다.'],
  [23.5, 25.6, '같은 공법이라도 현장의 적용 환경과 공정 조건에 따라'],
  [25.6, 27.3, '요구되는 기술과 기준은 달라집니다.'],
  [27.5, 29.1, 'POUR는 축적된 경험을 바탕으로'],
  [29.1, 30.3, '각 현장에 적합한 적용 방향을 찾아갑니다.'],
  [30.8, 32.6, 'POUR는 기술과 자재만 제공하지 않습니다.'],
  [32.7, 34.3, '기술개발과 자재 생산부터 공사 전·중·후 현장관리까지.'],
  [34.7, 37.3, '높은 선정률로 이어지는 공법설명회를 진행하고,'],
  [37.7, 40.3, '각 현장에 맞는 기술자료를 체계적으로 기획·제작합니다.'],
  [40.7, 42.3, '각 분야의 전문가와 AI 디지털 기술을 연결해'],
  [42.3, 43.8, '현장에 필요한 정보를 정밀하게 분석하고,'],
  [43.8, 45.2, '기술검토의 정확도와 지원의 속도를 높입니다.'],
  [45.5, 47.2, '시공사의 판단은 더 명확하게,'],
  [47.2, 49.6, '현장 대응과 제안의 완성도는 한 단계 높아지도록.'],
  [50.4, 52.0, 'POUR의 60명 전문 인력이'],
  [52.0, 53.7, '하나의 현장을 중심으로 함께 움직입니다.'],
  [53.8, 55.7, '이것이 POUR의 지원 체계입니다.'],
  [56.4, 58.5, 'POUR와의 협력은 서로의 방향을 확인하는 것에서 시작합니다.'],
  [58.6, 60.8, '두 차례의 만남을 통해 협력의 기준이 마련되면'],
  [60.9, 63.6, '세 번째 단계로 MOU를 체결합니다.'],
  [64.8, 66.9, '좋은 공법의 기준은 결국 현장에서 이기는 것입니다.'],
  [67.1, 68.9, '선택되고, 적용되고,'],
  [68.9, 70.9, '수주와 실적으로 이어져야 합니다.'],
  [71.0, 72.7, '더 많이 수주하고,'],
  [72.7, 75.0, '더 많은 실적을 만들 수 있도록.'],
  [76.0, 77.8, '기술부터 영업, 현장 적용까지'],
  [77.9, 79.9, '시공사가 이길 수 있는 모든 과정에'],
  [80.0, 82.0, 'POUR가 함께합니다.'],
];
const capEls = CAPS.map(c=>{const d=document.createElement('div');d.className='cap';d.textContent=c[2];$('#caps').appendChild(d);return d;});

const E={navy:$('#bgNavy'),brand:$('#brand'),
  aLab:$('#aLab'),a1:$('#a1'),a2:$('#a2'),a3:$('#a3'),
  pLab:$('#pLab'),pWith:$('#pWith'),pLine:$('#pLine'),
  rBig:$('#rBig'),rBigU:$('#rBigU'),rStat:$('#rStat'),rDiag:$('#rDiag'),rBars:$('#rBars'),
  cLab:$('#cLab'),cDots:$('#cDots'),
  sNum:$('#sNum'),sNumL:$('#sNumL'),sNumS:$('#sNumS'),sBadge:$('#sBadge'),
  eTit:$('#eTit'),eTrack:$('#eTrack'),eFill:$('#eFill'),eMou:$('#eMou'),
  fWk:$('#fWk'),fWt:$('#fWt'),fFlow:$('#fFlow'),fSvg:$('#fSvg'),fLine:$('#fLine'),fDot:$('#fDot'),p1:$('#p1'),p2:$('#p2'),
  gLogo:$('#gLogo'),gUl:$('#gUl'),gK:$('#gK'),gC:$('#gC'),gInfo:$('#gInfo'),fade:$('#fadeout')};
const pSt=[...document.querySelectorAll('#sP .ps')];
const rb=[$('#rb1'),$('#rb2'),$('#rb3')];
const rArw=[...document.querySelectorAll('#sR .arw')];
const eNd=[...document.querySelectorAll('#eNodes .nd')];
const eLb=[...document.querySelectorAll('#eLbs .lb')];
const fW=['#f1','#f2','#f3','#f4'].map($);
const fA=['#fa1','#fa2','#fa3'].map($);
const dots=[...document.querySelectorAll('#cDots i')];
const LINE_LEN=E.fLine.getTotalLength();
E.fLine.style.strokeDasharray=LINE_LEN;

function render(t){
  T=t;
  /* 배경 : 2,600,000 구간과 85초 이후 경쟁력·엔딩은 네이비 (원본과 동일) */
  let nv=0;
  if(t>=19.0&&t<21.8)      nv=Math.min(prog(19.0,19.5),1-prog(21.3,21.8));
  else if(t>=64.0)         nv=prog(64.0,64.6);
  nv=cl(nv,0,1);
  E.navy.style.opacity=nv.toFixed(4);
  const c=v=>Math.round(lerp(v,255,nv));
  E.brand.style.color=`rgb(${c(16)},${c(35)},${c(60)})`;

  /* A : 새로운 공법을 찾는 이유 */
  seg(E.aLab,0.4,7.6,{fi:.5,y:14});
  seg(E.a1,2.5,7.6,{fi:.6,x:-36,y:0});
  seg(E.a2,4.0,7.6,{fi:.6,x:-36,y:0});
  seg(E.a3,5.5,7.6,{fi:.6,x:-36,y:0});

  /* P : 기술이 현장에 닿기까지 */
  seg(E.pLab,7.9,18.9,{fi:.5,y:16});
  seg(E.pLine,11.3,18.9,{fi:.4,y:0});
  pSt.forEach((el,i)=>seg(el,11.5+i*.75,18.9,{fi:.5,y:30,sc:.96}));
  seg(E.pWith,16.9,18.9,{fi:.5,y:12});

  /* R : 경험과 데이터 → 현장 분석 → 적용 방향 */
  seg(E.rBig ,19.2,21.5,{fi:.45,y:22});
  seg(E.rBigU,19.6,21.5,{fi:.45,y:14});
  E.rBig.textContent=Math.round(eio(prog(19.3,21.0))*2600000).toLocaleString('en-US');
  seg(E.rStat,21.7,27.3,{fi:.5,y:20});
  seg(E.rDiag,23.6,27.3,{fi:.5,y:20});
  seg(E.rBars,27.6,30.3,{fi:.5,y:22,base:'translateX(-50%)'});
  rb.forEach((el,i)=>{el.style.opacity=(t>=27.7+i*.5?1:0).toFixed(2);});
  rArw.forEach((el,i)=>{el.style.opacity=(t>=27.95+i*.5?1:0).toFixed(2);});

  /* C : 5가지 서비스 포토 시퀀스 (19.4초) */
  seg(E.cLab,30.2,49.9,{fi:.5,y:16});
  let act=-1;
  SERVICES.forEach((s,i)=>{
    const e=seg(cardEls[i],s.a,s.b,{fi:.5,fo:.45,y:26,sc:.985});
    if(e>0&&t>=s.a&&t<=s.b){
      const im=cardEls[i].querySelector('img');
      if(im) im.style.transform=`scale(${(1+.07*prog(s.a,s.b)).toFixed(4)})`;
      if(t>=s.a+.25) act=i;
    }
  });
  seg(E.cDots,30.6,49.9,{fi:.5,y:10,base:'translateX(-50%)'});
  dots.forEach((d,i)=>{const on=i===act;d.style.background=on?'#2f6fd0':'#c3d4e6';d.style.width=on?'62px':'46px';});

  /* S : 60명 전문 인력 / POUR 통합 지원 체계 */
  seg(E.sNum ,50.2,55.8,{fi:.45,y:22});
  E.sNum.textContent=Math.round(eio(prog(50.3,51.9))*60);
  seg(E.sNumL,52.0,55.8,{fi:.45,y:16});
  seg(E.sNumS,52.3,55.8,{fi:.45,y:14});
  seg(E.sBadge,53.9,55.8,{fi:.5,y:20,sc:.93,base:'translateX(-50%)'});

  /* E : 협력 프로세스 (8초로 압축) */
  seg(E.eTit  ,56.1,63.8,{fi:.5,y:18});
  seg(E.eTrack,57.1,63.8,{fi:.4,y:0});
  E.eFill.style.width=(prog(57.4,61.3)*100).toFixed(2)+'%';
  const NT=[57.6,59.0,60.9];
  eNd.forEach((el,i)=>{
    seg(el,57.2+i*.18,63.8,{fi:.4,y:14,sc:.9});
    const on=t>=NT[i];
    el.textContent=on?'✓':['01','02','03'][i];
    el.style.background=on?'#2f6fd0':'#fff';
    el.style.borderColor=on?'#2f6fd0':'#d7e2ef';
    el.style.color=on?'#fff':'#9fb3c9';
  });
  eLb.forEach((el,i)=>seg(el,NT[i]-.3,63.8,{fi:.4,y:14}));
  seg(E.eMou,61.4,63.8,{fi:.45,y:22,sc:.94,base:'translateX(-50%)'});

  /* F : 현장에서 이기는 것 → 수주와 실적 */
  seg(E.fWk,64.7,67.0,{fi:.55,fo:.4,y:16});
  seg(E.fWt,65.0,67.0,{fi:.6, fo:.4,y:22});
  const fk=eo(prog(68.6,69.4));
  seg(E.fFlow,67.1,75.3,{fi:.5,fo:.4,y:0,base:`translateY(${(-128*fk).toFixed(1)}px) scale(${(1-.4*fk).toFixed(4)})`});
  fW.forEach((el,i)=>seg(el,67.2+i*.45,75.3,{fi:.4,y:22}));
  fA.forEach((el,i)=>seg(el,67.45+i*.45,75.3,{fi:.35,y:0}));
  seg(E.fSvg,69.0,75.3,{fi:.4,fo:.4,y:0});
  E.fLine.style.strokeDashoffset=(LINE_LEN*(1-eio(prog(69.2,72.6)))).toFixed(1);
  E.fDot.style.opacity=cl(prog(72.4,73.0),0,1).toFixed(3);
  seg(E.p1,71.0,75.3,{fi:.45,y:18,base:'translateX(-50%)'});
  seg(E.p2,72.7,75.3,{fi:.45,y:18,base:'translateX(-50%)'});

  /* G : 브랜드 엔딩 */
  seg(E.gLogo,75.7,85.6,{fi:.7,y:18,sc:.96});
  const gu=seg(E.gUl,76.5,85.6,{fi:.6,y:0});
  E.gUl.style.transform=`scaleX(${gu.toFixed(3)})`;
  seg(E.gK   ,76.1,85.6,{fi:.6,y:14});
  seg(E.gC   ,78.0,85.6,{fi:.7,y:20});
  seg(E.gInfo,82.3,85.6,{fi:.7,y:18});
  E.fade.style.opacity=prog(85.0,86.0).toFixed(3);

  CAPS.forEach((c,i)=>seg(capEls[i],c[0],c[1],{fi:.3,fo:.25,y:12,base:'translateX(-50%)'}));
}
window.__render=render;
window.__meta={fps:FPS,duration:DURATION,frames:FPS*DURATION};
render(0);
