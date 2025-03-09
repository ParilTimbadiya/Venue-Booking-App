package com.cricboard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping
public class StateCity {
    @GetMapping("/state")
    public ArrayList<String> state(){
        ArrayList<String> arr = new ArrayList<>();
        arr.add("Andaman & Nicobar");
        arr.add("Andhra Pradesh");
        arr.add("Arunachal Pradesh");
        arr.add("Assam");
        arr.add("Bihar");
        arr.add("Chandigarh");
        arr.add("Chhattisgarh");
        arr.add("Dadra & Nagar Haveli");
        arr.add("Daman & Diu");
        arr.add("Delhi");
        arr.add("Goa");
        arr.add("Gujarat");
        arr.add("Haryana");
        arr.add("Himachal Pradesh");
        arr.add("Jammu & Kashmir");
        arr.add("Jharkhand");
        arr.add("Karnataka");
        arr.add("Kerala");
        arr.add("Lakshadweep");
        arr.add("Madhya Pradesh");
        arr.add("Maharashtra");
        arr.add("Manipur");
        arr.add("Meghalaya");
        arr.add("Mizoram");
        arr.add("Nagaland");
        arr.add("Orissa");
        arr.add("Pondicherry");
        arr.add("Punjab");
        arr.add("Rajasthan");
        arr.add("Sikkim");
        arr.add("Tamil Nadu");
        arr.add("Tripura");
        arr.add("Uttar Pradesh");
        arr.add("Uttaranchal");
        arr.add("West Bengal");
        return arr;
    }

}
