import React from 'react';
import './userDetail.css';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */ 

const User = props=>(
  <div className="card">
      <div className="container">
        <h4><b>{props.user.first_name} {props.user.last_name}</b></h4>
        <p>Description :{props.user.description}</p>
        <p>Occupation :{props.user.occupation }</p>
        <p>Location :{props.user.location}</p>
      </div>
</div>
)
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:''
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/user/"+this.props.match.params.userId)
    .then(res => res.json())
    .then(data => this.setState({user:data}));
  }
  userdetails() {
    if(this.state.user!==undefined){
      return <User user={this.state.user}/>;
    }
    this.props.onUserDetail(this.state.user.first_name);
  }
  render() {  
    console.log(this.state.user);
    return (
      <div>
        {this.userdetails()}
      </div>
    );
  }
}

export default UserDetail;
