import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { spring, Motion, TransitionMotion, presets } from 'react-motion';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { dialog: [{ key: 'k1' }] };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  getDefaultStyles = () => {
    const { dialog } = this.state;
    const { show } = this.props;
    if (!show) return [];
    return dialog.map(modal => ({ ...modal, style: { marginTop: -350, opacity: 0 } }));
  };

  getStyles = () => {
    const { dialog } = this.state;
    const { show } = this.props;
    if (!show) return [];
    return dialog.map((modal) => {
      return {
        ...modal,
        style: {
          marginTop: spring(0, presets.stiff),
          opacity: spring(1, presets.stiff)
        }
      };
    });
  };

  willEnter = () => {
    return {
      marginTop: -350,
      opacity: 0
    };
  }

  willLeave = () => {
    return {
      marginTop: spring(-350, { stiffness: 300, damping: 40 })
    };
  }

  handleDialogClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.onHide();
  }

  render() {
    const { show } = this.props;
    return ReactDOM.createPortal(
      <div>
        {show ? (
          <Motion defaultStyle={{ x: 0 }} style={{ x: spring(show ? 0.5 : 0, presets.stiff) }}>
            {(stuff) => {
              return (
                <div style={{ opacity: stuff.x }} className="modal-backdrop" />
              );
            }}
          </Motion>
        ) : null}

        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
          {styles => (
            <div>
              {styles.map(({ key, style }) => {
                return (
                  <div
                    role="dialog"
                    tabIndex={-1}
                    className="modal"
                    key={key}
                    style={{ ...style, display: style.marginTop < -230 ? 'none' : 'block' }}
                    onClick={this.handleDialogClick}
                  >
                    <div className="modal-lg modal-dialog">
                      <div
                        onClick={() => {}}
                        className="modal-content"
                        role="document"
                      >
                        {this.props.children}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TransitionMotion>
      </div>, this.el,
      );
  }
}

export default Modal;
