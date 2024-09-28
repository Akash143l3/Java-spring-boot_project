package ecommerce.Restful_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ecommerce.Restful_api.model.Order;
import ecommerce.Restful_api.repository.OrderRepository;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3001") 
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }
    
    @PutMapping("/{id}")
    public Order updateOrderQuantity(@PathVariable Long id, @RequestBody Order order) {
        Order existingOrder = orderRepository.findById(id).orElse(null);
        
        if (existingOrder != null) {
            existingOrder.setQuantity(order.getQuantity());
            
            if (existingOrder.getQuantity() <= 0) {
                orderRepository.delete(existingOrder);
                return null;
            } else {
                return orderRepository.save(existingOrder);
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}
