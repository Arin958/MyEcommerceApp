const Product = require("../model/Product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      brand,
      minPrice,
      maxPrice,
      colors,
      sizes,
      collections,
      isFeatured,
      sort,
      gender,
      search,
      page = 1,
      // limit is removed and no default value is needed
    } = req.query;

    const filter = {
      isActive: true, // only fetch active products
    };

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (collections) filter.collections = collections;
    if (isFeatured) filter.isFeatured = isFeatured === "true";
    if (gender) {
      const genderArray = gender.split(",");
      filter.gender = { $in: genderArray };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (colors) {
      filter.colors = { $in: colors.split(",") };
    }

    if (sizes) {
      filter.sizes = { $in: sizes.split(",") };
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const skip = 0; // since we are not paginating now

    let sortOption = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { "ratings.average": -1 };

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter).sort(sortOption).skip(skip); // no .limit()

    res.status(200).json({
      total,
      page: 1,
      limit: total,
      products,
    });
  } catch (error) {
    console.error("Fetch filtered products error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const similarProducts = await Product.find({
      category: product.category,
      gender: product.gender,
      _id: { $ne: id },
    }).limit(4);

    res.status(200).json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
      isActive: true,
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    const categoriesWithCountAndImage = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({
          category,
          isActive: true,
        });

        // Get one product for this category to extract an image
        const oneProduct = await Product.findOne({
          category,
          isActive: true,
          images: { $exists: true, $not: { $size: 0 } },
        })
          .select("images")
          .lean();

        const image = oneProduct?.images?.[0]?.url || null;

        return {
          category,
          count,
          image,
        };
      })
    );

    res.status(200).json({
      categories: categoriesWithCountAndImage,
      success: true,
      message: "Categories fetched successfully",
      count: categoriesWithCountAndImage.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      category: { $regex: category, $options: "i" },
      isActive: true,
    }).limit(8);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSearchSuggestion = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    })
      .select("name")
      .limit(5);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBestSeller = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ sold: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  // other functions
  getFilteredProducts,
  getProductById,
  getSimilarProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getAllCategories,
  getSearchSuggestion,
  getNewArrivals,
  getBestSeller,
  getAllProducts,
};
