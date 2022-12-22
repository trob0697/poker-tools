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
3. In the back-end directory, make a .env file with the following
```
ACCESS_TOKEN_SECRET=accesstokensecret
REFRESH_TOKEN_SECRET=refreshtokensecret
```
4. With docker installed, bring up containers
```
$ docker compose up -d front-end-dev back-end-dev
```
5. Access app at http://localhost:3000

## License

Copyright (c) 2022 Tahreak Robinson
