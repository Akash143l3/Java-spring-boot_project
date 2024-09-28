package ecommerce.Restful_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ecommerce.Restful_api.model.Product;
import ecommerce.Restful_api.repository.ProductRepository;
import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product products) {
        return productRepository.save(products);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product products = productRepository.findById(id).orElse(null);
        if (products != null) {
            products.setName(productDetails.getName());
            products.setDescription(productDetails.getDescription());
            products.setImageUrl(productDetails.getImageUrl());
            products.setPrice(productDetails.getPrice());
            return productRepository.save(products);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}

