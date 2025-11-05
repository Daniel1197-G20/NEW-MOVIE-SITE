
import React, { useState } from "react";
import { account } from "../appwriteConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
  });

  const handleRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
      Toast.fire({
        icon: "success",
        title: "Recovery email sent! Check your inbox.",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: err.message || "Failed to send recovery email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRecovery} className="auth-form">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Recovery Email"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
