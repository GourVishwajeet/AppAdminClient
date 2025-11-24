import React from "react";


const IconActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
        <div style={{ width: "14px", height: "14px" }}
          className="flex justify-center items-center">
          <img src="/images/view.png" alt="view profile" />
        </div>

      <div style={{ width: "12px", height: "12px" }}
        className="flex justify-center items-center">
        <img src="/images/edit1.png" alt="edit profile" />
      </div>

      <div style={{ width: "14px", height: "14px" }}
        className="flex justify-center items-center">
        <img src="/images/block.png" alt="block profile" />
      </div>

      <div style={{ width: "14px", height: "20px" }}
        className="flex justify-center items-center">
        <img src="/images/delete.png" alt="delete profile" />
      </div>
    </div>
  );
};

export default IconActions;
