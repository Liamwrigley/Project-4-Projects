import React, { Component } from 'react';
import Projects from './components/projects.js';

class App extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then ((data) => {
      this.setState({ projects: data })
    })
    .catch(console.log)
  }
  render() {
    return (
      <Projects projects={this.state.projects} />
    );
  }
}

export default App;
