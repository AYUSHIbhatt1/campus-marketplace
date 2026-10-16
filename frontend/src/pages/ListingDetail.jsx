
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/listings/${id}`
        );

        setListing(response.data.post);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Unable to load this listing.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F6]">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-[#E3E9DE] border-t-[#486448]"
          role="status"
          aria-label="Loading listing"
        />
        <p className="mt-4 text-sm font-medium text-gray-500">
          Finding your listing...
        </p>
      </main>
    );
  }

  if (error || !listing) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F6] px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8EFE5] text-4xl">
          🔎
        </div>

        <h2 className="mt-6 text-2xl font-extrabold text-[#29392B]">
          Listing not found
        </h2>

        <p className="mt-2 max-w-md leading-6 text-gray-500">
          {error || 'This listing may have been removed.'}
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-xl bg-[#486448] px-6 py-3 font-semibold text-white transition hover:bg-[#354E35]"
        >
          ← Back to marketplace
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#66845F] transition hover:text-[#354E35]"
        >
          <span aria-hidden="true">←</span>
          Back to marketplace
        </button>

        {/* Product details card */}
        <div className="overflow-hidden rounded-3xl border border-[#EAEAE3] bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Product image */}
            <div className="flex min-h-[300px] items-center justify-center bg-[#F0F1EB] sm:min-h-105 lg:min-h-150">
              {listing.imageUrl ? (
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="max-h-150 w-full object-contain lg:sticky lg:top-24"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 py-20 text-[#87917F]">
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-4xl shadow-sm"
                    aria-hidden="true"
                  >
                    📷
                  </span>
                  <p className="text-sm font-medium">
                    No image available
                  </p>
                </div>
              )}
            </div>

            {/* Product information */}
            <div className="flex flex-col p-6 sm:p-10 lg:p-12">

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#DCE5D7] bg-[#EDF2E9] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#486448]">
                  {listing.category}
                </span>

                <span className="text-sm text-gray-400">
                  Campus Marketplace
                </span>
              </div>

              <h1 className="mt-6 wrap-break-word text-3xl font-extrabold leading-tight tracking-tight text-[#29392B] sm:text-4xl">
                {listing.title}
              </h1>

              {/* Price */}
              <div className="mt-7 rounded-2xl bg-[#F5F6F0] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Asking price
                </p>

                <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#486448]">
                  ₹{Number(listing.price).toLocaleString('en-IN')}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  A great find at a student-friendly price.
                </p>
              </div>

              {/* Description */}
              <section className="mt-8">
                <h2 className="text-lg font-bold text-[#29392B]">
                  About this item
                </h2>

                <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-gray-600 sm:text-base">
                  {listing.description || 'No description provided.'}
                </p>
              </section>

              {/* Listing information */}
              <section className="mt-8 border-t border-[#F0F0EA] pt-6">
                <h2 className="text-lg font-bold text-[#29392B]">
                  Seller information
                </h2>

                <div className="mt-5 space-y-5">
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF2E9] text-xl"
                      aria-hidden="true"
                    >
                      📍
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Location
                      </p>
                      <p className="mt-1 wrap-break-word font-semibold text-gray-800">
                        {listing.location || 'Location not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF2E9] text-xl"
                      aria-hidden="true"
                    >
                      ✉️
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Contact email
                      </p>

                      <a
                        href={`mailto:${listing.contactEmail}`}
                        className="mt-1 block break-all font-semibold text-[#66845F] transition hover:text-[#354E35] hover:underline"
                      >
                        {listing.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact seller */}
              <div className="mt-8 border-t border-[#F0F0EA] pt-6">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(listing.contactEmail)}&su=${encodeURIComponent(`Interested in ${listing.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-xl bg-[#486448] px-5 py-4 text-center font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#354E35] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#66845F] focus:ring-offset-2"
                >
                  Contact seller
                  <span className="ml-2" aria-hidden="true">↗</span>
                </a>

                <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                  Have a question about this item? Reach out to the seller.
                </p>
              </div>

            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Buy smart. Sell easily. Waste less.
        </p>
      </div>
    </main>
  );
};

export default ListingDetails;
