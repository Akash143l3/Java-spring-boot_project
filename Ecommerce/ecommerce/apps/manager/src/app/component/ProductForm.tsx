import { ChangeEvent, FormEvent } from "react";
import { Product } from "./ProductList";
import { Button } from "./button";

interface ProductFormProps {
  newProduct: Omit<Product, "id">;
  setNewProduct: (product: Omit<Product, "id">) => void;
  addProduct: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  imageSelected: string | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  setNewProduct,
  addProduct,
  imageSelected,
  handleImageChange,
}) => {
  return (
    <form onSubmit={addProduct} className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Add Product</h2>
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Name"
        className="border p-2 mr-2 mb-2"
      />
      <input
        type="text"
        name="description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        placeholder="Description"
        className="border bg-primary p-2 mr-2 mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 mr-2 mb-2"
      />

      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
        }
        placeholder="Price"
        className="border p-2 mr-2 mb-2"
      />
      <Button type="submit">Add Product</Button>

      {imageSelected && (
        <>
          <img
            src={newProduct.imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover mb-2"
          />
          <p className="text-green-500 mb-2">Selected image: {imageSelected}</p>
        </>
      )}
    </form>
  );
};

export default ProductForm;
