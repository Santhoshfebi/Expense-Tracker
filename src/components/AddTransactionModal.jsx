import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AddTransactionModal({
  open,
  onClose,
  onSave,
  editingTransaction,
}) {
  const initialForm = {
    title: "",
    amount: "",
    category: "",
    type: "expense",
    transaction_date: new Date()
      .toISOString()
      .split("T")[0],
  };

  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] =
    useState([]);
  const [loadingCategories, setLoadingCategories] =
    useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        title: editingTransaction.title || "",
        amount:
          editingTransaction.amount || "",
        category:
          editingTransaction.category || "",
        type:
          editingTransaction.type ||
          "expense",
        transaction_date:
          editingTransaction.transaction_date ||
          new Date()
            .toISOString()
            .split("T")[0],
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTransaction]);

  async function fetchCategories() {
    try {
      setLoadingCategories(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } =
        await supabase
          .from("categories")
          .select("*")
          .eq("user_id", user.id)
          .order("name");

      if (error) {
        console.error(error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  }

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      amount: Number(form.amount),
    });

    if (!editingTransaction) {
      setForm(initialForm);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {editingTransaction
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          {/* Title */}

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="KFC Dinner"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>

          {/* Amount */}

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="500"
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>

          {/* Category */}

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            >
              <option value="">
                {loadingCategories
                  ? "Loading categories..."
                  : "Select Category"}
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Type */}

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            >
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Date
            </label>

            <input
              type="date"
              name="transaction_date"
              value={
                form.transaction_date
              }
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#6C5CE7] text-white font-medium hover:bg-[#5B4AD1] transition"
            >
              {editingTransaction
                ? "Update"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}