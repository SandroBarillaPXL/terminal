#!/bin/bash
docker compose down
docker container rm terminal
docker image rm terminal-terminal
docker compose up -d