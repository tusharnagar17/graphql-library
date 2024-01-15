import React, { useState } from "react";
import { GETAUTHORS } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_YEAR } from "../graphql/mutation";
import ReactSelect from "react-select";

const Author = () => {
  const [formName, setFormName] = useState("");
  const [formBorn, setFormBorn] = useState(null);
  const [formOption, setFormOption] = useState(null);
  const result = useQuery(GETAUTHORS);
  const [add_year] = useMutation(ADD_YEAR, {
    refetchQueries: [{ query: GETAUTHORS }],
  });
  if (result.loading) {
    return <div>loading...</div>;
  }
  // result.data.allBooks.map((n) => console.log(n.title));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => ({
    value: currentYear - index,
    label: `${currentYear - index}`,
  }));

  const handleAuthorForm = async (e) => {
    try {
      e.preventDefault();
      console.log("formName and typeof formBorn ==", formName, formBorn);

      const resultData = await add_year({
        variables: { name: formName, setBornTo: formBorn.value },
      });
      console.log(resultData);
      setFormBorn("");
      setFormName("");
    } catch (mutationError) {
      console.error(mutationError);
    }
  };
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
      <div>
        <h2>Set Birth Year</h2>
        <form onSubmit={handleAuthorForm}>
          Name:
          <select
            value={formName}
            onChange={({ target }) => setFormName(target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            {result.data.allAuthor.map((option, index) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <br />
          Born in (yr):
          <ReactSelect
            options={years}
            value={formBorn}
            onChange={(selectedOption) => {
              setFormBorn(selectedOption);
            }}
          />
          <br />
          <button type="submit">Update Author</button>
        </form>
      </div>
    </div>
  );
};

export default Author;
