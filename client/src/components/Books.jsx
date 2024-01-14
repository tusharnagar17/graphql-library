import React from "react";
import { useQuery } from "@apollo/client";
import { GETBOOKS } from "../graphql/queries";

const Books = () => {
  const result = useQuery(GETBOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }
  // result.data.allBooks.map((n) => console.log(n.title));

  const resultTree = result.data.allBooks.map((n) => {
    return (
      <tr>
        <td>{n.title}</td>
        <td>{n.author}</td>
        <td>{n.published}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published In</th>
          </tr>
        </thead>
        <tbody>{resultTree}</tbody>
      </table>
    </div>
  );
};

export default Books;
