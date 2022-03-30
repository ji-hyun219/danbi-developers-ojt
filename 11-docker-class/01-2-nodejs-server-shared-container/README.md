# Docker build 예제

## 빌드

```
docker build -t node-server:0.0.2 .
```

## 컨테이너 실행

```
docker run --rm -dp 3001:3001 -v /Users/eunchurnpark/Dev/danbi-developers-ojt/11-docker-class/01-2-nodejs-server-shared-container:/app --name nodejs-server-shared-example node-server:0.0.2
```

## 컨테이너 로그 확인

```
docker logs -f nodejs-server-shared-example
```

## 구동중인 컨테이너에서 특정 명령 실행

```
docker exec -it nodejs-server-shared-example /bin/sh
```