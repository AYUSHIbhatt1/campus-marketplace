
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    contactEmail: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append('image', image);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/listings`,
        data,
        {
          withCredentials: true,
        }
      );

      setMessage('Listing added successfully!');

      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        location: '',
        contactEmail: '',
      });

      setImage(null);
      setImagePreview('');

      navigate('/');
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Failed to add listing.'
      );
    }
  };

  const inputStyle =
    'w-full rounded-xl border border-[#DCE4D8] bg-white px-4 py-3 text-sm text-[#344437] placeholder:text-[#A0AAA0] outline-none transition duration-200 focus:border-[#789477] focus:ring-4 focus:ring-[#789477]/10';

  const labelStyle =
    'mb-2 block text-sm font-semibold text-[#465747]';

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-3xl">

        {/* Page heading */}
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-[#DCE6D8] bg-[#EEF3EA] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#557454]">
            Campus Marketplace
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-[#2F4032] sm:text-4xl">
            Give your items a new home.
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#7C857A] sm:text-base">
            Have something you no longer need? List it here and
            help another student find what they need.
          </p>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-3xl border border-[#E8E7DF] bg-white shadow-[0_12px_40px_rgba(48,64,48,0.06)]">

          <div className="border-b border-[#E8EDE5] bg-[#EAF0E6] px-6 py-5 sm:px-9">
            <h2 className="text-lg font-bold text-[#344936]">
              Listing details
            </h2>
            <p className="mt-1 text-sm text-[#71816E]">
              Fill in the details so buyers know exactly what you’re selling.
            </p>
          </div>

          <div className="p-6 sm:p-9">

            {message && (
              <div
                role="status"
                className="mb-6 rounded-xl border border-[#DCE6D8] bg-[#F0F5EC] px-4 py-3 text-sm text-[#426442]"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Product title */}
              <div>
                <label htmlFor="title" className={labelStyle}>
                  Product title
                </label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript textbook, study table..."
                  required
                  className={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={labelStyle}>
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe its condition, features, and anything a buyer should know..."
                  rows={4}
                  required
                  className={`${inputStyle} resize-y`}
                />
              </div>

              {/* Image upload */}
              <div>
                <label htmlFor="image" className={labelStyle}>
                  Product image
                </label>

                <label
                  htmlFor="image"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D6E1D1] bg-[#F8FAF6] px-5 py-8 text-center transition hover:border-[#8BA287] hover:bg-[#F1F5EE]"
                >
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E6EEE1] text-[#587755]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-4.5-9L12 3m0 0L7.5 7.5M12 3v13.5"
                      />
                    </svg>
                  </span>

                  <span className="text-sm font-semibold text-[#405641]">
                    {image ? 'Choose a different image' : 'Click to upload an image'}
                  </span>

                  <span className="mt-1 text-xs text-[#8A9587]">
                    PNG, JPG or other image formats
                  </span>

                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>

                {imagePreview && (
                  <div className="mt-4 rounded-2xl border border-[#E3E8DE] bg-[#FAFBF8] p-3">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#71816E]">
                      Image preview
                    </p>

                    <img
                      src={imagePreview}
                      alt="Selected product preview"
                      className="h-56 w-full rounded-xl object-contain sm:h-64"
                    />

                    <p className="mt-3 truncate text-sm text-[#647360]">
                      {image?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Price and category */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="price" className={labelStyle}>
                    Price (₹)
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-[#7B8978]">
                      ₹
                    </span>

                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="350"
                      min="0"
                      required
                      className={`${inputStyle} pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className={labelStyle}>
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={`${inputStyle} cursor-pointer`}
                  >
                    <option value="">Select a category</option>
                    <option value="Books">Books</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className={labelStyle}>
                  Pickup location
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. GEHU Campus, Dehradun"
                  required
                  className={inputStyle}
                />

                <p className="mt-2 text-xs text-[#8A9587]">
                  Let buyers know where they can collect the item.
                </p>
              </div>

              {/* Contact email */}
              <div>
                <label htmlFor="contactEmail" className={labelStyle}>
                  Contact email
                </label>

                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={inputStyle}
                />
              </div>

              {/* Submit */}
              <div className="border-t border-[#EDF0E9] pt-6">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#557653] px-5 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-[#426342] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#789477]/25 active:scale-[0.99]"
                >
                  Publish listing
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17 17 7M7 7h10v10"
                    />
                  </svg>
                </button>

                <p className="mt-3 text-center text-xs text-[#929A8F]">
                  Please make sure your listing details are accurate before publishing.
                </p>
              </div>

            </form>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mx-auto mt-6 flex items-center gap-2 text-sm font-medium text-[#71816E] transition hover:text-[#405641]"
        >
          <span aria-hidden="true">←</span>
          Back to marketplace
        </button>

      </div>
    </div>
  );
};

export default AddListing;
