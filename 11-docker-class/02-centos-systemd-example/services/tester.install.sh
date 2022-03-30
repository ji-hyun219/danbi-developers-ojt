#!/usr/bin/env bash

# 테스트 스케쥴러 설치
cp /home/ec2-user/danbi-schedulers/services/tester.service /usr/lib/systemd/system/tester.service
cp /home/ec2-user/danbi-schedulers/services/tester.timer /usr/lib/systemd/system/tester.timer

systemctl daemon-reload
systemctl enable tester.timer