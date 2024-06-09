#!/bin/bash

filename=".env"

echo SMTP_HOST=$(aws ssm get-parameters --names $path"/wine-seeker/backend/production/SMTP_HOST" --query Parameters[0].Value | sed 's/"//g') >> $filename
echo SMTP_FROM_ADDRESS=$(aws ssm get-parameters --names $path"/wine-seeker/backend/production/SMTP_FROM_ADDRESS" --query Parameters[0].Value | sed 's/"//g') >> $filename
echo SMTP_PORT=$(aws ssm get-parameters --names $path"/wine-seeker/backend/production/SMTP_PORT" --query Parameters[0].Value | sed 's/"//g') >> $filename
echo SMTP_SECURE=$(aws ssm get-parameters --names $path"/wine-seeker/backend/production/SMTP_SECURE" --query Parameters[0].Value | sed 's/"//g') >> $filename
echo SMTP_USER=$(aws ssm get-parameters --names $path"/wine-seeker/backend/production/SMTP_USER" --query Parameters[0].Value | sed 's/"//g') >> $filename
echo SMTP_PASSWORD=$(aws ssm get-parameters --names $path"/wine-seeker/backend/production/SMTP_PASSWORD" --query Parameters[0].Value | sed 's/"//g') >> $filename
