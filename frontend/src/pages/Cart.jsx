import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    if (user) {
      const initialContact = {};
      const uniqueRestaurants = [...new Set(savedCart.map(item => item.restaurantId))];
      uniqueRestaurants.forEach(id => {
        initialContact[id] = {
          name: user.name || '',
          email: user.email || '',
          address: user.address || ''
        };
      });
      setContactInfo(initialContact);
    }
  }, [user]);

  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    const updated = [...cart];
    updated[index].quantity = qty;
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleContactChange = (restaurantId, field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        [field]: value
      }
    }));
  };

  const handleCheckout = async (restaurantId, restaurantName, items, totalPrice) => {
    const info = contactInfo[restaurantId] || { name: user?.name, email: user?.email, address: user?.address };
    
    if (!info.name || !info.email || !info.address) {
      alert('Please fill in your name, email, and delivery address.');
      return;
    }

    try {
      const orderItems = items.map(item => ({
        menuId: item.menuId,
        quantity: item.quantity
      }));

      await axiosInstance.post('/api/orders', {
        name: info.name,
        email: info.email,
        address: info.address,
        items: orderItems,
        totalPrice
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      alert(`Order for ${restaurantName} placed successfully!`);

      const remainingCart = cart.filter(item => item.restaurantId !== restaurantId);
      setCart(remainingCart);
      localStorage.setItem('cart', JSON.stringify(remainingCart));

      navigate('/orders');
    } catch (error) {
      alert('Failed to place order.');
    }
  };

  const groupedCart = cart.reduce((acc, item, index) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        restaurantName: item.restaurantName,
        items: [],
        indices: []
      };
    }
    acc[item.restaurantId].items.push(item);
    acc[item.restaurantId].indices.push(index);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cart & Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-10">
          {Object.keys(groupedCart).map((restaurantId) => {
            const group = groupedCart[restaurantId];
            const totalPrice = group.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const info = contactInfo[restaurantId] || { name: '', email: '', address: '' };

            return (
              <div key={restaurantId} className="border p-6 rounded-lg shadow bg-white">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">🏪 {group.restaurantName}</h2>

                <div className="space-y-4 mb-6">
                  {group.items.map((item, idx) => {
                    const originalIndex = group.indices[idx];
                    return (
                      <div key={originalIndex} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">${item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(originalIndex, Number(e.target.value))}
                            className="border p-1 w-16 text-center"
                          />
                          <button
                            onClick={() => removeItem(originalIndex)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-right text-xl font-bold">
                    Subtotal: ${totalPrice}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4 bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold">Contact & Delivery Information for {group.restaurantName}</h3>
                  <div>
                    <label className="block mb-1 text-sm">Name</label>
                    <input
                      type="text"
                      value={info.name}
                      onChange={(e) => handleContactChange(restaurantId, 'name', e.target.value)}
                      required
                      className="w-full border p-2 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Email</label>
                    <input
                      type="email"
                      value={info.email}
                      onChange={(e) => handleContactChange(restaurantId, 'email', e.target.value)}
                      required
                      className="w-full border p-2 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Delivery Address</label>
                    <input
                      type="text"
                      value={info.address}
                      onChange={(e) => handleContactChange(restaurantId, 'address', e.target.value)}
                      required
                      placeholder="Enter delivery address"
                      className="w-full border p-2 rounded bg-white"
                    />
                  </div>
                  <button
                    onClick={() => handleCheckout(restaurantId, group.restaurantName, group.items, totalPrice)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full font-bold"
                  >
                    Place Order for {group.restaurantName}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
