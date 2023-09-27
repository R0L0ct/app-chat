import { pool } from "../db/database.js";

let query = "select * from  messages";

const resolvers = {
  Query: {
    hello: () => {
      return "Hola bobo";
    },
    async Messages() {
      let messages = await pool.query(query);
      return messages.rows;
    },
  },
};

export { resolvers };
