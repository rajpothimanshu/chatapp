import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/user/register";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      toast.success(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 300 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md border border-gray-700 p-6 space-y-6 bg-gray-800">
        <h1 className="text-2xl font-bold text-white text-center">
          Create an account
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

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">
                First Name
              </label>
              <input
                onChange={handleChange}
                value={data.firstName}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                className="w-full p-2 border rounded-lg bg-gray-700 text-white sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                onChange={handleChange}
                value={data.lastName}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                className="w-full p-2 border rounded-lg bg-gray-700 text-white sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
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

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border rounded focus:ring-2 focus:ring-indigo-500 bg-gray-700"
                required
              />
            </div>
            <div className="ml-3 text-sm text-gray-300">
              <label htmlFor="terms" className="font-light">
                I accept the{" "}
                <a href="#" className="font-medium text-indigo-400 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create an account
          </button>

          {/* Login Link */}
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
