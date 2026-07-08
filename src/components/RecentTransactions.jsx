import { TrendingDown, TrendingUp } from "lucide-react";

export default function RecentTransactions({ transactions }) {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h3 className="font-bold text-lg">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-slate-400">No transactions found</p>
        ) : (
          transactions.map((item) => {
            const isIncome = item.type === "income";

            return (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50"
              >
                <div className="flex gap-3 items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isIncome ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {isIncome ? (
                      <TrendingUp className="text-green-500" size={18} />
                    ) : (
                      <TrendingDown className="text-red-500" size={18} />
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium">{item.title}</h4>

                    <p className="text-xs text-slate-400">{item.category}</p>
                  </div>
                </div>

                <div
                  className={`font-bold ${
                    isIncome ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "-"}₹{Number(item.amount).toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
