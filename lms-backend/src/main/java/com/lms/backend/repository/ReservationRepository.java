package com.lms.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.backend.entity.Reservation;
import com.lms.backend.entity.User;
import com.lms.backend.entity.Book;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser(User user);

    List<Reservation> findByBook(Book book);

    List<Reservation> findByStatus(String status);
}
