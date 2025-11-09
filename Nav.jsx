import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed bottom-5 right-5 h-10 w-10 lg:hidden items-center justify-center bg-primary rounded-full z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Sidebar */}
      {isMobile && (
        <header className="fixed h-screen w-[150px] z-40 lg:static bg-background shadow-lg flex flex-col justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex gap-2 items-center justify-center border-b p-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="font-semibold text-xl">Swift</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col my-4 flex-1 justify-between px-2">
            <div className="flex flex-col gap-5">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-2 rounded hover:bg-primary/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 20.25v-1.125A6.375 6.375 0 0110.875 12h2.25A6.375 6.375 0 0119.5 19.125V20.25"
                  />
                </svg>
                <span>Profile</span>
              </Link>

              <Link
                to="/chathome"
                className="flex items-center gap-2 p-2 rounded hover:bg-primary/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12h.008v.008H12V12z"
                  />
                </svg>
                <span>Chats</span>
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 p-2 mb-4 rounded hover:bg-red-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 12h10.125"
                />
              </svg>
              Logout
            </button>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
