const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());


// URL พื้นฐานของ API
const apiBaseUrl = "http://localhost:5500";

// กำหนด Template Engine
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// เสิร์ฟไฟล์สาธารณะ (Static Files)
app.use(express.static(__dirname + "/public"));

// หน้าแสดงหนังสือทั้งหมด
app.get("/", async (req, res) => {
  try {
    const bookListResponse = await axios.get(apiBaseUrl + "/books");
    res.render("books", { books: bookListResponse.data });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).send("Error fetching books");
  }
});

// หน้าแสดงข้อมูลหนังสือเฉพาะตาม ID
app.get("/book/:id", async (req, res) => {
  try {
    const singleBookResponse = await axios.get(apiBaseUrl + "/books/" + req.params.id);
    res.render("book", { book: singleBookResponse.data });
  } catch (err) {
    console.error("Error fetching book:", err.message);
    res.status(500).send("Error fetching book");
  }
});

// แสดงหน้าแบบฟอร์มสร้างหนังสือใหม่
app.get("/create", (req, res) => {
  res.render("create");
});

// ดำเนินการสร้างหนังสือใหม่
app.post("/create", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const newBookData = { title, author, publishedYear };
    await axios.post(apiBaseUrl + "/books", newBookData);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating book:", err.message);
    res.status(500).send("Error creating book");
  }
});

// แสดงหน้าแบบฟอร์มแก้ไขหนังสือ
app.get("/update/:id", async (req, res) => {
  try {
    const bookToUpdateResponse = await axios.get(apiBaseUrl + "/books/" + req.params.id);
    res.render("update", { book: bookToUpdateResponse.data });
  } catch (err) {
    console.error("Error fetching book for update:", err.message);
    res.status(500).send("Error fetching book for update");
  }
});

// ดำเนินการแก้ไขหนังสือ
app.post("/update/:id", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const updatedBookData = { title, author, publishedYear };
    await axios.put(apiBaseUrl + "/books/" + req.params.id, updatedBookData);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send("Error updating book");
  }
});

// ดำเนินการลบหนังสือตาม ID
app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(apiBaseUrl + "/books/" + req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send("Error deleting book");
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(5500, () => {
  console.log("Bookstore server started on port 5500");
});
