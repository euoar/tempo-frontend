import React, { Component } from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', formSent: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ ...this.state, text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => {
      return { ...state, formSent: true };
    });
    this.props.history.push({
      pathname: '/locations',
      search: '?search=' + this.state.text
    },
      { text: this.state.text });
  }

  render() {
    return (
      <header>
        <Navbar>
          <SearchBox text={this.state.text}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Navbar>
      </header>
    )
  }
}

export default withRouter(Header);
