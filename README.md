# shoop-books
Sistema simples de cadastro e login em um serviço compra de livros

### Estrategias
- Arquitetura MVC
- Tratamento de erros com Middleware
- Autenticação e Validação com Middlewares
- Banco de Dados MySql

## Dependencias

Servidor
  - express
  - express-async-errors

Segurança
  - jsonwebtoken (para autenticação com JWT)
  - crypto (hasing de dados como senha de usuario)
  - validator (validação de dados enviados pelo cliente)

Gerenciamento de dados
  - mysql2
  - sequelize

Infra
  - dotenv
  - cookie-parser

## Tabelas
### Usuarios
![Usuarios](./imgs/tabela_usuarios.png)

### Livros
![Livros](./imgs/tabela_livros.png)

## ROTAS
### Rotas de autenticação
```
POST /cadastrar
```
```
POST /login
```
```
DELETE /logout
```
### Rotas de Serviço
```
GET /usuarios
```
```
GET /usuario/id
```
```
GET /usuario
```
```
GET /livros
```
```
GET /livro/id
```
```
GET /livro?genero=nomeGenero | autor=nomeAutor
```
