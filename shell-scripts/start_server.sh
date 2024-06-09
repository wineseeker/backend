#!/bin/bash

# 사용할 프로세스 이름
PROCESS_NAME="wine-seeker-backend"

# 프로세스가 실행 중인지 확인
if pm2 list | grep -q "$PROCESS_NAME"; then
    # 프로세스가 실행 중일 경우
    echo "$PROCESS_NAME is running. Restarting..."
    pm2 restart "$PROCESS_NAME"
else
    # 프로세스가 실행 중이지 않을 경우
    echo "$PROCESS_NAME is not running. Starting..."
    pm2 start dist/bin/www.js --name="$PROCESS_NAME"
fi