
// BAGIAN 1: JS Fundamentals dari Sudut Pandang Problem Solving

// Latihan 1.1: Menghitung Harga Setelah Diskon
function calculateDiscountedPrice(price, discountPercent) {
  return price - (price * discountPercent) / 100;
}

// Uji coba Latihan 1.1
console.log("1.1 Harga diskon ($1000, diskon 10%):", calculateDiscountedPrice(1000, 10)); // Output: 900

// Latihan 1.2: Menaikkan Tingkat Kesulitan (Array of Objects)
const cart = [
  { title: "Laptop", price: 1000, discountPercent: 10 },
  { title: "Mouse", price: 20, discountPercent: 5 },
  { title: "Keyboard", price: 50, discountPercent: 0 }
];

function applyDiscounts(cartItems) {
  const result = [];
  for (const item of cartItems) {
    const finalPrice = calculateDiscountedPrice(item.price, item.discountPercent);
    result.push({
      ...item,
      finalPrice: finalPrice
    });
  }
  return result;
}

// Uji coba Latihan 1.2
console.log("1.2 Keranjang dengan Harga Diskon:", applyDiscounts(cart));

// BAGIAN 2: Data Representation dan Array of Objects

// Dataset Awal
const initialProducts = [
  { id: 1, title: "Laptop", price: 1200, category: "laptops", stock: 5 },
  { id: 2, title: "Smartphone", price: 800, category: "phones", stock: 15 },
  { id: 3, title: "Headphones", price: 100, category: "audio", stock: 3 },
  { id: 4, title: "Smartwatch", price: 250, category: "wearables", stock: 8 },
  { id: 5, title: "Monitor", price: 300, category: "electronics", stock: 12 }
];

// Latihan 2.1: Mencari Produk berdasarkan ID
function findProductById(products, id) {
  return products.find(product => product.id === id);
}

console.log("2.1 Cari Produk ID 2:", findProductById(initialProducts, 2));

// Latihan 2.2: Stok Menipis (stok < 10)
const lowStockProducts = initialProducts.filter(product => product.stock < 10);
console.log("2.2 Produk Stok Menipis (< 10):", lowStockProducts);

// Latihan 2.3: Mengubah Data Tanpa Mutasi (Immutability)
function updateStock(products, id, newStock) {
  return products.map(p =>
    p.id === id ? { ...p, stock: newStock } : p
  );
}

const updatedProducts = updateStock(initialProducts, 1, 20);
console.log("2.3 Data Baru Setelah Update Stok ID 1:", updatedProducts);
console.log("Pengecekan Immutability (Data Asli Tidak Berubah):", initialProducts[0].stock === 5); // Output: true

// BAGIAN 3: Nested Data

// Dataset Produk dengan Struktur Nested
const nestedProducts = [
  {
    id: 1,
    title: "Laptop",
    price: 1200,
    rating: 4.5,
    stock: 10,
    category: "laptops",
    tags: ["computer", "electronics", "office"],
    dimensions: { width: 30, height: 2, depth: 20 },
    reviews: [
      { user: "A", rating: 5, comment: "Good product" },
      { user: "B", rating: 4, comment: "Worth it" }
    ]
  },
  {
    id: 2,
    title: "Smartphone",
    price: 800,
    rating: 4.2,
    stock: 15,
    category: "phones",
    tags: ["mobile", "electronics"],
    dimensions: { width: 7, height: 0.8, depth: 15 },
    reviews: [
      { user: "C", rating: 4, comment: "Nice camera" },
      { user: "D", rating: 5, comment: "Fast" },
      { user: "E", rating: 3, comment: "Battery so-so" }
    ]
  },
  {
    id: 3,
    title: "Gaming Keyboard",
    price: 150,
    rating: 4.8,
    stock: 8,
    category: "accessories",
    tags: ["computer", "gaming"],
    dimensions: { width: 45, height: 4, depth: 15 },
    reviews: [
      { user: "F", rating: 5, comment: "Awesome RGB!" }
    ]
  }
];

// 3.1 Ambil semua tag (masih berbentuk array bersarang)
const allTagsNested = nestedProducts.map(p => p.tags);
console.log("3.1 Tag (Nested Array):", allTagsNested);

// 3.2 Cari produk berdasarkan tag tertentu
function findProductsByTag(products, tag) {
  return products.filter(p => p.tags.includes(tag));
}
console.log("3.2 Produk dengan tag 'computer':", findProductsByTag(nestedProducts, "computer"));

// 3.3 Hitung jumlah review pada setiap produk -> { id, title, totalReviews }
const reviewSummaries = nestedProducts.map(p => ({
  id: p.id,
  title: p.title,
  totalReviews: p.reviews.length
}));
console.log("3.3 Ringkasan Jumlah Review:", reviewSummaries);

// 3.4 Kumpulkan review yang ratingnya 5
const fiveStarReviews = nestedProducts
  .flatMap(p => p.reviews)
  .filter(review => review.rating === 5);
console.log("3.4 Kumpulan Review Rating 5:", fiveStarReviews);

// 3.5 Hitung rata-rata rating manual dari array reviews
const productsWithCalculatedRating = nestedProducts.map(p => {
  const totalRating = p.reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = p.reviews.length > 0 ? totalRating / p.reviews.length : 0;
  return {
    id: p.id,
    title: p.title,
    calculatedAvgRating: Number(avgRating.toFixed(2))
  };
});
console.log("3.5 Rata-rata Rating Manual per Produk:", productsWithCalculatedRating);

// 3.6 Temukan produk dengan jumlah review terbanyak
const mostReviewedProduct = nestedProducts.reduce((max, product) =>
  product.reviews.length > max.reviews.length ? product : max
);
console.log("3.6 Produk dengan Review Terbanyak:", mostReviewedProduct.title);

// 3.7 Kumpulkan seluruh nilai rating dari semua review menjadi satu array datar
const allRatingsFlat = nestedProducts.flatMap(p => p.reviews.map(r => r.rating));
console.log("3.7 Seluruh Nilai Rating (Flat):", allRatingsFlat);

// BAGIAN 4: Flattening Data

// 4.1 Ambil seluruh tags dari semua produk menjadi satu array datar menggunakan flatMap()
const allTagsFlat = nestedProducts.flatMap(p => p.tags);
console.log("4.1 Seluruh Tags (Flat):", allTagsFlat);

// 4.2 Ambil seluruh comment dari semua review di semua produk menjadi satu array of strings
const allCommentsFlat = nestedProducts.flatMap(p => p.reviews.map(r => r.comment));
console.log("4.2 Seluruh Komentar Review (Flat Array of Strings):", allCommentsFlat);