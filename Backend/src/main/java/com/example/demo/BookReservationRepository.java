package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookReservationRepository extends JpaRepository<BookReservation, Long> {
    List<BookReservation> findByUsername(String username);
    List<BookReservation> findByBookIdAndStatus(Long bookId, String status);
    List<BookReservation> findByUsernameAndStatus(String username, String status);
}
