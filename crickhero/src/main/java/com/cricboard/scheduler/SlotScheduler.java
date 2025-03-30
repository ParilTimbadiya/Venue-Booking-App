package com.cricboard.scheduler;

import com.cricboard.model.User;
import com.cricboard.model.Venue;
import com.cricboard.repository.TimeSlotRepo;
import com.cricboard.repository.UserRepo;
import com.cricboard.repository.VenueRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@Slf4j
public class SlotScheduler {
    @Autowired
    TimeSlotRepo timeSlotRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    VenueRepo venueRepo;
//    @Scheduled(cron = "0 0 0 * * *")
//    private void deleteSlotOfOldDate(){
//        try {
//            LocalDate date = LocalDate.now().minusDays(1);
//            timeSlotRepo.deleteAllLessThanDate(date);
//        }catch (Exception e){
//            log.error(e.getMessage());
//        }
//    }
//
    @Scheduled(cron = "0 23 12 * * *")
    private void turnOfShowingVenue(){
        try {
            List<User> users = userRepo.findAllMerchantUser();
            for (User i : users){
                if(i.getExpiration_month().isEqual(LocalDate.now()) || i.getExpiration_month().isBefore(LocalDate.now())) {
                    List<Venue> venues = venueRepo.findAllVenueByMerchantEmail(i.getEmail());
                    for(Venue venue : venues){
                        venue.setShow(false);
                    }
                    venueRepo.saveAll(venues);
                }
                if(i.getExpiration_month().isAfter(LocalDate.now())){
                    List<Venue> venues = venueRepo.findAllVenueByMerchantEmail(i.getEmail());
                    for(Venue venue : venues){
                        venue.setShow(true);
                    }
                    venueRepo.saveAll(venues);
                }
            }
        }catch (Exception e){
            log.error(e.getMessage());
        }
    }


}
