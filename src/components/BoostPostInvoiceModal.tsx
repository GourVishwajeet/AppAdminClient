import type { FC } from 'react';
import { Modal } from './Modal';
import type { BoostedPostData } from '../constants/mockData';
import logo from '../assets/Logo.svg';

interface BoostPostInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  postData: BoostedPostData;
}

export const BoostPostInvoiceModal: FC<BoostPostInvoiceModalProps> = ({ 
  isOpen, 
  onClose, 
  postData 
}) => {
  const calculateTotal = () => {
    const price = parseInt(postData.boostPrice.replace('$', ''));
    const hours = parseInt(postData.boostTime.split(' ')[0]);
    return price * hours;
  };

  const total = calculateTotal();
  const tax = Math.round(total * 0.1); // 10% tax
  const grandTotal = total + tax;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-[#2B2B2B] pb-8">
        <div className="w-[286px] h-[100px]">
          <img src={logo} alt="Logo" className="w-[286px] h-[100px]" />
        </div>
        <div>
          <div className="w-[245px] h-[104px] grid grid-cols-3 gap-x-4 border border-[#2B2B2B] rounded-[8px] p-[6px] relative">
            <div className="flex flex-col justify-between pb-3 pt-4 pl-4">
              <div>
                <p className="text-[8px] text-[#FFFFFF]"> Issued:</p>
                <p className="font-semibold text-[12px] text-[#FFFFFF] whitespace-nowrap">{postData.uploadTime}</p>
              </div>
              <div>
                <p className="text-[8px] text-[#FFFFFF]">Due date:</p>
                <p className="font-semibold text-[12px] text-[#FFFFFF] whitespace-nowrap">{postData.uploadTime}</p>
              </div>
            </div>
            {/* Vertical divider */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-[#2B2B2B] -translate-x-1/2"></div>
            <div className="pl-12 pt-4">
              <p className="text-[8px] text-[#FFFFFF] whitespace-nowrap">Invoice Number:</p>
              <p className="font-semibold text-[12px] text-[#FFFFFF] whitespace-nowrap pl-1">N°: 000027</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="border border-[#2B2B2B] rounded-[8px] overflow-hidden mb-8 pb-16 flex justify-center items-center">
        <div className="p-4 w-[515px] h-[250px]">
            <table className="w-[480px] h-[210px]">
                <thead>
                    <tr>
                    <th className="text-left p-4 font-medium text-[#FFFFFF] text-[8px]">Post ID</th>
                    <th className="text-left p-4 font-medium text-[#FFFFFF] text-[8px]">Upload ID</th>
                    <th className="text-left p-4 font-medium text-[#FFFFFF] text-[8px]">Days</th>
                    <th className="text-right p-4 font-medium text-[#FFFFFF] text-[8px]">Price</th>
                    <th className="text-right p-4 font-medium text-[#FFFFFF] text-[8px]">Total</th>
                    </tr>
                </thead>
            <tbody className="w-[480px]">
                <tr>
                    <td colSpan={5} className="p-0">
                        <div className="bg-[#484848]/70 rounded-[8px] overflow-hidden">
                            <div className="border-b border-gray-600 p-4">
                                <div className="flex">
                                    <span className="text-[10px] text-[#FFFFFF] w-[112px] font-semibold">{postData.postId}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[130px] font-semibold">{postData.uploadTime}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[80px] font-semibold">1</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[40px] text-right font-semibold">{postData.boostPrice}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[95px] text-right font-semibold">${total}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-600 p-4">
                                <div className="flex">
                                    <span className="text-[10px] text-[#FFFFFF] w-[112px] font-semibold">{postData.postId}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[130px] font-semibold">{postData.uploadTime}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[80px] font-semibold">1</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[40px] text-right font-semibold">{postData.boostPrice}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[95px] text-right font-semibold">${total}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-600 p-4">
                                <div className="flex">
                                    <span className="text-[10px] text-[#FFFFFF] w-[112px] font-semibold">{postData.postId}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[130px] font-semibold">{postData.uploadTime}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[80px] font-semibold">1</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[40px] text-right font-semibold">{postData.boostPrice}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[95px] text-right font-semibold">${total}</span>
                                </div>
                            </div>
                            <div className="border-b border-gray-600 p-4">
                                <div className="flex">
                                    <span className="text-[10px] text-[#FFFFFF] w-[112px] font-semibold">{postData.postId}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[130px] font-semibold">{postData.uploadTime}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[80px] font-semibold">1</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[40px] text-right font-semibold">{postData.boostPrice}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[95px] text-right font-semibold">${total}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex">
                                    <span className="text-[10px] text-[#FFFFFF] w-[112px] font-semibold">{postData.postId}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[130px] font-semibold">{postData.uploadTime}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[80px] font-semibold">1</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[40px] text-right font-semibold">{postData.boostPrice}</span>
                                    <span className="text-[10px] text-[#FFFFFF] w-[95px] text-right font-semibold">${total}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-12">
        {/* Left side - Total due */}
        <div className="flex-1 -mt-6 pl-6">
          <span className="text-[12px] text-[#FFFFFF]">Total due</span>
          <div className="border border-[#2B2B2B] rounded-[8px] p-4 mt-2 w-[131px] h-[46px] flex items-center">
              <span className="text-[18px] font-semibold text-[#FFFFFF]">₹{grandTotal}</span>
          </div>
        </div>
        
        {/* Right side - Subtotal, TAX, Grand Total */}
        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[10px] text-[#FFFFFF]">Subtotal</span>
              <span className="text-[10px] font-regular text-[#FFFFFF]">₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-[#FFFFFF]">TAX</span>
              <span className="text-[10px] font-regular text-[#FFFFFF]">₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-[12px] text-[#FFFFFF]">
              <span className="text-[10px] font-semibold text-[#FFFFFF]">Grand Total</span>
              <span className="text-[10px] font-semibold text-[#FFFFFF]">₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
