# POUR 홍보영상 v2 — 렌더링 소스

구성안: [`../POUR-홍보영상-구성안-v2.md`](../POUR-홍보영상-구성안-v2.md)
결과물: [`../POUR_v2_84s.mp4`](../POUR_v2_84s.mp4) (1920×1080 / 30fps / 84초)

영상은 HTML/CSS로 화면을 그리고, 헤드리스 Chromium으로 프레임을 한 장씩 캡처한 뒤
ffmpeg으로 묶는 방식입니다. 타임라인이 코드로 되어 있어 **문구·타이밍·사진만 바꾸면
바로 다시 뽑을 수 있습니다.**

## 파일

| 파일 | 역할 |
| --- | --- |
| `index.html` | 화면 레이아웃과 스타일 (장면 A~G) |
| `timeline.js` | 타임라인. 장면별 시간, 자막, 서비스 5종 데이터 |
| `capture.js` | 프레임 캡처 스크립트 |
| `assets/` | 원본 영상에서 추출한 실사 사진 |

## 자주 바꾸는 것

- **자막 문구·타이밍** → `timeline.js`의 `CAPS` 배열 `[시작초, 끝초, '문구']`
- **서비스 5종 사진·이름·길이** → `timeline.js`의 `SERVICES` 배열
  (`img`를 `null`로 두면 "사진 교체 예정" 슬롯으로 렌더링됩니다)
- **장면 길이** → `render()` 안의 `seg(요소, 시작초, 끝초, …)`

## 다시 렌더링하기

```bash
npm i playwright pretendard                 # 1회
cp node_modules/pretendard/dist/public/static/Pretendard-*.otf ~/.local/share/fonts/
fc-cache -f

node capture.js preview                     # 주요 시점만 빠르게 확인
node capture.js all                         # 전체 2,520프레임 (약 12분)
ffmpeg -framerate 30 -i frames/f_%05d.png \
  -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -movflags +faststart \
  POUR_v2_84s.mp4
```

> `capture.js`의 `executablePath`는 이 작업 환경의 Chromium 경로입니다.
> 다른 PC에서 돌릴 때는 그 줄을 지우고 `npx playwright install chromium`을 실행하세요.

## 사진 소재 현황

| 서비스 | 사진 | 출처 |
| --- | --- | --- |
| 공법설명회 | 있음 | 기존 영상 40초 구간 |
| 컨설팅 | 있음 | 기존 영상 43초 구간 (컨설팅 내역서 실사) |
| 기술개발 · 자재생산 | 있음 | 기존 영상 37초 구간 (제품 + 공장) |
| 영업지원 | **없음** | 교체 필요 |
| 현장지원 | **없음** | 교체 필요 |

영업지원·현장지원 2장은 기존 영상에 실사가 없어 "사진 교체 예정" 슬롯으로 넣었습니다.
사진을 `assets/`에 넣고 `timeline.js`의 `SERVICES`에서 `img` 경로만 채우면 반영됩니다.
권장 규격은 16:9, 가로 1120px 이상, 인물이 보이는 컷입니다.
