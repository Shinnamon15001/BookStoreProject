// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBook from './AddBook'; // Import your AddBook component
import DeleteBook from './DeleteBook'; // Import your DeleteBook component
import ShowBooks from './ShowBooks'; // Import your ShowBooks component
import AddMember from './AddMember'; // Import your AddMember component
import AddCustomer from './AddCustomer'; // Import your AddCustomer component
import AddBookType from './AddBookType'; // Import your AddBookType component
import './styles.css'; // Import your CSS styles if needed

const App = () => {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Bookstore Management</h1>
          <nav>
            <ul>
              <li><Link to="/add-book">Add Book</Link></li>
              <li><Link to="/delete-book">Delete Book</Link></li>
              <li><Link to="/show-books">Show Books</Link></li>
              <li><Link to="/add-member">Add Member</Link></li>
              <li><Link to="/add-customer">Add Customer</Link></li>
              <li><Link to="/add-booktype">Add Book Type</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <h2>Available Books</h2>
          <ShowBooks /> {/* Component to show all books sorted by book type */}
        </main>

        <Routes>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/delete-book" element={<DeleteBook />} />
          <Route path="/show-books" element={<ShowBooks />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/add-booktype" element={<AddBookType />} />
        </Routes>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
