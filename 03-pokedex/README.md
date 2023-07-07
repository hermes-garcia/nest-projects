<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokedex Project
<hr>

## Development
1. Clone this repository
2. Run:
```
yarn install
```
3. Install Nest CLI
```
npm i -g @nest/cli
```
4. Compose database
```
dpcker-compose up -d
```
5. Clone **.env.example** file to **.env**
6. Fill environments variables on **.env** file
7. Start the application
```
yarn start:dev
```
8. Populate database with seed
```
GET {{base_url}}/api/v1/seed
```

## Production Build
1. Create `.env.prod` file
2. Build image with following:
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack
* NestJS
* MongoDB