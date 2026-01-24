import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (token) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (res.data.msg === "Login success") {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid email or password"
          : "Server error. Try again."
      );
    }
  };
  // -------------------------------------------------------COOKIE---------------------------------------------------
  // Redirect if already logged in
  //STEP 1 ----------------> it will show the (unAuthorized) in console
  // useEffect(() => {
  //   axios
  //     .get("/api/auth/dashboard", {
  //       withCredentials: true,
  //     })
  //     .then(() => navigate("/dashboard", { replace: true }))
  //     .catch(() => {});
  // }, [navigate]);
  // -------------------------------------------------- Or ------------------------------------------------
  // useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(
  //     (res) => res,
  //     (err) => {
  //       if (err.response?.status === 401) {
  //         navigate("/login", { replace: true });
  //       }
  //       return Promise.reject(err);
  //     }
  //   );

  //   return () => axios.interceptors.response.eject(interceptor);
  // }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-teal-700 text-white p-3 rounded-lg">
          Login
        </button>
        <p className="text-center text-sm mt-4">
          {" "}
          Don’t have an account?{" "}
          <span
            className="text-teal-900 cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            {" "}
            Register{" "}
          </span>{" "}
        </p>
      </form>
    </div>
  );
}
