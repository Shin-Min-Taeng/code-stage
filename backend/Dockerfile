FROM python:3.9-alpine

# 필요한 패키지 설치
RUN apk add --no-cache git tree

# ARG로 GitHub 리포지토리 URL을 받을 준비
ARG GITHUB_REPOSITORY_URL
ENV GITHUB_REPOSITORY_URL=$GITHUB_REPOSITORY_URL

# 작업 디렉토리 설정
WORKDIR /app/repository

ARG BRANCH
ENV BRANCH=$BRANCH

# Git 리포지토리가 이미 클론되어 있는지 확인하고 없으면 git clone, 있으면 git pull
RUN sh -c 'if [ -d "/app/repository/.git" ]; then git pull origin main; else git clone $GITHUB_REPOSITORY_URL /app/repository && cd /app/repository && git pull origin $BRANCH; fi'

# 파일 내용을 빌드 시 출력
ARG FILE_PATH
RUN cat $FILE_PATH
