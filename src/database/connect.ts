import { createConnection, Connection, ConnectionOptions } from 'typeorm';


export class MySQLConnector {
  private static mysqlConnection: Connection;

  get connection(): Connection {
    return MySQLConnector.mysqlConnection;
  }

  public async connect() {
    try {

      const connectOpts: ConnectionOptions = {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        entities: [
          `${__dirname}/../${process.env.DATABASE_MODELS}`
        ]

      };

      const connection = await createConnection(connectOpts);

      MySQLConnector.mysqlConnection = connection;

    } catch (e) {

      throw new Error(`🛑 Error ${e.code} - ${e.message}`);

    }
  }

  public disconnect():Promise<any> {
    return MySQLConnector.mysqlConnection.close()
  }
}