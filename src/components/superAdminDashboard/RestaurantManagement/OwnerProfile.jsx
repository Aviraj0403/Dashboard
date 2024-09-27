import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
    getRestaurantOwnerProfile,
    updateSubscriptionRecord,
    updateRestaurant
} from '../../../service/userApi.js';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress
} from '@mui/material';

const OwnerProfile = () => {
    const { ownerId } = useParams();
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
    const [openRestaurantDialog, setOpenRestaurantDialog] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [plan, setPlan] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantLocation, setRestaurantLocation] = useState('');

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

    const handleClickOpenSubscription = (record) => {
        setCurrentRecord(record);
        setPlan(record.plan);
        setPaymentStatus(record.paymentStatus);
        setOpenSubscriptionDialog(true);
    };

    const handleClickOpenRestaurant = (restaurant) => {
        setCurrentRestaurant(restaurant);
        setRestaurantName(restaurant.name);
        setRestaurantLocation(restaurant.location);
        setOpenRestaurantDialog(true);
    };

    const handleCloseSubscription = () => {
        setOpenSubscriptionDialog(false);
        resetSubscriptionFields();
    };

    const handleCloseRestaurant = () => {
        setOpenRestaurantDialog(false);
        resetRestaurantFields();
    };

    const resetSubscriptionFields = () => {
        setCurrentRecord(null);
        setPlan('');
        setPaymentStatus('');
    };

    const resetRestaurantFields = () => {
        setCurrentRestaurant(null);
        setRestaurantName('');
        setRestaurantLocation('');
    };

    const handleUpdateSubscription = async () => {
        if (!plan || !paymentStatus) {
            setError('Please fill in all fields');
            return;
        }
        try {
            await updateSubscriptionRecord(currentRecord._id, { plan, paymentStatus });
            handleCloseSubscription();
            const updatedProfile = await getRestaurantOwnerProfile(ownerId);
            setOwnerProfile(updatedProfile);
        } catch (error) {
            console.error("Error updating subscription record:", error);
            setError(error.response?.data?.message || 'Failed to update subscription record');
        }
    };
    

    const handleUpdateRestaurant = async () => {
        if (!restaurantName || !restaurantLocation) {
            setError('Please fill in all fields');
            return;
        }
        try {
            await updateRestaurant(currentRestaurant._id, { name: restaurantName, location: restaurantLocation });
            handleCloseRestaurant();
            const updatedProfile = await getRestaurantOwnerProfile(ownerId);
            setOwnerProfile(updatedProfile);
        } catch (error) {
            console.error("Error updating restaurant:", error);
            setError('Failed to update restaurant');
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen"><CircularProgress /></div>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!ownerProfile) return <p>No profile data available.</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                    {ownerProfile.username.charAt(0).toUpperCase() + ownerProfile.username.slice(1)}'s Profile
                </h2>
                <NavLink
                    to="/admin"
                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    Back to Main
                </NavLink>
            </div>

            <p className="text-lg mb-4">Email: <span className="font-medium">{ownerProfile.email}</span></p>
            <p className="text-lg mb-4">Role: <span className="font-medium">{ownerProfile.role}</span></p>

            <h3 className="text-3xl mt-6 mb-4 text-gray-700">Contact Information</h3>
            <p className="mb-4">Phone: <span className="font-medium">{ownerProfile.contactInfo.phone || 'N/A'}</span></p>
            <p className="mb-4">Email: <span className="font-medium">{ownerProfile.contactInfo.email || 'N/A'}</span></p>

            <h3 className="text-3xl mt-6 mb-4 text-gray-700">Restaurants</h3>
            <Grid container spacing={2}>
                {ownerProfile.restaurants.length > 0 ? (
                    ownerProfile.restaurants.map(restaurant => (
                        <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                            <Card className="hover:shadow-lg transition-shadow duration-200">
                                <CardContent className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="h6" className="font-semibold text-gray-800">{restaurant.name}</Typography>
                                        <Typography variant="body2" className="text-gray-600">{restaurant.location}</Typography>
                                    </div>
                                    <Button variant="contained" color="primary" onClick={() => handleClickOpenRestaurant(restaurant)} className="ml-2">Edit</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
            </Grid>

            <h3 className="text-3xl mt-6 mb-4 text-gray-700">Subscription Records</h3>
            <Grid container spacing={2}>
                {ownerProfile.subscriptionRecords.length > 0 ? (
                    ownerProfile.subscriptionRecords.map(record => (
                        <Grid item xs={12} sm={6} md={4} key={record._id}>
                            <Card className="hover:shadow-lg transition-shadow duration-200">
                                <CardContent className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="h6" className="font-semibold text-gray-800">{record.restaurantId?.name}</Typography>
                                        <Typography variant="body2" className="text-gray-600">
                                            Status: <span className={`font-medium ${record.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{record.status}</span>
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-600">Valid until: <span className="font-medium">{new Date(record.endDate).toLocaleDateString()}</span></Typography>
                                        <Typography variant="body2" className="text-gray-600">Plan: <span className="font-medium">{record.plan}</span></Typography>
                                        <Typography variant="body2" className="text-gray-600">Payment Status: <span className="font-medium">{record.paymentStatus}</span></Typography>
                                    </div>
                                    <Button variant="contained" color="primary" onClick={() => handleClickOpenSubscription(record)} className="ml-2">Edit</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <p>No subscription records found.</p>
                )}
            </Grid>

            {/* Subscription Dialog */}
            <Dialog open={openSubscriptionDialog} onClose={handleCloseSubscription}>
                <DialogTitle>Edit Subscription Record</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Plan"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Payment Status"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSubscription} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdateSubscription} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Restaurant Dialog */}
            <Dialog open={openRestaurantDialog} onClose={handleCloseRestaurant}>
                <DialogTitle>Edit Restaurant</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Restaurant Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={restaurantLocation}
                        onChange={(e) => setRestaurantLocation(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRestaurant} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdateRestaurant} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OwnerProfile;
