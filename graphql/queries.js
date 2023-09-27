import { GraphQLString } from "graphql";

const hello = {
  type: GraphQLString,
  description: "Returns a string",
  resolve: () => "SAPEEEE",
};

export { hello };
