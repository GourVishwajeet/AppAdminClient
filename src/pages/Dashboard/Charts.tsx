import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const lineData = [
    { name: 'Jan', currentWeek: 11, previousWeek: 6 },
    { name: 'Feb', currentWeek: 16, previousWeek: 10 },
    { name: 'Mar', currentWeek: 13, previousWeek: 18 },
    { name: 'Apr', currentWeek: 11, previousWeek: 15 },
    { name: 'May', currentWeek: 14, previousWeek: 16 },
    { name: 'Jun', currentWeek: 18, previousWeek: 21 },
    { name: 'Jul', currentWeek: 22, previousWeek: 24 },
];

const barData = [
    { name: 'Natali', value: 18, color: '#95A4FC' },
    { name: 'Drew', value: 23, color: '#BAEDBD' },
    { name: 'Orlando', value: 19, color: '#1C1C1C' },
    { name: 'Andi', value: 25, color: '#B1E3FF' },
    { name: 'Kate', value: 9, color: '#A8C5DA' },
    { name: 'Other', value: 22, color: '#C6D2FD' },
];

const pieData = [
    { name: 'United States', value: 38.6, color: '#95A4FC' },
    { name: 'Canada', value: 22.5, color: '#BAEDBD' },
    { name: 'Mexico', value: 30.8, color: '#B1E3FF' },
    { name: 'Other', value: 8.1, color: '#A8C5DA' },
];

const trafficByCreator = [
    { name: 'Google', value: 70, color: '#1C1C1C' },
    { name: 'YouTube', value: 40, color: '#1C1C1C' },
    { name: 'Instagram', value: 85, color: '#A8C5DA' },
    { name: 'Pinterest', value: 30, color: '#1C1C1C' },
    { name: 'Facebook', value: 60, color: '#1C1C1C' },
    { name: 'Twitter', value: 45, color: '#1C1C1C' },
    { name: 'Tumblr', value: 20, color: '#1C1C1C' },
];

const COLORS = ['#BAEDBD', '#C1E2F4', '#1C1C1C', '#95A4FC', '#A8C5DA', '#C6D2FD'];

export function Charts() {
    return (
        <div className="flex flex-col gap-4 mb-10 w-full max-w-[1228px]">
            {/* Top Row: Line Chart and Right Side Bar/List */}
            <div className="flex flex-col xl:flex-row gap-4">
                {/* Total Users Line Chart */}
                <div className="w-full xl:w-[662px] bg-[#161A20] rounded-2xl p-6 border border-[#23262D] shrink-0 h-[330px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <h3 className="text-[#FFFFFF] text-[14px] font-semibold tracking-tight">Total Users <span className="text-[#9CA3AF] font-normal ml-2">Total Live Operating Status</span></h3>
                            <div className="flex items-center gap-4 text-[12px] ml-4">
                                <span className="flex items-center gap-2 text-[#9CA3AF]">
                                    <div className="w-2 h-2 rounded-full bg-[#FFFFFF]"></div>
                                    Current Week
                                </span>
                                <span className="flex items-center gap-2 text-[#9CA3AF]">
                                    <div className="w-2 h-2 rounded-full bg-[#A8C5DA]"></div>
                                    Previous Week
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full relative">
                        {/* Custom Tooltip marker text */}
                        <div className="absolute top-[30%] left-[30%] bg-[#161A20] border border-[#23262D] px-3 py-1 rounded-full text-[#FFFFFF] text-[12px] z-10 transform -translate-x-1/2 -translate-y-full mb-2">
                            3,256,598
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.05} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    ticks={[0, 10, 20, 30]}
                                    tickFormatter={(val) => `${val}M`}
                                />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{ backgroundColor: '#161A20', border: '1px solid #23262D', fontSize: '12px', borderRadius: '12px' }}
                                    itemStyle={{ color: '#FFFFFF' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="previousWeek"
                                    stroke="#A8C5DA"
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="currentWeek"
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, fill: '#161A20', stroke: '#FFFFFF', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic by Creator Section */}
                <div className="w-full xl:w-[202px] bg-[#161A20] rounded-2xl p-6 border border-[#23262D] shrink-0 h-[330px] overflow-y-auto">
                    <h3 className="text-[#FFFFFF] text-[14px] font-semibold mb-6 tracking-tight">Traffic by Creator</h3>
                    <div className="space-y-[18px]">
                        {trafficByCreator.map((item) => (
                            <div key={item.name} className="flex items-center justify-between gap-4">
                                <span className="text-[12px] text-[#9CA3AF] w-[70px] shrink-0 font-medium">{item.name}</span>
                                <div className="h-1.5 w-full bg-[#23262D] rounded-full overflow-hidden flex-1 max-w-[120px]">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            width: `${item.value}%`,
                                            backgroundColor: item.color === '#1C1C1C' ? '#23262D' : item.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Bar Chart and Pie Chart */}
            <div className="flex flex-col xl:flex-row gap-4">
                {/* Traffic by Creators Bar Chart */}
                <div className="w-full xl:w-[432px] min-w-[400px] flex-1 bg-[#161A20] rounded-2xl p-6 border border-[#23262D] h-[280px] flex flex-col">
                    <h3 className="text-[#FFFFFF] text-[14px] font-semibold mb-8 tracking-tight">Traffic by Creators</h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.05} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    ticks={[0, 10, 20, 30]}
                                    tickFormatter={(val) => `${val}M`}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[4, 4, 4, 4]}
                                    barSize={20}
                                >
                                    {barData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic by Location Pie Chart */}
                <div className="w-full xl:w-[432px] min-w-[400px] flex-1 bg-[#161A20] border border-[#23262D] rounded-2xl p-6 flex flex-col h-[280px]">
                    <h3 className="text-[#FFFFFF] text-[14px] font-semibold mb-8 tracking-tight">Traffic by Location</h3>
                    <div className="flex-1 flex items-center justify-between gap-8 h-full">
                        <div className="w-[180px] h-[180px] relative shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        cx="50%"
                                        cy="50%"
                                        cornerRadius={4}
                                    >
                                        {pieData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={pieData[index].color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            {pieData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between w-full max-w-[200px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-[12px] text-[#9CA3AF]">{item.name}</span>
                                    </div>
                                    <span className="text-[12px] text-[#9CA3AF] tabular-nums font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
