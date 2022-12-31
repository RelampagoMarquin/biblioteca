# biblioteca
Pequena API de biblioteca usando Nestjs e typeORM

# Como iniciar
```bash
cd api # Vai para pasta
npm i # Instala as depencias
npm run start:dev # Para e atualizar quando houver mudanças
npm run start # Caso deseje apenas executar
```

# Como criar Módulos
```bash
nest g res nomedomodulo #Criar modulo
```

# Observações
O servidor está rodando no link "http://localhost:3000";

Somente estão disponíveis as rotas de /usuario (cadastrar usuário; POST) e /auth/SingIn (Login; POST), as demais estão protegidas necessitando do token para funcionar.

