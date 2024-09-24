import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantOwnerProfile } from '../../../service/userApi.js'; // Adjust the import path as needed

const OwnerProfile = () => {
    const { ownerId } = useParams();
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOwnerProfile = async () => {
            setLoading(true);
            try {
                const profileData = await getRestaurantOwnerProfile(ownerId);
                setOwnerProfile(profileData);
            } catch (error) {
                console.error("Error fetching owner profile:", error);
                setError('Failed to fetch owner profile');
            } finally {
                setLoading(false);
            }
        };

        fetchOwnerProfile();
    }, [ownerId]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!ownerProfile) return <p>No profile data available.</p>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{ownerProfile.username}'s Profile</h2>
            <p>Email: {ownerProfile.email}</p>
            <h3 className="text-xl mt-4">Restaurants</h3>
            <ul>
                {ownerProfile.restaurants.map(restaurant => (
                    <li key={restaurant._id}>
                        {restaurant.name} - {restaurant.location}
                    </li>
                ))}
            </ul>
            <h3 className="text-xl mt-4">Subscription Records</h3>
            <ul>
                {ownerProfile.subscriptionRecords.map(record => (
                    <li key={record._id}>
                        {record.restaurantId?.name} - Status: {record.status} (Valid until: {new Date(record.endDate).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OwnerProfile;
