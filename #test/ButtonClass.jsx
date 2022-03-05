import React from 'react';
// Классовый компонент
import classNames from 'classnames';

class ButtonClass extends React.Component {
  // componentDidMount() {
  //     console.log(this.props);
  // }
  render() {
    return (
      //   <button className={`button ${this.props.outline ? 'button--outline' : ''}`}>
      //       {this.props.children}
      //   </button>
      <button
        className={classNames('button', {
          'button--outline': this.props.outline,
        })}>
        {this.props.children}
      </button>
    );
  }
}

export default ButtonClass;
