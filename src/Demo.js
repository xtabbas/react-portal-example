import React, { Component } from 'react';
import Modal from './Modal'

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
    }

    componentWillMount() {}
    componentWillUnmount() {}

    toggleModal = () => {
      this.setState((prevState) => ({ open: !prevState.open }));
    }

    render() {
      const { open } = this.state

      return (
        <div style={{ textAlign: 'center' }}>
          <h2>Modal example</h2>
          <button id='open-button' onClick={this.toggleModal}>Open Modal</button>
          <Modal show={open} onHide={this.toggleModal}>
            A modal example
          </Modal>
        </div>
      );
  }

};

export default Demo
