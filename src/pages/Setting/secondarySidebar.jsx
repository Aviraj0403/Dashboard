// SecondarySidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdSettings, MdMail, MdNotifications, MdBarChart, MdPalette } from 'react-icons/md';

const settingsOptions = [
  { to: '/settings/company', label: 'Company', icon: <MdHome /> },
  { to: '/settings/site', label: 'Site', icon: <MdSettings /> },
  { to: '/settings/branches', label: 'Branches', icon: <MdHome /> },
  { to: '/settings/mail', label: 'Mail', icon: <MdMail /> },
  { to: '/settings/otp', label: 'OTP', icon: <MdSettings /> },
  { to: '/settings/notification', label: 'Notification', icon: <MdNotifications /> },
  { to: '/settings/notification-alert', label: 'Notification Alert', icon: <MdNotifications /> },
  { to: '/settings/analytics', label: 'Analytics', icon: <MdBarChart /> },
  { to: '/settings/theme', label: 'Theme', icon: <MdPalette /> },
  { to: '/settings/currencies', label: 'Currencies', icon: <MdSettings /> },
  { to: '/settings/item-categories', label: 'Item Categories', icon: <MdSettings /> },
  { to: '/settings/item-attributes', label: 'Item Attributes', icon: <MdSettings /> },
  { to: '/settings/taxes', label: 'Taxes', icon: <MdSettings /> },
  { to: '/settings/pages', label: 'Pages', icon: <MdSettings /> },
  { to: '/settings/role-permissions', label: 'Role & Permissions', icon: <MdSettings /> },
  { to: '/settings/languages', label: 'Languages', icon: <MdSettings /> },
  { to: '/settings/sms-gateway', label: 'SMS Gateway', icon: <MdSettings /> },
  { to: '/settings/payment-gateway', label: 'Payment Gateway', icon: <MdSettings /> },
  { to: '/settings/license', label: 'License', icon: <MdSettings /> },
];

const SecondarySidebar = ({ category }) => {
    // console.log(setting);
  // if (category !== 'settings') return null;

  return (
    <div className="w-64 bg-gray-800 text-white h-full mt-16 overflow-y-auto">
      <div className="p-6">
        {/* <p>Secondary Sidebar is rendering!</p> */}
        <ul>
          {settingsOptions.map((option) => (
            <li key={option.to}>
              <NavLink
                to={option.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm ${isActive ? 'bg-gray-600' : 'hover:bg-gray-600'}`
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
  );
};

export default SecondarySidebar;
