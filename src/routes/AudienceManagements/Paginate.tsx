import React from "react";

interface Props {
  currpage: number;
  dataLength: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const ITEMS_PER_PAGE = 10;

const Paginate: React.FC<Props> = ({
  currpage,
  dataLength,
  setCurrPage,
  totalPages,
}) => {
  const start = (currpage - 1) * ITEMS_PER_PAGE + 1;
  const end =
    currpage * ITEMS_PER_PAGE > dataLength
      ? dataLength
      : currpage * ITEMS_PER_PAGE;

  const nextPage = currpage + 1 <= totalPages ? currpage + 1 : totalPages;

  return (
    <div className="w-full flex justify-between items-center text-sm px-4 py-2">

      {/* Showing X-Y from Z */}
      <div className="text-[10px] font-inter font-semibold text-gray-400">
        {`Showing ${start} - ${end} from ${dataLength}`}
      </div>

      {/* Pagination (8 buttons pattern) */}
      <div className="flex gap-1 items-center">

        {/* 1) FIRST */}
        <button
          onClick={() => setCurrPage(1)}
          className="w-[28px] h-[28px] border border-[#ff00ff] rounded-lg text-white flex justify-center items-center"
        >
          <div className="flex">
            <img className="w-1 h-2" src="/images/next.png"/>
            <img className="w-1 h-2" src="/images/next.png"/>
          </div>
        </button>

        {/* 2) PREV */}
        <button
          onClick={() => currpage > 1 && setCurrPage(currpage - 1)}
          className="w-[28px] h-[28px] border border-[#ff00ff] rounded-lg text-white flex justify-center items-center"
        >
          <img className="w-1 h-2" src="/images/next.png"/>
        </button>

        {/* 3) CURRENT PAGE NUMBER */}
        <button
          className="w-[28px] h-[28px] border border-[#ff00ff] bg-[#ff00ff] rounded-lg text-white font-bold flex justify-center items-center"
        >
          {currpage}
        </button>

        {/* 4) NEXT PAGE NUMBER (currpage + 1) */}
        <button
          onClick={() => setCurrPage(nextPage)}
          className="w-[28px] h-[28px] border border-[#ff00ff] rounded-lg text-white flex justify-center items-center"
        >
          {nextPage}
        </button>

        {/* 5) DOTS */}
        <div className="w-[28px] h-[28px] flex justify-center items-center text-gray-400">
          ...
        </div>

        {/* 6) LAST PAGE NUMBER */}
        <button
          onClick={() => setCurrPage(totalPages)}
          className={`w-[28px] h-[28px] border border-[#ff00ff] rounded-lg flex justify-center items-center ${
            currpage === totalPages ? "bg-[#ff00ff] text-white font-bold" : "text-white"
          }`}
        >
          {totalPages}
        </button>

        {/* 7) NEXT PAGE (again) */}
        <button
          onClick={() => setCurrPage(nextPage)}
          className="w-[28px] h-[28px] border border-[#ff00ff] rounded-lg text-white flex justify-center items-center"
        >
          <img className="w-1 h-2" src="/images/prev.png"/>
        </button>

        {/* 8) LAST */}
        <button
          onClick={() => setCurrPage(totalPages)}
          className="w-[28px] h-[28px] border border-[#ff00ff] rounded-lg text-white flex justify-center items-center"
        >
          <div className="flex">
            <img className="w-1 h-2" src="/images/prev.png"/>
            <img className="w-1 h-2" src="/images/prev.png"/>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Paginate;
