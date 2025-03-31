package com.cricboard.service;

import com.cloudinary.Cloudinary;
import com.cricboard.dto.OrderDataResponseDto;
import com.cricboard.dto.ProductDto;
import com.cricboard.model.Orders;
import com.cricboard.model.ProductItems;
import com.cricboard.repository.OrderRepo;
import com.cricboard.repository.ProductItemsRepo;
import com.cricboard.repository.ProductRepo;
import com.cricboard.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    Cloudinary cloudinaryTemplate;
    @Autowired
    OrderRepo orderRepo;
    @Autowired
    ProductItemsRepo productItemsRepo;


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

    public List<?> getAllOrders(String email,String role) {
        if(role=="admin") {
            List<Orders> ordersList = orderRepo.findAll();
            List<OrderDataResponseDto> orderDataResponseDtoList = new ArrayList<>();
            for (Orders i : ordersList) {
                List<ProductItems> productItemsList = productItemsRepo.findAllByOrderId(i.getOrderId());
                List<ProductDto> productDtoList = new ArrayList<>();

                for (ProductItems productItems : productItemsList) {
                    Product product = productRepo.findById(productItems.getProductId()).get();
                    productDtoList.add(ProductDto.builder()
                            .imgSrc(product.getImgSrc())
                            .description(product.getDescription())
                            .title(product.getTitle())
                            .quantity(productItems.getQty())
                            .price((long) product.getPrice())
                            .build());
                }
                OrderDataResponseDto dto = OrderDataResponseDto.builder()
                        .orderId(i.getOrderId())
                        .address(i.getAddress())
                        .email(i.getEmail())
                        .fullName(i.getFullName())
                        .phone(i.getPhone())
                        .paymentMethod(i.getPaymentMethod())
                        .totalAmount(i.getTotalAmount())
                        .orderItems(productDtoList)
                        .status(i.getStatus())
                        .build();
                orderDataResponseDtoList.add(dto);
            }
            return orderDataResponseDtoList;
        }else{
            List<Orders> ordersList = orderRepo.findAllByEmail(email);
            List<OrderDataResponseDto> orderDataResponseDtoList = new ArrayList<>();
            for (Orders i : ordersList) {
                List<ProductItems> productItemsList = productItemsRepo.findAllByOrderId(i.getOrderId());
                List<ProductDto> productDtoList = new ArrayList<>();

                for (ProductItems productItems : productItemsList) {
                    Product product = productRepo.findById(productItems.getProductId()).get();
                    productDtoList.add(ProductDto.builder()
                            .imgSrc(product.getImgSrc())
                            .description(product.getDescription())
                            .title(product.getTitle())
                            .quantity(productItems.getQty())
                            .price((long) product.getPrice())
                            .build());
                }
                OrderDataResponseDto dto = OrderDataResponseDto.builder()
                        .orderId(i.getOrderId())
                        .address(i.getAddress())
                        .email(i.getEmail())
                        .fullName(i.getFullName())
                        .phone(i.getPhone())
                        .paymentMethod(i.getPaymentMethod())
                        .totalAmount(i.getTotalAmount())
                        .orderItems(productDtoList)
                        .status(i.getStatus())
                        .build();
                orderDataResponseDtoList.add(dto);
            }
            return orderDataResponseDtoList;
        }
    }
}
