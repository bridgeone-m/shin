# POUR 공사실적 통합관리 — 인수인계

주식회사 넷폼 / 작성 2026-10-01

다른 대화·다른 사람·다른 환경으로 이어받을 때 이 문서 하나만 읽으면 됩니다.

---

## 1. 지금 상태 한 줄

공개 웹사이트(검색기·관리·PDF 내보내기)는 **운영 중**이고,
운영 D1 데이터베이스 연동은 **코드와 검증만 끝난 배포 대기** 상태입니다.

---

## 2. 어디에 무엇이 있나

### hansol941201/shin

| 브랜치 | 커밋 | 내용 |
|---|---|---|
| `claude/hansol-pour-performance-fix-4q6whf` | `fddbf9e` | **POUR 통합관리 코드** — `pour-integration/` 91개 파일 |
| `claude/pour-program-ui-redesign-yyi6zt` | `922bddb` | 팝업 시안 작업 (별개 작업) |

두 브랜치는 **갈라져 있습니다.** 한쪽을 다른 쪽에 강제로 밀어 넣으면 상대편
작업이 사라집니다. POUR 작업을 이어서 할 때는 반드시 위 브랜치를 체크아웃하세요.

```
git clone https://github.com/hansol941201/shin
cd shin
git checkout claude/hansol-pour-performance-fix-4q6whf
```

주요 위치

```
pour-integration/
  pour-records.js        실적 모델 (award() 포함 — 구조 변경 금지)
  pour-patents.js        특허 마스터 (POUR / DO / CNC 구분)
  pour-categories.js     공종 대분류 체계
  app.js · app.css       화면
  nextjs/drizzle/        마이그레이션 0002 ~ 0009
  nextjs/lib/pour/       D1 매핑 (mapping.ts)
  scripts/               검사·가져오기 도구
  test/                  테스트 14종 · run-all.sh
```

### hansol941201/wolmal-siljeok

| 브랜치 | 커밋 | 내용 |
|---|---|---|
| `main` | `8288f46` | **공개 웹사이트** (GitHub Pages 자동 배포) |

```
index.html                   안내 페이지
search/index.html            공사실적 검색기 (1.2MB, 단일 파일)
search/font-notosanskr.js    PDF용 한글 글꼴 (8.7MB, 내보낼 때만 내려받음)
manage/index.html            공사실적 관리 (K-APT 공고 → 낙찰)
portfolio/POUR-portfolio.pdf 제출용 A4 서식 견본
.github/workflows/pages.yml  배포 워크플로 (main 에 올리면 자동)
```

---

## 3. 공개 주소

```
https://hansol941201.github.io/wolmal-siljeok/          안내
https://hansol941201.github.io/wolmal-siljeok/search/   공사실적 검색기
https://hansol941201.github.io/wolmal-siljeok/manage/   공사실적 관리
```

로그인·설치 없이 PC·휴대전화에서 열립니다. 엑셀은 서버로 전송되지 않고
브라우저 안에서만 열리므로, 주소를 공유해도 실적 자료는 넘어가지 않습니다.

---

## 4. 검색기가 하는 일

39MB 윈도우 전용 프로그램을 HTML 한 파일로 옮긴 것입니다.

- 엑셀 90개 시트 · 17,069건을 공종·지역·도시·연도·특허번호·세대수로 검색
- 연도 판별: `2018`, `'18년`, 엑셀 날짜값 모두 인식.
  판별 불가 행은 임의로 채우지 않고 **연도 미확인**으로 분리
- 엑셀 · CSV · PDF 내보내기
- 올린 엑셀은 IndexedDB(`pour-siljeok-searcher` / `workbookIndex` / 키 `current`)에
  저장 → 다시 열어도 파일을 고를 필요 없음. 교체할 때만 확인을 묻습니다.

### PDF 내보내기

브라우저 인쇄창을 쓰지 않고 jsPDF 로 **PDF 파일을 직접 생성**합니다.
그래서 쪽마다 웹주소·출력 날짜·탭 제목이 찍히지 않습니다.

- 표지 → 실적 목록 → 마지막 확인 장 (회사명 옆 인감)
- A4 세로, 네이비 `#093647`, 오렌지 `#EF7716`, POUR·NETFORM 로고
- 기간·건수·목록 전부 올린 엑셀과 현재 검색 결과에서 계산 (고정값 없음)
- 순번은 문서 차례대로 1부터 (엑셀·CSV 는 원본 번호 유지)
- 상호명 `주식회사 넷폼`
- 17,069건 → 521쪽, 9.2초

---

## 5. 반드시 지켜야 할 제약

작업하며 굳어진 규칙입니다. 어기면 실제 자료가 틀어집니다.

**데이터**
- 기존 D1 데이터와 운영 자료를 삭제·초기화하지 말 것
- 기존 데이터 건수를 바꾸지 말 것
- D1 기존 컬럼을 삭제·변경하지 말 것 (추가만)
- 기존 자료에 `noticeNo`·`isPartner` 값을 임의 생성하지 말 것
- `agreementNoOnly` 는 그대로 둘 것
- localStorage 를 운영 데이터 저장소로 쓰지 말 것

**코드**
- `award()` 구조를 바꾸지 말 것 (복사 목록에 항목 추가만)
- 공고와 낙찰을 별도 행으로 만들지 말 것 — 같은 행에 누적
- 기존 localStorage 키·구조를 임의로 바꾸지 말 것
- 불필요한 리팩터링 금지. 요청하지 않은 UI·기능 수정 금지

**업무 규칙**
- 업체명·공법명을 임의로 추정하지 말 것
- DO/CNC 를 POUR 로 일괄 변경하지 말 것
- DO/CNC 를 타사 경쟁사로 집계하지 말 것

**배포·보안**
- 승인 없이 운영 사이트에 배포하지 말 것
- 운영 데이터·비밀번호·토큰·인증정보·API 키를 GitHub 에 올리지 말 것
  (`.env`, 배포 토큰은 `.gitignore` 에 있음)
- 기존 공개 주소와 공개 설정을 유지할 것
- `wrangler d1 execute` 를 직접 실행하지 말 것 —
  운영 DB 는 ChatGPT Sites 가 관리, 논리 D1 바인딩 이름은 `DB`

---

## 6. 남은 일

1. **운영 D1 마이그레이션 0007 · 0008 · 0009 적용과 배포**
   코드·검증은 끝남. 운영 DB 접근 권한이 없어 ChatGPT Sites 쪽에서 실행해야 함.
2. **안내 페이지 상호명** — 아직 `주식회사 넷폼알엔디`. PDF 는 이미 `주식회사 넷폼`.
3. **관리 페이지 특허 목록** — 특허권자가 `㈜넷폼알앤디`.
   등록특허 기재값이라 임의로 바꾸지 않음. 바꿀지 확인 필요.

---

## 7. 알아 둘 함정 (실제로 당한 것)

| 증상 | 원인 |
|---|---|
| 2022년 실적이 통째로 빠짐 | 시트 이름 `2022년 (2)` 의 `(2)`. **원본 윈도우 프로그램에도 있던 버그** |
| 낙찰 전환 시 주소·협력사 여부 사라짐 | `award()` 가 두 항목을 안 옮김 |
| 공고번호·협력사 여부가 D1 에 저장 안 됨 | 컬럼 정의는 있는데 변환 함수에 빠짐. 실제 2,029건 리허설로 발견 |
| 17,069건이 4건으로 보임 | 이전 파일의 연도 필터가 localStorage 에 남아 있었음 |
| PDF 에서 `㎡ ℃ ※ ① 「」` 가 빈칸 | 글꼴에 없는 글자가 조용히 빠짐. 17,500자 글꼴로 교체 |
| 마이그레이션이 `no such column` 으로 중단 | 인덱스 생성이 컬럼 추가보다 먼저 실행됨 |

### 검증 도구

```
pour-integration/scripts/check-no-destructive.mjs   파괴적 구문·컬럼 누락 차단
pour-integration/nextjs/rehearsal-0007.mjs          실제 2,031행 21개 항목 검증
pour-integration/test/run-all.sh                    테스트 14종
```

마이그레이션을 건드릴 때는 `check-no-destructive.mjs` 를 반드시 통과시키세요.
실제로 회귀를 잡아낸 검사입니다.
