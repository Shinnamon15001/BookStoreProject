import React, { useState } from "react";
import axios from "axios";

const DeleteBook = () => {
  const [bookId, setBookId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5500/api/books/${bookId}`);
      setBookId(""); // Clear the input after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="text"
        placeholder="Book ID to delete"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        required
      />
      <button type="submit">Delete Book</button>
    </form>
  );
};

export default DeleteBook;
