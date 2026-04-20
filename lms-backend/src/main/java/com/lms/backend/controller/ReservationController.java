package com.lms.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.entity.Reservation;
import com.lms.backend.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // ✅ Reserve Book
    @PostMapping("/reserve")
    public String reserveBook(@RequestParam String email, @RequestParam Long bookId) {
        return reservationService.reserveBook(email, bookId);
    }

    // ✅ Get Reservations for User
    @GetMapping
    public List<Reservation> getReservations(@RequestParam String email) {
        return reservationService.getReservationsForUser(email);
    }

    // ✅ Cancel Reservation
    @DeleteMapping("/{id}")
    public String cancelReservation(@PathVariable Long id) {
        return reservationService.cancelReservation(id);
    }
}
