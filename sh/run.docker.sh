#!/bin/bash

set -e

DEFAULT_WD="/home/team1/projectfolder"
COMPOSE_FILE="docker-compose.yaml"

wd="${WD:-$DEFAULT_WD}"

cd "$wd"

docker compose -f "${wd}/${COMPOSE_FILE}" down
docker compose -f "${wd}/${COMpOSE_FILE}" pull
docker compose -f "${wd}/${COMPOSE_FILE}" up -d

set +e