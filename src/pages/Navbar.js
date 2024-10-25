import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const Navbar = ({ categories }) => {
    const navigate = useNavigate(); 
    const [collapsed, setCollapsed] = useState(true); 

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate("/login"); 
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">MyStore</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${collapsed ? '': 'show'}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/manage-products" className="nav-link px-3 text-white">Manage Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link px-3 text-white">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stocks" className="nav-link px-3 text-white">Stocks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/checkout" className="nav-link px-3 text-white">Checkout</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-secondary ms-auto" onClick={handleLogoutClick}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
