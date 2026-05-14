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

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Applications by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}