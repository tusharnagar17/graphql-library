import { gql } from "@apollo/client";

export const GETBOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;
