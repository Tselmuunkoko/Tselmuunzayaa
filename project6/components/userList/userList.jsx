import React from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
}
from '@material-ui/core';
import './userList.css';

/**
 * Define UserList, a React componment of CS142 project #5
 */
const User = props=>(
  <ListItem>
    <ListItemText primary={`${props.user.first_name} ${props.user.last_name}`} />
  </ListItem>
)
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/user/list')
    .then(response => {
      this.setState({users:response.data})
    });
  } 
  usersList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} key={currentuser._id}/>;
    })
  }
  render() {
    return (
      <div>
        <Typography variant="body1">
         Users
        </Typography>
        <List component="nav">
          {this.usersList()}
        </List>
      </div>
    );
  }
}

export default UserList;
