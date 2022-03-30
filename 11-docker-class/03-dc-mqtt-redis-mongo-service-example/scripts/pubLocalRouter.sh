#!/bin/bash

HOST=localhost
CA=/mosquitto/config/ca_certificates/ca.crt
CERT=/mosquitto/config/ca_certificates/server.crt
KEY=/mosquitto/config/ca_certificates/server.key
TOPIC='router/test'
PORT=8883

echo mqtt://${HOST}:${PORT}, publishing: ${TOPIC}

docker-compose exec mosquitto /usr/bin/mosquitto_pub -h ${HOST} -p ${PORT} -m test --cafile ${CA} --cert ${CERT} --key ${KEY} --tls-version tlsv1.2 -t ${TOPIC}