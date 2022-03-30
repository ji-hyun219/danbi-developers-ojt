# Docker build 예제

## 빌드

```
docker build -t node-server:0.0.1 .
```

## 컨테이너 실행

```
docker run -d --name nodejs-server-example node-server:0.0.1
```

- 포트포워딩

```
docker run -dp 3000:3000 --name nodejs-server-example node-server:0.0.1
```

## 컨테이너 로그 확인

```
docker logs -f nodejs-server-example
```

## 구동중인 컨테이너에서 특정 명령 실행

```
docker exec -it nodejs-server-example /bin/sh
```