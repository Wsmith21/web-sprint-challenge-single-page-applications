import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const style = { margin: '1rem', padding: '1rem', border: '2px solid black'}





function PizzaForm({ setShowPizzaForm }) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    topping1: false,
    topping2: false,
    topping3: false,
    topping4: false,
    special: '',
    pizzaToppings: [],
  });

  const [nameError, setNameError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'name' && value.length < 2) {
      setNameError('name must be at least 2 characters');
    } else {
      setNameError('');
    }
  };

  const handleToppingsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        pizzaToppings: [...formData.pizzaToppings, value],
      });
    } else {
      setFormData({
        ...formData,
        pizzaToppings: formData.pizzaToppings.filter((topping) => topping !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameError) {
      return; 
    }

    axios.post('https://reqres.in/api/orders', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>pizza form</h1>
      <form onSubmit={handleSubmit} id="pizza-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
        </div>
        <div>
        <label htmlFor="size-dropdown">Size:</label>
            <select 
              id="size-dropdown" 
              name="size" 
              value={formData.size} 
              onChange={handleChange} 
              required 
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label>Toppings:</label>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="topping1" 
                  checked={formData.topping1} 
                  onChange={handleChange} 
                  
                />
                Topping 1
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="topping2" 
                  checked={formData.topping2} 
                  onChange={handleChange} 
                />
                Topping 2
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="topping3" 
                  checked={formData.topping3} 
                  onChange={handleChange} 
                  
                />
                Topping 3
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="topping4" 
                  checked={formData.topping4} 
                  onChange={handleChange} 
                  
                />
                Topping 4
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="special-text">Special Instructions:</label>
            <input 
              type="text" 
              id="special-text" 
              name="special" 
              value={formData.special} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" id="order-button">order pizza</button>
        </form>
    </div>
    
  );
      }
      function App() {
        const [showPizzaForm, setShowPizzaForm] = useState(false);
      
        const handleOrderPizzaClick = () => {
          setShowPizzaForm(true);
        };
      
        return (
    <div>
    <PizzaForm setShowPizzaForm={setShowPizzaForm} />
    <h1>Bloomtech Eats</h1>
    <button id="order-pizza" onClick={handleOrderPizzaClick}>
        order pizza
    </button>
    </div>
  );
}

export default App;