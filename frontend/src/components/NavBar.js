import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const context = useContext(AuthContext);
  const user = context?.user;
  const logout = context?.logout;

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="font-bold">HRMS System</h1>
      {user ? (
        <div>
          <span className="mr-4">{user.name}</span>
          <button onClick={logout} className="btn-secondary">Logout</button>
        </div>
      ) : (
        <a href="/" className="btn-primary">Login</a>
      )}
    </nav>
  );
}
