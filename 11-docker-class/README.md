# Docker

## Getting started
<https://docs.docker.com/get-started/overview/>

Docker의 구현 방식은 리눅스의 `cgroup`과 `namespace` 및 Docker에서 제공하는 `libcontainer` 를 상용하여 구현한다.
"격리된 가상화 공간"은 리눅스 자체 기술인 cgroup(control groups), namespace를 사용하여 만든다.

- 이미지(image): OS + 실행 스크립트 등을 bind 해 놓은 실행 가능한 패키지
- 컨테이너(container): 이미지가 실행된 격리된 가상공간
- C Group(cgroup): CPU, 메모리 , Network Bandwith, HW I/O 등 프로세스 그룹의 시스템 리소스 사용량을 관리 => 리소스 관리 구조
- namespace: 하나의 시스템에서 프로세스를 격리시킬 수 있는 가상화 기술 => 격리된 환경을 제공하는 경량 프로세스 가상화 => 컨테이너를 구분하는 구조
- Registry(ship): 이미지를 공개 및 비공개 저장소에 올려서 공유하거나 배포하는 공간 => Docker hub, Github registry(ghr), AWS ECR(elastic container registry)

## Docker architecture
![docker-architecture](https://docs.docker.com/engine/images/architecture.svg)

### Linux 기초

- 커널(kernel): CPU, 메모리 관리, 파일 시스템, 프로세스 관리, 디바이스 제어
- userland: 리눅스 배포판: Debian 계열, RH계열, Slackware...
- shell

### Linux 디렉토리 구조

- `/`: 최상의 디렉토리인 루트 디렉토리를 의미하며, 리눅스의 모든 디렉토리들의 시작점이다. 즉, 모든 디렉토리들을 절대경로로 표기할 때에 이 디렉토리로부터 시작해야 한다.
- `/bin`: 기본적인 명령어가 저장된 디렉토리. 즉, 리눅스 시스템사용에 있어 가장 기본적이라고 할 수 있는 mv, cp, rm 등과 같은 명령어들이 이 디렉토리에 존재하며 root 사용자와 일반사용자가 함께 사용할 수 있는 명령어 디렉토리이다.
- `/boot`: 리눅스 부트로더(Boot Loader)가 존재하는 디렉토리. 즉, GRUB 과 같은 부트로더에 관한 파일들(grub.conf 등)이 이 디렉토리에 존재한다.
- `/dev`: 시스템 디바이스(device)파일을 저장하고 있는 디렉토리. 즉, 하드디스크 장치파일 /dev/sda, CD-ROM 장치파일 /dev/cdrom 등과 같은 장치파일들이 존재하는 디렉토리이다.
- `/etc`: 시스템의 거의 모든 설정파일이 존재하는 디렉토리. /etc/sysconfig(시스템 제어판용 설정파일), /etc/passwd(사용자관리 설정파일), /etc/named.conf(DNS 설정파일) 등과 같은 파일들이 존재한다.
- `/etc/ssh/`: SSH 서비스, 즉 sshd 데몬에서 사용하는 각종 설정파일들이 존재하는 디렉토리.
- `/etc/sudoers.d/`: super user 사용자의 설정 파일들을 저장하는 디렉토리
- `/etc/rc.d/`: 부팅레벨별 부팅스크립트파일들이 존재하는 디렉토리.
- `/etc/rc.d/init.d/`: 시스템 초기화 파일들의 실제파일들이 존재함.
- `/etc/cron.d/, /etc/cron.daily/, /etc/cron.hourly/, /etc/cron.monthly/, /etc/cron.weekly/`: 모두 크론설정파일이 존재하는 디렉토리.
- `/home`: 사용자의 홈디렉토리, useradd 명령어로 새로운 사용자를 생성하면 대부분 사용자의 ID와 동일한 이름의 디렉토리가 자동으로 생성됨.
- `/lib`: 커널모듈파일과 라이브러리파일 즉, 커널이 필요로하는 커널모듈파일들과 프로그램(C, C++ 등)에 필요한 각종 라이브러리 파일들이 존재하는 디렉토리.
- `/media`: DVD, CD-ROM, USB 등과 같은 탈부착이 가능한 장치들의 마운트포인트로 사용되는 디렉토리.
- `/mnt`: /media 디렉토리와 비슷한 용도로 탈부착이 가능한 장치들에 대하여 일시적인 마운트포인트로 사용하는 디렉토리.
- `/proc`: 일명 "가상파일시스템" 이라고 하는 곳으로 현재 메모리에 존재하는 모든 작업들이 파일형태로 존재하는 곳이다. 디스크상에 실제 존재하는 것이 아니라 메모리상에 존재하기 때문에 가상파일시스템이라고 부른다. 실제 운용상태를 정확하게 파악할 수 있는 중요한 정보를 제공하며 여기에 존재하는 파일들 가운데 현재 실행중인 커널(kernel)의 옵션 값을 즉시 변경할 수 있는 파라미터파일들이 있기 때문에 시스템 운용에 있어 매우 중요한 의미를 가진다. `/proc`의 숫자 폴더는 프로세스의 ID를 의미한다.
- `/root`: 시스템 최고관리자인 root 사용자의 개인 홈디렉토리.
- `/sbin`: ifconfig, e2fsck, ethtool, halt 등과 같이 주로 시스템 관리자들이 사용하는 시스템관리자용 커맨드를 저장하고 있는 디렉토리.
- `/tmp`: 일명 "공용디렉토리" . 시스템을 사용하는 모든 사용자들이 공동으로 사용하는 디렉토리. mysql 에서 사용하는 mysql.sock 등과 같은 소켓파일, 또는 아파치에서 사용하는 세션파일등이 생성되기도 한다. 웹해킹에 사용되기도 해서 주의를 요망.
- `/usr`: 시스템이 아닌 일반사용자들이 주로 사용하는 디렉토리. 즉, c++, chsh, cpp, crontab, du, find등과 같이 일반사용자들용 명령어들은 /usr/bin 에 위치한다.
- `/usr/bin/`: 일반 사용자들이 사용가능한 명령어 파일들이 존재하는 디렉토리.
- `/usr/include/`: C 프로그램에 필요한 헤드파일(*.h) 디렉토리.
- `/usr/lib/`: `/lib` 에 들어가지 않은 라이브러리 디렉토리.
- `/usr/sbin/`: /bin 에 제외된 명령어와 네트워크관련 명령어가 들어있는 디렉토리.
- `/usr/src/`: 프로그램 소스(주로 커널소스)가 저장되는 디렉토리.
- `/usr/local/`: MySQL, Apache, PHP 등과 같은 어플리케이션들을 소스로 컨파일설치할 때 사용되는 장소.
- `/usr/share/man/`: 명령어들의 도움말을 주는 메뉴얼(manual)페이지 디렉토리. 즉, 이 디렉토리에는 시스템에서 사용하는 모든 맨페이지파일(man page)이 존재함.
- `/var`: 시스템운용중에 생성되었다가 삭제되는 데이터를 일시적으로 저장하기 위한 디렉토리. 거의 모든 시스템로그파일은 /var/log 에 저장되고, DNS 의 zone 설정파일은 /var/named 에 저장되고, 메일파일은 /var/spool/mail 에 저장되며, 크론설정파일은 /var/spool/cron 디렉토리에 각각 저장됨.
- `/var/tmp/`: /tmp 디렉토리와 같은 공용디렉토리. 즉, /tmp 디렉토리와 /var/tmp 디렉토리의 퍼미션은 1777 로서 sticky bit 가 설정되어 있는 공용디렉토리이다. 리눅스 시스템에서 공용디렉토리는 /tmp 와 /var/tmp 둘뿐이다.
- `/var/log/`: 시스템로그파일(messages, secure, xferlog 파일등)이 저장되는 디렉토리.

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

- 호스트 가상화: OS위에 동작하는 가상화 소프트웨어 ex) Oracle VM VirtualBox, VMWare Player
- 하이퍼바이저 가상화: Hyper-V, Citrix Hypervisor(구, XenServer)
  - 네이티브 하이퍼바이저: 펌웨어 단계에서 시스템 자원을 관리하여 가상화 => Hyper-V, Citrix Hypervisor(구, XenServer)
  - 호스트 하이퍼바이저: KVM(Kernel Virtual Machine)
- 컨테이너: 호스트OS 상에서 논리적으로 구역을 나눠 애플리케이션을 동작 Docker

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
