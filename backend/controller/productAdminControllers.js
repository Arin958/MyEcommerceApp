// controllers/productController.js
const Product = require("../model/Product");
const cloudinary = require("../utils/cloudinary");
const slugify = require("slugify");

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      sku,
      stock,
      colors,
      sizes,
      gender,
      collections,
      isFeatured,

      isActive,
    } = req.body;

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    // Upload images to Cloudinary
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              resolve({
                url: result.secure_url,
                alt: name, // You can customize the alt later
              });
            }
          )
          .end(file.buffer);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const newProduct = new Product({
      name,
      slug: slugify(name),
      description,
      brand,
      category,
      price,
      discountPrice: discountPrice || undefined,
      sku,
      stock,
      gender,
      colors: colors ? JSON.parse(colors) : [],
      sizes: sizes ? JSON.parse(sizes) : [],
      collections,
      isFeatured: isFeatured === "true",
      isActive: isActive === "true",
      images: uploadedImages,
      user: req.user?._id, // assuming `req.user` is set by auth middleware
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      sku,
      stock,
      colors,
      sizes,
      collections,
      isFeatured,
      isActive,
      existingImages = [],
    } = req.body;

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Upload new images (if any)
    let newImages = [];
    const files = req.files;

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "image", folder: "products" },
              (error, result) => {
                if (error) return reject(error);
                resolve({
                  url: result.secure_url,
                  alt: name,
                });
              }
            )
            .end(file.buffer);
        });
      });

      newImages = await Promise.all(uploadPromises);
    }

    // Ensure existingImages is an array
    const parsedExistingImages = Array.isArray(existingImages)
      ? existingImages
      : typeof existingImages === "string"
      ? [existingImages]
      : [];

    const mergedImages = [
      ...parsedExistingImages.map((url) => ({ url, alt: name })),
      ...newImages,
    ];

    // Update fields
    if (name) {
      product.name = name;
      product.slug = slugify(name);
    }
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (sku) product.sku = sku;
    if (stock !== undefined) product.stock = stock;

    // Safe parse for arrays
    const safeParseJSON = (value) => {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    };

    if (colors) product.colors = safeParseJSON(colors);
    if (sizes) product.sizes = safeParseJSON(sizes);

    if (collections) product.collections = collections;
    if (isFeatured !== undefined) product.isFeatured = isFeatured === "true";
    if (isActive !== undefined) product.isActive = isActive === "true";

    if (mergedImages.length > 0) product.images = mergedImages;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Edit product error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

module.exports = {
  editProduct,
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
};
