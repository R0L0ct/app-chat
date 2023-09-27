const typeDefs = `
  type Query {
    hello: String
    Messages: [Messages]
  }

  type Messages {
    id: ID
    messagecontent: String
  }
`;

export { typeDefs };
