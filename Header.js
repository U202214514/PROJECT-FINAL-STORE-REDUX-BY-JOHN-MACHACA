import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const totalItems = useSelector(state => state.cart.totalItems);

  return (
    <header style={{ padding: '10px', backgroundColor: '#2f4f4f', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '1.5em' }}>Green Haven</h1>
      <nav>
        <Link to="/products" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Products</Link>
        <Link to="/cart" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Cart ({totalItems})</Link>
      </nav>
    </header>
  );
}
