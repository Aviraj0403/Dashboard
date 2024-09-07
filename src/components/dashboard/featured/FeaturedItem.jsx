
function FeaturedItem({ title, data }) {
  return (
    <div className="rounded-md shadow-md w-full p-4 mx-auto bg-white">
        <h2 className="text-xl font-bold opacity-60 text-center sm:text-left">
          {title}
        </h2>
      <div className="p-4 flex justify-between border-b-2 items-center mb-4">
      </div>
      {/* Items container */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
        {data?.map((item) => (
          <div key={item.id} className="rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedItem;
