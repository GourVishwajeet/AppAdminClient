import { useState, type FC } from 'react';
import viewActionIcon from '../assets/view.svg';

interface ResetPasswordProps {
  onSubmit: (password: string) => void;
}

const MOCK_OLD_PASSWORD = '123456';

export const ResetPassword: FC<ResetPasswordProps> = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    
    // Reset errors
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword) {
        // Handle empty if needed, logic says "if (newPassword && confirmPassword)" 
        // but user wants specific errors. We can skip empty check focus or just handle matches.
    }

    if (newPassword === MOCK_OLD_PASSWORD) {
       setNewPasswordError('New password cannot be the same as the previous password.');
       isValid = false;
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
       setConfirmPasswordError('The password confirmation does not match.');
       isValid = false;
    }

    if (isValid && newPassword && confirmPassword) {
      onSubmit(newPassword);
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
                Set New Password
              </h2>
              <p className="text-[12px] text-[#888888] font-medium mt-1">
                Please enter new password and submit to set new password.
              </p>
            </div>

            {/* Separator Line */}
            <div className="w-full border-t-3 border-dashed border-[#333333] mb-6"></div>

            {/* New Password Input */}
            <div className="space-y-2 mb-4">
              <label className="text-[14px] font-medium text-white">
                New Password <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (newPasswordError) setNewPasswordError('');
                  }}
                  placeholder="Enter Your New Password"
                  className={`w-full h-[50px] bg-black border rounded-[8px] px-4 text-white text-[14px] placeholder-[#666666] focus:outline-none transition-colors pr-12 mt-2 ${newPasswordError ? 'border-[#FF0000] focus:border-[#FF0000]' : 'border-[#FFFFFF] focus:border-[#8000FF]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 mt-1"
                >
                  <img 
                    src={viewActionIcon} 
                    alt="Toggle Password" 
                    className={`w-5 h-5 opacity-50 hover:opacity-100 transition-opacity ${showNewPassword ? '' : 'filter grayscale'}`} 
                  />
                </button>
              </div>
              {newPasswordError && (
                 <p className="text-[#FF0000] text-[12px] mt-1 font-medium">{newPasswordError}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2 mb-4">
              <label className="text-[14px] font-medium text-white">
                Confirm Password <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError('');
                  }}
                  placeholder="Enter Your Confirm Password"
                  className={`w-full h-[50px] bg-black border rounded-[8px] px-4 text-white text-[14px] placeholder-[#666666] focus:outline-none transition-colors pr-12 mt-2 ${confirmPasswordError ? 'border-[#FF0000] focus:border-[#FF0000]' : 'border-[#FFFFFF] focus:border-[#8000FF]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 mt-1"
                >
                  <img 
                    src={viewActionIcon} 
                    alt="Toggle Password" 
                    className={`w-5 h-5 opacity-50 hover:opacity-100 transition-opacity ${showConfirmPassword ? '' : 'filter grayscale'}`} 
                  />
                </button>
              </div>
              {confirmPasswordError && (
                 <p className="text-[#FF0000] text-[12px] mt-1 font-medium">{confirmPasswordError}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[50px] rounded-[8px] bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-white font-bold text-[16px] hover:opacity-90 transition-opacity flex items-center justify-center mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
