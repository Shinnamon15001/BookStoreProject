import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ShowBooks from "./ShowBooks"; // Import the ShowBooks component
import AddBook from "./AddBook"; // Ensure you create this file too
import DeleteBook from "./DeleteBook"; // Ensure you create this file too
import AddMember from "./AddMember"; // Ensure you create this file too
import AddCustomer from "./AddCustomer"; // Ensure you create this file too
import AddBookType from "./AddBookType"; // Ensure you create this file too

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Bookstore</h1>
      <nav>
        <ul>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/delete-book">Delete Book</Link></li>
          <li><Link to="/show-books">Show Books</Link></li>
          <li><Link to="/add-member">Add Member</Link></li>
          <li><Link to="/add-customer">Add Customer</Link></li>
          <li><Link to="/add-book-type">Add Book Type</Link></li>
        </ul>
      </nav>
      {/* Show books directly on the homepage */}
      <ShowBooks />
    </div>
  );
};

// Main application component
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/add-book" component={AddBook} />
        <Route path="/delete-book" component={DeleteBook} />
        <Route path="/show-books" component={ShowBooks} />
        <Route path="/add-member" component={AddMember} />
        <Route path="/add-customer" component={AddCustomer} />
        <Route path="/add-book-type" component={AddBookType} />
      </Switch>
    </Router>
  );
};

export default App;
