import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function IncomeExpenseChart({ data = [] }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="
            text-xl
            font-bold
            text-slate-800
            dark:text-white
          "
          >
            Income vs Expense
          </h2>

          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            mt-1
          "
          >
            Monthly financial overview
          </p>
        </div>

        <div
          className="
          flex
          gap-4
          text-sm
        "
        >
          <div className="flex items-center gap-2">
            <span
              className="
              h-3
              w-3
              rounded-full
              bg-green-500
            "
            />

            <span
              className="
              text-slate-500
              dark:text-slate-300
            "
            >
              Income
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
              h-3
              w-3
              rounded-full
              bg-red-500
            "
            />

            <span
              className="
              text-slate-500
              dark:text-slate-300
            "
            >
              Expense
            </span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" axisLine={false} tickLine={false} />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
              }}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
