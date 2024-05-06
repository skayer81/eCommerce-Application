import type { JSX } from 'react';
import { Link } from 'react-router-dom';

// import Layout from './layout/MainLayout';
// import Cart from './pages/Cart';
// import Error from './pages/Error';
// import Menu from './pages/Menu';

function App(): JSX.Element {
  return (
    <>
      <div>Hello FunCode!</div>
      <div>
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </>
  );
}

export default App;
