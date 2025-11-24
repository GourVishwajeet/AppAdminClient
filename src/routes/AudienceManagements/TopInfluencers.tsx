import React, { useState } from "react";
import type { UserDataProps } from "./UserdataProps";
import IconActions from "./IconActions";
import Paginate from "./Paginate";

interface Props {
  allUsers: UserDataProps[];
}

const ITEMS_PER_PAGE = 10;


const TopInfluencers: React.FC<Props> = ({ allUsers }) => {
  const [currPage, setCurrPage] = useState(1);

  const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);

  const startIndex = (currPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

const currentUsers = allUsers.slice(startIndex, endIndex);


  // Slice users for current page

  return (
    <div style={{ backgroundColor: "#090914ff" }} className="w-full">
      <div className="w-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="flex justify-between px-4 py-4">
          <h1 className="font-bold text-white">Top Influencers</h1>

          <div className="flex gap-4">
            {/* Search */}
          </div>
        </div>

        {/* Table */}
        <div className="px-4 py-2">
          <div className="border border-gray-700 rounded-lg shadow-md bg-black overflow-x-auto">
            
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-xs border-b border-gray-700">
                    <th className="px-2 py-2 text-left"><input type="checkbox" /></th>
                  <th className="py-2 text-left">
                    <div className="flex items-center">
                     <span>User Name</span>
                     <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-28" src="/images/Vector.png" />
                    </div> 
                  </th>
                  <th className="py-2 text-left">
                    <div className="flex items-center">
                      <span>Ai User ID</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-4" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className="py-2 text-left ">
                    <div className="flex items-center">
                      <span>Mobile no.</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-5" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className="px-2 py-2 text-left">
                    <div className="flex items-center">
                      <span>Gender</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-5" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className="px-2 py-2 text-left">
                    <div className="flex items-center">
                      <span>Date of Birth</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-5" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className=" py-2 text-left">
                    <div className="flex items-center">
                      <span>Country</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-5" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <div className="flex items-center">
                      <span>Status</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-5" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className=" py-2 text-left flex">
                    <div className="flex items-center">
                      <span>Post</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-2" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className=" py-2 text-left">
                    <div className="flex items-center gap-1">
                      <span>User Traffic</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-4" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className=" py-2 text-left flex">
                    <div className="flex items-center gap-1">
                      <span>Total Likes</span>
                      <img className="w-2 h-1 mt-1 cursor-pointer block translate-x-5" src="/images/Vector.png" />
                    </div>
                  </th>
                  <th className="px-5 py-2 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((items, index) => (
                  <tr key={index} className="text-xs border-b border-gray-700 text-white">
                     <td className="px-2 py-2"><input type="checkbox" /></td>
                    <td className="py-2">
                      <div className="flex gap-1 items-center">
                        <img
                          src="/images/profile.png"
                          alt="profile"
                          style={{ borderRadius: "30%", height: "30px", width: "30px" }}
                        />
                        <div>
                          <h1>{items.name}</h1>
                          <p className="text-gray-400">{items.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-2 py-1">{items.id}</td>
                    <td className="py-1">{items.mobileNumber}</td>
                    <td className="px-2 py-1">{items.gender}</td>
                    <td className="px-2 py-1">{items.dob}</td>
                    <td className="px-2 py-1">{items.country}</td>
                    <td className="px-2 py-1">{items.status}</td>
                    <td className="px-2 py-1">{items.posts}</td>
                    <td className="px-2 py-1">{items.traffic}</td>
                    <td className="px-2 py-1">{items.likes}</td>
                    

                    <td className="px-2 py-3">
                      <IconActions />
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
      <Paginate
        currpage={currPage}
        dataLength={allUsers.length}
        setCurrPage={setCurrPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TopInfluencers;
