import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Wallet,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "Transactions",
    icon: Receipt,
  },
  {
    name: "Analytics",
    icon: PieChart,
  },
  {
    name: "Budget",
    icon: Wallet,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#111827] dark:bg-black rounded-3xl p-6 flex flex-col">
      {/* Logo */}

      <div className="flex items-center gap-3 mb-12">
        <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#6C5CE7] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xl">
          E
        </div>

        <div>
          <h2 className="text-white font-bold text-lg">ExpensePro</h2>

          <p className="text-slate-400 text-sm">Finance Dashboard</p>
        </div>
      </div>

      {/* Search */}

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="
            w-full
            bg-[#1F2937]
            text-white
            placeholder:text-slate-500
            rounded-xl
            px-4
            py-3
            outline-none
            border border-slate-700
          "
        />
      </div>

      {/* Navigation */}

      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`
                w-full
                flex
                items-center
                justify-between
                px-4
                py-3
                rounded-2xl
                transition-all
                ${
                  item.active
                    ? "bg-[#6C5CE7] text-white"
                    : "text-slate-400 hover:bg-[#1F2937] hover:text-white"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span>{item.name}</span>
              </div>

              <ChevronRight size={16} />
            </button>
          );
        })}
      </div>

      {/* User Card */}

      <div className="mt-auto">
        <div className="bg-[#1F2937] rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#6C5CE7] flex items-center justify-center text-white font-bold">
              S
            </div>

            <div>
              <h4 className="text-white font-medium">Santhosh</h4>

              <p className="text-slate-400 text-sm">Premium User</p>
            </div>
          </div>
        </div>

        <button
          className="
            w-full
            flex
            items-center
            gap-3
            text-red-400
            hover:bg-red-500/10
            rounded-xl
            px-4
            py-3
            transition-all
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
