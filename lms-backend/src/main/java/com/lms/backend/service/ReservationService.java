package com.lms.backend.service;

import java.util.List;
import com.lms.backend.entity.Reservation;

public interface ReservationService {

    String reserveBook(String email, Long bookId);

    List<Reservation> getReservationsForUser(String email);

    String cancelReservation(Long reservationId);
}
