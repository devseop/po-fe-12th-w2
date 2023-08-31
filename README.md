# 원티드 프리온보딩 12th 2주차 개인 과제

원티드 프리온보딩 12th 2주차에 진행된 개인 과제입니다.

본 과제는 특정 깃헙 레파지토리([github issue](https://github.com/facebook/react/issues))의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축하는 것이 목표입니다.

## 🧑🏻‍💻 프로젝트 정보

### 실행 방법

```jsx
git clone https://github.com/devseop/po-fe-12th-w2
npm install
npm start
```

### 프로젝트 구조

```jsx
src
 ┣ api
 ┃ ┗ api.ts
 ┣ assets
 ┃ ┗ ic_error.svg
 ┣ components
 ┃ ┣ issue
 ┃ ┃ ┣ IssueDetail.tsx
 ┃ ┃ ┣ IssueItem.tsx
 ┃ ┃ ┗ IssueList.tsx
 ┃ ┣ AdBanner.tsx
 ┃ ┣ CommonHeader.tsx
 ┃ ┣ IsError.tsx
 ┃ ┣ IsLoading.tsx
 ┃ ┗ MarkdownRenderer.tsx
 ┣ constant
 ┃ ┗ urls.ts
 ┣ context
 ┃ ┗ IssueContext.tsx
 ┣ hooks
 ┃ ┗ useInfinityScroll.ts
 ┣ router
 ┃ ┗ router.tsx
 ┣ types
 ┃ ┗ type.ts
 ┣ utils
 ┃ ┗ convertDateToKr.ts
 ┣ App.tsx
 ┣ custom.d.ts
 ┣ index.tsx
 ┗ style.css
```

### 폴더 구조 선정 이유

```markdown
1주차 팀 과제 진행시 구조 선정 이유에 따라 코드의 재사용성과 확장 가능성을 고려하여 최소한의 기능단위로 컴포넌트를 분리했습니다.
pages와 components 폴더를 주축으로 하고 api, hook 등 추가적으로 필요한 폴더를 추가하는 구조가
코드 리팩토링에도 용이하고, 후에 확장성에도 제약이 적을 것이라 판단했습니다.
```

### 사용 라이브러리

```jsx
"dependencies": {
    "@octokit/rest": "^20.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "react-markdown": "^8.0.7",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "react-syntax-highlighter": "^15.5.0", //react-markdown 이용 편의성 증대를 위함
    "rehype-katex": "^6.0.3", //react-markdown 이용 편의성 증대를 위함
    "remark-gfm": "^3.0.1", //react-markdown 이용 편의성 증대를 위함
    "styled-components": "^6.0.7",
    "typescript": "^4.9.5",
  },

"devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@types/react-syntax-highlighter": "^15.5.7",
    "@typescript-eslint/parser": "^5.62.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.2"
  },
```

## 요구사항
### 필수 사항
- 이슈 목록 및 상세 화면 기능 구현
- 데이터 요청 중 로딩 표시
- 에러 화면 구현
- 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

### 선택 사항
- CSS-in-JS 적용

### API

- GitHub REST API
- token을 발급하지 않으면 시간 당 60회로 API 호출 횟수 제한 됨
- 개발 시에는 access token을 발급받아 60회 제한 없이 개발 권장
- 이후 과제 제출 및 배포단계에서는 access token이 노출되지 않도록 주의 ([github REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28))

## 📝 구현 내용

### ✅ Assignment 1

이슈 목록 화면을 구현해주세요

- 이슈 목록 가져오기 API 활용
- open 상태의 이슈 중 코멘트가 많은 순으로 정렬
- 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
- 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩 (인피니티 스크롤)
- 다섯번째 셀마다 광고 이미지 출력
  - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동

![assign1_real_final](https://github.com/devseop/po-fe-12th-w2/assets/102455161/12a12f51-991c-4c3c-8034-8750e19f6eb2)


### ✅ Assignment 2

이슈 상세 화면을 구현해주세요

- 이슈의 상세 내용 표시
- ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시

![assign2_final](https://github.com/devseop/po-fe-12th-w2/assets/102455161/38446ac2-5e67-4927-87ab-8bbd496cc899)


## 🫱🏻‍🫲🏿 Commit Convention

커밋 컨벤션과 브랜치 전략은 1주차 팀 과제 진행시 결정된 팀 컨벤션을 따랐습니다.

e.g. FEAT: 로그인 유효성 검증 기능 구현

| 태그      | 설명 (한국어로만 작성하기)                                     |
| --------- | -------------------------------------------------------------- |
| FEAT:     | 새로운 기능 추가 (변수명 변경 포함)                            |
| FIX:      | 버그 해결                                                      |
| DESIGN:   | CSS 등 사용자 UI 디자인 변경                                   |
| STYLE:    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| REFACTOR: | 프로덕션 코드 리팩토링                                         |
| COMMENT:  | 필요한 주석 추가 및 변경                                       |
| DOCS:     | 문서를 수정한 경우                                             |
| CHORE:    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| RENAME:   | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| REMOVE:   | 파일을 삭제하는 작업만 수행한 경우                             |
| INIT:     | 초기 커밋을 진행한 경우                                        |
