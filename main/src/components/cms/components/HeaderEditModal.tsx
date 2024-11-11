import React from 'react';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

interface HeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  menus: { id: number; title: string }[];
  onSave: () => void;
}

const HeaderEditModal: React.FC<HeaderEditModalProps> = ({ isOpen, onClose, menus, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Header</h2>
        </div>

        <div className="space-y-6">
          {menus.map((menu) => (
            <div key={menu.id} className="space-y-2">
              <div className="flex items-center gap-2 relative">
                <div className="w-24 text-sm text-gray-500 absolute bg-white px-2 -top-2 left-2">
                  Menu {menu.id}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    defaultValue={menu.title}
                    placeholder={`Enter Menu ${menu.id} title`}
                    className="w-[80%] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={onSave}
          >
            Save
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#E02424] text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#E02424]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HeaderEditModal;