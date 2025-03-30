package com.cricboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto {
    private String cartItemList;
    private String description;
    private Long id;
    private String imgSrc;
    private Long price;
    private Long quantity;
    private String title;
}
