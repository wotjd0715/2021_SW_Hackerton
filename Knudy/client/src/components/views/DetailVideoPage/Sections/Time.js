import React, { Component } from "react";

class Time extends Component {
    constructor() {
        super();
          this.state = {
            value: "",
            commentList: [],
          }
      }
    getValue = (event) => {
        this.setState({
          value: event.target.value,
        })	
      }
    addComment = () => {
    this.setState({
        commentList: this.state.commentList.concat([this.state.value]),
        value: "",
    })	
    }
    render() {
      return (
      <div>
        <input onChange={this.getValue} type="text"/>
        <button onClick={this.addComment}>submit</button>
        <ul>
        <li>hello</li>
        {this.state.commentList.map((comm, idx) => {
            return <li key={idx}>{comm}</li>
        })}
        </ul>
        <input onKeyPress={this.addCommEnter} />
      </div>
      );
    }
  }
  export default Time
