import React from 'react';
import './States.css';
/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      arr:window.cs142models.statesModel().sort(),
    };
    this.k = '';
    console.log('window.cs142models.statesModel()', window.cs142models.statesModel().sort());
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.k = event.target.value; 
    if(this.k ===''){
      this.setState({arr:window.cs142models.statesModel().sort()});
    }
    var temp = window.cs142models.statesModel().filter(element=>element.toLowerCase().includes(this.k)).sort();
    if(temp.length==0){
      temp = ['not found'];
    }
    this.setState({arr : temp});
    console.log(this.state);
  }
  render() {
    return (
      <div>
         <div className="inp">
         <label>Search:
          </label>
          <input type="text" value={this.k} onChange={this.handleChange} />
        </div>
        <ul>
            {this.state.arr.map((str ,index)=> (
            <li key={index}>{str}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default States;
