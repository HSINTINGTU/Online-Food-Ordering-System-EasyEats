import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import CustomerMenu from './pages/CustomerMenu';
import Cart from './pages/Cart';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/customer-menu" element={<CustomerMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<CustomerOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
