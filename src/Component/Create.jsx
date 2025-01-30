import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './post.css'; // Import your external CSS file

export default function Post() {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [newTitle, setNewTitle] = useState(""); // Title input state
  const [newPost, setNewPost] = useState(""); // Content input state
  const [message, setMessage] = useState(""); // Message for success/error
  const navigate = useNavigate();

  // Check authentication before fetching posts
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Verify authentication
        await axios.get("http://localhost:3000/api/posts", {
          withCredentials: true,
        });
        getUserPosts(); // Fetch posts if authenticated
      } catch (error) {
        // If not authenticated, redirect to login
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Fetch user posts from the server or from localStorage if available
  const getUserPosts = async () => {
    // Try to load posts from localStorage if available
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      setPosts(storedPosts); // Set posts from localStorage
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/posts", {
        withCredentials: true,
      });

      // Check if response contains posts and ensure posts is an array
      if (response.data && Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
        localStorage.setItem("posts", JSON.stringify(response.data.posts)); // Store posts in localStorage
      } else {
        setPosts([]); // Set empty array if no posts are found
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to load posts");
      setPosts([]); // Ensure posts is an empty array on error
    }
  };

  // Create a new post
  const createPost = async () => {
    try {
      // Validate input
      if (!newTitle.trim() || !newPost.trim()) {
        setMessage("Title and Content are required");
        return;
      }

      // Send the new post to the server
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        { title: newTitle, content: newPost }, // Send both title and content
        { withCredentials: true }
      );

      // Assuming the response contains the created post
      const createdPost = response.data;

      // Update posts array with the new post
      const updatedPosts = [createdPost, ...posts];
      setPosts(updatedPosts); // Add the new post at the top
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update localStorage
      setMessage(response.data.message || "Post created successfully");
      setNewTitle(""); // Clear title input
      setNewPost(""); // Clear content input
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to create post");
    }
  };

  // Logout function to clear cookies and redirect
  const logout = async () => {
    try {
      // Make a request to the server to log out the user
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      // localStorage.removeItem("posts"); // Remove posts from localStorage
      navigate("/"); // Redirect to login page
    } catch (error) {
      setMessage("Failed to log out");
    }
  };

  return (
    <div className="post-container">
      <h2 className="title">User Posts</h2>

      {/* Logout Button */}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>

      <div className="post-form">
        {/* Title Input */}
        <input
          className="input-field"
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        {/* Content Input */}
        <textarea
          className="textarea-field"
          placeholder="Write a new post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        {/* Create Post Button */}
        <button className="create-button" onClick={createPost}>
          Create Post
        </button>
      </div>

      {/* Display User Posts */}
      <h3 className="posts-header">Your Posts</h3>
      {posts.length > 0 ? (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post._id} className="post-item">
              <h4 className="post-title">{post.title}</h4>
              <p className="post-content">{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}

      {/* Display Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
