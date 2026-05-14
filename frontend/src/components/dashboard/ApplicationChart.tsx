'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ApplicationChartProps {
    data: {
        pending: number;
        under_review: number;
        accepted: number;
        rejected: number;
    };
}

export default function ApplicationChart({ data }: ApplicationChartProps) {
    const chartData = [
        { name: 'Pending', value: data.pending, color: '#eab308' },
        { name: 'Under Review', value: data.under_review, color: '#3b82f6' },
        { name: 'Accepted', value: data.accepted, color: '#22c55e' },
        { name: 'Rejected', value: data.rejected, color: '#ef4444' },
    ].filter(item => item.value > 0);

    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <ul className="flex flex-wrap justify-center gap-4 mt-2">
                {payload.map((entry: any, index: number) => (
                    <li key={`item-${index}`} className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-gray-800 text-sm">{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    const renderLabel = (entry: any) => {
        const percent = entry.percent !== undefined ? (entry.percent * 100).toFixed(0) : '0';
        return `${entry.name}: ${percent}%`;
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications by Status</h3>
            {chartData.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data available</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={renderLabel}
                            labelLine={true}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} applications`, 'Count']} />
                        <Legend content={renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}