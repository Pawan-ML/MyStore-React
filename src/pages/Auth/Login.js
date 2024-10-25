import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            "username": username,
            "password": password,
        }

        try {
            console.log("Login data:", data); // Check if data is correct

            const response = await axios.post("http://localhost:8081/auth/login", data);
            
            console.log("Response:", response); // Log the response

            if (response.status === 200) {
                // Store the token in frontend
                localStorage.setItem("token", response.data);

                // Use this as the default token for axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

                navigate("/");
            } else {
                console.log("Login error");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <div className="login-page" style={{ backgroundColor: '#f0f0f0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#333' }}>
            <div style={{ width: '300px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-center mb-4">
                    <h3>User Login</h3>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '8px', backgroundColor: '#007bff', color: '#333', border: 'none', cursor: 'pointer' }}>Login</button>
                </form>
                <div className="text-center mt-3">
                    <p style={{ color: '#333' }}>Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
