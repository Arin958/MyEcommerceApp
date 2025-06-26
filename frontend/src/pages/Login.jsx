import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/authSlice";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { mergeCarts } from "../store/cart/cartSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, guestId, loading, error, success } = useSelector(
    (state) => state.auth
  );

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. First await the login
    const loginResult = await dispatch(loginUser(formData));
    
    // 2. Only proceed if login succeeded
    if (loginUser.fulfilled.match(loginResult)) {
      // 3. Clear form after successful login
      setFormData({
        email: "",
        password: "",
      });

      // 4. Now merge carts with the new user ID
      if (guestId) {
        await dispatch(mergeCarts({ 
          guestId, 
          userId: loginResult.payload.user._id // Use the fresh user ID
        }));
        localStorage.removeItem("guestId");
      }

      // 5. Navigate only after everything completes
      navigate("/");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  

  // useEffect(() => {
  //   if (user && guestId) {
  //     dispatch(mergeCarts({ guestId, userId: user._id }));
  //     localStorage.removeItem("guestId");
  //   }

  // });

  // Redirect to home on successful login & cart fetch/merge

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/90 mt-1">Sign in to your account</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Social Login Options */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition"
              aria-label="LinkedIn Login"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition"
              aria-label="GitHub Login"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition"
              aria-label="Google Login"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.805 10.023h-9.598v3.954h5.637a4.796 4.796 0 01-2.073 3.148v2.614h3.354c1.965-1.813 3.098-4.47 3.098-7.716 0-.655-.066-1.29-.418-1.9z"
                  fill="#4285F4"
                />
                <path
                  d="M12.208 21.5c2.665 0 4.906-.878 6.54-2.384l-3.355-2.615c-.92.62-2.1.992-3.185.992-2.447 0-4.521-1.65-5.26-3.865H3.466v2.43a9.297 9.297 0 008.742 5.442z"
                  fill="#34A853"
                />
                <path
                  d="M6.947 13.628a5.566 5.566 0 010-3.648v-2.43H3.466a9.297 9.297 0 000 8.89l3.481-2.812z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.208 7.33c1.448 0 2.753.5 3.777 1.476l2.83-2.828c-1.63-1.516-3.868-2.45-6.607-2.45-3.225 0-6.002 1.915-7.419 4.66l3.48 2.812c.72-2.19 2.807-3.67 5.136-3.67z"
                  fill="#EA4335"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
