import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MdHome, MdSettings, MdMail, MdNotifications, MdBarChart, MdPalette } from 'react-icons/md';

const settingsOptions = [
  { to: 'company', label: 'Company', icon: <MdHome /> },
  { to: 'site', label: 'Site', icon: <MdSettings /> },
  { to: 'branches', label: 'Branches', icon: <MdHome /> },
  { to: 'mail', label: 'Mail', icon: <MdMail /> },
  { to: 'otp', label: 'OTP', icon: <MdSettings /> },
  { to: 'notification', label: 'Notification', icon: <MdNotifications /> },
  { to: 'notification-alert', label: 'Notification Alert', icon: <MdNotifications /> },
  { to: 'analytics', label: 'Analytics', icon: <MdBarChart /> },
  { to: 'theme', label: 'Theme', icon: <MdPalette /> },
  { to: 'currencies', label: 'Currencies', icon: <MdSettings /> },
  { to: 'item-categories', label: 'Item Categories', icon: <MdSettings /> },
  { to: 'item-attributes', label: 'Item Attributes', icon: <MdSettings /> },
  { to: 'taxes', label: 'Taxes', icon: <MdSettings /> },
  { to: 'pages', label: 'Pages', icon: <MdSettings /> },
  { to: 'role-permissions', label: 'Role & Permissions', icon: <MdSettings /> },
  { to: 'languages', label: 'Languages', icon: <MdSettings /> },
  { to: 'sms-gateway', label: 'SMS Gateway', icon: <MdSettings /> },
  { to: 'payment-gateway', label: 'Payment Gateway', icon: <MdSettings /> },
  { to: 'license', label: 'License', icon: <MdSettings /> },
];

const SecondarySidebar = () => {
  return (
    <div className=' flex gap-5'>
      <div className=" w-72 bg-white shadow-md text-black h-[91vh] left-30 z-20 overflow-y-auto"> {/* Changed right-0 to left-0 */}
      <div className="p-6">
        <ul>
          {settingsOptions.map((option) => (
            <li key={option.to}>
              <NavLink
                to={option.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm mb-1 ${isActive ? 'bg-gray-200 text-orange-400' : 'hover:bg-gray-200'}`
                }
              >
                <span className="mr-3 text-xl">{option.icon}</span>
                {option.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
    {<Outlet/>}
    </div>
  );
};

export default SecondarySidebar;
