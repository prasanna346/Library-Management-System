package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssuedBookRepository extends JpaRepository<IssuedBook, Long> {
    List<IssuedBook> findByUsername(String username);
    List<IssuedBook> findByStatus(String status);
    List<IssuedBook> findByBookIdAndUsernameAndStatus(Long bookId, String username, String status);
}
