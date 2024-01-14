import React from "react";
import { GETAUTHORS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const Author = () => {
  const result = useQuery(GETAUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }
  // result.data.allBooks.map((n) => console.log(n.title));

  const resultTree = result.data.allAuthor.map((n) => {
    return (
      <tr>
        <td>{n.name}</td>
        <td>{n.born}</td>
        <td>{n.bookCount}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born In</th>
            <th>No. of Books</th>
          </tr>
        </thead>
        <tbody>{resultTree}</tbody>
      </table>
    </div>
  );
};

export default Author;
