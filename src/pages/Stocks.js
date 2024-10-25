import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Stocks = ({ categories, handleLogout }) => {
  const [stocks, setStocks] = useState([]);
  const [editedStock, setEditedStock] = useState({ id: null, name: '', qty: '', price: '' });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/products');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handleEditClick = (id, name, qty, price) => {
    setEditedStock({ id, name, qty, price });
  };

  const handleUpdate = async (id) => {
    try {
      const { name, qty, price } = editedStock;
      const response = await axios.put(`http://localhost:8081/products/${id}`, { name, qty, price });
  
      if (response.status === 200) {
        const updatedStocks = stocks.map(stock => {
          if (stock.id === id) {
            return { ...stock, qty: editedStock.qty, price: editedStock.price };
          }
          return stock;
        });
        setStocks(updatedStocks);
        setEditedStock({ id: null, name: '', qty: '', price: '' });
        console.log('Stock updated successfully');
      } else {
        console.error('Failed to update stock');
      }
    } catch (error) {
      console.error('Error updating stock:', error.message || error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/products/${id}`);
      if (response.status === 200) {
        const updatedStocks = stocks.filter(stock => stock.id !== id);
        setStocks(updatedStocks);
        console.log('Stock deleted successfully');
      } else {
        console.error('Failed to delete stock');
      }
    } catch (error) {
      console.error('Error deleting stock:', error.message || error);
    }
  };

  const handleCancelEdit = () => {
    setEditedStock({ id: null, name: '', qty: '', price: '' });
  };

  return (
    <div className="container-fluid px-0"> 
    <Navbar categories={categories} handleLogout={handleLogout} />
    <div className="container mt-4"> 
      <h1 className="text-center mt-4 mb-5">Stocks</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.name}</td>
                <td>
                  {editedStock.id === stock.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedStock.qty}
                      onChange={(e) => setEditedStock({ ...editedStock, qty: e.target.value })}
                    />
                  ) : (
                    stock.qty
                  )}
                </td>
                <td>
                  {editedStock.id === stock.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedStock.price}
                      onChange={(e) => setEditedStock({ ...editedStock, price: e.target.value })}
                    />
                  ) : (
                    stock.price
                  )}
                </td>
                <td>
                  {editedStock.id === stock.id ? (
                    <>
                      <button className="btn btn-dark mr-2" onClick={() => handleUpdate(stock.id)}>Save</button>
                      <button className="btn btn-secondary mr-2" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn btn-dark mr-5" onClick={() => handleEditClick(stock.id, stock.name, stock.qty, stock.price)}>
                      Edit
                    </button>
                  )}
                  <button className="btn btn-dark" onClick={() => handleDelete(stock.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Stocks;
