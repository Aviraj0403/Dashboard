import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRestaurantId } from '../../context/userContext';
import './FoodMenu.css';

const FoodMenu = () => {
    const restaurantId = useRestaurantId();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoods = async () => {
            if (!restaurantId) {
                setError('Restaurant ID is not available.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/api/food/${restaurantId}/list-food`);
                setFoods(response.data.data);
            } catch (err) {
                setError('Failed to fetch food items');
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, [restaurantId]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="food-menu">
            <h1 className="menu-title">Food Menu</h1>
            <div className="food-items">
                {foods.map(food => (
                    <div className="food-item" key={food._id}>
                        <img src={food.imageUrl} alt={food.name} className="food-thumbnail" />
                        <h2 className="food-name">{food.name}</h2>
                        <p className="food-description">{food.description}</p>
                        <p className="food-price">Price: ₹{food.price.toFixed(2)}</p>
                        <button className="add-button">Add</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodMenu;
