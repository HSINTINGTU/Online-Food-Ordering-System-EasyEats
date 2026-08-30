import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">EasyEats</Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="px-3 py-1 rounded text-sm">
              <span className="font-semibold">{user.name}</span> ({user.role})
            </span>

            {user.role === 'restaurant manager' ? (
              <Link to="/menu" className="hover:underline">Menu Management</Link>
            ) : (
              <>
                <Link to="/customer-menu" className="hover:underline">View Menu</Link>
                <Link to="/cart" className="hover:underline">Cart</Link>
                <Link to="/orders" className="hover:underline">My Orders</Link>
              </>
            )}

            <Link to="/profile" className="hover:underline">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
