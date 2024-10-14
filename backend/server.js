const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build"))); // Adjust path according to your project structure

// Base URL for the API
const apiBaseUrl = "http://localhost:5500";

// Set template engine for rendering EJS views
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");

// GET all books and render the home page
app.get("/", async (req, res) => {
  try {
    const bookListResponse = await axios.get(apiBaseUrl + "/api/books");
    res.render("books", { books: bookListResponse.data });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).send("Error fetching books");
  }
});

// GET a single book by ID and render its details
app.get("/book/:id", async (req, res) => {
  try {
    const singleBookResponse = await axios.get(apiBaseUrl + "/api/books/" + req.params.id);
    res.render("book", { book: singleBookResponse.data });
  } catch (err) {
    console.error("Error fetching book:", err.message);
    res.status(500).send("Error fetching book");
  }
});

// Render the create book form
app.get("/create", (req, res) => {
  res.render("create");
});

// Create a new book entry
app.post("/create", async (req, res) => {
  try {
    const { BookName, BookTypeID, BookPrice, Description } = req.body;
    const newBookData = { BookName, BookTypeID, BookPrice, Description };
    await axios.post(apiBaseUrl + "/api/books", newBookData);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating book:", err.message);
    res.status(500).send("Error creating book");
  }
});

// Render the update book form
app.get("/update/:id", async (req, res) => {
  try {
    const bookToUpdateResponse = await axios.get(apiBaseUrl + "/api/books/" + req.params.id);
    res.render("update", { book: bookToUpdateResponse.data });
  } catch (err) {
    console.error("Error fetching book for update:", err.message);
    res.status(500).send("Error fetching book for update");
  }
});

// Update a book entry
app.post("/update/:id", async (req, res) => {
  try {
    const { BookName, BookTypeID, BookPrice, Description } = req.body;
    const updatedBookData = { BookName, BookTypeID, BookPrice, Description };
    await axios.put(apiBaseUrl + "/api/books/" + req.params.id, updatedBookData);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send("Error updating book");
  }
});

// Delete a book by ID
app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(apiBaseUrl + "/api/books/" + req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send("Error deleting book");
  }
});

// API route to fetch all books (for React app)
app.get("/api/books", async (req, res) => {
  try {
    // Replace this with your actual database fetching logic
    const books = [
      { BookID: 1, BookName: "Book 1", BookTypeID: 1, BookPrice: 10.99, Description: "Description 1" },
      { BookID: 2, BookName: "Book 2", BookTypeID: 2, BookPrice: 12.99, Description: "Description 2" },
    ];
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Serve the React app for any route not defined above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html")); // Adjust path accordingly
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Bookstore server started on port ${PORT}`);
});
