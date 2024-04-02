import { Client, QueryResult } from 'pg';

interface Database {
  query(queryObject: string): Promise<QueryResult>;
}

const database: Database = {
  async query(queryObject: string): Promise<QueryResult> {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!),
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl: process.env.NODE_ENV === 'production' ? true : false,
    });

    try {
      await client.connect();
      const result = await client.query(queryObject);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await client.end();
    }
  },
};

export default database;
