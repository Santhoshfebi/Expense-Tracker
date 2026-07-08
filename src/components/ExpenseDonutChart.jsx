import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function ExpenseDonutChart({ data = [] }) {
  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);

  const COLORS = [
    "#6C5CE7",
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#EF4444",
    "#EC4899",
    "#14B8A6",
    "#EAB308",
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2
          className="
          text-xl
          font-bold
          text-slate-800
          dark:text-white
        "
        >
          Expense Breakdown
        </h2>

        <p
          className="
          text-sm
          text-slate-500
          dark:text-slate-400
          mt-1
        "
        >
          Spending by category
        </p>
      </div>

      {data.length === 0 ? (
        <div
          className="
            h-75
            flex
            items-center
            justify-center
            text-slate-400
          "
        >
          No expense data
        </div>
      ) : (
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Amount",
                ]}
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Center Total */}

      <div
        className="
        -mt-47.5
        mb-30
        flex
        flex-col
        items-center
        justify-center
        pointer-events-none
      "
      >
        <p
          className="
          text-sm
          text-slate-400
        "
        >
          Total
        </p>

        <h3
          className="
          text-xl
          font-bold
          text-slate-800
          dark:text-white
        "
        >
          ₹{totalExpense.toLocaleString()}
        </h3>
      </div>

      {/* Legend */}

      <div
        className="
        space-y-3
        mt-5
      "
      >
        {data.map((item, index) => (
          <div
            key={item.name}
            className="
                  flex
                  items-center
                  justify-between
                "
          >
            <div
              className="
                  flex
                  items-center
                  gap-3
                "
            >
              <span
                className="
                      h-3
                      w-3
                      rounded-full
                    "
                style={{
                  background: COLORS[index % COLORS.length],
                }}
              />

              <span
                className="
                    text-sm
                    text-slate-600
                    dark:text-slate-300
                  "
              >
                {item.name}
              </span>
            </div>

            <span
              className="
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-white
                "
            >
              ₹{item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
