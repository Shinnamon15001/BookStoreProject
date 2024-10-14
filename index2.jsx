import React from "react";

const HomePage = () => {
    return (
      <h1>Hello</h1>
    );
  };
  
  // Main application component
  const App = () => {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Router>
    );
  };
  
  export default App;