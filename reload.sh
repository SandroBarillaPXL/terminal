#!/bin/bash
docker compose down
docker image rm terminal-terminal
docker compose up -d
