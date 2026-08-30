import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import MenuForm from '../components/MenuForm';
import MenuList from '../components/MenuList';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const { user } = useAuth();
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axiosInstance.get('/api/menus', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMenus(response.data);
      } catch (error) {
        alert('Failed to fetch menus.');
      }
    };

    fetchMenus();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === 'restaurant manager' ? 'Menu Management' : 'Browse Menus'}
      </h1>
      {user?.role === 'restaurant manager' && (
        <MenuForm
          menus={menus}
          setMenus={setMenus}
          editingMenu={editingMenu}
          setEditingMenu={setEditingMenu}
        />
      )}
      <MenuList menus={menus} setMenus={setMenus} setEditingMenu={setEditingMenu} />
    </div>
  );
};

export default Menu;