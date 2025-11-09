import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const checkUser = async () => {
      await checkAuth(); // ensure auth status is updated
      if (isAuthenticated) navigate("/");
    };
    checkUser();
  }, [checkAuth, isAuthenticated, navigate]);

  // Verify email
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/user/${id}/verify/${token}`);
        toast.success(response.data.message);
        setVerified(true);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [id, token]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-4">
      {loading && (
        <div className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-20 h-20 animate-spin text-indigo-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116"
              fill="currentFill"
            />
          </svg>
          <span className="mt-4 text-lg">Loading...</span>
        </div>
      )}

      {!loading && verified && (
        <div className="text-center">
          <p className="text-xl font-medium mb-4">Verification Successful!</p>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          )}
        </div>
      )}

      {!loading && !verified && (
        <p className="text-red-400 text-lg">Verification failed. Please try again.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
