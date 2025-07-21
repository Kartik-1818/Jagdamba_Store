import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    category: [],
    price: "",
    image: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchsubscribers();
    fetchCategories();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchsubscribers = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/subscribe");
      setSubscribers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (e.target.multiple) {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setForm((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...form,
        price: Number(form.price),
      };

      if (editId) {
        // If editing, send PUT request
        await axios.put(
          `http://localhost:5050/api/products/${editId}`,
          productData
        );
        toast.success("Product updated ✅");
      } else {
        // Else, create new product
        console.log("Submitting data", productData);

        await axios.post("http://localhost:5050/api/products", productData);
        toast.success("Product added ✅");
      }

      // Reset form and state
      setForm({
        name: "",
        category: [],
        price: "",
        image: "",
        description: "",
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error submitting product", err);
      toast.error("Failed to save product ❌");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:5050/api/products/${id}`);
      fetchProducts();
      toast.success("Deleted Product");
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post("http://localhost:5050/api/categories", {
        name: newCategory,
      });
      toast.success("Category Added ✅");
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to add category ❌");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete the category ?"))
      return;
    try {
      await axios.delete(`http://localhost:5050/api/categories/${categoryId}`);
      toast.success("Deleted Successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="max-w-7xlxl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Admin Dashboard - Product Management
        </h1>

        <div className="bg-white p-4 rounded-lg mb-6 shadow">
          <h3 className="text-xl font-bold mb-2 text-black">
            Add New Category
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 border p-2 rounded text-black"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-black mb-2">Existing Category :</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span className="text-black">{cat.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleAddOrUpdate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-200 mb-10"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="text-black border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            multiple
            name="category"
            value={form.category}
            onChange={handleChange}
            className=" text-black border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option className="text-black" value="">
              Select Categories
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="text-black border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 text-black rounded-xl shadow-sm col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 text-black rounded-xl shadow-sm col-span-1 md:col-span-2 lg:col-span-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-transform hover:scale-101 col-span-1 md:col-span-2 lg:col-span-3"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="mb-6 text-black w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-1/3 border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : (
            products
              .filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-gray-100 rounded-3xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="text-xs text-gray-500 mt-1">
                    {Array.isArray(product.category)
                      ? product.category.join(", ")
                      : String(product.category)}
                  </div>

                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-red-600 font-semibold mt-1">
                    ₹{product.price}
                  </p>
                  <div className="flex justify-between mt-3 text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-black">
          👥 Registered Users
        </h2>
        <div className="bg-white rounded-2xl shadow p-5 border">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ol className="list-decimal pl-5 space-y-1 text-black">
              {users.map((u) => (
                <li key={u._id}>{u.username}</li>
              ))}
            </ol>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-black">
          📰 Newsletter Subscribers
        </h2>
        <div className="bg-white rounded-2xl shadow p-5 border text-black">
          {subscribers.length === 0 ? (
            <p>No subscribers yet.</p>
          ) : (
            <ol className="list-disc pl-5 space-y-1">
              {subscribers.map((sub) => (
                <li key={sub._id} className="text-gray-700">
                  {sub.email} — {new Date(sub.createdAt).toLocaleString()}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
