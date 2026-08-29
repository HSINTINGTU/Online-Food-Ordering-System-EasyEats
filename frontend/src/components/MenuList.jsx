import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const MenuList = ({ menus, setMenus, setEditingMenu }) => {
  const { user } = useAuth();

  const handleDelete = async (menuId) => {
    try {
      await axiosInstance.delete(`/api/menus/${menuId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMenus(menus.filter((menu) => menu._id !== menuId));
    } catch (error) {
      alert('Failed to delete menu item.');
    }
  };

  return (
    <div>
      {menus.map((menu) => (
        <div key={menu._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-lg">{menu.name}</h2>
          <p>{menu.description}</p>
          <p className="text-gray-700 font-semibold mt-1">Price: ${menu.price}</p>
          {user?.role === 'restaurant manager' && (
            <div className="mt-2">
              <button
                onClick={() => setEditingMenu(menu)}
                className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(menu._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;