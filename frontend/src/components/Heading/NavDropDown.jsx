import React from 'react'
import { NavIcon } from './NavIcon';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { PiSignOutThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import image from '../../assets/image.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NavDropDown = () => {

  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      // Redirect to login page after successful logout
      navigate("/login");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong")
      }
    }
  };

  return (
    <div className=" text-right relative top-1">
      <Menu>
        <MenuButton className="inline-flex items-center rounded-full   text-sm/6 font-semibold text-white ">
            <img src={image} alt="/" className='size-10 rounded-full min-w-10'/>
            <ChevronDownIcon className="size-4 fill-white/60 relative top-2 -left-4" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50 "
        >
          <MenuItem>
            <a href='/profile' className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-300">
              <IoMdContact className="size-4 " color='gray'/>
                Profile
              <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘E</kbd>
            </a>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-300">
              <IoSettingsOutline  className="size-4" color='gray'/>
              Settings
              <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-300">
              <ArchiveBoxXMarkIcon className="size-4 " color='grey'/>
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘A</kbd>
            </button>
          </MenuItem>


          <MenuItem>
            <button type='submit' onClick ={handleLogout} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-300">
              <PiSignOutThin className="size-4" color='grey'/>
              Logout
              <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘S</kbd>
            </button>
          </MenuItem>

        </MenuItems>
      </Menu>
    </div>
  )
}

export default NavDropDown