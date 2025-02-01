import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './post.css';  // Assuming you have CSS for styling

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, [navigate]);

  const checkAuthentication = async () => {
    try {
      await axios.get(" http://localhost:3000/api/posts/", { withCredentials: true });
      getUserPosts(); // Fetch posts if authenticated
    } catch (error) {
      console.error("Authentication failed:", error);
      navigate("/"); // Redirect to login if not authenticated
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts/", { withCredentials: true });
      if (response.data && Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      setMessage("Failed to load posts");
    }
  };

  const createPost = async () => {
    if (!newTitle.trim() || !newPost.trim()) {
      setMessage("Title and Content are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/posts/", { title: newTitle, content: newPost }, { withCredentials: true });
      setPosts([response.data, ...posts]);
      setMessage("Post created successfully");
      setNewTitle("");
      setNewPost("");
    } catch (error) {
      setMessage("Failed to create post");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      setPosts([]); // Clear posts on logout
      navigate("/"); // Redirect to login after logout
    } catch (error) {
      setMessage("Failed to log out");
    }
  };

  return (
    <div className="post-container">
      <h2>User Posts</h2>
      <button className="logout-button" onClick={logout}>Logout</button>
      <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <textarea placeholder="Write a new post..." value={newPost} onChange={(e) => setNewPost(e.target.value)} />
      <button onClick={createPost}>Create Post</button>

      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
