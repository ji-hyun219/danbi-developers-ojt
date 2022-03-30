## CentOS 컨테이너에 타이머 스케쥴러 가동

### docker 실행
```
docker run --privileged -d --name centos7 centos:latest /sbin/init
```

```
#-------------
# 옵션 설명
#-------------
# run : 실행한다.
# --privileged : 호스트의 모든 장치를 사용한다는 의미 (기본적으로 도커의 컨테이너는 보안상의 이유로 호스트 장치에 접근할수 없게 되어 있다.)
# -d : 백그라운드로 실행..
# --name centos : 컨테이너 이름은 centos로 지정
# centos : 이미지 이름
# /sbin/init : sbin/init를 실행

docker run --privileged -d --name centos centos:latest /sbin/init
```