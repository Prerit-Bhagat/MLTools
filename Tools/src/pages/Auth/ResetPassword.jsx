import React, { useState, useContext } from "react";
import { AuthContext } from "@pages/Context/Auth";

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(token, newPassword);
    alert(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Reset token"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
