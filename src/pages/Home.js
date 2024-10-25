import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { Link } from "react-router-dom";
//import './Home.css'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/products");
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-4 mb-5">Welcome to MyStore</h1>

        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                {/* <img
                  src={product.imageUrl} 
                  className="card-img-top"
                  alt={product.name}
                /> */}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link to={`/products/${product.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional UI elements */}
        <div className="text-center mt-5">
          <h2>Discover New Arrivals</h2>
          <p>Check out our latest products and find something special!</p>
          <Link to="/categories" className="btn btn-dark">
            View 
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
