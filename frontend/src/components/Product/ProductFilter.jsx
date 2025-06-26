// components/Product/ProductFilter.js
import GenderSideBar from "../../components/Product/GenderSideBar";
import CategorySidebar from "./CategoriesSidebar";

const ProductFilter = ({ selectedGenders, setSelectedGenders, selectedCategories, setSelectedCategories  }) => {
  return (
    <div className="space-y-6">
      {/* Gender Filter */}
      <GenderSideBar
        selectedGenders={selectedGenders}
        setSelectedGenders={setSelectedGenders}
      />

      <CategorySidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Add other filters here in the future like category, price, etc. */}
    </div>
  );
};

export default ProductFilter;
