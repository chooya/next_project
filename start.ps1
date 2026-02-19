Write-Host "Starting NestJS Backend with Yarn..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; yarn start:dev"

Write-Host "Starting NextJS Frontend with Yarn..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; yarn dev"
