package com.cricboard.controller;

import com.cricboard.config.email.EmailDetailsDto;
import com.cricboard.config.email.EmailService;
import com.cricboard.config.jwt.JwtService;
import com.cricboard.dto.*;
import com.cricboard.model.Booking;
import com.cricboard.model.Product;
import com.cricboard.model.User;
import com.cricboard.model.Venue;
import com.cricboard.repository.*;
import com.cricboard.model.*;
import com.cricboard.service.ProductService;
import com.cricboard.service.UserService;
import com.cricboard.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.*;

/**
 * AuthController - Handles user-related operations
 * 
 * This controller manages:
 * - User registration (signup)
 * - User authentication (signin)
 */
@RestController
@RequestMapping("crickhero")
public class AuthController {
    @Autowired
    ProductService productService;
    @Autowired
    EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private VenueService venueService;
    @Autowired
    private ContactUsRepo contactUsRepo;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private VenueRepo venueRepo;
    @Autowired
    private ProductItemsRepo productItemsRepo;
    @Autowired
    private ProductRepo productRepo;

    /**
     * Handles user registration
     * 
     * @param user User object containing registration details
     * @return ResponseEntity with registration result
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        return userService.signupUser(user);
    }

    /**
     * Handles user authentication
     * 
     * @param authRequest AuthRequest object containing login credentials
     * @return ResponseEntity with authentication result and JWT token
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody AuthRequest authRequest) {
        return userService.signinUser(authRequest);
    }

    @PostMapping("/addequipment")
    public ResponseEntity<?> addEquipment(@RequestHeader("Authorization") String header,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestPart("image") MultipartFile image)
    {
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getRole().equals("ROLE_ADMIN")) {
                Product product = new Product();
                product.setTitle(title);
                product.setDescription(description);
                product.setPrice(price);
                return productService.addProduct(image, product);
            }
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/make-merchant")
    public ResponseEntity<?> makeMerchant(@RequestHeader("Authorization") String header,@RequestBody Map<String, String> request){
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if (user != null && user.getRole().equals("ROLE_ADMIN")) {
                String merchant_email = request.get("email");
                User merchant_user = userRepo.findByEmail(merchant_email);
                if(merchant_user!=null) {
                    merchant_user.setMerchant(true);
                    merchant_user.setExpiration_month(LocalDate.now().plusMonths(1));
                    userRepo.save(merchant_user);
                    return new ResponseEntity<>(HttpStatus.OK);
                }else {
                    return new ResponseEntity<>("User doesn't have account on crickboard",HttpStatus.NOT_FOUND);
                }
            }
            return new ResponseEntity<>("Admin not found", HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/cancel-booking")
    public ResponseEntity<?> cancelBooking(@RequestHeader("Authorization") String header,@RequestBody Map<String, String> request){
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }

            User user = userRepo.findByEmail(email);
            if(user==null)
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

//            if (user.isMerchant() || user.getRole()=="ROLE_ADMIN") {
                Long bookingId = Long.valueOf(request.get("bookingId"));
                Booking booking = bookingRepo.findById(bookingId).get();
                bookingRepo.deleteById(bookingId);
            String emailBody = "Dear Customer,\n\n"
                    + "We regret to inform you that your recent booking has been canceled by the merchant.\n"
                    + "We sincerely apologize for the inconvenience caused and thank you for your understanding.\n\n"
                    + "If you have any questions or need further assistance, please feel free to contact our support team.\n\n"
                    + "Thank you,\n"
                    + "Crickboard Team";
                EmailDetailsDto userConfirmation = EmailDetailsDto.builder()
                        .subject("Booking Canceled: " +"[ID: " +  request.get("bookingId") +"]")
                        .recipient(booking.getUser().getEmail())
                        .msgBody(emailBody)
                        .build();
                emailService.sendSimpleMail(userConfirmation);
                return new ResponseEntity<>(HttpStatus.OK);
//            }
//            return new ResponseEntity<>("Merchant not found", HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/shipped-order")
    public ResponseEntity<?> shippedOrder(@RequestHeader("Authorization") String header,@RequestBody Map<String, String> request){
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
//            if (user != null && user.getRole()=="ROLE_ADMIN") {
                Long orderId = Long.valueOf(request.get("orderId"));
                Orders orders = orderRepo.findById(orderId).get();
                orders.setStatus(Status.SHIPPED);
                orderRepo.save(orders);
                return new ResponseEntity<>(HttpStatus.OK);
//            }
//            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/delivered-order")
    public ResponseEntity<?> delivardOrder(@RequestHeader("Authorization") String header,@RequestBody Map<String, String> request){
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
//            if (user != null && user.getRole()=="ROLE_ADMIN") {
                Long orderId = Long.valueOf(request.get("orderId"));
                Orders orders = orderRepo.findById(orderId).get();
                orders.setStatus(Status.DELIVERED);
                orderRepo.save(orders);
                return new ResponseEntity<>(HttpStatus.OK);
//            }
//            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/expire")
    public ResponseEntity<?> getExpirationMonth(@RequestHeader("Authorization") String header){
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if(user!=null && user.isMerchant()) {
                return new ResponseEntity<>(user.getExpiration_month(),HttpStatus.OK);
            }
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/merchantPayment")
    public ResponseEntity<?> processMerchantPayment(@RequestBody MerchantPayment merchantPayment,@RequestHeader("Authorization") String header) {
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if(user!=null && user.isMerchant()) {
                return venueService.processPayment(merchantPayment,user);
            }
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/generate-qr")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        Long amount = Long.valueOf(request.get("amount"));

        if(amount>0){
            System.out.println(amount);
            String command = "./main darshanvirani010@okhdfcbank " + amount +" C:\\Users\\sahaj\\Desktop\\Venue-Booking-App\\fronted\\src\\assets\\images";
            System.out.println(command);
            Runtime runtime = Runtime.getRuntime();

            HashMap<String, String> map = new HashMap<>();
            try {
                Process process = runtime.exec(command);
                process.waitFor(); // Wait for the command to complete
                map.put("qrCodeUrl", "\\assets\\images\\qr.png");
//                System.out.println("QR code generation done.");
            } catch (Exception ex) {
//                System.out.println("Error during QR code generation: " + ex.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(map, HttpStatus.OK);
        }

//        String sourcePath = "C:\\Users\\sahaj\\Desktop\\Venue-Booking-App\\crickhero\\src\\images\\qr.png"; // Source path
//        String destinationPath = "C:\\Users\\sahaj\\Desktop\\Venue-Booking-App\\fronted\\src\\assets\\images\\"; // Destination path
//        String moveCommand = "cmd /c move \"" + sourcePath + "\" \"" + destinationPath + "\"";
//
//        try {
//            Process moveProcess = runtime.exec(moveCommand);
//            moveProcess.waitFor(); // Wait for the move command to complete
//            System.out.println("Image moved successfully.");
//            map.put("qrCodeUrl", "\\assets\\images\\qr.png");
//        } catch (Exception ex) {
//            System.out.println("Error moving image: " + ex.getMessage());
//            map.put("qrCodeUrl", "\\assets\\images\\qr.png");
//        }
            return new ResponseEntity<>( HttpStatus.OK);
    }



    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");
        // Logic to validate OTP and reset password
        boolean isReset = userService.resetPassword(email, otp, newPassword);
        if (isReset) {
            return ResponseEntity.ok("Password reset successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP or email.");
        }
    }
    @GetMapping("/productlist")
    public ResponseEntity<List<Product>> getAllProduct() {
        return new ResponseEntity<>(productService.getAllProduct(),HttpStatus.OK);
    }
    @GetMapping("/booking-data")
    public ResponseEntity<?> getAllBooking(@RequestHeader("Authorization") String header) {
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if(user!=null && user.isMerchant()) {
                HashSet<Integer> venueIds = new HashSet<>();
                for(Venue i : venueRepo.findAllVenueByMerchantEmail(user.getEmail())){
                    venueIds.add(i.getVenueId());
                }
                List<Booking> bookingList = new ArrayList<>();

                for(Booking i : venueService.getAllBooking()){
                    if(venueIds.contains(i.getVenue().getVenueId())){
                        bookingList.add(i);
                    }
                }
                return new ResponseEntity<>(bookingList,HttpStatus.OK);
            }else if(user!=null && user.getRole().equals("ROLE_ADMIN")){
                return new ResponseEntity<>(venueService.getAllBooking(),HttpStatus.OK);
            }else if(user!=null && user.getRole().equals("ROLE_USER")){
                return new ResponseEntity<>(venueService.getAllBookingOfUser(email),HttpStatus.OK);
            }
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/order-data")
    public ResponseEntity<?> getAllOrder(@RequestHeader("Authorization") String header) {
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getRole().equals("ROLE_ADMIN")) {
                return new ResponseEntity<>(productService.getAllOrders(email,"admin"),HttpStatus.OK);
            }else if(user.getRole().equals("ROLE_USER")){
                return new ResponseEntity<>(productService.getAllOrders(email,"user"),HttpStatus.OK);
            }
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/place-order")
    public ResponseEntity<String> placeOrder(@RequestBody OrderDto orderDto, @RequestHeader("Authorization") String header) {
        try {
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if(user!=null){
                orderDto.setEmail(user.getEmail());

                Orders order = new Orders()
                        .builder()
                        .address(orderDto.getAddress())
                        .phone(orderDto.getPhone())
                        .fullName(orderDto.getFullName())
                        .totalAmount(orderDto.getTotalAmount())
                        .email(orderDto.getEmail())
                        .paymentMethod(orderDto.getPaymentMethod())
                        .upiId(orderDto.getUpiId())
                        .pin(orderDto.getPin())
                        .status(Status.UNSHIPPED)
                        .build();
                order = orderRepo.save(order);
                String productString = "";
                int count = 1;
                for(ProductDto i : orderDto.getOrderItems()){
                    Product product = productRepo.findById(i.getId()).get();
                    productString = productString + "("+count+") Product ID: "+i.getId()+"\n"
                    + "    Product: " +product.getTitle()+"\n"
                    + "    Price: " +product.getPrice()+"\n"
                    + "    Qty: " +i.getQuantity()+"\n";
                    count++;
                    ProductItems productItems = new ProductItems();
                    productItems.setProductId(i.getId());
                    productItems.setOrderId(order.getOrderId());
                    productItems.setQty(i.getQuantity());
                    productItemsRepo.save(productItems);
                }
                // Constructing the email body with placeholders
                String emailBody = "Dear " + orderDto.getFullName() + ",\n\n"
                        + "Thank you for placing an order with us! Your order has been successfully received and is being processed. Below are your order details:\n\n"
                        + "Order ID: " + order.getOrderId() + "\n"
                        + "Name: " + orderDto.getFullName() + "\n"
                        + "Phone: " + orderDto.getPhone() + "\n"
                        + "Email: " + email + "\n"
                        + "Address: " + orderDto.getAddress() + "\n"
                        + "Payment Method: " + orderDto.getPaymentMethod() + "\n"
                        + "Order Items: " + orderDto.getOrderItems().size() + "\n"
                        + productString +"\n"
                        + "Total Amount: ₹" +orderDto.getTotalAmount() + "\n\n"
                        + "Tracking ID: " + "https://shadowfex.com" + "\n\n"
                        + "We will notify you once your order is shipped.\n\n"
                        + "If you have any questions or need assistance, please contact our customer support team.\n\n"
                        + "Thank you for shopping with us!\n"
                        + "Crickboard Team";
                EmailDetailsDto orderConfirmationEmail = EmailDetailsDto.builder()
                        .subject("Order Confirmation - Order ID: " + order.getOrderId())
                        .recipient(email)
                        .msgBody(emailBody)
                        .build();
                emailService.sendSimpleMail(orderConfirmationEmail);

                String emailBody1 = "Dear Admin,\n\n"
                        + "A new order has been placed on Crickboard. Below are the order details:\n\n"
                        + "Order ID: " + order.getOrderId() + "\n"
                        + "Customer Name: " + orderDto.getFullName() + "\n"
                        + "Phone: " + orderDto.getPhone() + "\n"
                        + "Email: " + orderDto.getEmail() + "\n"
                        + "Shipping Address: " + orderDto.getAddress() + "\n"
                        + "Payment Method: " + orderDto.getPaymentMethod() + "\n"
                        + "Number of Items: " + orderDto.getOrderItems().size() + "\n"
                        + productString +"\n"
                        + "Total Order Amount: ₹" + orderDto.getTotalAmount() + "\n\n"
                        + "Please review the order and proceed with further processing.\n\n"
                        + "Thank you,\n"
                        + "Crickboard Team";
                EmailDetailsDto adminNotificationEmail = EmailDetailsDto.builder()
                        .subject("New Order Placed - Order ID: " + order.getOrderId())
                        .recipient("official.cricboard@gmail.com")  // Replace with actual admin email variable
                        .msgBody(emailBody1)
                        .build();

                emailService.sendSimpleMail(adminNotificationEmail);

            }
            return ResponseEntity.ok("Order placed successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to place order: " + e.getMessage());
        }
    }




    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUser(),HttpStatus.OK);
    }

    @GetMapping("/merchantdetails")
    public ResponseEntity<List<User>> getAllMerchant() {
        return new ResponseEntity<>(userService.getAllMerchant(),HttpStatus.OK);
    }
    @GetMapping("/venuelist")
    @ResponseStatus(HttpStatus.OK)
    public List<Venue> getAllVenue() {
        return venueService.getAllVenue();
    }
    @GetMapping("/removevenuelist")
    @ResponseStatus(HttpStatus.OK)
    public List<Venue> getAllRemoveVenue(@RequestHeader("Authorization") String header) {
        try{
            String email = "";
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                email = jwtService.extractUsername(token);
            }
            User user = userRepo.findByEmail(email);
            if (user != null && user.isMerchant()) {
                return venueService.getAllMerchantVenue(user);
            }
            return venueService.getAllRemoveVenue();
        }catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    @PostMapping("/contact")
    public ResponseEntity<?> handleContactus(@RequestBody ContactUs contactus){
        try{
            if(contactUsRepo.save(contactus)!=null) {
                String msg = "Dear Admin,\n\n" +
                        "A new inquirzy has been submitted through the Contact Us page. Here are the details:\n\n" +
                        "User Details:\n" +
                        "- Name: " + contactus.getName() + "\n" +
                        "- Email: " + contactus.getEmail() + "\n\n" +
                        "Message:\n" +
                        contactus.getMessage() + "\n\n" +
                        "Please review and take appropriate action.\n\n" +
                        "Best regards,\n" +
                        "Cricboard Team\n" +
                        "official.cricboard@gmail.com";
                EmailDetailsDto adminEmailDetails = EmailDetailsDto.builder()
                        .subject("Contact Information!!")
                        .recipient("official.cricboard@gmail.com") // Replace with the admin's email address
                        .msgBody(msg)
                        .build();

                emailService.sendSimpleMail(adminEmailDetails);
                return new ResponseEntity<>(HttpStatus.OK);
            }
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
