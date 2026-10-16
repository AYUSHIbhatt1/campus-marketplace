
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api/listings';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    contactEmail: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getListing() {
      setIsLoading(true);

      try {
        const response = await axios.get(API);
        const post = response.data.post.find(
          (item) => item._id === id
        );

        if (!post) {
          setMessage('Listing not found.');
          return;
        }

        setFormData({
          title: post.title,
          description: post.description,
          price: post.price,
          category: post.category,
          location: post.location || '',
          contactEmail: post.contactEmail,
        });
      } catch (error) {
        setMessage('Failed to load listing. Please try again.');
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSaving(true);

    try {
      await axios.patch(
        `${API}/${id}`,
        {
          ...formData,
          price: Number(formData.price),
        },
        {
          withCredentials: true,
        }
      );

      navigate('/');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Failed to update listing. Please try again.'
      );
      console.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[#E3E5DC] bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#8CA184] focus:ring-4 focus:ring-[#66845F]/10';

  const labelClass =
    'mb-2 block text-sm font-semibold text-[#354E35]';

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl">

        {/* Page heading */}
        <div className="mb-7">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#66845F] transition hover:text-[#354E35]"
          >
            <span aria-hidden="true">←</span>
            Back to marketplace
          </button>

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8EFE5] text-2xl">
            ✏️
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#66845F]">
            Your listing
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#29392B] sm:text-4xl">
            Edit your listing
          </h1>

          <p className="mt-3 leading-6 text-gray-500">
            Make your changes below and keep your listing up to date.
          </p>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-3xl border border-[#EAEAE3] bg-white shadow-sm">
          <div className="h-1.5 bg-[#66845F]" />

          <div className="p-6 sm:p-9">
            {isLoading ? (
              <div
                className="flex flex-col items-center py-16 text-center"
                role="status"
              >
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E9DE] border-t-[#486448]" />
                <p className="mt-4 text-sm font-medium text-gray-500">
                  Loading your listing...
                </p>
              </div>
            ) : message && !formData.title ? (
              <div className="rounded-2xl border border-[#F0DDDA] bg-[#FFF8F7] p-5 text-center">
                <p className="font-semibold text-[#A34D43]">
                  {message}
                </p>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="mt-4 rounded-xl bg-[#486448] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#354E35]"
                >
                  Back to marketplace
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <p
                    role="alert"
                    className="rounded-xl border border-[#F0DDDA] bg-[#FFF8F7] px-4 py-3 text-sm text-[#A34D43]"
                  >
                    {message}
                  </p>
                )}

                <div>
                  <label htmlFor="title" className={labelClass}>
                    Product title
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={100}
                    placeholder="e.g. Engineering Mathematics Book"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="description" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="Describe the condition and details of your item..."
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="price" className={labelClass}>
                      Price (₹)
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="Enter price"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className={labelClass}>
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select category</option>
                      <option value="Books">Books</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Stationery">Stationery</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className={labelClass}>
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="e.g. Near campus library"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className={labelClass}>
                    Contact email
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    maxLength={254}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-[#F0F0EA] pt-6 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="rounded-xl border border-[#E3E5DC] bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-[#F7F7F2] sm:flex-1"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-[#486448] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#354E35] focus:outline-none focus:ring-2 focus:ring-[#66845F] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-2"
                  >
                    {isSaving ? 'Saving changes...' : 'Save changes →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          Double-check your details before saving your changes.
        </p>
      </div>
    </main>
  );
};

export default EditListing;
