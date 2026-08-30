import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [f_name, setFname] = useState("");
  const [l_name, setLname] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(f_name, l_name, email, password);

    try {
      const res = await axios.post("/api/auth/register", {
        f_name,
        l_name,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("User already exists");
      } else {
        setError("Registration failed");
      }
    }
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {error && <p className="text-center text-red-500">{error}</p>}
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input
          type="text"
          placeholder="First Name"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={f_name}
          onChange={(e) => setFname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={l_name}
          onChange={(e) => setLname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-400 transition">
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-orange-600 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
