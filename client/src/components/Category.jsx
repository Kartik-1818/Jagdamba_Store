import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Paper Rim",
    image:
      "https://m.media-amazon.com/images/I/41Lrm8KhnqL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_PIRIOFOUR-medium,BottomLeft,30,-20_ZA164,500,900,420,420,AmazonEmber,50,4,0,0_QL100_.jpg",
  },
  {
    name: "Stationery",
    image:
      "https://schoolbooksets.com/wp-content/uploads/2023/10/school-stationery-1.jpg",
  },
  {
    name: "Notebooks",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkXf0qhc3XdKLNU5HjjPn96MdztVlvsEqweQ&s",
  },
  {
      name: "Art & Craft",
      image:
      "https://static.vecteezy.com/system/resources/previews/000/659/305/non_2x/art-and-craft-creative-object-design-vector.jpg",
    },
    {
      name: "Premium Pens",
      image:
        "https://pictures.kartmax.in/outside/live/600x800/quality=6/sites/StAFxmqh5LfPz3ZQSdCh/product-images/WP35209-1.jpg",
    },
  {
    name: "Electronics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFdzWFeEod3sTe6dBl5QWFhB6IUVAsHa7yQ&s",
  },
  {
    name: "Files & Folders",
    image:
      "https://m.media-amazon.com/images/I/41P5cNvWBCL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_PIRIOTWOANDHALF-medium,BottomLeft,30,-20_QL100_.jpg",
  },
  {
    name: "Office Supplies",
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2022/07/29/Office-supplies-stationary-icon-Graphics-35104870-1.jpg",
  },
  {
    name: "Gifts",
    image:
      "https://images.everydayhealth.com/images/healthy-living/how-to-give-better-gifts-according-to-science-1440x810.jpg",
  },
  {
    name: "Households",
    image:
      "https://img.freepik.com/free-vector/household-cleaning-elements-set_1284-46776.jpg",
  },
  {
    name: "Top Products",
    image:
      "https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-best-product-label-badge-red-design-png-image_6607151.png",
  },
];

const CategoriesPage = (darkMode) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products/${categoryName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div id="categories" className="max-w-6xl mx-auto px-4 py-10 ">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="text-green-700">OUR PRODUCTS BY </span>
        <span className="text-yellow-500">CATEGORY</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-28 h-28 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-md ">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover overflow-hidden"
              />
            </div>
            <p className="mt-2 text-center text-sm md:text-base font-medium">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
