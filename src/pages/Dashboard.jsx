import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

import { supabase } from "../lib/supabase";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpenseDonutChart from "../components/ExpenseDonutChart";
import RecentTransactions from "../components/RecentTransactions";
import TransactionsTable from "../components/TransactionsTable";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch Transactions

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", {
          ascending: false,
        });

      if (error) throw error;

      setTransactions(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Add Transaction

  async function addTransaction(transaction) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("transactions").insert([
        {
          ...transaction,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      setOpenModal(false);

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  }

  // Update Transaction

  async function updateTransaction(data) {
    try {
      const { error } = await supabase
        .from("transactions")
        .update(data)
        .eq("id", editingTransaction.id);

      if (error) throw error;

      setEditingTransaction(null);

      setOpenModal(false);

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  }

  // Delete Transaction

  async function deleteTransaction(id) {
    const confirm = window.confirm("Delete this transaction?");

    if (!confirm) return;

    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  }

  // Total Income

  const income = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  // Total Expense

  const expense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const balance = income - expense;

  // Monthly Chart Data

  const chartData = useMemo(() => {
    const grouped = {};

    transactions.forEach((t) => {
      const month = new Date(t.transaction_date).toLocaleString("default", {
        month: "short",
      });

      if (!grouped[month]) {
        grouped[month] = {
          month,

          income: 0,

          expense: 0,
        };
      }

      if (t.type === "income") {
        grouped[month].income += Number(t.amount);
      } else {
        grouped[month].expense += Number(t.amount);
      }
    });

    return Object.values(grouped);
  }, [transactions]);

  // Pie Chart Data

  const pieData = useMemo(() => {
    const grouped = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!grouped[t.category]) {
          grouped[t.category] = {
            name: t.category,

            value: 0,
          };
        }

        grouped[t.category].value += Number(t.amount);
      });

    return Object.values(grouped);
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F5F6FC]
        dark:bg-slate-900
      "
      >
        <h2
          className="
          text-xl
          font-semibold
          dark:text-white
        "
        >
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
  min-h-screen
  bg-[#F5F6FC]
  dark:bg-slate-900
  p-3
  sm:p-4
  lg:p-6
"
    >
      <div
        className="
  flex
  flex-col
  lg:flex-row
  gap-4
  lg:gap-6
"
      >
        <div className="hidden lg:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        <main
          className="
    flex-1
    min-w-0
    transition-all
    duration-300
  "
        >
          <Navbar />
          <div className="lg:hidden mb-4">
            <button
              className="
      bg-white
      dark:bg-slate-800
      px-4
      py-2
      rounded-xl
      shadow
      font-medium
    "
            >
              ☰ Menu
            </button>
          </div>

          <div className="mt-8">
            <h1
              className="
              text-2xl sm:text-3xl
              font-bold
              text-slate-800
              dark:text-white
            "
            >
              Financial Overview
            </h1>

            <p
              className="
              text-slate-500
              dark:text-slate-400
              mt-2
            "
            >
              Track your money efficiently.
            </p>
          </div>

          {/* Stats */}

          <div
            className="
            grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
            gap-5
            mt-8
          "
          >
            <StatCard title="Balance" value={balance} icon={Wallet} />

            <StatCard title="Income" value={income} icon={TrendingUp} />

            <StatCard title="Expense" value={expense} icon={TrendingDown} />

            <StatCard title="Savings" value={balance} icon={PiggyBank} />
          </div>

          {/* Charts */}

          <div
            className="
           grid
grid-cols-1
xl:grid-cols-3
            gap-6
            mt-6
          "
          >
            <div
              className="
              xl:col-span-2
              bg-white
              dark:bg-slate-800
              rounded-3xl
              p-6
            "
            >
              <IncomeExpenseChart data={chartData} />
            </div>

            <div
              className="
              bg-white
              dark:bg-slate-800
              rounded-3xl
              p-6
            "
            >
              <ExpenseDonutChart data={pieData} />
            </div>
          </div>

          {/* Transactions */}

          <div
            className="
            grid
grid-cols-1
xl:grid-cols-3
            gap-6
            mt-6
          "
          >
            <div
              className="
              lg:col-span-2
              bg-white
              dark:bg-slate-800
              rounded-3xl
              p-6
            "
            >
              <TransactionsTable
                transactions={transactions}
                onDelete={deleteTransaction}
                onEdit={(transaction) => {
                  setEditingTransaction(transaction);

                  setOpenModal(true);
                }}
              />
            </div>

            <div
              className="
              bg-white
              dark:bg-slate-800
              rounded-3xl
              p-6
            "
            >
              <RecentTransactions transactions={recentTransactions} />
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}

      <AddTransactionModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);

          setEditingTransaction(null);
        }}
        editingTransaction={editingTransaction}
        onSave={(data) => {
          if (editingTransaction) {
            updateTransaction(data);
          } else {
            addTransaction(data);
          }
        }}
      />

      {/* Floating Button */}

      <button
        onClick={() => {
          setEditingTransaction(null);

          setOpenModal(true);
        }}
       className="
fixed
bottom-4
right-4
sm:bottom-8
sm:right-8
h-14
w-14
sm:h-16
sm:w-16
rounded-full
bg-[#6C5CE7]
text-white
flex
items-center
justify-center
shadow-xl
hover:scale-110
transition
z-50
"
      >
        <Plus size={28} /> 
      </button>
    </div>
  );
}
