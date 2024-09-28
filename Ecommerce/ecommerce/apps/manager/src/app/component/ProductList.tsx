import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  deleteProduct: (id: number) => Promise<void>;
  setEditProductData: (product: Product) => void;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  deleteProduct,
  setEditProductData,
}) => {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          deleteProduct={deleteProduct}
          setEditProductData={setEditProductData}
        />
      ))}
    </div>
  );
};

export default ProductList;
