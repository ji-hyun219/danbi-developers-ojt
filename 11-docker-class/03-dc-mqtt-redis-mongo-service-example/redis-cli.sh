#!/bin/bash

export $(grep -v '^#' .env | xargs)

docker-compose exec redis redis-cli -h $REDIS_SERVER_HOST -p $REDIS_SERVER_PORT -a $REDIS_SERVER_PASSWORD