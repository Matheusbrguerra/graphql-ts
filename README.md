# Exemplo GraphQL com TypeScript 

## :construction: Projeto em construção :construction:

#### Instale as dependencias com o comando abaixo dentro do diretório clonado: 
```
npm i
```
#### Inicie o banco de dados com o comando abaixo: 
```
docker-compose up 
```
#### Altere as configurações na pasta src/knexfile.ts para preparar seu banco com as migrations
#### Rode as migrations do Knex com o código abaixo: 
```
npx knex migration:latest
```
#### Caso necessite fazer o down 
```
npx knex migration:rollback
```
#### Caso não dê certo o Login certifique-se que a propriedade do driver allowPublicKeyRetrival esteja setada como true
#### Use o código abaixo em uma query no SQL do SGDB de sua preferência caso o seu MySQL não encontre sua permissão:
```
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
```
#### Use o código abaixo no terminal para rodar a aplicação:
```
npm run dev
```
