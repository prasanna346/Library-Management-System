package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;
    private String category;
    private int totalCopies;
    private int availableCopies;
    
    @Column(length = 1000)
    private String coverUrl;
    
    @Column(length = 2000)
    private String description;
    
    private String publisher;
    private int publicationYear;
    private double price; // Cost of the book in Indian Rupees (₹)
    private String shelfLocation; // e.g. "Floor 2, Section CS-4, Rack B"
    private String ebookUrl; // Digital Book URL
    
    @Column(length = 4000)
    private String digitalContent; // In-app Digital Book Content / Excerpt
    
    private int borrowCount; // Usage statistics for AI recommendations

    public Book() {}

    public Book(String title, String author, String isbn, String category, int totalCopies, int availableCopies, String coverUrl, String description, String publisher, int publicationYear, double price, String shelfLocation, String ebookUrl, String digitalContent, int borrowCount) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.category = category;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
        this.coverUrl = coverUrl;
        this.description = description;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.price = price;
        this.shelfLocation = shelfLocation != null ? shelfLocation : "Floor 1, Shelf General, Rack A";
        this.ebookUrl = ebookUrl != null ? ebookUrl : "";
        this.digitalContent = digitalContent != null ? digitalContent : "";
        this.borrowCount = borrowCount;
    }

    public Book(String title, String author, String isbn, String category, int totalCopies, int availableCopies, String coverUrl, String description, String publisher, int publicationYear, double price) {
        this(title, author, isbn, category, totalCopies, availableCopies, coverUrl, description, publisher, publicationYear, price, "Floor 2, Section " + category.substring(0, Math.min(3, category.length())).toUpperCase() + "-01, Rack 1", "", "", 0);
    }

    public Book(String title, String author, String isbn, String category, int totalCopies, int availableCopies, String coverUrl, String description, String publisher, int publicationYear) {
        this(title, author, isbn, category, totalCopies, availableCopies, coverUrl, description, publisher, publicationYear, 499.0);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getShelfLocation() {
        return shelfLocation;
    }

    public void setShelfLocation(String shelfLocation) {
        this.shelfLocation = shelfLocation;
    }

    public String getEbookUrl() {
        return ebookUrl;
    }

    public void setEbookUrl(String ebookUrl) {
        this.ebookUrl = ebookUrl;
    }

    public String getDigitalContent() {
        return digitalContent;
    }

    public void setDigitalContent(String digitalContent) {
        this.digitalContent = digitalContent;
    }

    public int getBorrowCount() {
        return borrowCount;
    }

    public void setBorrowCount(int borrowCount) {
        this.borrowCount = borrowCount;
    }
}
