# UX / OPS SPEC

## 1. 목적
이 문서는 MVP 1차안에서 필요한 **화면 구조 + 운영 플로우**를 함께 정의한다.

원칙:
- 내부 운영 흐름이 먼저다
- 외부 화면은 그 결과를 읽게 하는 얇은 레이어다
- 시각화보다 편집/검수 흐름이 우선이다

## 2. 역할
### 관리자 / 편집자
- source 관리
- narrative 관리
- claim/evidence/counterpoint/action signal 편집
- state 조정
- entity 정규화

### 일반 사용자
- 메인 홈 보기
- 서사 상세 보기
- source on/off
- source weight 3단계 조절

## 3. 핵심 운영 플로우
### 플로우 A: source 등록
1. 편집자가 source 생성
2. source type / status / weight 설정
3. 필요 시 actor와 연결

### 플로우 B: narrative 생성
1. 편집자가 narrative 생성
2. 한 줄 요약과 state 입력
3. claim 연결
4. evidence / counterpoint / action signal 연결

### 플로우 C: URL 기반 반자동 입력
1. URL 또는 raw text 입력
2. 본문 추출
3. claim 후보 생성
4. 편집자가 승인/수정
5. evidence와 narrative에 연결

### 플로우 D: 사용자 개인화
1. 사용자가 source on/off 조정
2. weight level 조정
3. 메인 대비 개인 결과 차이 확인

## 4. P0 화면
### 4.1 Admin 로그인
필수 기능:
- 로그인
- 권한 체크

### 4.2 Source 관리 화면
필수 항목:
- 이름
- type
- status
- base weight
- active

필수 기능:
- 생성 / 수정 / 비활성화 / 필터

### 4.3 Narrative 관리 화면
필수 항목:
- title
- one-line summary
- state
- updated_at
- attention score/share

필수 기능:
- 생성 / 수정 / 상태 변경 / 검색

### 4.4 Narrative 상세 편집 화면
필수 섹션:
- 기본 정보
- claims
- evidence
- counterpoints
- action signals
- relations

### 4.5 메인 홈 화면
필수 항목:
- narrative title
- one-line summary
- state badge
- delta
- 핵심 키워드
- attention score/share

### 4.6 서사 상세 화면
필수 블록:
- 제목
- 한 줄 요약
- state badge
- 왜 뜨는가
- 왜 아직 확정은 아닌가
- 현재 판단
- claims
- evidence
- counterpoints
- action signals
- 관련 actors/sources

## 5. P1 화면
### 5.1 Claim / Evidence / Counterpoint 세부 편집 화면
### 5.2 URL 입력 / 본문 추출 보조 화면
### 5.3 개인화 설정 화면
- source on/off
- low/default/high
- 메인 대비 차이 요약

## 6. UX 원칙
- 읽기가 메인
- 장식보다 구조
- 배지와 키워드 중심 빠른 해석
- 메인과 개인 차이를 설명 가능하게

## 7. 완료 기준
이 문서 기준으로 MVP가 완료됐다고 보려면:
- 편집자가 내부에서 source/narrative/claim을 운영할 수 있어야 함
- 사용자가 외부 홈과 상세에서 서사를 읽을 수 있어야 함
- 사용자 source preference가 실제 결과 차이를 만들어야 함

## 8. 결론
이 MVP의 UX 본체는 화려한 리버 그래프가 아니다.

**내부에선 편집 가능해야 하고, 외부에선 읽혀야 한다.**
