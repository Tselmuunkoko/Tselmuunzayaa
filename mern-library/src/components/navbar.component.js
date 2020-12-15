import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (   
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <Link to="/" className="nav-link active">Book rent</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link to="/register" className="nav-link active">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}
