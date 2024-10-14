import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookTypeId, setBookTypeId] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/books", {
        BookName: bookName,
        BookTypeID: bookTypeId,
        BookPrice: bookPrice,
        Description: description,
      });
      // Reset form fields after submission
      setBookName("");
      setBookTypeId("");
      setBookPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Book Type ID"
        value={bookTypeId}
        onChange={(e) => setBookTypeId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Book Price"
        value={bookPrice}
        onChange={(e) => setBookPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
