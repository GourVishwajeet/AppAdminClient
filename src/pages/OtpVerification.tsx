import { useState, type FC, useRef, useEffect } from 'react';

interface OtpVerificationProps {
  email: string;
  onVerify: (otp: string) => void;
}

export const OtpVerification: FC<OtpVerificationProps> = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      if (otpString === '123456') {
        onVerify(otpString);
      } else {
        alert('Invalid OTP. Please enter 123456.');
      }
    } else {
      alert('Please enter a valid 6-digit OTP');
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
                Enter OTP 🔐
              </h2>
              <p className="text-[12px] text-[#888888] font-medium mt-1">
                An authentication OTP has been sent to <span className="text-white font-semibold">{email}</span>.
              </p>
            </div>

            {/* Separator Line */}
            <div className="w-full border-t-3 border-dashed border-[#333333] mb-6"></div>

            {/* OTP Input */}
            <div className="space-y-2 mb-4">
              <label className="text-[14px] font-medium text-white mb-2 block">
                Enter OTP <span className="text-[#FF0000]">*</span>
              </label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] bg-black border border-[#FFFFFF] rounded-[8px] text-center text-white text-[18px] font-medium focus:outline-none focus:border-[#8000FF] transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Verify OTP Button */}
          <button
            type="submit"
            className="w-full h-[50px] rounded-[8px] bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-white font-bold text-[16px] hover:opacity-90 transition-opacity flex items-center justify-center mt-6"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};
