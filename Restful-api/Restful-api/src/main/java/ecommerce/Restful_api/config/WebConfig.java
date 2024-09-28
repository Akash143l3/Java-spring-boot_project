package ecommerce.Restful_api.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Apply CORS settings to all
            .allowedOrigins("http://localhost:3000","http://localhost:3001")  // Allow requests from the 
            .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed methods
            .allowedHeaders("*")  // Allow all headers
            .allowCredentials(true);  // Allow credentials like cookies
    }
}