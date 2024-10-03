export const SaleProductBanner = () => {
  return (
    <div className="relative mb-8">
      <img
        src="https://via.placeholder.com/1920x400"
        alt="Banner"
        className="w-full h-56 object-cover rounded-lg shadow-md"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
        <h2 className="text-3xl font-bold text-white">
          Special Offer - 50% OFF!
        </h2>
      </div>
    </div>
  )
}
