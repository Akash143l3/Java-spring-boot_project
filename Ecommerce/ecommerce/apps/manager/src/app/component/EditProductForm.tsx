import { ChangeEvent, FormEvent } from "react";
import { Product } from "./ProductList";
import { Button } from './button';

interface EditProductFormProps {
  editProductData: Product | null;
  setEditProductData: (product: Product | null) => void;
  editProduct: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  imageSelected: string | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  editProductData,
  setEditProductData,
  editProduct,
  imageSelected,
  handleImageChange,
}) => {
  if (!editProductData) return null;

  return (
    <form onSubmit={editProduct} className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Edit Product</h2>
      <input
        type="text"
        name="name"
        value={editProductData.name}
        onChange={(e) =>
          setEditProductData({ ...editProductData, name: e.target.value })
        }
        placeholder="Name"
        className="border p-2 mr-2 mb-2"
      />
      <input
        type="text"
        name="description"
        value={editProductData.description}
        onChange={(e) =>
          setEditProductData({
            ...editProductData,
            description: e.target.value,
          })
        }
        placeholder="Description"
        className="border p-2 mr-2 mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 mr-2 mb-2"
      />

      {editProductData.imageUrl && (
        <>
          <img
            src={editProductData.imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover mb-2"
          />
          <p className="text-green-500 mb-2">Current image: {imageSelected}</p>
        </>
      )}

      <input
        type="number"
        name="price"
        value={editProductData.price}
        onChange={(e) =>
          setEditProductData({
            ...editProductData,
            price: parseFloat(e.target.value),
          })
        }
        placeholder="Price"
        className="border p-2 mr-2 mb-2"
      />
      <Button type="submit" >
        Update Product
      </Button>
    </form>
  );
};

export default EditProductForm;
