import { useState } from "react";
import { Link } from "react-router-dom";

function Delete() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
    .then(res => res.text())
    .then(msg => {
      setIsLoading(false);
      if (msg === "delete done") {
        setMessage(`User "${username}" deleted successfully!`);
        setIsSuccess(true);
        setUsername("");
      } else {
        setMessage(msg);
        setIsSuccess(false);
      }
    })
    .catch(err => {
      setIsLoading(false);
      setMessage("Error: " + err.message);
      setIsSuccess(false);
    });
  };

  return (
    <div className="delete-page">
      <style>{`
        .delete-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 10% 20%, rgb(18, 16, 26) 0%, rgb(30, 24, 47) 90%);
          font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }
        .delete-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px rgba(255, 255, 255, 0.08) solid;
          border-radius: 20px;
          padding: 40px 30px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          text-align: center;
          box-sizing: border-box;
        }
        .delete-card h3 {
          color: #ffffff;
          margin-top: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .delete-card p.subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .form-group {
          margin-bottom: 24px;
          text-align: left;
        }
        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .input-wrapper {
          position: relative;
        }
        .input-wrapper input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .input-wrapper input:focus {
          border-color: #ff4757;
          box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }
        .delete-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
          margin-top: 10px;
        }
        .delete-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 71, 87, 0.5);
        }
        .delete-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .message-box {
          margin-top: 20px;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          animation: fadeIn 0.4s ease;
        }
        .message-box.success {
          background: rgba(46, 213, 115, 0.15);
          border: 1px solid rgba(46, 213, 115, 0.3);
          color: #2ed573;
        }
        .message-box.error {
          background: rgba(255, 71, 87, 0.15);
          border: 1px solid rgba(255, 71, 87, 0.3);
          color: #ff4757;
        }
        .nav-links {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #ffffff;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="delete-card">
        <h3>Delete Account</h3>
        <p className="subtitle">Please enter the username of the account you want to delete. This action is permanent and cannot be undone.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="delete-btn"
            disabled={isLoading || !username.trim()}
          >
            {isLoading ? "Deleting..." : "Delete User"}
          </button>
        </form>

        {message && (
          <div className={`message-box ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <div className="nav-links">
          <Link to="/" className="nav-link">← Back to Home</Link>
          <Link to="/update" className="nav-link">Update Profile →</Link>
        </div>
      </div>
    </div>
  );
}

export default Delete;
