import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Categories() {
  const [categories, setCategories] =
    useState([]);

  const [name, setName] =
    useState("");

  const [icon, setIcon] =
    useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", user.id)
      .order("name");

    setCategories(data || []);
  }

  async function addCategory(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("categories")
      .insert([
        {
          name,
          icon,
          user_id: user.id,
        },
      ]);

    if (!error) {
      setName("");
      setIcon("");
      fetchCategories();
    }
  }

  async function deleteCategory(id) {
    await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    fetchCategories();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Categories
      </h1>

      <form
        onSubmit={addCategory}
        className="flex gap-3 mb-8"
      >
        <input
          value={icon}
          onChange={(e) =>
            setIcon(e.target.value)
          }
          placeholder="🍔"
          className="border p-3 rounded-xl"
        />

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Category Name"
          className="border p-3 rounded-xl flex-1"
        />

        <button className="bg-[#6C5CE7] text-white px-5 rounded-xl">
          Add
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="text-3xl">
              {cat.icon}
            </div>

            <h3 className="font-semibold mt-2">
              {cat.name}
            </h3>

            <button
              onClick={() =>
                deleteCategory(cat.id)
              }
              className="mt-4 text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}