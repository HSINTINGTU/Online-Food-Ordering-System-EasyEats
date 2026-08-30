import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const CustomerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (error) {
      alert('Failed to fetch orders.');
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axiosInstance.delete(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      alert('Failed to delete order.');
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order._id);
    setName(order.name);
    setEmail(order.email);
  };

  const handleUpdate = async (id) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/api/orders/${id}`, {
        name,
        email
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(orders.map(o => o._id === id ? response.data : o));
      setEditingOrder(null);
    } catch (error) {
      alert('Failed to update order.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const restaurantName = order.items[0]?.menuId?.userId?.name || 'Restaurant';

            return (
              <div key={order._id} className="border p-4 rounded shadow bg-white flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-blue-600">🏪 {restaurantName}</h2>

                  <div className="bg-gray-50 p-3 rounded border space-y-1">
                    <p className="text-sm font-semibold text-gray-700">Items Ordered:</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex justify-between">
                        <span>• {item.menuId?.name || 'Item'}</span>
                        <span className="font-medium">x {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {editingOrder === order._id ? (
                    <div className="space-y-2 pt-2">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Name:</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email:</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <p className="font-semibold">{order.name} ({order.email})</p>
                      <p className="text-gray-600">Total: ${order.totalPrice} | Status: {order.status}</p>
                    </div>
                  )}
                </div>

                <div className="space-x-2 flex items-center">
                  {editingOrder === order._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(order._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrder(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(order)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
