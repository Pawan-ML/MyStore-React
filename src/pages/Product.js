import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Product = ({ categories, handleLogout }) => {
    return (
        <>
            <Navbar categories={categories} handleLogout={handleLogout} />
            <h1 style={{ textAlign: 'center' }}>Product</h1>
        </>
    )
}

export default Product;
