#!/bin/bash

set -ex


REPO_URL="https://raw.githubusercontent.com/Ninejar/cautious-adventure/main"
WD="/home/team1/projectfolder"

# checking if another url has been given
if [[ -z "$1" ]]; then
    echo "a REPO_URL hasn't been supplied - using the defaul one: ${REPO_URL}"
else
    REPO_URL="$1"
fi

# silent defaults
COMPOSE_FNAME="${2:-docker-compose.yaml}"

# get the rest of params as an array of env files
if [[  $# -lt 3  ]]; then
#   ENV_FNAME=(".env" ".mongo.env")
    ENV_FNAME=()
else
    echo "shifting"
    shift
    shift
    ENV_FNAME=("$@")
fi

curl -sS "${REPO_URL}/${COMPOSE_FNAME}" |
    sed '/build/d' |
    sed '/context: ./d' |
    sed '/dockerfile: /d' |
    sed 's|image: mongo:latest|image: ninejar/webproject-mongo:latest|' |
    sed 's|container_name: backend|image: ninejar/webproject-backend:latest|' |
    sed 's|container_name: frontend|image: ninejar/webproject-frontend:latest|' > "${WD}/compose.yaml"
for envF in "${ENV_FNAME[@]}"; do
    # echo "$envF"
    curl -sS "${REPO_URL}/${envF}" > "${WD}/${envF}"
done

echo "Downloaded compose.yaml"

set +ex

# NOTE: don't forget to chmod u+x this file