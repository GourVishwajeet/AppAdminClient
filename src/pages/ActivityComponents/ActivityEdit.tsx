import type { FC } from 'react';
import { PageWrapper } from '../../components/PageWrapper';

export const ActivityEdit: FC = () => {
  return (
    <PageWrapper className="h-full bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>
      
      <div className="bg-[#1A1A1A] rounded-xl p-6 max-w-2xl border border-[#333]">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Activity Title</label>
            <input 
              type="text" 
              defaultValue="CreativeSync Hub"
              className="w-full bg-[#242424] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D026AC]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea 
              rows={4}
              className="w-full bg-[#242424] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D026AC]"
              defaultValue="Collaborative workspace for creative projects..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <select className="w-full bg-[#242424] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D026AC]">
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
              <input 
                type="date" 
                className="w-full bg-[#242424] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D026AC]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" className="px-6 py-2 rounded-full border border-[#333] text-gray-300 hover:bg-[#242424]">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-full bg-[linear-gradient(142.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-black font-semibold">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};
