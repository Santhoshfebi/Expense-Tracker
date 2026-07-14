import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Wallet,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
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

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {
  return (
    <aside
      className={`
        ${
          collapsed
            ? "w-20"
            : "w-72"
        }
        h-[calc(100vh-3rem)]
        sticky
        top-6
        bg-[#111827]
        dark:bg-black
        rounded-3xl
        p-5
        flex
        flex-col
        transition-all
        duration-300
        shadow-2xl
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        

        {!collapsed && (
          <div className="flex-1 ml-3">
            <h2 className="text-white font-bold text-lg">
              ExpensePro
            </h2>

            <p className="text-slate-400 text-sm">
              Finance Dashboard
            </p>
          </div>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="
            text-slate-400
            hover:text-white
            transition-all
            duration-300
          "
        >
          {collapsed ? (
            <Menu size={20} />
          ) : (
            <X size={20} />
          )}
        </button>
      </div>

      {/* Search */}

      {!collapsed && (
        <div className="mt-8 mb-8">
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
              border
              border-slate-700
              focus:border-[#6C5CE7]
              transition-all
            "
          />
        </div>
      )}

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
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-between"
                }
                px-4
                py-3
                rounded-2xl
                transition-all
                duration-300

                ${
                  item.active
                    ? `
                      bg-[#6C5CE7]
                      text-white
                      shadow-lg
                    `
                    : `
                      text-slate-400
                      hover:bg-[#1F2937]
                      hover:text-white
                    `
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />

                {!collapsed && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}
              </div>

              {!collapsed && (
                <ChevronRight size={16} />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section */}

      <div className="mt-auto">
        {!collapsed && (
          <div
            className="
              bg-[#1F2937]
              rounded-2xl
              p-4
              mb-4
              border
              border-slate-700
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  h-12
                  w-12
                  rounded-full
                  bg-[#6C5CE7]
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                "
              >
                S
              </div>

              <div>
                <h4 className="text-white font-medium">
                  Santhosh
                </h4>

                <p className="text-slate-400 text-sm">
                  Premium User
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          className={`
            w-full
            flex
            items-center
            ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }
            text-red-400
            hover:bg-red-500/10
            rounded-xl
            px-4
            py-3
            transition-all
            duration-300
          `}
        >
          <LogOut size={18} />

          {!collapsed && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}