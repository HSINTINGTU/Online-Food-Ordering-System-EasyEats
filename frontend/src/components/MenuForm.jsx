import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const MenuForm = ({ menus, setMenus, editingMenu, setEditingMenu }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    if (editingMenu) {
      setFormData({
        name: editingMenu.name,
        description: editingMenu.description || '',
        price: editingMenu.price,
      });
    } else {
      setFormData({ name: '', description: '', price: '' });
    }
  }, [editingMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMenu) {
        const response = await axiosInstance.put(`/api/menus/${editingMenu._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMenus(menus.map((menu) => (menu._id === response.data._id ? response.data : menu)));
      } else {
        const response = await axiosInstance.post('/api/menus', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMenus([...menus, response.data]);
      }
      setEditingMenu(null);
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      alert('Failed to save menu item.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingMenu ? 'Edit Menu Item' : 'Add Menu Item'}</h1>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingMenu ? 'Update Menu Item' : 'Add Menu Item'}
      </button>
    </form>
  );
};

export default MenuForm;