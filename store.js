// Redux Store Setup
import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalItems: 0, totalCost: 0 },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalItems++;
      state.totalCost += item.price;
    },
    incrementItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      item.quantity++;
      state.totalItems++;
      state.totalCost += item.price;
    },
    decrementItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
        state.totalItems--;
        state.totalCost -= item.price;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      state.totalItems -= item.quantity;
      state.totalCost -= item.price * item.quantity;
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  }
});

export const { addItem, incrementItem, decrementItem, removeItem } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// Landing Page
function LandingPage() {
  return (
    <div style={{ backgroundImage: 'url(/background.jpg)', textAlign: 'center' }}>
      <h1>Green Haven</h1>
      <p>Welcome to Green Haven, your one-stop shop for beautiful houseplants.</p>
      <button onClick={() => (window.location.href = '/products')}>Get Started</button>
    </div>
  );
}

// Product Listing Page
import { useDispatch } from 'react-redux';

function ProductListing() {
  const dispatch = useDispatch();
  const products = [
    { id: 1, name: 'Fern', price: 10, category: 'Indoor', thumbnail: '/fern.jpg' },
    { id: 2, name: 'Succulent', price: 8, category: 'Succulent', thumbnail: '/succulent.jpg' },
    { id: 3, name: 'Palm', price: 20, category: 'Indoor', thumbnail: '/palm.jpg' },
    { id: 4, name: 'Cactus', price: 12, category: 'Succulent', thumbnail: '/cactus.jpg' },
    { id: 5, name: 'Bonsai', price: 50, category: 'Indoor', thumbnail: '/bonsai.jpg' },
    { id: 6, name: 'Aloe Vera', price: 15, category: 'Medicinal', thumbnail: '/aloe.jpg' }
  ];

  return (
    <div>
      <h1>Our Plants</h1>
      {['Indoor', 'Succulent', 'Medicinal'].map(category => (
        <div key={category}>
          <h2>{category}</h2>
          {products
            .filter(p => p.category === category)
            .map(product => (
              <div key={product.id}>
                <img src={product.thumbnail} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

// Shopping Cart Page
import { useSelector, useDispatch } from 'react-redux';

function ShoppingCart() {
  const { items, totalItems, totalCost } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>Total Items: {totalItems}</p>
      <p>Total Cost: ${totalCost}</p>
      <button onClick={() => alert('Coming Soon')}>Checkout</button>
      <button onClick={() => (window.location.href = '/products')}>Continue Shopping</button>
      {items.map(item => (
        <div key={item.id}>
          <img src={item.thumbnail} alt={item.name} />
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => dispatch(incrementItem(item.id))}>+</button>
          <button onClick={() => dispatch(decrementItem(item.id))}>-</button>
          <button onClick={() => dispatch(removeItem(item.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

// Header
function Header() {
  const totalItems = useSelector(state => state.cart.totalItems);

  return (
    <header>
      <nav>
        <a href="/products">Products</a>
        <a href="/cart">Cart ({totalItems})</a>
      </nav>
    </header>
  );
}

// Main Application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
