import React from "react";
import HeaderEditModal from "./components/HeaderEditModal";


const HeaderSection = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [menus, setMenus] = React.useState([
    { id: 1, title: 'Price & Plan' },
    { id: 2, title: 'About Us' },
    { id: 3, title: "FAQ's" },
    { id: 4, title: 'Resources' },
    { id: 5, title: 'AI' },
    { id: 6, title: 'Contact Us' }
  ]);

  const handleSave = () => {
    // Implement logic to save the updated menu titles
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="flex items-center justify-start p-4 border-b">
        <button
        onClick={() => setIsModalOpen(true)}
          className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600"
        >
          EDIT
        </button>
      </div>
      <div className="p-6">
        {menus.map((menu) => (
          <div key={menu.id} className="flex items-center space-x-4">
            <span className="w-24 text-gray-600">Menu {menu.id}</span>
            <span className="px-2">:</span>
            <span>{menu.title}</span>
          </div>
        ))}
      </div>
      <HeaderEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menus={menus}
        onSave={handleSave}
        />
    </div>
  );
};

export default HeaderSection;
