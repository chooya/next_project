#!/bin/bash

# backend 실행
echo "Starting NestJS Backend with Yarn..."
cd backend && yarn start:dev &

# frontend 실행
echo "Starting NextJS Frontend with Yarn..."
cd ../frontend && yarn dev &

wait
echo "Both Backend and Frontend are running."