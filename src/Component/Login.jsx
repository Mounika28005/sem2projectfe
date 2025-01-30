import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Ensure the correct path

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & signup
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "login" : "signup";
      const data = isLogin ? { email, password } : { email, password, username };

      const response = await axios.post(
        `http://localhost:3000/api/auth/${endpoint}`,
        data,
        { withCredentials: true }
      );

      setMessage(response.data.message || "Action completed");
      navigate("/posts");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <button className="auth-btn" onClick={handleSubmit}>
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
