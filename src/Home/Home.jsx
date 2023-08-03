import React from 'react';
import { Outlet } from 'react-router-dom';
import NabBar from '../Navbar/NabBar';

const Home = () => {
    return (
        <div>
            <NabBar></NabBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;