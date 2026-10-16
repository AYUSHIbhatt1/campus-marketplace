
import { useNavigate } from 'react-router-dom';

function ListingCard({
  id,
  title,
  price,
  category,
  description,
  location,
  imageUrl,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#EAEAE3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CCD9C6] hover:shadow-lg">

      {/* Product image */}
      <div className="relative h-56 overflow-hidden bg-[#F0F1EB]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-[#87917F]">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm"
              aria-hidden="true"
            >
              📷
            </span>
            <p className="text-sm font-medium">No image available</p>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-[#486448] shadow-sm backdrop-blur">
          {category}
        </span>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        <div className="flex items-start justify-between gap-3">
          <h2 className="wrap-break min-w-0 text-lg font-bold leading-7 text-[#29392B] transition-colors group-hover:text-[#66845F]">
            {title}
          </h2>

          <span className="shrink-0 rounded-full bg-[#F4F5EF] px-2.5 py-1 text-[11px] font-semibold text-[#74816C]">
            Campus
          </span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
            Asking price
          </p>

          <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#486448]">
            ₹{Number(price).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
          {description || 'No description provided for this listing.'}
        </p>

        {/* Location */}
        <div className="mt-4 flex items-start gap-2 border-t border-[#F0F0EA] pt-4 text-sm text-gray-500">
          <span aria-hidden="true">📍</span>
          <span className="wrap-break-word">
            {location || 'Location not specified'}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => navigate(`/listing/${id}`)}
            className="w-full rounded-xl bg-[#486448] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#354E35] focus:outline-none focus:ring-2 focus:ring-[#66845F] focus:ring-offset-2"
          >
            View details
            <span className="ml-2" aria-hidden="true">→</span>
          </button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onEdit(id)}
              className="rounded-xl border border-[#E5E7DF] bg-white px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#C8D5C1] hover:bg-[#F3F6F0] hover:text-[#486448] focus:outline-none focus:ring-2 focus:ring-[#9DB396] focus:ring-offset-2"
            >
              Edit listing
            </button>

            <button
              type="button"
              onClick={() => onDelete(id)}
              className="rounded-xl border border-[#F0DDDA] bg-[#FFF8F7] px-3 py-2.5 text-sm font-semibold text-[#A34D43] transition hover:border-[#E7C1BB] hover:bg-[#FCEDEA] focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
