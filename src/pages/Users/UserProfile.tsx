import type { FC } from 'react';
import { TopBar } from '../../components/TopBar';
import { PostManagement } from '../../components/PostManagement';
import { PostGrid } from '../../components/PostGrid';
import userIcon from '../../assets/user-profile.svg';
import editIcon from '../../assets/edit.svg';

export const UserProfile: FC = () => {
  return (
    <div className="h-full overflow-hidden">
      <TopBar heading="User Profile" />
      
      {/* Content Area */}
      <div className="p-6">
            <div className="flex gap-8">
              {/* Left Side - User Details */}
              <div className="w-1/3">
                {/* Personal Details */}
                <div className="p-2 pt-0">
                  <div className="flex items-center mb-4">
                    <h2 className="text-lg font-semibold bg-linear-to-r from-[#8000FF] to-[#FF0091] bg-clip-text text-transparent">Personal Details</h2>
                    <img src={editIcon} alt="Edit" className="w-[16px] h-[16px] cursor-pointer ml-2" />
                  </div>
                  <div className="flex flex-col space-y-4 mb-4 relative">
                    <div className="flex gap-4">
                      <div className="w-[258px] h-[325px] rounded-[30px] shrink-0 -ml-5">
                        <img src={userIcon} alt="user-profile" className="w-full h-full object-cover rounded-[30px]" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">Name</h4>
                          <h3 className="font-semibold text-white text-lg">Tomiwa</h3>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">Gender</h4>
                          <p className="text-white">Female</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">Date of Birth</h4>
                          <p className="text-white">August 27th, 1999</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">Nationality</h4>
                          <p className="text-white">Nigerian</p>
                        </div>
                      </div>
                    </div>
                    <button className="absolute bottom-12 left-[28%] transform -translate-x-1/2 w-[191px] h-[53px] p-[15px] rounded-[170px] bg-[#000000CC] text-white text-sm font-medium text-center">
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Address and Contact Details */}
                <div className="flex gap-4 -mt-8">
                  {/* Address */}
                  <div className="flex-2 p-2">
                    <h2 className="text-lg font-semibold bg-linear-to-r from-[#8000FF] to-[#FF0091] bg-clip-text text-transparent mb-3">Address</h2>
                    <div className="space-y-[20px] text-[15px]">
                      <div>
                        <h4 className="text-gray-400 text-[15px] mb-1">Address Line</h4>
                        <p className="text-[#FFFFFF] text-[18px] font-medium">No 35 Jimmy Ebi Street</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-[15px] mb-1">City</h4>
                        <p className="text-[#FFFFFF] text-[18px] font-medium">Yenagoa</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-[15px] mb-1">State</h4>
                        <p className="text-[#FFFFFF] text-[18px] font-medium">Bayelsa</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-[15px] mb-1">Country</h4>
                        <p className="text-[#FFFFFF] text-[18px] font-medium">Nigeria</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="flex-1 p-2">
                    <h2 className="text-lg font-semibold bg-linear-to-r from-[#8000FF] to-[#FF0091] bg-clip-text text-transparent mb-3">Contact Details</h2>
                    <div className="space-y-2 text-sm">
                      <div>
                        <h4 className="text-gray-400 text-[15px] mb-1">Phone Number</h4>
                        <p className="text-[#FFFFFF] text-[18px] font-medium">09034867656</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-[15px] mb-1">Email</h4>
                        <p className="text-[#FFFFFF] text-[18px] font-medium">tomilola@me.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Post Management */}
              <div className="flex-1">
                <PostManagement />
                <div className="mt-6">
                  <PostGrid />
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};