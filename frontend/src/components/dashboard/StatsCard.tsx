interface StatsCardProps {
    title: string;
    value: number;
    color: string;
}

export default function StatsCard({ title, value, color }: StatsCardProps) {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-8 ${color}`}>
            <h3 className="text-gray-700 text-sm uppercase font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
}