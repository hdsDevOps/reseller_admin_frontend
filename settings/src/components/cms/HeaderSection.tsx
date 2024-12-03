import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import '../../styles/styles.css';
import { getMenuThunk, updateMenuThunk } from 'store/user.thunk';
import { useAppDispatch } from "store/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialMenu = {
  menu1: "",
  menu2: "",
  menu3: "",
  menu4: "",
  menu5: "",
  menu6: ""
}

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // const [menus, setMenus] = React.useState(['Price & Plan', 'About Us', "FAQ's", 'Resources', 'AI', 'Contact Us',]);
  const [menus, setMenus] = useState(initialMenu);
  const [newMenu, setNewMenu] = useState(menus);
  // console.log(newMenu);

  const fetchMenus = async() => {
    try {
      const result = await dispatch(getMenuThunk()).unwrap();
      setMenus(result);
    } catch (error) {
      setMenus(initialMenu);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleChange = e => {
    setNewMenu({
      ...newMenu,
      [e.target.name]: e.target.value
    })
  };

  const handleSave = async(e) => {
    e.preventDefault();
    setIsModalOpen(false);
    try {
      const updateMenus = await dispatch(updateMenuThunk({
        menu1: newMenu.menu1,
        menu2: newMenu.menu2,
        menu3: newMenu.menu3,
        menu4: newMenu.menu4,
        menu5: newMenu.menu5,
        menu6: newMenu.menu6
      })).unwrap();
      setTimeout(() => {
        toast.success(updateMenus?.message);
      }, 1000);
    } catch (error) {
      toast.error("Error updating menus");
    } finally {
      fetchMenus();
    }
  };

  return (
    <div className="sm:p-4 p-0 bg-white">
      <ToastContainer />
      <div className="flex items-center justify-start mx-4 mb-3">
        <button className="btn-cms" onClick={() => {
          setIsModalOpen(true);
          setNewMenu(menus);
        }}>
          EDIT
        </button>
      </div>
      <div className="space-y-4">
        <div
          className="grid grid-cols-1 overflow-x-auto border border-custom-white bg-custom-white-2 my-4"
        >
          <table
            className="sm:px-7 px-2 min-w-full"
          >
            <tbody>
              {Array.from({ length: 6 }, (_, index) => {
                const menuKey = `menu${index+1}`
                return(
                  <tr key={index}>
                    <td className="banner-table-td-1 w-[70px] pl-7 py-3">Menu {index+1}</td>
                    <td className="px-3 text-center banner-table-td-1 w-[50px] py-3">:</td>
                    <td className="banner-table-td-2 py-3">{menus[menuKey]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
      </div>
      <Dialog
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setIsModalOpen(false);
          setNewMenu(menus);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[1053px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >Edit Header</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-white'
                      onClick={() => {
                        setIsModalOpen(false)
                        setNewMenu(menus);
                      }}
                    >+</button>
                  </div>
                </div>
                <form
                  className="grid sm:grid-cols-3 grid-cols-1 max-h-[400px]"
                  onSubmit={handleSave}
                >
                  {
                    Array.from({ length: 6 }, (_, index) => {
                      const menuKey = `menu${index+1}`
                      return(
                        <div
                          key={index}
                          className="sm:col-span-2 flex flex-col"
                        >
                          <label
                            className="search-input-label"
                          >Menu {index+1}</label>
                          <input
                            type="text"
                            className="search-input-text"
                            placeholder="Enter the name"
                            defaultValue={menus[menuKey]}
                            name={menuKey}
                            onChange={handleChange}
                          />
                        </div>
                      )
                    })
                  }
                  <div className="sm:col-span-2 flex flex-row max-sm:justify-center gap-3 pt-4">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setNewMenu(menus);
                      }}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default HeaderSection;
