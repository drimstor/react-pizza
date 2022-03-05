import React from 'react';
import ContentLoader from 'react-content-loader';

function PizzaLoading() {
  return (
    <ContentLoader
    className='pizza-block'
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="138" cy="122" r="121" />
      <rect x="-1" y="265" rx="3" ry="3" width="277" height="25" />
      <rect x="0" y="420" rx="4" ry="4" width="101" height="34" />
      <rect x="132" y="415" rx="25" ry="25" width="150" height="44" />
      <rect x="0" y="308" rx="4" ry="10" width="277" height="84" />
    </ContentLoader>
  );
}

export default PizzaLoading;
