import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../../../service/userApi.js'; // Update the import based on your file structure

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            setLoading(true);
            setError(''); // Reset error state before fetching
            try {
                const data = await getRestaurantById(id);
                setRestaurant(data.restaurant); // Adjust based on your API response structure
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
                setError('Failed to fetch restaurant details');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantDetails();
    }, [id]);

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{restaurant.name}</h2>
            <p><strong>Owner:</strong> {restaurant.ownerId?.username || 'N/A'}</p>
            <p><strong>Manager:</strong> {restaurant.managerId?.username || 'N/A'}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p>
                <strong>Contact:</strong> 
                {restaurant.contactInfo?.phone ? ` ${restaurant.contactInfo.phone}` : ' N/A'},
                {restaurant.contactInfo?.email ? ` ${restaurant.contactInfo.email}` : ' N/A'}
            </p>
            <h3 className="text-xl font-semibold mt-4">Subscription Details</h3>
            <ul>
                {restaurant.subscriptionRecords?.length > 0 ? (
                    restaurant.subscriptionRecords.map(record => (
                        <li key={record._id}>
                            <strong>Plan:</strong> {record.plan}, 
                            <strong> Status:</strong> {record.status}, 
                            <strong> Expiry:</strong> {new Date(record.endDate).toLocaleDateString()}
                        </li>
                    ))
                ) : (
                    <li>No subscription records found.</li>
                )}
            </ul>
        </div>
    );
};

export default RestaurantDetail;
