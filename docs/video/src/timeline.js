/* POUR 홍보영상 v2 — 결정적 타임라인 렌더러 (1920x1080 / 30fps / 84s) */
const FPS = 30, DURATION = 84;
let T = 0;

const cl   = (v,a,b)=>Math.max(a,Math.min(b,v));
const eo   = x=>1-Math.pow(1-x,3);
const eio  = x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const lerp = (a,b,t)=>a+(b-a)*t;
const $    = s=>document.querySelector(s);

function seg(el,a,b,o){
  o = Object.assign({fi:.45,fo:.35,y:28,x:0,sc:1,base:''},o||{});
  if(!el) return 0;
  if(T < a-1e-6 || T > b+1e-6){ el.style.opacity=0; el.style.visibility='hidden'; return 0; }
  el.style.visibility='visible';
  const pi = o.fi>0 ? cl((T-a)/o.fi,0,1) : 1;
  const po = o.fo>0 ? cl((b-T)/o.fo,0,1) : 1;
  const e = eo(pi);
  el.style.opacity = Math.min(e, eo(po)).toFixed(4);
  el.style.transform = `${o.base} translate(${lerp(o.x,0,e).toFixed(2)}px,${lerp(o.y,0,e).toFixed(2)}px) scale(${lerp(o.sc,1,e).toFixed(4)})`;
  return e;
}
// 구간 [a,b] 안에서의 선형 진행도
const prog = (a,b)=>cl((T-a)/(b-a),0,1);

/* ---------- C: 서비스 포토 시퀀스 데이터 ---------- */
const SERVICES = [
  { no:'01', name:'공법설명회',        img:'assets/photo_seminar.jpg', a:18.0, b:22.6 },
  { no:'02', name:'컨설팅',            img:'assets/photo_docs.jpg',    a:22.3, b:25.6 },
  { no:'03', name:'기술개발 · 자재생산', img:'assets/photo_product.jpg', a:25.3, b:28.6 },
  { no:'04', name:'영업지원',          img:null,                       a:28.3, b:31.6 },
  { no:'05', name:'현장지원',          img:null,                       a:31.3, b:36.0 },
];
const cardEls = SERVICES.map(s=>{
  const d = document.createElement('div');
  d.className = 'card' + (s.img ? '' : ' ph');
  d.innerHTML = s.img
    ? `<img src="${s.img}" alt=""><div class="scrim"></div>
       <div class="no">${s.no}</div><div class="nm">${s.name}</div>`
    : `<div class="phin"><div class="ic">▣</div><div class="tx">현장 사진 교체 예정</div>
         <div class="sb">PHOTO&nbsp;TBD</div></div>
       <div class="scrim"></div><div class="no">${s.no}</div><div class="nm">${s.name}</div>`;
  $('#cCards').appendChild(d);
  return d;
});

/* ---------- 자막 ---------- */
const CAPS = [
  [0.9, 2.1,  '시공사가 새로운 공법을 찾는 이유는 분명합니다.'],
  [2.1, 3.3,  '새로운 기회를 준비하고,'],
  [3.3, 5.3,  '시장에서 경쟁력을 갖추기 위해서입니다.'],
  [8.6, 11.0, '260만 세대의 현장에서 쌓아온 데이터와'],
  [11.4,13.6, '60명의 전문 인력이 하나의 현장을 중심으로 움직입니다.'],
  [14.6,17.5, '공법 하나가 아니라, 지원 체계 전체를 제공합니다.'],
  [18.4,22.4, '설명회부터 POUR가 직접 섭니다.'],
  [22.7,25.4, '현장 조건에 맞는 적용 방향을 드립니다.'],
  [25.7,28.4, '자재까지 직접 만듭니다.'],
  [28.7,31.4, '수주 현장에 시공사와 같이 들어갑니다.'],
  [31.7,35.8, '공사 전·중·후, 끝까지 함께합니다.'],
  [37.9,41.0, '기술 검토부터 실제 시공까지,'],
  [41.4,44.0, '현장마다 조건이 다르기 때문에'],
  [44.4,46.8, 'POUR는 현장마다 다른 답을 찾습니다.'],
  [47.6,48.8, '협력은 간단합니다.'],
  [48.9,52.6, '두 번의 만남, 한 번의 체결.'],
  [52.9,54.5, '그 다음부터는 POUR가 함께 움직입니다.'],
  [55.8,58.4, '좋은 공법의 기준은 결국 현장에서 이기는 것.'],
  [58.8,62.4, '선택되고, 적용되고,'],
  [62.6,66.0, '수주와 실적으로 이어져야 합니다.'],
];
const capEls = CAPS.map(c=>{
  const d = document.createElement('div');
  d.className='cap'; d.textContent=c[2];
  $('#caps').appendChild(d); return d;
});

/* ---------- 요소 참조 ---------- */
const E = {
  navy:$('#bgNavy'), brand:$('#brand'),
  aLab:$('#aLab'), a1:$('#a1'), a2:$('#a2'), a3:$('#a3'),
  hk1:$('#hk1'), hk2:$('#hk2'), hkl:$('#hkl'),
  bNum:$('#bNum'), bUnit:$('#bUnit'), bChips:$('#bChips'), bBadge:$('#bBadge'),
  cLab:$('#cLab'), cDots:$('#cDots'), cWrap:$('#cWrap'), cThumbs:$('#cThumbs'),
  dLab:$('#dLab'), dDiag:$('#dDiag'), dRes:$('#dRes'),
  eTit:$('#eTit'), eTrack:$('#eTrack'), eFill:$('#eFill'), eMou:$('#eMou'),
  fFlow:$('#fFlow'), fSvg:$('#fSvg'), fLine:$('#fLine'), fDot:$('#fDot'),
  p1:$('#p1'), p2:$('#p2'), fPunch:$('#fPunch'),
  gLogo:$('#gLogo'), gUl:$('#gUl'), gK:$('#gK'), gC:$('#gC'), gInfo:$('#gInfo'),
  fade:$('#fadeout'),
};
E.dRes.textContent = '적합한 적용 방향';
const dSt   = [...document.querySelectorAll('#dSteps .st')];
const dDg   = [...document.querySelectorAll('#dDiag .dg')];
const eNd   = [...document.querySelectorAll('#eNodes .nd')];
const eLb   = [...document.querySelectorAll('#eLbs .lb')];
const fW    = ['#f1','#f2','#f3','#f4'].map($);
const fA    = ['#fa1','#fa2','#fa3'].map($);
const dots  = [...document.querySelectorAll('#cDots i')];
const thumbs= [...document.querySelectorAll('#cThumbs i')];
thumbs.forEach((el,i)=>{
  const src = SERVICES[i].img;
  if (src){ el.style.backgroundImage = `url(${src})`; el.style.backgroundSize='cover'; el.style.backgroundPosition='center'; }
  else { el.style.background = 'repeating-linear-gradient(135deg,#1b3f68 0 8px,#17365b 8px 16px)'; }
});
const LINE_LEN = E.fLine.getTotalLength();
E.fLine.style.strokeDasharray = LINE_LEN;

/* ---------- 메인 렌더 ---------- */
function render(t){
  T = t;

  /* 배경 (네이비 구간: 훅+B, F+G) */
  let nv = 0;
  if (t >= 5.5 && t < 18.1)      nv = Math.min(prog(5.5,6.2), 1-prog(17.4,18.1));
  else if (t >= 54.5)            nv = prog(54.5,55.2);
  nv = cl(nv,0,1);
  E.navy.style.opacity = nv.toFixed(4);
  const bc = Math.round(lerp(16,255,nv)), bg2 = Math.round(lerp(35,255,nv)), bb = Math.round(lerp(60,255,nv));
  E.brand.style.color = `rgb(${bc},${bg2},${bb})`;

  /* ===== A : 문제 제기 ===== */
  seg(E.aLab, 0.4, 5.6, {fi:.5, y:14});
  seg(E.a1,   0.9, 5.6, {fi:.6, x:-36, y:0});
  seg(E.a2,   2.1, 5.6, {fi:.6, x:-36, y:0});
  seg(E.a3,   3.3, 5.6, {fi:.6, x:-36, y:0});

  /* ===== 훅 ===== */
  seg(E.hk1, 5.9, 8.1, {fi:.55, y:18});
  seg(E.hk2, 6.7, 8.1, {fi:.6,  y:24});
  const hk = seg(E.hkl, 7.4, 8.1, {fi:.5, y:0});
  E.hkl.style.transform = `scaleX(${(hk).toFixed(3)})`;

  /* ===== B : 지원 체계 근거 ===== */
  if (t < 11.1) {
    seg(E.bNum,  8.2, 11.0, {fi:.45, y:22});
    seg(E.bUnit, 8.6, 11.0, {fi:.45, y:14});
    const v = Math.round(eio(prog(8.3,10.5)) * 2600000);
    E.bNum.textContent  = v.toLocaleString('en-US');
    E.bUnit.textContent = '세 대';
  } else {
    seg(E.bNum,  11.2, 13.7, {fi:.45, y:22});
    seg(E.bUnit, 11.6, 13.7, {fi:.45, y:14});
    E.bNum.textContent  = Math.round(eio(prog(11.3,12.9)) * 60);
    E.bUnit.textContent = '명  전문  인력';
  }
  seg(E.bChips, 14.0, 17.5, {fi:.55, y:26});
  seg(E.bBadge, 14.9, 17.5, {fi:.5,  y:22, sc:.92, base:'translateX(-50%)'});

  /* ===== C : 서비스 포토 시퀀스 ===== */
  seg(E.cLab, 18.2, 35.9, {fi:.5, y:16});
  let active = -1;
  SERVICES.forEach((s,i)=>{
    const e = seg(cardEls[i], s.a, s.b, {fi:.5, fo:.45, y:26, sc:.985});
    if (e > 0 && t >= s.a && t <= s.b) {
      const img = cardEls[i].querySelector('img');
      if (img) img.style.transform = `scale(${(1 + .07*prog(s.a,s.b)).toFixed(4)})`;
      if (t >= s.a + .25) active = i;
    }
  });
  seg(E.cDots, 18.6, 35.9, {fi:.5, y:10, base:'translateX(-50%)'});
  dots.forEach((d,i)=>{
    const on = i === active;
    d.style.background = on ? '#2f6fd0' : '#c3d4e6';
    d.style.width = on ? '62px' : '46px';
  });
  seg(E.cWrap,   36.1, 37.3, {fi:.4, fo:.35, y:20});
  seg(E.cThumbs, 36.3, 37.3, {fi:.45,fo:.35, y:18, base:'translateX(-50%)'});

  /* ===== D : 현장 적용 ===== */
  seg(E.dLab, 37.4, 46.9, {fi:.5, y:16});
  dSt.forEach((el,i)=> seg(el, 37.8 + i*.42, 46.9, {fi:.5, y:30, sc:.96}));
  dDg.forEach((el,i)=> seg(el, 41.2 + i*.22, 46.9, {fi:.45, y:18}));
  seg(E.dRes, 44.2, 46.9, {fi:.5, y:24, sc:.97});

  /* ===== E : 체결 (압축) ===== */
  seg(E.eTit,   47.3, 54.6, {fi:.5, y:18});
  seg(E.eTrack, 48.2, 54.6, {fi:.4, y:0});
  E.eFill.style.width = (prog(48.6, 52.4) * 100).toFixed(2) + '%';
  const NODE_T = [48.8, 50.2, 51.6];
  eNd.forEach((el,i)=>{
    seg(el, 48.3 + i*.18, 54.6, {fi:.4, y:14, sc:.9});
    const on = t >= NODE_T[i];
    el.textContent     = on ? '✓' : ['01','02','03'][i];
    el.style.background= on ? '#2f6fd0' : '#ffffff';
    el.style.borderColor = on ? '#2f6fd0' : '#d7e2ef';
    el.style.color     = on ? '#ffffff' : '#9fb3c9';
  });
  eLb.forEach((el,i)=> seg(el, NODE_T[i]-.3, 54.6, {fi:.4, y:14}));
  seg(E.eMou, 52.8, 54.6, {fi:.45, y:22, sc:.94, base:'translateX(-50%)'});

  /* ===== F : 시공사의 경쟁력 ===== */
  const fk   = eo(prog(58.4, 59.2));
  const fBase= `translateY(${(-128*fk).toFixed(1)}px) scale(${(1-.4*fk).toFixed(4)})`;
  seg(E.fFlow, 55.4, 66.2, {fi:.5, fo:.4, y:0, base:fBase});
  fW.forEach((el,i)=> seg(el, 55.6 + i*.6, 66.2, {fi:.45, y:22}));
  fA.forEach((el,i)=> seg(el, 55.9 + i*.6, 66.2, {fi:.4,  y:0}));
  seg(E.fSvg, 58.8, 66.2, {fi:.4, fo:.4, y:0});
  E.fLine.style.strokeDashoffset = (LINE_LEN * (1 - eio(prog(59.0, 62.4)))).toFixed(1);
  E.fDot.style.opacity = cl(prog(62.2, 62.8), 0, 1).toFixed(3);
  seg(E.p1, 62.0, 66.2, {fi:.45, y:18, base:'translateX(-50%)'});
  seg(E.p2, 63.2, 66.2, {fi:.45, y:18, base:'translateX(-50%)'});
  seg(E.fPunch, 66.5, 70.2, {fi:.6, fo:.45, y:26});

  /* ===== G : 브랜드 엔딩 ===== */
  seg(E.gLogo, 70.6, 83.8, {fi:.7, y:18, sc:.96});
  const gu = seg(E.gUl, 71.5, 83.8, {fi:.6, y:0});
  E.gUl.style.transform = `scaleX(${gu.toFixed(3)})`;
  seg(E.gK,    72.8, 83.8, {fi:.6, y:14});
  seg(E.gC,    73.4, 83.8, {fi:.7, y:20});
  seg(E.gInfo, 78.0, 83.8, {fi:.7, y:18});
  E.fade.style.opacity = prog(83.2, 84.0).toFixed(3);

  /* ===== 자막 ===== */
  CAPS.forEach((c,i)=> seg(capEls[i], c[0], c[1], {fi:.3, fo:.25, y:12, base:'translateX(-50%)'}));
}

window.__render = render;
window.__meta   = {fps:FPS, duration:DURATION, frames:FPS*DURATION};
render(0);
