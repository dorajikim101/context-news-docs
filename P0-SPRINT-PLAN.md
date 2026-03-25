# P0 / SPRINT PLAN

## 1. 목적
이 문서는 **바로 개발 시작할 때 첫 구현 범위(P0)** 를 잠그는 문서다.

P0가 끝나면 다음이 가능해야 한다.
- 편집자가 source / narrative / claim을 등록하고 관리할 수 있다
- evidence / counterpoint / action signal을 연결할 수 있다
- 사용자가 메인 홈과 서사 상세를 읽을 수 있다

## 2. P0 범위
### 프로젝트 세팅
- repo 구조 (`frontend`, `backend`, `docs`)
- env.example
- 로컬 실행 README
- frontend 초기화
- backend 초기화
- Postgres 연결
- migration 설정

### DB
- sources
- actors
- narratives
- claims
- evidence
- claim_evidence_links
- counterpoints
- action_signals
- users

### 백엔드 API
- source CRUD
- actor CRUD
- narrative CRUD
- claim CRUD
- evidence CRUD
- counterpoint CRUD
- action signal CRUD

### 관리자 기능
- admin login
- source list/create/edit
- narrative list/create/edit
- narrative detail 편집
- claim/evidence/counterpoint/action signal 입력

### 외부 기능
- 메인 홈 narrative list
- state badge
- one-line summary
- narrative 상세
- claims/evidence/counterpoints/action signal 표시

## 3. P0 비범위
이번 스프린트에서 안 하는 것:
- URL 입력 보조
- LLM 후보 생성
- source on/off
- weight level
- snapshots/sparkline
- narrative relation 고도화
- actor alias 정교화

## 4. Sprint 순서
### Sprint 1
- 프로젝트 세팅
- 핵심 migration
- source/narrative/claim CRUD
- admin login
- source/narrative 기본 CMS

### Sprint 2
- evidence/counterpoint/action signal CRUD
- narrative detail 편집 화면
- 메인 홈 기본 리스트
- 서사 상세 기본 화면

## 5. 완료 조건
P0 완료로 보기 위한 조건:
- narrative 5개 이상 입력 가능
- 각 narrative에 claim/evidence/counterpoint/action signal 연결 가능
- admin이 수정 가능
- 외부 홈/상세에서 읽기 가능

## 6. 바로 남는 다음 단계(P1)
- URL 입력 / 본문 추출
- claim 후보 생성
- snapshots / delta
- source on/off
- weight 3단계

## 7. 결론
P0의 목표는 멋진 서비스가 아니다.

**운영 가능한 내부 서사 편집 시스템과, 그 결과를 보여주는 최소 읽기 화면**을 만드는 것이다.
