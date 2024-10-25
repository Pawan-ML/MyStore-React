import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar'; 

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const params = useParams();

    const handleLogout = () => {};

    const getCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8081/categories");
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleInputChange = (e) => {
        setNewCategoryName(e.target.value);
    };

    const addCategory = async () => {
        try {
            const response = await axios.post("http://localhost:8081/categories", { name: newCategoryName });
    
            if (response.status === 201) {
                console.log('New category added successfully:', response.data);
                
                setNewCategoryName('');
                
                getCategories();
            } else {
                console.error('Failed to add new category.');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };
    
    

    return (
        <>
            <Navbar categories={categories} handleLogout={handleLogout} />
            <h1 className=" row justify-content-center mt-4 mb-5">Categories</h1>
            <div className="container mt-5">
                <div className="row">
                    {categories.map((category) => (
                        <div key={category.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                    <Link className="btn btn-dark">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add New Category</h5>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter new category name"
                                        value={newCategoryName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={addCategory}
                                >
                                    Add Category
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
