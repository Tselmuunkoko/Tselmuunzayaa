import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = props => (
  <tr>
    <td>{props.register.username}</td>
    <td>{props.register.bookname}</td>
    <td>{props.register.state}</td>
    <td>{props.register.date.substring(0,10)}</td>
    <td>
      <Link to={"/editregister/"+props.register._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRegister(props.register._id) }}>delete</a>
    </td>
  </tr>
)

export default class RegistersList extends Component {
  constructor(props) {
    super(props);

    this.deleteRegister = this.deleteRegister.bind(this)

    this.state = {registers: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/registers/')
      .then(response => {
        this.setState({ registers: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRegister(id) {
    axios.delete('http://localhost:5000/registers/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      Registers: this.state.registers.filter(el => el._id !== id)
    })
  }

  registersList() {
    return this.state.registers.map(currentregister => {
      return <Register register={currentregister} deleteRegister={this.deleteRegister} key={currentregister._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Registrations</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Bookname</th>
              <th>State</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.registersList() }
          </tbody>
        </table>
      </div>
    )
  }
}