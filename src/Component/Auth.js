// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./login.css";  // Ensure this matches the actual path

// export default function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (endpoint) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/auth/${endpoint}`,
//         { email, password },
//         { withCredentials: true }
//       );
//       navigate("/posts");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={() => handleSubmit("login")}>Login</button>
//     </div>
//   );
// }
