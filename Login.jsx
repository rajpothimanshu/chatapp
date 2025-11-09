import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/user/login";
      const response = await axios.post(url, data, {
        withCredentials: true, // to send cookies
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setAuthenticated(true);
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md border border-gray-700 p-6 space-y-6 bg-gray-800">
        <h1 className="text-2xl font-bold text-white text-center">
          Sign in to your account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Your email
            </label>
            <input
              onChange={handleChange}
              value={data.email}
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              className="w-full p-2 border rounded-lg bg-gray-700 text-white sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              onChange={handleChange}
              value={data.password}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-2 border rounded-lg bg-gray-700 text-white sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border rounded focus:ring-2 focus:ring-indigo-500 bg-gray-700"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>

          {/* Register link */}
          <p className="text-sm text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <Link to="/register" className="font-medium text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
