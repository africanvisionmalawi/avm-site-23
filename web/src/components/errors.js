import React from "react";
import { GraphQLErrorList } from "./graphql/graphql-error-list";
import Layout from "./Layout";

const Errors = ({ errors }) => (
  <Layout>
    <GraphQLErrorList errors={errors} />
  </Layout>
);

export default Errors;
