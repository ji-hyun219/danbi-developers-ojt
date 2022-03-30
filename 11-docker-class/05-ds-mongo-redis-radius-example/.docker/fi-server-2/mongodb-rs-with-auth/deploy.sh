#!/bin/bash

chmod 400 scripts/file.key
sudo chown 999:999 scripts/file.key
docker-compose up -d