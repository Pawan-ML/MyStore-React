import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        const data = {
            "username": username,
            "password": password,
            "email": email,
        }

        const response = await axios.post("http://localhost:8081/auth/register", data);

        if (response.status === 200) {
            navigate("/login");
        } else {
            console.log("error");
        }
    }

    return (
        <div className="register-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
            <div style={{ width: '300px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-center mb-4">
                    <h3>User Register</h3>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required />
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required />
                    </div>
                    <div className="form-group mb-3">
                        <input type="email" className="form-control" onChange={handleEmail} placeholder="Email Address" required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Register</button>
                </form>
                <div className="text-center mt-3">
                    <p style={{ color: '#333' }}>Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register;
