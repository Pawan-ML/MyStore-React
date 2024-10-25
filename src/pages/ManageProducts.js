import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(0);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/products");
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/categories");
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleQty = (event) => {
    setQty(event.target.value);
  };

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      qty: qty,
      categoryId: categoryId,
    };

    try {
      const response = await axios.post("http://localhost:8081/products", data);
      setProducts([...products, response.data]);
      setName('');
      setPrice('');
      setQty(0);
      setCategoryId(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <>
      <Navbar categories={categories} />
      <h1 className=" row justify-content-center mt-4 mb-5">Manage Products</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '300px', margin: '20px 0' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block' }}>Product Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleName}
              value={name || ''}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block' }}>Product Price</label>
            <input
              type="text"
              required
              onChange={handlePrice}
              value={price || ''}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block' }}>Product Qty</label>
            <input
              type="text"
              required
              onChange={handleQty}
              value={qty}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block' }}>Category</label>
            <select required onChange={handleCategory} style={{ width: '100%', padding: '5px' }}>
              <option>Please Select</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <button className="btn btn-dark" type="submit" style={{ width: '100%' }}>
            Save Product
          </button>
        </form>

        {/* <button onClick={getProducts} style={{ marginBottom: '20px', padding: '8px 16px' }}>
          Load Products
        </button>

    <ol style={{ listStyle: 'none', padding: '0', width: '300px', color: '#333' }}>
      {products &&
        products.map((product) => (
          <li key={product.id} style={{ textDecoration: 'none' }}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {product.name}
            </Link>
          </li>
        ))}
    </ol> */}

      </div>
    </>
  );
};

export default ManageProducts;
