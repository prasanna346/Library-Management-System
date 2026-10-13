package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrCategoryContainingIgnoreCaseOrIsbnContaining(
        String title, String author, String category, String isbn
    );
    List<Book> findByCategory(String category);
    java.util.Optional<Book> findByIsbn(String isbn);
}
