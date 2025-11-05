import React, { useState, useEffect } from "react";
import { account } from "../appwriteConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserId(params.get("userId") || "");
    setSecret(params.get("secret") || "");
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
  });

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Passwords do not match!",
      });
      return;
    }

    setLoading(true);

    try {
      await account.updateRecovery(userId, secret, password);
      Toast.fire({
        icon: "success",
        title: "Password reset successfully!",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: err.message || "Failed to reset password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleReset} className="auth-form">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
