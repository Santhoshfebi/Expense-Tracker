import { Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";

const categoryColors = {
  Food: "bg-orange-100 text-orange-600",
  Travel: "bg-blue-100 text-blue-600",
  Shopping: "bg-purple-100 text-purple-600",
  Bills: "bg-red-100 text-red-600",
  Salary: "bg-green-100 text-green-600",
  Others: "bg-slate-100 text-slate-600",
};

export default function TransactionsTable({ transactions, onDelete, onEdit }) {
  if (!transactions.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-white">
            No Transactions Found
          </h3>

          <p className="text-slate-400 mt-2">
            Start by adding your first transaction.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Transactions
          </h2>

          <p className="text-slate-500 text-sm">
            {transactions.length} records
          </p>
        </div>
      </div>

      {/* Desktop Table */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-4 text-slate-400 font-medium">
                Category
              </th>

              <th className="text-left py-4 text-slate-400 font-medium">
                Title
              </th>

              <th className="text-left py-4 text-slate-400 font-medium">
                Date
              </th>

              <th className="text-left py-4 text-slate-400 font-medium">
                Type
              </th>

              <th className="text-left py-4 text-slate-400 font-medium">
                Amount
              </th>

              <th className="text-center py-4 text-slate-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const badge =
                categoryColors[transaction.category] || categoryColors.Others;

              const isIncome = transaction.type === "income";

              return (
                <tr
                  key={transaction.id}
                  className="
                      border-b
                      border-slate-100
                      dark:border-slate-700
                      hover:bg-slate-50
                      dark:hover:bg-slate-700/30
                      transition-all
                    "
                >
                  <td className="py-4">
                    <span
                      className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${badge}
                        `}
                    >
                      {transaction.category}
                    </span>
                  </td>

                  <td className="font-medium text-slate-700 dark:text-white">
                    {transaction.title}
                  </td>

                  <td className="text-slate-500">
                    {new Date(
                      transaction.transaction_date,
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`
                          flex
                          items-center
                          gap-1
                          text-sm
                          font-medium
                          ${isIncome ? "text-green-600" : "text-red-600"}
                        `}
                    >
                      {isIncome ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}

                      {isIncome ? "Income" : "Expense"}
                    </span>
                  </td>

                  <td
                    className={`font-bold ${
                      isIncome ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isIncome ? "+" : "-"}₹
                    {Number(transaction.amount).toLocaleString()}
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit?.(transaction)}
                        className="
                            h-9
                            w-9
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            hover:scale-105
                          "
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="
                            h-9
                            w-9
                            rounded-xl
                            bg-red-100
                            text-red-600
                            flex
                            items-center
                            justify-center
                            hover:scale-105
                          "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <div
              key={transaction.id}
              className="
                  bg-slate-50
                  dark:bg-slate-700
                  rounded-2xl
                  p-4
                "
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{transaction.title}</h3>

                <span
                  className={`font-bold ${
                    isIncome ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "-"}₹
                  {Number(transaction.amount).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-2">
                {transaction.category}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {new Date(transaction.transaction_date).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
