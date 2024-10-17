
export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center 
    group hover:bg-white hover:shadow-2xl hover:shadow-black/50
    transition-all">
    <img src={'/image3.png'} alt="hike"/>
    <h4 className="text-xl my-3 font-semibold">Hike</h4>
    <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
    </p>
    <button className="bg-red-500 text-white py-2 px-8 rounded-full mt-4">
        Add to cart 
    </button>
    </div>
  );
}
