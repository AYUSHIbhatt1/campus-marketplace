import React, { useEffect, useState } from 'react'
import ListingCard from '../components/ListingCard';
import { useNavigate } from 'react-router-dom';
 
import axios from "axios";
const Home = ({ search, category }) => {
    const navigate = useNavigate();
    const [listing,setlisting]=useState([]);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this listing?'
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/listings/${id}`,
  { withCredentials: true }
);

    setlisting((prev) => prev.filter((post) => post._id !== id));
  } catch (error) {
    console.log(error.message);
    alert('you are not the owner of listing ! you are not allowed to delete it');
  }
};
const handleEdit = (id) => {

  navigate(`/edit-listing/${id}`);
};

useEffect(()=>{
async function getdata(){
    try{
const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/listings`
);

setlisting(response.data.post)
    }
    catch(error){
console.log(error,error.message);
    }
  
}
 getdata();
    },[])
   const filteredListings = listing.filter((post) => {
  const matchesSearch = post.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === 'All' || post.category === category;

  return matchesSearch && matchesCategory;
});
return (
  <main className="min-h-screen bg-[#FAF9F6] text-gray-900">
    {/* Hero section */}
    <section className="px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 overflow-hidden rounded-4xl bg-[#E8EFE5] px-6 py-10 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:px-16 lg:py-16">
        
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D2DECD] bg-white/70 px-4 py-2 text-sm font-medium text-[#486448]">
            <span className="h-2 w-2 rounded-full bg-[#66845F]" />
            Made for your campus community
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#243A2B] sm:text-5xl lg:text-6xl">
            Good finds.
            <br />
            <span className="text-[#66845F]">Better prices.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            Give your pre-loved things a new home. Discover affordable
            books, gadgets, and everyday essentials from fellow students.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/add-listing')}
              className="rounded-xl bg-[#486448] px-6 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#354E35] hover:shadow-md"
            >
              + Sell an item
            </button>

            <a
              href="#listings"
              className="rounded-xl border border-[#C8D4C2] bg-white/70 px-6 py-3.5 font-semibold text-[#354E35] transition hover:bg-white"
            >
              Explore items ↓
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Buy smart. Sell easily. Waste less.
          </p>
        </div>

        <div
          className="flex h-48 w-full shrink-0 items-center justify-center rounded-3xl border border-white/70 bg-white/50 text-8xl sm:h-60 lg:h-72 lg:w-72"
          aria-hidden="true"
        >
          🛍️
        </div>

        <div
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl"
          aria-hidden="true"
        />
      </div>
    </section>

    {/* Listings section */}
    <section
      id="listings"
      className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-8 lg:px-12"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#66845F]">
            Your next great find
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#243A2B] sm:text-3xl">
            Explore the marketplace
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Useful things, lovely deals, right around campus.
          </p>
        </div>

        <span className="w-fit rounded-full border border-[#E3E6DE] bg-white px-4 py-2 text-sm font-medium text-gray-600">
          {filteredListings.length}{' '}
          {filteredListings.length === 1 ? 'listing' : 'listings'} found
        </span>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((post) => (
            <ListingCard
              key={post._id}
              id={post._id}
              title={post.title}
              price={post.price}
              category={post.category}
              description={post.description}
              location={post.location}
              imageUrl={post.imageUrl}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#D8DFD2] bg-white px-6 py-16 text-center">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF2E9] text-3xl"
            aria-hidden="true"
          >
            🔎
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#243A2B]">
            No listings found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            We couldn't find anything matching your search. Try a different
            keyword or category.
          </p>

          <button
            onClick={() => navigate('/add-listing')}
            className="mt-6 rounded-xl bg-[#486448] px-5 py-3 font-semibold text-white transition hover:bg-[#354E35]"
          >
            + Add a listing
          </button>
        </div>
      )}
    </section>
  </main>
);
};
export default Home
