import { Button } from './button';
import { Product } from './ProductList';


interface ProductCardProps {
  product: Product;
  deleteProduct: (id: number) => Promise<void>;
  setEditProductData: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, deleteProduct, setEditProductData }) => {
  return (
    <div key={product.id} className="border p-4 rounded">
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover my-2" />
      <p className="font-bold">${product.price}</p>
      <button
        onClick={() => setEditProductData(product)}
        className="bg-yellow-500 text-white p-2 rounded mt-2"
      >
        Edit
      </button>
      <Button
        onClick={() => deleteProduct(product.id)}
        variant={"destructive"}
      >
        Delete
      </Button>
    </div>
  );
};

export default ProductCard;
