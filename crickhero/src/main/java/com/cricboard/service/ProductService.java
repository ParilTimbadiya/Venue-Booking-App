package com.cricboard.service;

import com.cloudinary.Cloudinary;
import com.cricboard.repository.ProductRepo;
import com.cricboard.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    Cloudinary cloudinaryTemplate;



    public List<Product> getAllProduct() {
        List<Product> products = productRepo.findAll();
        for(Product i : products){
            i.setCartItemList(null);
        }
        return products;
    }

    @Transactional
    public ResponseEntity<?> addProduct(MultipartFile multipartFile, Product product) {
        try {
            Map image = cloudinaryTemplate.uploader().upload(multipartFile.getBytes(), Collections.emptyMap());
            String imageUrl = (String) image.get("url");
            product.setImgSrc(imageUrl);
            return new ResponseEntity<>(productRepo.save(product), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
