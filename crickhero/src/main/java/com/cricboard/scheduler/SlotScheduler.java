package com.cricboard.scheduler;

import com.cricboard.repository.TimeSlotRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Slf4j
public class SlotScheduler {
    @Autowired
    TimeSlotRepo timeSlotRepo;

    @Scheduled(cron = "0 0 0 * * *")
    private void deleteSlotOfOldDate(){
        try {
            LocalDate date = LocalDate.now().minusDays(1);
            timeSlotRepo.deleteAllLessThanDate(date);
        }catch (Exception e){
            log.error(e.getMessage());
        }
    }
}
