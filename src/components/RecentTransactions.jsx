import {
  ArrowDownLeft,
  ArrowUpRight,
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  HeartPulse,
  Wallet,
  CircleDollarSign,
} from "lucide-react";

const categoryIcons = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Health: HeartPulse,
  Salary: Wallet,
  Investment: CircleDollarSign,
};

function formatDate(date) {
  const transactionDate = new Date(date);

  const today = new Date();

  const diff = Math.floor((today - transactionDate) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";

  if (diff === 1) return "Yesterday";

  if (diff < 7) return `${diff} days ago`;

  return transactionDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function RecentTransactions({ transactions = [] }) {
  return (
    <div>
      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >
        <div>
          <h2
            className="
            text-xl
            font-bold
            text-slate-800
            dark:text-white
          "
          >
            Recent Transactions
          </h2>

          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
          >
            Latest activity
          </p>
        </div>

        <button
          className="
          text-sm
          text-[#6C5CE7]
          font-medium
          hover:underline
        "
        >
          View All
        </button>
      </div>

      {transactions.length === 0 ? (
        <div
          className="
            text-center
            py-10
            text-slate-400
          "
        >
          No transactions yet
        </div>
      ) : (
        <div
          className="
            space-y-4
          "
        >
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

function TransactionItem({ transaction }) {
  const isIncome = transaction.type === "income";

  const Icon = categoryIcons[transaction.category] || Receipt;

  return (
    <div
      className="
      flex
      items-center
      justify-between
      p-4
      rounded-2xl
      hover:bg-slate-50
      dark:hover:bg-slate-700/40
      transition
    "
    >
      <div
        className="
        flex
        items-center
        gap-4
      "
      >
        {/* Icon */}

        <div
          className={`
          h-11
          w-11
          rounded-2xl
          flex
          items-center
          justify-center

          ${
            isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }
        `}
        >
          <Icon size={20} />
        </div>

        <div>
          <h4
            className="
            font-semibold
            text-slate-800
            dark:text-white
          "
          >
            {transaction.title}
          </h4>

          <p
            className="
            text-xs
            text-slate-500
            dark:text-slate-400
            mt-1
          "
          >
            {transaction.category}

            {" • "}

            {formatDate(transaction.transaction_date)}
          </p>
        </div>
      </div>

      <div
        className="
        text-right
      "
      >
        <p
          className={`
          font-bold

          ${isIncome ? "text-green-600" : "text-red-600"}

        `}
        >
          {isIncome ? "+" : "-"}₹{Number(transaction.amount).toLocaleString()}
        </p>

        <div
          className="
          flex
          justify-end
          mt-1
        "
        >
          {isIncome ? (
            <ArrowUpRight size={15} className="text-green-600" />
          ) : (
            <ArrowDownLeft size={15} className="text-red-600" />
          )}
        </div>
      </div>
    </div>
  );
}
