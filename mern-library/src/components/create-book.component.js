import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeBookname = this.onChangeBookname.bind(this);
    this.onChangeimgurl = this.onChangeimgurl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bookname: '',
      imgUrl:''
    }
  }

  onChangeBookname(e) {
    this.setState({
      bookname: e.target.value
    })
  }
  onChangeimgurl(e) {
    this.setState({
      imgUrl: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const book = {
      bookname: this.state.bookname,
      imgUrl:this.state.imgUrl
    }

    console.log(book);

    axios.post('http://localhost:5000/books/add', book)
      .then(res => console.log(res.data));

    this.setState({
      bookname: '',
      imgUrl:''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Book name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.bookname}
                onChange={this.onChangeBookname}
                />
          </div>
          {/* <div className="form-group"> 
            <label>image url: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.imgUrl}
                onChange={this.onChangeimgurl}
                />
          </div> */}
          <div className="form-group">
            <input type="submit" value="Create Book" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}