import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white border-b p-4 flex items-center justify-between">

      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-80">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full"
        />
      </div>

      <div className="flex items-center gap-4">

        <button className="p-2 rounded-xl hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          H
        </div>

      </div>

    </div>
  );
}

export default Navbar;