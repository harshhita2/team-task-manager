import { motion } from "framer-motion";

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <div className="flex items-end justify-between mt-4">

        <h2 className="text-4xl font-bold">
          {value}
        </h2>

        <div
          className={`w-3 h-3 rounded-full ${color}`}
        />

      </div>
    </motion.div>
  );
}

export default StatCard;