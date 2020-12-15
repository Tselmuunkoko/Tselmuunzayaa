import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import RegistersList from "./components/register-list.component";
import EditRegister from "./components/edit-register.component";
import CreateRegister from "./components/create-register.component";
import BooksList from "./components/books-list.component";
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={BooksList} />
      <Route path="/register" component={RegistersList} />
      <Route path="/editregister/:id" component={EditRegister} />
      <Route path="/newregister/:id" component={CreateRegister} />
      </div>
    </Router>
  );
}

export default App;