package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssuedBookRepository issuedBookRepository;

    @Autowired
    private SystemLogRepository systemLogRepository;

    @Autowired
    private BookReservationRepository reservationRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed default users if empty
        if (userRepository.count() == 0) {
            userRepository.save(new Users("prasanna", "prasanna@library.org", "123456", "ADMIN", "Prasanna", "+91-9876543210", "ACTIVE"));
            userRepository.save(new Users("admin", "admin@library.org", "admin123", "ADMIN", "System Administrator", "+91-9876543200", "ACTIVE"));
            userRepository.save(new Users("librarian", "librarian@library.org", "lib123", "LIBRARIAN", "Sarah Jenkins (Head Librarian)", "+91-9876543201", "ACTIVE"));
            userRepository.save(new Users("member", "member@gmail.com", "member123", "MEMBER", "Alex Morgan", "+91-9876543202", "ACTIVE"));
            userRepository.save(new Users("john_doe", "john@gmail.com", "user123", "MEMBER", "John Doe", "+91-9876543203", "ACTIVE"));
            userRepository.save(new Users("emily_clark", "emily@gmail.com", "user123", "MEMBER", "Emily Clark", "+91-9876543204", "ACTIVE"));
        } else {
            // Ensure prasanna exists even if database already has records
            if (userRepository.findByUsername("prasanna") == null) {
                userRepository.save(new Users("prasanna", "prasanna@library.org", "123456", "ADMIN", "Prasanna", "+91-9876543210", "ACTIVE"));
            }
        }

        // Seed books if empty
        if (bookRepository.count() == 0) {
            bookRepository.save(new Book(
                "Clean Code: A Handbook of Agile Software Craftsmanship",
                "Robert C. Martin",
                "978-0132350884",
                "Computer Science",
                5, 3,
                "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
                "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
                "Prentice Hall", 2008, 599.00,
                "Floor 2, Section CS-01, Rack A, Shelf 3",
                "https://archive.org/details/clean-code",
                "# Chapter 1: Clean Code\n\nThere are two parts to learning craftsmanship: knowledge and work. You must gain the principles, patterns, and heuristics that a craftsman knows.\n\n## The Boy Scout Rule\n'Leave the campground cleaner than you found it.' If we all check-in code a little cleaner than when we checked it out, the code simply could not rot.",
                48
            ));

            bookRepository.save(new Book(
                "Design Patterns: Elements of Reusable Object-Oriented Software",
                "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
                "978-0201633610",
                "Computer Science",
                4, 2,
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
                "Captures solutions to common software design problems in object-oriented programming.",
                "Addison-Wesley", 1994, 649.00,
                "Floor 2, Section CS-01, Rack A, Shelf 4",
                "https://archive.org/details/design-patterns",
                "# Introduction\n\nDesigning object-oriented software is hard, and designing reusable object-oriented software is even harder. Experienced designers use patterns.\n\n## Creational, Structural & Behavioral\nEach design pattern systematically names, explains, and evaluates an important and recurring design in object-oriented systems.",
                39
            ));

            bookRepository.save(new Book(
                "To Kill a Mockingbird",
                "Harper Lee",
                "978-0061120084",
                "Fiction",
                6, 5,
                "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
                "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
                "J. B. Lippincott & Co.", 1960, 399.00,
                "Floor 1, Section FIC-02, Rack B, Shelf 1",
                "https://archive.org/details/to-kill-a-mockingbird",
                "# Chapter 1\n\nWhen he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury.",
                31
            ));

            bookRepository.save(new Book(
                "1984",
                "George Orwell",
                "978-0451524935",
                "Dystopian Fiction",
                8, 6,
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
                "A chilling prophecy about the future and totalitarian rule in a world of total surveillance.",
                "Secker & Warburg", 1949, 299.00,
                "Floor 1, Section DYS-01, Rack C, Shelf 2",
                "https://archive.org/details/1984-george-orwell",
                "# Part One: Chapter I\n\nIt was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions.",
                45
            ));

            bookRepository.save(new Book(
                "Sapiens: A Brief History of Humankind",
                "Yuval Noah Harari",
                "978-0062316097",
                "History",
                5, 4,
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
                "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.",
                "Harper", 2014, 499.00,
                "Floor 3, Section HIS-04, Rack A, Shelf 5",
                "https://archive.org/details/sapiens-harari",
                "# Part One: The Cognitive Revolution\n\n100,000 years ago, at least six different species of humans inhabited Planet Earth. They were animals of no great importance.\n\nToday, only one remains: Homo sapiens. Rules the world.",
                58
            ));

            bookRepository.save(new Book(
                "Atomic Habits",
                "James Clear",
                "978-0735211292",
                "Self-Help",
                7, 5,
                "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
                "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
                "Avery", 2018, 450.00,
                "Floor 1, Section SLF-03, Rack D, Shelf 2",
                "https://archive.org/details/atomic-habits",
                "# The Fundamentals: Why Tiny Changes Make a Big Difference\n\nChanges that seem small and unimportant at first will compound into remarkable results if you're willing to stick with them for years.\n\nYou do not rise to the level of your goals. You fall to the level of your systems.",
                74
            ));

            bookRepository.save(new Book(
                "The Pragmatic Programmer",
                "David Thomas, Andrew Hunt",
                "978-0135957059",
                "Computer Science",
                4, 3,
                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400",
                "Your journey to mastery in modern software engineering.",
                "Addison-Wesley", 2019, 699.00,
                "Floor 2, Section CS-02, Rack B, Shelf 1",
                "https://archive.org/details/the-pragmatic-programmer",
                "# A Pragmatic Philosophy\n\nCare About Your Craft. Think! About Your Work. Provide Options, Don't Make Lame Excuses. Don't Live with Broken Windows.",
                52
            ));
        }

        // Seed transactions if empty
        if (issuedBookRepository.count() == 0) {
            String today = LocalDate.now().toString();
            String dueSoon = LocalDate.now().plusDays(5).toString();
            String overdueDate = LocalDate.now().minusDays(5).toString();

            issuedBookRepository.save(new IssuedBook(1L, "Clean Code: A Handbook of Agile Software Craftsmanship", "978-0132350884", "member", "Alex Morgan", today, dueSoon, "ISSUED", 0.0));
            issuedBookRepository.save(new IssuedBook(2L, "Design Patterns: Elements of Reusable Object-Oriented Software", "978-0201633610", "john_doe", "John Doe", LocalDate.now().minusDays(20).toString(), overdueDate, "ISSUED", 50.0));
        }

        // Seed online reservations if empty
        if (reservationRepository.count() == 0) {
            reservationRepository.save(new BookReservation(1L, "Clean Code: A Handbook of Agile Software Craftsmanship", "978-0132350884", "emily_clark", "Emily Clark", LocalDate.now().minusDays(1).toString(), "PENDING", 1, "Hold for study project"));
            reservationRepository.save(new BookReservation(6L, "Atomic Habits", "978-0735211292", "john_doe", "John Doe", LocalDate.now().toString(), "READY_FOR_PICKUP", 1, "Reserved via AI Recommendation"));
        }

        // Seed automated email alerts if empty
        if (notificationRepository.count() == 0) {
            String nowStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            notificationRepository.save(new Notification("john_doe", "john@gmail.com", "OVERDUE_FINE", "Overdue Notice & Fine Calculation", "Dear John, your book 'Design Patterns' is 5 days overdue. Accrued fine: ₹50.00 INR (₹10/day). Please return promptly.", nowStr, "SENT"));
            notificationRepository.save(new Notification("member", "member@gmail.com", "DUE_REMINDER", "Upcoming Book Due Date Reminder", "Dear Alex, 'Clean Code' is due in 5 days. You can renew online in one click via your portal.", nowStr, "SENT"));
            notificationRepository.save(new Notification("emily_clark", "emily@gmail.com", "RESERVATION_READY", "Your Reserved Book is Ready for Pickup", "Dear Emily, your reserved copy of 'Atomic Habits' is now available at the circulation desk.", nowStr, "SENT"));
        }

        // Seed logs if empty
        if (systemLogRepository.count() == 0) {
            String nowStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            systemLogRepository.save(new SystemLog(nowStr, "System", "SYSTEM", "SYSTEM_INIT", "Database initialized with baseline schema & demo catalog"));
            systemLogRepository.save(new SystemLog(nowStr, "admin", "ADMIN", "USER_CREATE", "Created default system role accounts (Admin, Librarian, Member)"));
        }
    }
}
