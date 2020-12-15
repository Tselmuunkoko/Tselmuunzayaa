import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditRegister extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeBookname = this.onChangeBookname.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      bookname: '',
      state: '',
      date: new Date(),
      users: [],
      books:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/registers/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          bookname: response.data.bookname,
          state: response.data.state,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    
    axios.get('http://localhost:5000/books/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            books: response.data.map(book => book.bookname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeBookname(e) {
    this.setState({
      bookname: e.target.value
    })
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const register = {
      username: this.state.username,
      bookname: this.state.bookname,
      state: this.state.state,
      date: this.state.date
    }

    console.log(register);

    axios.post('http://localhost:5000/registers/update/' + this.props.match.params.id, register)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Register Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Bookname: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.bookname}
              onChange={this.onChangeBookname}>
              {
                this.state.books.map(function(book) {
                  return <option 
                    key={book}
                    value={book}>{book}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>State </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.state}
              onChange={this.onChangeState}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Register Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}