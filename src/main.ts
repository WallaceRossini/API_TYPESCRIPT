import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { MySQLConnector } from './database/connect';
import http from 'http';
import { controllers } from './app/controllers';
require('dotenv-safe').config({
  allowEmptyValues: true
});

try {

  const connector: MySQLConnector = new MySQLConnector()

  connector.connect().then(() => {
    console.log(`[+] 🌀 MySQL Connected...`);
  }).catch((e) => {
    console.log(`🛑  Erro to connect database: ${e.message}`);
  })
} catch (e) {
  console.log(`🛑  Erro to connect database: ${e.message}`);
  throw new Error(`🛑  ERRO ${e.message}`);
}

const app = createExpressServer({
  controllers: controllers
})

const server = new http.Server(app);

server.listen(4000, () => {
  console.log('[+] 🔥 Application is running at port 4000');
})