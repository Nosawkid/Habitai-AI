import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // SIMULATE LOGIC
    setTimeout(() => {
        // NOTE: We REMOVED the "Access Denied" block.
        // Now everyone can enter.

        const isMsrit = email.toLowerCase().endsWith("@msrit.edu");
        const role = isMsrit ? "Student (Verified)" : "Student (Guest)";

        // Save user details
        localStorage.setItem("user", JSON.stringify({ email, role }));

        setLoading(false);
        window.location.href = "/"; // Redirect to Home
    }, 1500);
    };
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Student Login</h2>
          <p className="text-gray-500 text-sm mt-1">Habitat-AI MSRIT Edition</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-6 border border-red-200 text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              College Email ID
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="usn@msrit.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-3 rounded-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Verifying Credentials..." : "Secure Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          By logging in, you agree to the anonymous audit policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
