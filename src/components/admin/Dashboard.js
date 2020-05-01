import React from 'react';
import AdminLayout from '../../HOC/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="user_dashboard">
                Welcome to admin panel. You will be able to change most of the contents from the left sidebar.
            </div>
        </AdminLayout>
    );
};

export default Dashboard;