# Poker Tools
## Getting Started
1. Clone repository
```
$ git clone https://github.com/trob0697/poker-tools.git
```
2. Open local instance
```
$ cd poker-tools
```
3. In the backend directory, make a .env file with the following
```
ACCESS_TOKEN_SECRET=accesstokensecret
REFRESH_TOKEN_SECRET=refreshtokensecret
```
4. With docker installed, bring up containers
```
$ docker compose up -d frontend-dev
```
5. Make database migrations
```
$ docker exec poker-tools-backend-dev-1 sh -c "npm run migrate-up"
```
6. Access app at http://localhost:3000

## License

Copyright (c) 2022 Tahreak Robinson
