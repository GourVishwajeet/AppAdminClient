import type { FC } from 'react';

interface EmailSentSuccessProps {
    email: string;
    onResend: () => void;
    onBackToLogin: () => void;
}

export const EmailSentSuccess: FC<EmailSentSuccessProps> = ({
    email,
    onResend,
    onBackToLogin
}) => {
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
            {/* Card Container */}
            <div className="w-full max-w-[482px] bg-[#1A1A1A] rounded-[24px] border border-[#2A2A2A] p-4 shadow-8xl relative overflow-hidden">

                {/* Content Section */}
                <div className="bg-black rounded-[16px] p-8 border border-[#2A2A2A] flex flex-col items-center">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-[20px] font-medium bg-clip-text text-transparent bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] mb-6">
                            X app Admin
                        </h1>
                        <h2 className="text-[18px] font-semibold text-white mb-2 flex items-center justify-center gap-2">
                            Verify Your Email Address 🔐
                        </h2>
                        <p className="text-[12px] text-[#888888] font-medium mt-3 leading-relaxed max-w-[320px] mx-auto">
                            We've sent mail to <span className="text-white font-semibold">{email}</span> with a link to activate your account.
                        </p>
                    </div>

                    {/* Email Provider Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                        <a
                            href="https://mail.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 h-[46px] border border-[#2A2A2A] rounded-[8px] hover:bg-[#1A1A1A] transition-colors"
                        >
                            <img src="/src/assets/com.svg" alt="Gmail" className="w-5 h-5" />
                            <span className="text-[12px] text-white font-medium">Open Gmail</span>
                        </a>
                        <a
                            href="https://outlook.live.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 h-[46px] border border-[#2A2A2A] rounded-[8px] hover:bg-[#1A1A1A] transition-colors"
                        >
                            {/* Using a rough approximation of outlook logo color/shape for UI mockup purposes */}
                            <div className="w-5 h-5 bg-[#0078D4] rounded-sm flex items-center justify-center text-[10px] font-bold text-white">O</div>
                            <span className="text-[12px] text-white font-medium">Outlook</span>
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-t border-dashed border-[#333333] mb-6"></div>

                    {/* Spam Notice */}
                    <p className="text-[12px] text-white font-medium mb-8">
                        Didn't Receive an Email? Check Your Spam Folder!
                    </p>

                    {/* Resend Action */}
                    <button
                        onClick={onResend}
                        className="w-full h-[50px] rounded-[8px] bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-white font-bold text-[16px] hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                        Resend OTP
                    </button>

                    {/* Back to Login */}
                    <button
                        onClick={onBackToLogin}
                        className="mt-6 text-[13px] text-[#888888] font-medium hover:text-white transition-colors"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};
