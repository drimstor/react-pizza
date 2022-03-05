import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Button({ onClick, className, outline, children }) {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {/* Разметка внутри компонента в JSX снаружи прокидывается через пропс children */}
      {children}
    </button>
  );
}
//  Типизация
Button.propTypes = {
  onClick: PropTypes.func,
}

export default Button;
