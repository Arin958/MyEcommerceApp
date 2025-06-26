import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../store/auth/authSlice";
 // update path as needed

const EmailVerificationCode = () => {
  const dispatch = useDispatch();
  const { status, error: reduxError } = useSelector((state) => state.auth);
  
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!paste) return;
    const newCode = [...code];
    for (let i = 0; i < paste.length; i++) {
      newCode[i] = paste[i];
      inputRefs.current[i].value = paste[i];
    }
    setCode(newCode);
    setError("");
    inputRefs.current[Math.min(paste.length, 4)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 5) {
      setError("Please enter a complete 5-digit code");
      return;
    }
    dispatch(verifyEmail(verificationCode));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-white bg-opacity-5 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg overflow-hidden">
        <div className="p-6 text-center bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
          <p className="text-white text-opacity-90 mt-2">Enter the 5-digit code sent to your email</p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  defaultValue={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-14 h-14 text-center text-2xl font-semibold bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {(error || reduxError) && (
              <div className="mb-4 text-sm text-red-400 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error || reduxError}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "verifying"}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                status === "verifying"
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              }`}
            >
              {status === "verifying" ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn't receive a code?{" "}
              <button className="text-pink-400 hover:text-pink-300 font-medium" onClick={() => alert("New code sent!")}>
                Resend code
              </button>
            </p>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-400">
            Having trouble? <a href="#" className="text-pink-400 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationCode;
