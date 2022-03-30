# Docker

## Getting started
<https://docs.docker.com/get-started/overview/>

Docker의 구현 방식은 리눅스의 `cgroup`과 `namespace` 및 Docker에서 제공하는 `libcontainer` 를 상용하여 구현한다.
"격리된 가상화 공간"은 리눅스 자체 기술인 cgroup(control groups), namespace를 사용하여 만든다.

- 이미지(image): OS + 실행 스크립트 등을 bind 해 놓은 실행 가능한 패키지
- 컨테이너(container): 이미지가 실행된 격리된 가상공간
- C Group(cgroup): CPU, 메모리 , Network Bandwith, HW I/O 등 프로세스 그룹의 시스템 리소스 사용량을 관리
- namespace: 하나의 시스템에서 프로세스를 격리시킬 수 있는 가상화 기술 => 격리된 환경을 제공하는 경량 프로세스 가상화
- Registry(ship): 이미지를 공개 및 비공개 저장소에 올려서 공유하거나 배포하는 공간 => Docker hub, Github registry(ghr), AWS ECR(elastic container registry)

## Docker architecture
![docker-architecture](https://docs.docker.com/engine/images/architecture.svg)

## Docker의 구조
참조 <https://velog.io/@palza4dev/Docker%EC%99%80-%EA%B0%80%EC%83%81%ED%99%94-%EA%B8%B0%EC%88%A0>
- Docker는 크게 4가지 부분으로 되어 있다.
  - Docker client 와 server (server는 docker engine으로 불리기도 한다)
  - Docker image
  - Docker registries
  - Docker containers

- Docker client 와 server
Docker는 클라이언트 와 서버 구조로 이루어저 있다. 클라이언트가 서버에 명령을 전달하고 서버가 실행시키는 구조이다.

- Docker image

Docker의 life cycle에서 docker 이미지는 “build”의 부분에 해당된다. Docker container에서 실행시키고 싶은 application을 docker 이미지로 빌드해서 실행시키게 된다.

- Docker registries

Docker registires는 docker 이미지를 저장하는 repository라고 보면 된다.
Source code를 github에 저장하여 관리하듯 docker 이미지는 dockerhub 같은 docker registries에 저장한다고 생각하면 된다. Github가 마찬가지로 public registry 가 있고 private registry가 있다.

- Docker containers

Docker container에서 docker 이미지가 실행된다. 즉 docker 이미지를 실행시키는 가상화 공간 이다.
Docker container는 하나 혹은 그 이상의 프로세스를 실행 시킬수 있다 (하지만 하나의 프로세스만 실행시키는 것을 권장).

- Docker Compose And Swarm

Docker에서는 여러 docker container들로 이루어진 stack이나 cluster를 관리 하는 서비스도 제공하는데 바로 docker compose 와 docker swarm이다.

Docker compose는 복수의 docker container들을 모아서 종합적인 application stack을 정의 하고 운영할수 있도록 해주는 서비스이다.

  - Compose 파일을 사용하여 전체적인 application 서비스를 설정한후, application을 이루고 있는 각각의 컨테이너들 (예를 들어, web 서버 컨테이너, api 서버 컨테이너 등등)을 따로 실행시킬 필요 없이 한번에 생성하고 실행할 수 있도록 해준다.

  - Docker swarm은 docker containers 들로 이러우진 cluster를 관리할수 있도록 해주는 서비스이다. 즉 docker container를 위한 clustering tool 이다.


## 가상화

- 호스트 가상화
- 하이퍼바이저 가상화
  - 네이티브 하이퍼바이저
  - 호스트 하이퍼바이저
- 컨테이너

## Base image

대부분의 Dockerfile은 상위 이미지에서 시작한다. 이미지의 내용을 완전히 제어해야 하는 경우 대신 기본 이미지를 만들어야 할 수 있다.

- 상위 이미지는 이미지의 기반이 되는 이미지
- `FROM` 의 내용을 참조함 
- `Dockerfile`의 각 후속 선언은 이 상위 이미지를 수정
- 대부분의 `Dockerfile`은 기본 이미지가 아닌 상위 이미지에서 시작

Base image의 시작은 `FROM scratch` 로 시작함.

## Registry 사용

### Nodejs

기본 이미지 `node:16-alpine`
`src/index.js` <- 서버 실행

- `docker pull node:16-alpine`
- `docker run -it node:16-alpine /bin/sh`: 이미지 실행, 컨테이너 생성
- 이미지 빌드해보기
```dockerfile
# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```
- `src/index.js` 생성
