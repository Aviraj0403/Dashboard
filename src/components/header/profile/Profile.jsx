import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit, MdKey, MdOutlineLogout } from 'react-icons/md';
import { useAuth } from '../../../context/userContext.jsx'; // Import the useAuth hook

function Profile() {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { handleLogout, userData } = useAuth(); // Use handleLogout and userData from the AuthContext

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function from context
    navigate('/login'); // Redirect to the login page after logout
  };

  // Extract user information from userData
  const { username, email, phone } = userData || {};

  return (
    <div className="profile-container absolute top-[10vh] right-[-50px] border shadow-md rounded-b-2xl bg-white p-8">
      <div className="upper flex items-center flex-col justify-center px-3 py-2">
        <div>
          <div className="relative border-2 border-red-500 rounded-full border-dashed">
            <img
              src="https://demo.foodscan.xyz/images/default/profile.png"
              className="p-1 w-24 h-24 rounded-full"
              alt=""
            />
            <AiOutlineEdit
              size={38}
              className="absolute bottom-[-10px] left-[32%] border-2 p-1 rounded-full bg-black text-white"
            />
          </div>
        </div>
        <div className="text-center p-3">
          <h2 className="font-bold">{ userData?.user?.username|| 'Loading...'}</h2>
          <p className="text-sm font-semibold text-gray-500">
            {email || 'Loading...'}
          </p>
          <p className="text-sm font-semibold text-gray-500">
            {phone || 'Loading...'}
          </p>
        </div>
      </div>
      <div className="lower-links px-3 py-3 flex flex-col gap-2">
        <Link className="flex items-center gap-3 text-gray-600 hover:text-orange-500">
          <MdEdit /> Edit Profile
        </Link>
        <hr />
        <Link className="flex items-center gap-3 text-gray-600 hover:text-orange-500">
          <MdKey /> Change Password
        </Link>
        <hr />
        <Link
          onClick={handleLogoutClick} // Call the logout handler on click
          className="flex items-center gap-3 text-gray-600 hover:text-orange-500"
        >
          <MdOutlineLogout className="rotate-180" /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Profile;
