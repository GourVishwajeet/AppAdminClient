import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const cardData = [
    { title: 'Profile visit', value: '721K', change: '+11.01%', isPositive: true },
    { title: 'Followers', value: '367K', change: '-0.03%', isPositive: false },
    { title: 'Posts', value: '1,156', change: '+15.03%', isPositive: true },
    { title: 'Live streaming', value: '239K', change: '+6.08%', isPositive: true },
];

export function TopCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-sans">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className="bg-[#E6EDF5] text-gray-900 rounded-2xl p-6 flex flex-col justify-between min-h-[110px] transition-transform hover:-translate-y-1 duration-200 shadow-sm"
                >
                    <div className="text-[14px] font-medium text-gray-600 tracking-tight">{card.title}</div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="text-[24px] font-semibold tracking-tight">{card.value}</div>
                        <div className="flex items-center text-[12px] gap-1 font-medium pb-1">
                            <span className="text-gray-700">
                                {card.change}
                            </span>
                            {card.isPositive ? (
                                <ArrowUpRight size={16} strokeWidth={2} className="text-gray-700" />
                            ) : (
                                <ArrowDownRight size={16} strokeWidth={2} className="text-gray-700" />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
