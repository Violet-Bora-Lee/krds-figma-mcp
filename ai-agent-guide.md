# AI 에이전트 사용 가이드

이 문서는 AI 에이전트를 활용한 개발 작업 시 주의해야 할 사항과 모범 사례를 정리한 가이드입니다.

## 목차

- [주의해야 할 사항](#주의해야-할-사항)
- [보안 관련 주의사항](#보안-관련-주의사항)
- [코드 품질 관리](#코드-품질-관리)
- [모범 사례](#모범-사례)

## 주의해야 할 사항

AI 에이전트를 이용한 개발 작업 시 다음 사항들을 특히 주의해야 합니다.

### 1. 패키지 관리자 확인

- **잠재적 문제**: 프로젝트에서 사용하는 패키지 관리자(npm, yarn, pnpm)를 잘못 식별
- **주의점**:
  - 작업 시작 전 `package.json`과 lock 파일 확인 (package-lock.json, yarn.lock, pnpm-lock.yaml)
  - 프로젝트에서 사용 중인 패키지 관리자와 일치하는 명령어 사용
  - 패키지 설치 시 올바른 패키지 관리자 명령어 사용 (npm install, yarn add, pnpm add)

### 2. 서드파티 패키지 설치 여부 확인

- **잠재적 문제**: 필요한 외부 패키지를 설치하지 않고 코드에서 사용하려고 시도
- **주의점**:
  - 코드에서 import하는 모든 외부 패키지가 `package.json`에 명시되어 있는지 확인
  - 필요한 패키지는 코드 작성 전에 미리 설치
  - 패키지 설치 시 개발 의존성(`-D` 또는 `--save-dev`)과 런타임 의존성 구분

### 3. 프로젝트 기본 설정 파일 확인

- **잠재적 문제**: 필수 설정 파일(.gitignore, tsconfig.json 등) 누락
- **주의점**:
  - 프로젝트에 필수적인 기본 설정 파일이 있는지 확인
  - 없는 경우 프로젝트 유형에 맞는 기본 설정 파일 생성
  - .gitignore 파일에 node_modules, 빌드 디렉토리, 환경 변수 파일 등 포함 확인

### 4. 타입스크립트 타입 정의 확인

- **잠재적 문제**: 타입스크립트 프로젝트에서 필요한 타입 정의 누락
- **주의점**:
  - 타입스크립트 프로젝트에서는 사용하는 라이브러리의 타입 정의 패키지 설치
  - React 프로젝트에서는 @types/react, @types/react-dom 등 필요
  - 타입 오류는 빠르게 해결하여 코드 품질 유지

## 보안 관련 주의사항

### 1. API 키 및 비밀 정보 관리

- **잠재적 문제**: API 키, 토큰 등 민감한 정보가 코드에 하드코딩됨
- **주의점**:
  - API 키, 토큰, 비밀번호 등은 환경 변수(.env)로 관리
  - .env 파일은 반드시 .gitignore에 포함하여 버전 관리에서 제외
  - 민감 정보가 포함된 파일에 대해 경고하고 안전한 저장 방법 제안

**발견된 보안 문제 예시**:
```jsonc
// .vscode/mcp.json에 API 키가 하드코딩됨
{
    "servers": {
        "Framelink Figma MCP": {
            "command": "npx",
            "args": [
                "-y",
                "figma-developer-mcp",
                "--figma-api-key=figd_HFM-l_0kOMVk_0rIkyH6tyMMbykJvnjli-hjo-FB", // API 키 노출 문제(This key is revoked :p)
                "--stdio"
            ]
        }
    }
}
```

**개선 방법**:
- API 키를 .env 파일로 이동
- .env 파일을 .gitignore에 추가
- 환경 변수를 통해 API 키에 접근

## 코드 품질 관리

### 1. 프로젝트 구조 파악

- **주의점**:
  - 작업 전 프로젝트의 폴더 구조와 파일 관계 파악
  - 컴포넌트, 페이지, 유틸리티 등의 조직 방식 이해
  - 기존 코드 스타일과 패턴을 따라 일관성 유지

### 2. 문서화 및 코드 주석

- **주의점**:
  - 코드 변경 시 관련 문서도 함께 업데이트 (예: 구현 가이드)
  - 복잡한 로직에 대한 주석 추가
  - README 및 관련 문서 최신 상태 유지

### 3. 테스트 및 검증

- **주의점**:
  - 코드 변경 후 테스트나 검증 과정 진행
  - 자동화 테스트가 있다면 실행
  - 브라우저 호환성, 반응형 디자인 등 다양한 환경에서 검증

## 모범 사례

### 1. 단계적 접근

- 큰 작업을 작은 단계로 나누어 진행
- 각 단계마다 검증하여 오류를 조기에 발견
- 코드 작성 전에 필요한 패키지와 설정부터 확인

### 2. 명확한 타입 정의

타입스크립트 프로젝트에서 타입 안전성을 높이는 패턴 활용:

```typescript
// Union 타입을 사용하여 제한된 옵션 정의
type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

// Record 타입을 사용하여 객체 인덱싱 시 타입 안전성 확보
const variantClasses: Record<ButtonType, string> = {
  primary: 'bg-primary-50 text-gray-0 hover:bg-primary-40 active:bg-primary-70',
  secondary: 'bg-primary-5 text-primary-60 border border-primary-50',
  tertiary: 'bg-transparent text-gray-80 border border-gray-40'
};

// React 타입 확장으로 기존 HTML 요소 속성 확장
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: ButtonSize;
  // 추가 속성들...
}
```

### 3. 환경 설정 확인

- 개발 환경 실행 방법 확인 (`npm run dev`, `pnpm dev` 등)
- 빌드 프로세스 이해 (Vite, Webpack 등)
- 호환성 문제 주의 (라이브러리 버전 호환성, 브라우저 호환성)

---

이 가이드는 AI 에이전트를 사용하는 개발 작업에서 발생할 수 있는 문제점을 예방하고, 더 효율적이고 안전한 개발을 돕기 위한 참고 자료입니다. 프로젝트 특성에 맞게 추가적인 가이드라인을 수립하는 것이 좋습니다.