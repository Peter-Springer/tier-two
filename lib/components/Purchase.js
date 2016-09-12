import React from 'react';

export default function Purchase({ purchase }) {
  return (
    <li>
      <h3>{purchase.description}</h3>
      <h4>{purchase.date}</h4>
      <h2>{purchase.price}</h2>
      <button> remove </button>
    </li>
  );
}
