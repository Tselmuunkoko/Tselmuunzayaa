import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CreateUser from "./create-user.component";
export default class CreateRegister extends Component {
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
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/books/'+this.props.match.params.id)
      .then(response => {
          this.setState({
            bookname: response.data.bookname
          })
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


    axios.post('http://localhost:5000/registers/add', register)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  render() {
    return (
      <div>
        <div className="container">
            <div className="row">
                <div className="col-sm">
                <div>
                <h3>Create New Register Log</h3>
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
                    <label>Bookname </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.bookname}
                        />
                  </div>
                  <div className="form-group">
                    <label>state </label>
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
                    <input type="submit" value="Create Register Log" className="btn btn-primary" />
                  </div>
                </form>
              </div>
                </div>
                <div className="col-sm">
                <CreateUser></CreateUser>
                </div>
            </div>
        </div>
      </div>
    
    )
  }
}