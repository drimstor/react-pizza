import React from 'react';
// Функциональный компонент
import classNames from 'classnames';

const Button = (props) => {
  console.log(props)
  return (
    <button
      onClick={props.onClick}
      className={classNames('button', {
        'button--outline': props.outline,
      })}>
      {props.children}
    </button>
  );
};

{/* <Button onClick={() => {alert('123')}}>Кнопка</Button>
<Button outline>Button</Button> */}

export default Button;
