import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_BOOK } from "../graphql/mutation";
import { graphQLResultHasError } from "@apollo/client/utilities";
import { GETBOOKS } from "../graphql/queries";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState();
  const [genre, setGenre] = useState([]);
  const [curGenre, setCurGenre] = useState("");

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GETBOOKS }],
  });
  if (error) {
    console.log("mutation error", error);
  }

  const addGenre = (e) => {
    e.preventDefault();
    console.log("genre");
    setGenre([...genre, curGenre]);
    console.log("updated genre :", genre);
    setCurGenre("");
  };
  const handleBookForm = async (e) => {
    try {
      e.preventDefault();
      // sent data to server here
      // console.log(title, author, published, genre);
      const result = await addBook({
        variables: {
          title,
          author,
          published: parseInt(published),
          genres: genre,
        },
      });

      console.log("Succesfully done", result.data.addBook);
      setTitle("");
      setAuthor("");
      setPublished("");
      setGenre([]);
    } catch (mutationError) {
      console.error("Mutation error:", mutationError);
    }
  };
  return (
    <div>
      <h1>Book Form</h1>
      <form onSubmit={handleBookForm}>
        Title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        Published:
        <input
          type="text"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
        <br />
        Add genre:{" "}
        <input
          type="text"
          value={curGenre}
          onChange={(e) => setCurGenre(e.target.value)}
        />
        <button onClick={addGenre}>Add Genre</button>
        <br />
        Genres: {genre.join(" ")}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookForm;
