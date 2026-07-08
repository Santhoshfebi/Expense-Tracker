import { Trash2, TrendingUp, TrendingDown } from "lucide-react";

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions?.length) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No Transactions Found
        </h3>

        <p className="text-slate-500 mt-2">
          Add your first income or expense to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Transactions
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Track all your income and expenses
        </p>
      </div>

      {/* Transactions */}

      <div>
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    isIncome
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {isIncome ? (
                    <TrendingUp size={20} />
                  ) : (
                    <TrendingDown size={20} />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {transaction.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                      {transaction.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {new Date(
                        transaction.transaction_date,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      isIncome ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isIncome ? "+" : "-"}₹
                    {Number(transaction.amount).toLocaleString()}
                  </p>

                  <p className="text-xs text-slate-500 capitalize">
                    {transaction.type}
                  </p>
                </div>

                <button
                  onClick={() => onDelete(transaction.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
