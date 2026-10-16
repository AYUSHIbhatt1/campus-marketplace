
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar({
  search,
  setSearch,
  category,
  setCategory,
  isLoggedIn,
  setIsLoggedIn,
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#EAEAE3] bg-[#FAF9F6]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#486448] text-xl text-white shadow-sm">
              🛍️
            </span>

            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-[#29392B] sm:text-xl">
                Campus<span className="text-[#66845F]">Market</span>
              </h2>
              <p className="text-[11px] font-medium tracking-wide text-gray-500">
                Your campus, your community
              </p>
            </div>
          </div>
        </Link>

        {/* Search and category */}
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search books, gadgets, and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search listings"
              className="w-full rounded-xl border border-[#E3E5DC] bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#8CA184] focus:ring-4 focus:ring-[#66845F]/10"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="w-full cursor-pointer rounded-xl border border-[#E3E5DC] bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#8CA184] focus:ring-4 focus:ring-[#66845F]/10 sm:w-44"
          >
            <option value="All">All Categories</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Stationery">Stationery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[#EAEAE3] pt-3 lg:shrink-0 lg:justify-end lg:border-0 lg:pt-0">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#486448] transition hover:bg-[#EDF2E9]"
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/add-listing"
                className="rounded-xl bg-[#486448] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#354E35] focus:outline-none focus:ring-2 focus:ring-[#66845F] focus:ring-offset-2"
              >
                + Sell an item
              </Link>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await axios.post(
                      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                      {},
                      { withCredentials: true }
                    );

                    setIsLoggedIn(false);
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="rounded-xl border border-[#E3E5DC] bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#E5C5C0] hover:bg-[#FFF5F3] hover:text-[#A34D43]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-[#EDF2E9] hover:text-[#486448]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-[#486448] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#354E35]"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;