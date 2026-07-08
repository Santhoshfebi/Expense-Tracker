import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function StatCard({ title, value, icon, bg }) {
  const Icon = icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow: "0px 20px 40px rgba(108,92,231,0.15)",
      }}
      className="
        bg-white dark:bg-slate-800
        rounded-3xl
        p-6
        shadow-sm
        border
        border-slate-100
        cursor-pointer
        transition-all
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-400 dark:text-slate-300">{title}</p>

          <h2 className="text-3xl font-bold mt-3 text-slate-800 dark:text-white">
            ₹
            <CountUp end={Number(value) || 0} duration={1.8} separator="," />
          </h2>
          <p className="text-green-500 text-sm mt-2">+12.5% this month</p>
        </div>

        <div
          className={`
            h-12
            w-12
            rounded-2xl
            flex
            items-center
            justify-center
            ${bg}
          `}
        >
          <Icon size={22} className="text-slate-700" />
        </div>
      </div>
    </motion.div>
  );
}
