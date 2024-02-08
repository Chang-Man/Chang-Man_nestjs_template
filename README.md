# Chang-Man's Nest.js template

- Nest.js
- mysql:8.0
- Docker
- typeorm
- passport/jwt

---

### Execution

```
docker compose up --build
```

---

### Structure

```
src
├── api
├── auth
├── common
│   ├── constants
│   ├── decorators
│   │   ├── metadata
│   │   └── requests
│   ├── guards
│   ├── interfaces
│   └── validations
├── config
│   ├── app
│   ├── cache
│   ├── database
│   │   └── mysql
│   ├── queue
│   ├── session
│   └── storage
├── mails
│   └── verification
├── providers
|   ├── cache
│   │   └── redis
│   ├── database
│   │   └── mysql
│   └── queue
│       └── redis
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

### Reference

1. [Nest.js Docs](https://docs.nestjs.com/)
2. [Best Way to Structure Your Directory/Code (NestJS)](https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401)
3. [How to write a NestJS Dockerfile optimized for production](https://www.tomray.dev/nestjs-docker-production)
4. [Nestjs에서 Swagger를 사용하는 방법](https://jhyeok.com/nestjs-swagger/)
