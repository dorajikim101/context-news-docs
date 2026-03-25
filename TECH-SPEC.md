# TECH SPEC

## 1. 기술 목표
이번 1차 구현의 목적은 **운영 가능한 서사 편집 시스템**을 빠르게 만드는 것이다.

원칙:
- graph DB 사용 안 함
- relational schema 우선
- 자동화보다 편집 가능성 우선
- 복잡한 실시간 처리 대신 배치/수동 업데이트 우선

## 2. 스택
### Backend
- FastAPI

### Frontend
- Next.js

### Database
- Postgres

### Auth
- 초기엔 관리자 로그인 우선
- 일반 사용자 로그인/개인화는 최소 기능만

### Text extraction
- URL fetch
- PDF/리포트 텍스트 추출
- 실패 시 수동 텍스트 입력 허용

### LLM usage
LLM은 아래에만 사용:
- claim 후보 추출
- keyword 후보 생성
- summary 후보 생성
- counterpoint 후보 초안

원칙:
- LLM은 편집 보조자
- 최종 판정은 사람

## 3. 핵심 데이터 모델
핵심 엔티티:
- Source
- Actor
- Narrative
- Claim
- Evidence
- Counterpoint
- ActionSignal
- NarrativeRelation
- UserSourcePreference
- NarrativeSnapshot

## 4. 핵심 상태값
- emerging
- growing
- contested
- stabilizing
- fading

## 5. 핵심 테이블
### sources
- name
- source_type
- source_status
- base_weight
- active

### actors
- name
- actor_type
- primary_source_id

### narratives
- title
- one_line_summary
- description
- state
- attention_score
- conviction_score
- attention_share
- conviction_share
- confidence_score

### claims
- narrative_id
- actor_id
- source_id
- claim_text
- claim_type
- stance
- confidence

### evidence
- source_id
- title
- url
- evidence_type
- excerpt

### claim_evidence_links
- claim_id
- evidence_id
- link_type
- weight

### counterpoints
- narrative_id or claim_id
- actor_id
- source_id
- counterpoint_text
- counterpoint_type
- strength

### action_signals
- narrative_id
- actor_id
- source_id
- signal_type
- title
- description
- strength

### user_source_preferences
- user_id
- source_id
- enabled
- weight_level

### narrative_snapshots
- narrative_id
- snapshot_date
- attention_score
- conviction_score
- attention_share
- conviction_share
- state

## 6. 최소 API 초안
### Admin / edit
- `GET /sources`
- `POST /sources`
- `PATCH /sources/:id`
- `GET /actors`
- `POST /actors`
- `PATCH /actors/:id`
- `GET /narratives`
- `POST /narratives`
- `GET /narratives/:id`
- `PATCH /narratives/:id`
- `POST /claims`
- `PATCH /claims/:id`
- `POST /evidence`
- `POST /claim-evidence-links`
- `POST /counterpoints`
- `PATCH /counterpoints/:id`
- `POST /action-signals`
- `PATCH /action-signals/:id`

### External / read
- `GET /public/narratives`
- `GET /public/narratives/:id`
- `GET /public/narratives/:id/snapshots`

### Personalization
- `GET /me/source-preferences`
- `PUT /me/source-preferences/:sourceId`

### Extraction helper
- `POST /ingest/url`
- `POST /ingest/text`
- `POST /extract/claims`

## 7. 점수/표시 최소 규칙
### MVP에서는 우선 구현
- attention_score
- attention_share
- state
- delta (snapshot 비교)

### MVP에서는 보조만
- conviction_score
- conviction_share
- confidence_score

즉 홈 랭킹은 초기에 attention 중심으로 시작한다.

## 8. 배포 초안
- Frontend: Vercel
- Backend: Railway / Render / Fly 중 1개
- DB: Managed Postgres

## 9. 비범위
이번 단계에서 안 하는 것:
- graph database
- websocket/realtime
- 복잡한 recommendation pipeline
- fully automatic ingestion orchestration

## 10. 결론
이번 기술 설계의 목표는 **완벽한 서사 엔진**이 아니라,
**운영 가능한 관계형 서사 편집 시스템**을 빠르게 세우는 것이다.
