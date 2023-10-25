import React from 'react';

function HomePage({ handleOrderPizzaClick }) {
  return (
    <div>
      <h1>Bloomtech Eats</h1>
      <button id="order-pizza" onClick={handleOrderPizzaClick}>
        Order Pizza
      </button>
    </div>
  );
}

export default HomePage;
