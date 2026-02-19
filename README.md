Docker Compose를 사용하면 NestJS와 Next.js를 각각의 컨테이너로 격리하여 한 번에 실행하고 관리할 수 있습니다. 
개발 환경(Hot-reload 포함)을 위한 구성을 안내해 드립니다. 

1. 디렉토리 구조
text
project-root/
├── backend/          # NestJS 폴더
│   └── Dockerfile
├── frontend/         # Next.js 폴더
│   └── Dockerfile
└── docker-compose.yml
코드를 사용할 때는 주의가 필요합니다.

2. 각 프로젝트별 Dockerfile 작성
개발 단계에서는 로컬 파일 변경 시 실시간 반영(Hot-reload)이 되어야 하므로 아래와 같이 간단히 구성합니다. 

## backend/Dockerfile
dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start:dev"]

## frontend/Dockerfile
dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]

 
3. docker-compose.yml 작성 
루트 디렉토리에 파일을 생성하고 서비스를 정의합니다. volumes 설정을 통해 로컬의 코드 변경이 컨테이너 내부로 즉시 동기화되도록 합니다.   

version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
.

4. 실행 방법
터미널에서 루트 디렉토리로 이동한 뒤 다음 명령어를 입력하세요.
실행: docker compose up --build
백그라운드 실행: docker compose up -d
종료: docker compose down 
이렇게 구성하면 localhost:3000은 NestJS API로, localhost:3001은 Next.js 웹으로 접속할 수 있습니다. 
Medium
Medium






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
