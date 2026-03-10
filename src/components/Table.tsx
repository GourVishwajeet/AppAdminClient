import type { FC } from 'react';
import { useState } from 'react';
import arrowDownIcon from '../assets/arrow-down.svg';

export interface TableColumn {
  key: string;
  label: string;
  className?: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
  headerRender?: (column: TableColumn) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  showCheckbox?: boolean;
  rowKey?: string;
  selectedKeys?: Set<string | number>;
  onSelectionChange?: (selectedKeys: Set<string | number>) => void;
  // keeping this for backward compatibility if needed, but we should migrate away
  onCheckboxChange?: (checkedItems: any[]) => void;
}

export const Table: FC<TableProps> = ({ 
  columns, 
  data, 
  className = '', 
  showCheckbox = false,
  rowKey = 'id',
  selectedKeys,
  onSelectionChange,
  onCheckboxChange 
}) => {
  // Local state for uncontrolled usage (fallback)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string | number>>(new Set());
  
  const currentSelectedKeys = selectedKeys || internalSelectedKeys;

  const handleSelectAllChange = (checked: boolean) => {
    const newSelectedKeys = new Set(currentSelectedKeys);
    
    data.forEach((item) => {
      const key = item[rowKey];
      if (checked) {
        newSelectedKeys.add(key);
      } else {
        newSelectedKeys.delete(key);
      }
    });

    if (!selectedKeys) {
      setInternalSelectedKeys(newSelectedKeys);
    }
    
    onSelectionChange?.(newSelectedKeys);

    // Legacy support (optional, can be removed if we migrate all usages)
    if (onCheckboxChange) {
       // This is expensive if we have all data, but usually data is just current page
       // so this only returns selected items present in current data page if we just map data
       // For true "global selection" with legacy callback, we can't easily reconstruction objects from just keys unless we have a lookup
       // So we just return selected items from CURRENT page for now to satisfy interface
       const selectedItems = data.filter(item => newSelectedKeys.has(item[rowKey]));
       onCheckboxChange(selectedItems);
    }
  };

  const handleCheckboxChange = (key: string | number, checked: boolean) => {
    const newSelectedKeys = new Set(currentSelectedKeys);
    if (checked) {
      newSelectedKeys.add(key);
    } else {
      newSelectedKeys.delete(key);
    }
    
    if (!selectedKeys) {
      setInternalSelectedKeys(newSelectedKeys);
    }
    
    onSelectionChange?.(newSelectedKeys);
     
    // Legacy support
    if (onCheckboxChange) {
        const selectedItems = data.filter(item => newSelectedKeys.has(item[rowKey]));
        onCheckboxChange(selectedItems);
    }
  };

  // Check if all items on current page are selected
  const allSelected = data.length > 0 && data.every(item => currentSelectedKeys.has(item[rowKey]));
  // Check if at least one but not all are selected (indeterminate) - native checkbox supports this via ref, 
  // but for simple custom UI we often just use checked/unchecked or a specific icon. 
  // Here we just keep simple checked/unchecked for "Select All" based on if ALL are selected.

  return (
    <div className={`shadow-sm overflow-auto overflow-x-auto ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#515151]">
              {showCheckbox && (
                <th className="px-2 py-4 text-left">
                  <div className="relative flex items-center justify-center w-[20px] h-[20px]">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => handleSelectAllChange(e.target.checked)}
                      className="peer w-full h-full bg-transparent appearance-none border border-[#8B8B8B] rounded-[6px] checked:bg-[#8000FF] checked:border-[#8000FF] cursor-pointer transition-colors"
                    />
                    <svg 
                      className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                      viewBox="0 0 14 14" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-8 py-4 text-left text-sm font-medium text-[#F8FAFF] ${column.className || 'whitespace-nowrap'} ${column.width || 'whitespace-nowrap'}`}
                >
                  {column.headerRender ? (
                    column.headerRender(column)
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{column.label}</span>
                      <img
                        src={arrowDownIcon}
                        alt="Sort"
                        className={`w-4 h-4 ${column.key === 'userName' ? 'ml-4 mr-2' : 'ml-2 mr-2'}`}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const key = row[rowKey];
              return (
                <tr
                  key={key}
                  className="border-b border-[#515151] hover:bg-[#1a1a1a] transition-colors"
                >
                  {showCheckbox && (
                    <td className="px-2 py-4 pt-7">
                      <div className="relative flex items-center justify-center w-[20px] h-[20px]">
                        <input
                          type="checkbox"
                          checked={currentSelectedKeys.has(key)}
                          onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                          className="peer w-full h-full bg-transparent appearance-none border border-[#8B8B8B] rounded-[6px] checked:bg-[#8000FF] checked:border-[#8000FF] cursor-pointer transition-colors"
                        />
                        <svg 
                          className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                          viewBox="0 0 14 14" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={`px-8 py-4 text-sm ${column.width || 'whitespace-nowrap'} ${column.className || ''} ${column.key === 'status' ? 'text-left' : ''}`}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
