"use client";
import React, { useState, useEffect } from "react";

// Define Product and CartItem types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  id?: number; // Optional, for updating existing orders
}

// Cart component to manage the cart page
const CartPage = ({ cart }: { cart: CartItem[] }) => {
  return (
    <div className="my-4 p-4 border rounded shadow">
      <h2 className="text-lg font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul className="list-disc list-inside">
          {cart.map((item) => (
            <li
              key={item.product.id}
              className="flex justify-between items-center"
            >
              <span>{item.product.name}</span>
              <span>Quantity: {item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main Product Page Component
const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products from API
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(
        `Failed to fetch products: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data from API
  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error(
        `Failed to fetch cart: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  // Handle adding products to cart
  const addToCart = async (product: Product) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );
    const orderDate = new Date().toISOString().split("T")[0]; // Order date in yyyy-mm-dd format

    if (existingCartItem) {
      // If the product is already in the cart, increase quantity and update order
      const updatedQuantity = existingCartItem.quantity + 1;

      // Update the order
      const updateOrderPayload = {
        product: { id: product.id },
        quantity: updatedQuantity,
        orderDate: orderDate,
      };

      try {
        await fetch(`http://localhost:8080/api/orders/${existingCartItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateOrderPayload),
        });

        // Update the cart state
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      } catch (error) {
        console.error("Error updating order:", error);
      }
    } else {
      // If the product is not in the cart, add it to the cart
      const newOrderPayload = {
        product: { id: product.id },
        quantity: 1,
        orderDate: orderDate,
      };

      try {
        const response = await fetch("http://localhost:8080/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrderPayload),
        });
        const newOrder = await response.json();

        // Add the new product to the cart
        setCart((prevCart) => [...prevCart, { ...newOrder, product }]);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

  // Handle removing products from cart
  const removeFromCart = async (item: CartItem) => {
    const updatedQuantity = item.quantity - 1; // Decrease quantity by 1

    if (updatedQuantity > 0) {
      // If quantity is greater than 0, update the quantity
      const updateOrderPayload = {
        product: { id: item.product.id },
        quantity: updatedQuantity,
        orderDate: new Date().toISOString().split("T")[0],
      };

      try {
        await fetch(`http://localhost:8080/api/orders/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateOrderPayload),
        });

        // Update the cart state
        setCart((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: updatedQuantity }
              : cartItem
          )
        );
      } catch (error) {
        console.error("Error updating order:", error);
      }
    } else {
      // If quantity is 0, delete the item from the cart
      try {
        await fetch(`http://localhost:8080/api/orders/${item.id}`, {
          method: "DELETE",
        });
        setCart(cart.filter((cartItem) => cartItem.id !== item.id));
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Product Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover"
                />
              )}
              <p>Price: ${product.price}</p>
              <div className="flex items-center mt-2">
                {cart.find((item) => item.product.id === product.id) ? (
                  <>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        removeFromCart(
                          cart.find((item) => item.product.id === product.id)!
                        )
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">
                      {
                        cart.find((item) => item.product.id === product.id)
                          ?.quantity
                      }
                    </span>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Cart Page */}
      <CartPage cart={cart} />
    </div>
  );
};

export default ProductPage;
