import { useState, type FC } from 'react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
  onOtpSent: (email: string) => void;
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ onBackToLogin, onOtpSent }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Please enter valid email address. (e.g., username@example.com)');
    } else {
      // Handle OTP sending logic mock
      onOtpSent(email);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-[482px] bg-[#1A1A1A] rounded-[24px] border border-[#2A2A2A] p-4 shadow-8xl relative overflow-hidden">
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          {/* Black Inset Section */}
          <div className="bg-black rounded-[16px] p-6 border border-[#2A2A2A]">
            
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-[20px] font-medium bg-clip-text text-transparent bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)]">
                X app Admin
              </h1>
              <h2 className="text-[18px] font-semibold text-white mb-2 mt-6 flex items-center justify-center gap-2">
                Forgot Password 🔐
              </h2>
              <p className="text-[12px] text-[#888888] font-medium mt-1">
                You can always reset it. Enter your email address below
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
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full h-[50px] rounded-[8px] bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-white font-bold text-[16px] hover:opacity-90 transition-opacity flex items-center justify-center mt-6"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};
