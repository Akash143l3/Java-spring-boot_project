package ecommerce.Restful_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ecommerce.Restful_api.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
