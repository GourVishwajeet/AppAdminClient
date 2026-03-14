import { useState, type FC } from 'react';
import viewActionIcon from '../assets/view.svg';
// Note: reusing view.svg as the "eye" icon for password visibility for now. 
// If a specific 'eye-off' is needed we might need to add it, but this serves the purpose.

interface LoginProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

export const Login: FC<LoginProps> = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let isValid = true;
    if (!email) {
      setEmailError('Please enter valid email address. (e.g., username@example.com)');
      isValid = false;
    } else if (!email.toLowerCase().endsWith('@gmail.com')) {
      setEmailError('Please enter a valid Gmail address (e.g., user@gmail.com)');
      isValid = false;
    }

    if (isValid && email && password && captchaChecked) {
      onLogin();
    } else if (!email) {
      // Already handled
    } else {
      // Just a basic check, in real app would show validation errors
      if (!captchaChecked) alert('Please verify you are not a robot');
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full h-full max-w-[482px] min-h-[574px] bg-[#1A1A1A] rounded-[24px] border border-[#2A2A2A] p-4 shadow-8xl relative overflow-hidden">

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>

          {/* Black Inset Section */}
          <div className="bg-black rounded-[16px] p-6 border border-[#2A2A2A]">

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-[20px] font-medium bg-clip-text text-transparent bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)]">
                X app Admin
              </h1>
              <h2 className="text-[18px] font-semibold text-white mb-2 mt-6">
                Hii, Welcome!
              </h2>
              <p className="text-[14px] text-[#888888] font-medium">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Separator Line */}
            <div className="w-full border-t-3 border-dashed border-[#333333] mb-6"></div>

            {/* Email Input */}
            <div className="space-y-2 mb-4">
              <label className="text-[14px] font-medium text-white">
                Email <span className="text-[#FF0000]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="Enter Your Email"
                className={`w-full h-[50px] bg-black border rounded-[8px] px-4 text-white text-[14px] placeholder-[#666666] focus:outline-none transition-colors mt-2 ${emailError ? 'border-[#FF0000] focus:border-[#FF0000]' : 'border-[#FFFFFF] focus:border-[#8000FF]'}`}
              />
              {emailError && (
                <p className="text-[#FF0000] text-[12px] mt-1 font-medium">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2 mb-4">
              <label className="text-[14px] font-medium text-white">
                Password <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="w-full h-[50px] bg-black border border-[#FFFFFF] rounded-[8px] px-4 text-white text-[14px] placeholder-[#666666] focus:outline-none focus:border-[#8000FF] transition-colors pr-12 mt-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 mt-1"
                >
                  <img
                    src={viewActionIcon}
                    alt="Toggle Password"
                    className={`w-5 h-5 opacity-50 hover:opacity-100 transition-opacity ${showPassword ? '' : 'filter grayscale'}`}
                  />
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-[18px] h-[18px] border rounded-[4px] flex items-center justify-center transition-colors ${rememberMe ? 'bg-white border-white' : 'border-[#666666] bg-transparent'}`}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="hidden"
                  />
                  {rememberMe && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4.5L4.33333 8L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-white font-medium">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[13px] text-[#FFFFFF] font-medium hover:text-[#FF0091] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Mock reCAPTCHA */}
            <div className="py-2 flex items-center justify-center mt-6">
              <div className="w-[302px] bg-[#1A1A1A] border border-[#333333] rounded-[4px] p-3 flex items-center justify-between max-w-[300px] mx-auto sm:mx-0">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setCaptchaChecked(!captchaChecked)}
                    className="w-[28px] h-[28px] border-[2px] border-[#C1C1C1] bg-white rounded-[2px] cursor-pointer flex items-center justify-center hover:border-[#888888] transition-colors"
                  >
                    {captchaChecked && (
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 8L7.5 13L17.5 3" stroke="#009900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[14px] text-white font-regular">I'm not a robot</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-[32px] h-[32px] relative mb-1">
                    {/* Using a simple reload icon SVG representation to mimic Recaptcha logo */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.9381 10C19.9381 10 20.0786 10.2222 20.2074 10.4573C21.4659 12.7533 21.0569 15.6033 19.2227 17.4374C17.6181 19.0421 15.3411 19.648 13.2381 19.2621" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4.06189 14C4.06189 14 3.92138 13.7778 3.79255 13.5427C2.53411 11.2467 2.94314 8.39674 4.77726 6.56262C6.38194 4.95794 8.65891 4.35196 10.7619 4.73792" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" />
                      <path d="M11 11L13 13L11 15" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Note: This is a rough approximation of the logo. For pixel perfect we'd need the image asset. */}
                  </div>
                  <div className="text-[8px] text-[#888888] leading-tight text-center">
                    reCAPTCHA<br />
                    <span className="text-[7px]">Privacy - Terms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[50px] rounded-[8px] bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-white font-bold text-[16px] hover:opacity-90 transition-opacity flex items-center justify-center mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
