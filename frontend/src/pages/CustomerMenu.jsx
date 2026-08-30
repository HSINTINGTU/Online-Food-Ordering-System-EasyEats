import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const CustomerMenu = () => {
  const [groupedMenus, setGroupedMenus] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axiosInstance.get('/api/menus');
        const grouped = response.data.reduce((acc, menu) => {
          const restaurantName = menu.userId?.name || 'Unknown Restaurant';
          const restaurantId = menu.userId?._id || 'unknown';
          
          if (!acc[restaurantName]) {
            acc[restaurantName] = { restaurantId, items: [] };
          }
          acc[restaurantName].items.push(menu);
          return acc;
        }, {});

        setGroupedMenus(grouped);
      } catch (error) {
        alert('Failed to fetch menus.');
      }
    };
    fetchMenus();
    
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (menuItem, restaurantName, restaurantId) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingIndex = existingCart.findIndex(item => item.menuId === menuItem._id);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...existingCart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [
        ...existingCart, 
        { 
          menuId: menuItem._id, 
          name: menuItem.name, 
          price: menuItem.price, 
          quantity: 1,
          restaurantName,
          restaurantId
        }
      ];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${menuItem.name} added to cart!`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants & Menus</h1>
      
      {Object.keys(groupedMenus).length === 0 ? (
        <p>No restaurants available.</p>
      ) : (
        Object.keys(groupedMenus).map((restaurantName) => (
          <div key={restaurantName} className="mb-10 border-b pb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🏪 {restaurantName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {groupedMenus[restaurantName].items.map((menu) => (
                <div key={menu._id} className="border p-4 rounded shadow bg-white">
                  <h3 className="text-xl font-semibold">{menu.name}</h3>
                  <p className="text-gray-600 my-2">{menu.description}</p>
                  <p className="text-green-600 font-bold mb-4">${menu.price}</p>
                  <button
                    onClick={() => addToCart(menu, restaurantName, groupedMenus[restaurantName].restaurantId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerMenu;
