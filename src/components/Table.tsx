import type { FC } from 'react';
import { useState } from 'react';
import arrowDownIcon from '../assets/arrow-down.svg';

export interface TableColumn {
  key: string;
  label: string;
  className?: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  showCheckbox?: boolean;
  onCheckboxChange?: (checkedItems: any[]) => void;
}

export const Table: FC<TableProps> = ({ 
  columns, 
  data, 
  className = '', 
  showCheckbox = false, 
  onCheckboxChange 
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
    const newCheckedItems = checked 
      ? new Set<number>(data.map((_, index) => index))
      : new Set<number>();
    setCheckedItems(newCheckedItems);
    onCheckboxChange?.(checked ? data : []);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckedItems = new Set<number>(checkedItems);
    if (checked) {
      newCheckedItems.add(index);
    } else {
      newCheckedItems.delete(index);
    }
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.size === data.length);
    
    const selectedData = data.filter((_, i) => newCheckedItems.has(i));
    onCheckboxChange?.(selectedData);
  };

  return (
    <div className={`shadow-sm overflow-auto ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#515151]">
              {showCheckbox && (
                <th className="px-2 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAllChange(e.target.checked)}
                    className="w-[20px] h-[20px] bg-transparent appearance-none border border-gray-300 rounded-[6px] focus:ring-[#8000FF] cursor-pointer"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-8 py-4 text-left text-sm font-medium text-[#F8FAFF] ${column.className || 'whitespace-nowrap'} ${column.width || 'whitespace-nowrap'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.label}</span>
                    <img
                      src={arrowDownIcon}
                      alt="Sort"
                      className={`w-4 h-4 ${column.key === 'userName' ? 'ml-4 mr-2' : 'ml-2 mr-2'}`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#515151] hover:bg-[#1a1a1a] transition-colors"
              >
                {showCheckbox && (
                  <td className="px-2 py-4 pt-7">
                    <input
                      type="checkbox"
                      checked={checkedItems.has(index)}
                      onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                      className="w-[20px] h-[20px] bg-transparent appearance-none border border-gray-300 rounded-[6px] focus:ring-[#8000FF] cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className={`px-8 py-4 text-sm ${column.width || 'whitespace-nowrap'} ${column.className || ''} ${column.key === 'status' ? 'text-left' : ''}`}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
