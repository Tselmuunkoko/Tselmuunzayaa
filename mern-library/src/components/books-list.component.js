import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateBook from "./create-book.component";
const Book = props => (
  
    <div className="card">
        <h5 className="card-header">{props.book.bookname}</h5>
        <div className="card-body">
        <Link to={"/newregister/"+props.book._id}>Rent</Link> 
        </div>
    </div>
)
export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {books: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books/')
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  booksList() {
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} key={currentbook._id}/>;
    })
  }

  render() {
    return (
      <div>
        <div className="container">
            <div className="row">
                <div className="col-sm">
                <h3>Books</h3>
                { this.booksList() }
                </div>
                <div className="col-sm">
                <CreateBook></CreateBook>
                </div>
            </div>
        </div>
      </div>
    )
  }
}