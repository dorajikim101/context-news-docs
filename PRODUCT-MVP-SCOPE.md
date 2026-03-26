# PRODUCT / MVP SCOPE

## 1. 제품 한 줄 정의
컨텍스트 뉴스는 뉴스를 기사 단위가 아니라 **서사(narrative) 단위로 구조화해 읽게 만드는 서비스**다.

## 2. 최종 목표
장기적으로는 다음을 지향한다.
- 메인 서사 그래프
- 개인화 서사 그래프
- 정치/경제/산업/리서치/proxy 층 반영
- 서사의 생성/성장/분기/합류/쇠퇴 시각화

## 3. 이번 1차 MVP 목표
이번 1차 MVP의 목표는 더 작다.

> 크립토라는 좁은 도메인에서,
> 제한된 소스와 인간 편집을 기반으로,
> narrative / claim / evidence / counterpoint / state를 구조화하고,
> 사용자가 기존 뉴스 소비보다 더 나은 맥락 해석을 얻을 수 있는지 검증한다.

## 4. 이번 MVP의 본체
이번 MVP의 본체는 **반자동 서사 편집 CMS + 읽기 화면**이다.

우선순위:
1. 내부 편집 가능성
2. 데이터 정합성
3. 외부 읽기 경험
4. 개인화 최소 기능
5. 고급 시각화는 후순위

## 5. 포함 범위
### 도메인
- 크립토만 다룬다

### 데이터 범위
- 핵심 소스 20~30개
- 핵심 서사 5~10개

### 내부 기능
- source 관리
- actor 관리
- narrative 관리
- claim 관리
- evidence 연결
- counterpoint 연결
- action signal 연결
- narrative state 관리

### 외부 기능
- 메인 홈: narrative list
- 서사 상세: 요약 / 지지 / 반박 / 근거 / action signal
- 개인화 최소 기능: source on/off + low/default/high

### 반자동 보조
- URL 입력
- 본문 추출
- claim 후보 생성
- keyword 후보 생성
- counterpoint 후보 초안 생성
- 사람이 승인 후 저장

## 6. 제외 범위
이번 MVP에서 의도적으로 제외:
- prediction market
- 탈중앙화 거버넌스
- 완전 자동 서사 생성
- 실시간 전체 업데이트
- graph DB
- 완성형 streamgraph/river UI
- 복잡한 추천 시스템
- 영상 생성

## 7. 성공 기준
### 제품 기준
- narrative / claim / evidence / counterpoint / state 구조가 실제로 운영된다
- 메인 홈과 상세가 기존 기사 읽기보다 더 나은 맥락을 준다
- 메인/개인 차이가 의미 있는 해석 차이를 만든다

### 운영 기준
- 편집자가 서사를 계속 유지/수정할 수 있다
- source 추가/수정/비활성화가 가능하다

### 개발 기준
- 내부 CMS usable
- 외부 홈/상세 usable
- 자동화는 후보 생성까지만 담당

## 8. 확정 결정사항
- 백엔드: FastAPI
- 프론트엔드: Next.js
- DB: Postgres
- 상태값: Emerging / Growing / Contested / Stabilizing / Fading
- 개인화: source on/off + low/default/high
- 홈 UI: list + badge + delta + sparkline(가능하면)

## 9. 이번 단계 한 줄 결론
이번 1차안은 최종 서비스의 축소판이 아니라,
**최종 비전을 검증하기 위해 먼저 만들어야 하는 반자동 서사 편집 CMS 기반 MVP**다.


## 10. 메인 그래프 시각 문법
랜딩의 메인 그래프는 **현재 진행 중인 서사 전체를 먼저 종합적으로 보여주는 뷰**여야 한다.
그 아래에서 카드 형식으로 개별 서사 상세를 본다.

### 기본 원칙
- 첫 화면은 **현재 판세 우선**
- 사용자는 현재 진행 중인 서사를 한눈에 본다
- 이후 카드/상세로 개별 서사를 읽는다
- 과거 흐름은 메인 그래프에서 왼쪽으로 탐색하는 구조를 지향한다

### 시간축 원칙
- 그래프의 오른쪽 끝은 **현재(now)**
- 기본 viewport는 현재 중심
- 왼쪽으로 drag/pan 하면 과거 흐름이 이어져 보이는 구조

### 시각 변수 원칙
- **두께(thickness)** = Attention Share
  - 현재 전체 서사 생태계에서 차지하는 가시적 비중
- **세로 위치(y-position)** = Conviction 중심 + Confidence 보정
  - Conviction이 주축
  - Confidence는 보조적으로 위로 올리는 가중치
  - 개념적으로는 `Y = Conviction 중심 + Confidence 보정값`
- **색/배지** = State
  - emerging / growing / contested / stabilizing / fading

### 해석 원칙
- 두껍고 위에 있는 서사:
  - 많이 주목받고, 실제 행동과 검증도 강한 서사
- 두껍지만 아래에 있는 서사:
  - 많이 주목받지만 아직 말이 앞서는 서사
- 얇지만 위에 있는 서사:
  - 대중적이지는 않지만 실질적으로 중요한 서사
- 얇고 아래에 있는 서사:
  - 아직 약한 초기 신호

### 랜딩 구조 원칙
1. 메인 종합 그래프
2. 핵심 메트릭
3. 개별 narrative cards
4. narrative detail

즉 랜딩은 카드가 먼저가 아니라, **서사 전체 판세를 먼저 보여주는 구조**를 기준으로 한다.
