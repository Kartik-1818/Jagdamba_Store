import image1 from "../assets/msinlogo.jpg"

const HeroSection = ({ darkMode }) => {
  const handleShopNow = () => {
    const section = document.getElementById("categories");
    if(section) {
        section.scrollIntoView({ behavior:"smooth"})
    }
  };

  return (
    <section
      className={`relative ${
        darkMode
          ? "bg-gray-900 text-white "
          : ""
      } overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-30 pb-24 px-6 md:px-12">
        <div className="text-center md:text-left space-y-5">
          <h3 className="text-green-700 text-xl font-bold">
            Welcome to Jagdamba Store
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 leading-tight">
            Your Favourite <span className="text-green-700">Stationery</span>{" "}
            Shop is Here<br /> Explore our latest collection
          </h1>
          <p className=" text-lg max-w-md mx-auto md:mx-0">
            Explore the best collection of school, office, and creative supplies
            at the best prices.
          </p>
          <button
            onClick={handleShopNow}
            className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
          >
            Let's Explore
          </button>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src={image1}
            alt="Stationery Showcase"
            className="w-[300px] md:w-[450px] drop-shadow-xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
