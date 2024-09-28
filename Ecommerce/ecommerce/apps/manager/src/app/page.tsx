"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import "./globals.css";
import EditProductForm from './component/EditProductForm';
import ProductList from './component/ProductList';
import ProductForm from './component/ProductForm';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', description: '', imageUrl: '', price: 0 });
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editProductData) {
          setEditProductData({ ...editProductData, imageUrl: reader.result as string });
        } else {
          setNewProduct({ ...newProduct, imageUrl: reader.result as string });
        }
        setImageSelected(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation...
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchProducts(); // Refresh product list after adding
      setNewProduct({ name: '', description: '', imageUrl: '', price: 0 });
      setImageSelected(null);
    } catch (error) {
      setError(`Failed to add product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const editProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editProductData) return;
    // Basic validation...
    try {
      const response = await fetch(`http://localhost:8080/api/products/${editProductData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProductData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }
      await fetchProducts(); // Refresh product list after updating
      setEditProductData(null);
      setImageSelected(null);
    } catch (error) {
      setError(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete product with id ${id}`);
      }
      await fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      setError(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <ProductForm 
        newProduct={newProduct} 
        setNewProduct={setNewProduct} 
        addProduct={addProduct} 
        imageSelected={imageSelected} 
        handleImageChange={handleImageChange} 
      />

      <EditProductForm 
        editProductData={editProductData} 
        setEditProductData={setEditProductData} 
        editProduct={editProduct} 
        imageSelected={imageSelected} 
        handleImageChange={handleImageChange} 
      />

      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <ProductList 
          products={products} 
          deleteProduct={deleteProduct} 
          setEditProductData={setEditProductData} 
        />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
