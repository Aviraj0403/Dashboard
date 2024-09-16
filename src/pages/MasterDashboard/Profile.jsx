// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const Profile = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     accountNumber: '',
//     coverPhoto: '',
//     photo: '',
//     role: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setProfile({
//         name: user.fullName,
//         email: user.email,
//         phone: user.phone,
//         accountNumber: user.accountNumber,
//         coverPhoto: user.coverPhoto,
//         photo: user.avatar,
//         role: user.role
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = async (e) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       const formData = new FormData();
//       formData.append(name, files[0]);

//       try {
//         const response = await axios.post('/api/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         setProfile(prev => ({ ...prev, [name]: response.data.imageUrl }));
//       } catch (error) {
//         console.error('File upload failed:', error);
//       }
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`/api/owner/users/${user._id}`, profile, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Profile update failed:', error);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <img src={profile.photo} alt="Profile" />
//         <input type="file" name="photo" onChange={handleFileChange} />
//         {isEditing && <input type="file" name="coverPhoto" onChange={handleFileChange} />}
//       </div>
//       <div className="profile-details">
//         {isEditing ? (
//           <div>
//             <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
//             <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
//             <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
//             <input type="text" name="accountNumber" value={profile.accountNumber} onChange={handleInputChange} />
//             <select name="role" value={profile.role} onChange={handleInputChange}>
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="manager">Manager</option>
//               <option value="owner">Owner</option>
//               <option value="pos_operator">POS Operator</option>
//               <option value="guest">Guest</option>
//             </select>
//             <button onClick={handleSave}>Save</button>
//           </div>
//         ) : (
//           <div>
//             <h2>{profile.name}</h2>
//             <p>{profile.email}</p>
//             <p>{profile.phone}</p>
//             <p>{profile.accountNumber}</p>
//             <p>Role: {profile.role}</p>
//           </div>
//         )}
//         <button onClick={() => setIsEditing(!isEditing)}>
//           {isEditing ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
