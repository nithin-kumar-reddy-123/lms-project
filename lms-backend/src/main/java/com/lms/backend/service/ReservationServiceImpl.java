package com.lms.backend.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.backend.entity.Book;
import com.lms.backend.entity.Reservation;
import com.lms.backend.entity.User;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.ReservationRepository;
import com.lms.backend.repository.UserRepository;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public String reserveBook(String email, Long bookId) {
        User user = userRepository.findByEmail(email).orElse(null);
        Book book = bookRepository.findById(bookId).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (book == null) {
            return "Book not found";
        }

        // Check if already reserved
        List<Reservation> existingReservations = reservationRepository.findByUser(user);
        if (existingReservations.stream().anyMatch(r -> r.getBook().getId().equals(bookId) && "active".equals(r.getStatus()))) {
            return "You have already reserved this book";
        }

        Reservation reservation = new Reservation();
        reservation.setBook(book);
        reservation.setUser(user);
        reservation.setReservationDate(LocalDate.now());
        reservation.setStatus("active");

        reservationRepository.save(reservation);

        // Send notification email
        String subject = "Book Reserved";
        String body = "Dear " + user.getFullName() + ",\n\n" +
                "You have successfully reserved the book '" + book.getTitle() + "'.\n" +
                "You will be notified when the book is available.\n\n" +
                "Regards,\nLibrary Management System";

        emailService.sendEmail(email, subject, body);

        return "Book reserved successfully!";
    }

    @Override
    public List<Reservation> getReservationsForUser(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return List.of();
        }
        return reservationRepository.findByUser(user);
    }

    @Override
    public String cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) {
            return "Reservation not found";
        }

        reservation.setStatus("cancelled");
        reservationRepository.save(reservation);

        return "Reservation cancelled successfully";
    }
}
