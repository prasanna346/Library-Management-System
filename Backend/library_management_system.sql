-- ============================================================================
-- Library Management System (LMS) - Complete MySQL Database Schema & Seed Data
-- Database Name: lmsdb
-- Stack: React.js + Spring Boot (Java) + MySQL
-- Currency: Indian Rupees (₹ / INR)
-- Default Administrator Account:
--   Username: prasanna
--   Password: 123456
--   Role: ADMIN
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `lmsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lmsdb`;

-- Drop existing tables if re-initializing (in reverse foreign order)
DROP TABLE IF EXISTS `system_log`;
DROP TABLE IF EXISTS `notification`;
DROP TABLE IF EXISTS `book_reservation`;
DROP TABLE IF EXISTS `issued_book`;
DROP TABLE IF EXISTS `book`;
DROP TABLE IF EXISTS `users`;

-- ----------------------------------------------------------------------------
-- Table 1: users (Authentication, Profiles & Role-Based Access Control)
-- ----------------------------------------------------------------------------
CREATE TABLE `users` (
  `xyz` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'MEMBER', -- ADMIN, LIBRARIAN, MEMBER
  `full_name` VARCHAR(150),
  `phone` VARCHAR(50),
  `status` VARCHAR(50) DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Users (Default Admin: prasanna / 123456)
INSERT INTO `users` (`username`, `email`, `password`, `role`, `full_name`, `phone`, `status`) VALUES
('prasanna', 'prasanna@library.org', '123456', 'ADMIN', 'Prasanna (System Administrator)', '+91-9876543210', 'ACTIVE'),
('admin', 'admin@library.org', 'admin123', 'ADMIN', 'System Administrator', '+91-9876543200', 'ACTIVE'),
('librarian', 'librarian@library.org', 'lib123', 'LIBRARIAN', 'Sarah Jenkins (Head Librarian)', '+91-9876543201', 'ACTIVE'),
('member', 'member@gmail.com', 'member123', 'MEMBER', 'Alex Morgan', '+91-9876543202', 'ACTIVE'),
('john_doe', 'john@gmail.com', 'user123', 'MEMBER', 'John Doe', '+91-9876543203', 'ACTIVE'),
('emily_clark', 'emily@gmail.com', 'user123', 'MEMBER', 'Emily Clark', '+91-9876543204', 'ACTIVE');

-- ----------------------------------------------------------------------------
-- Table 2: book (Physical Stock, Shelf Location, Digital E-Book & INR Pricing)
-- ----------------------------------------------------------------------------
CREATE TABLE `book` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `isbn` VARCHAR(50) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `total_copies` INT NOT NULL DEFAULT 1,
  `available_copies` INT NOT NULL DEFAULT 1,
  `cover_url` VARCHAR(1000),
  `description` VARCHAR(2000),
  `publisher` VARCHAR(255),
  `publication_year` INT,
  `price` DOUBLE NOT NULL DEFAULT 499.00, -- Cost of book in Indian Rupees (₹ INR)
  `shelf_location` VARCHAR(255) DEFAULT 'Floor 1, Section GEN-01, Rack A, Shelf 1',
  `ebook_url` VARCHAR(1000),
  `digital_content` TEXT,
  `borrow_count` INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Books with Shelf Locations & Digital Reader Excerpts
INSERT INTO `book` (`title`, `author`, `isbn`, `category`, `total_copies`, `available_copies`, `cover_url`, `description`, `publisher`, `publication_year`, `price`, `shelf_location`, `ebook_url`, `digital_content`, `borrow_count`) VALUES
('Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', '978-0132350884', 'Computer Science', 5, 3, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400', 'Even bad code can function. But if code is not clean, it can bring a development organization to its knees.', 'Prentice Hall', 2008, 599.00, 'Floor 2, Section CS-01, Rack A, Shelf 3', 'https://archive.org/details/clean-code', '# Chapter 1: Clean Code\n\nYou are reading this book for two reasons: First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers.\n\nCode will never disappear. Clean code is simple and direct. It never obscures the designer\'s intent but rather is full of crisp abstractions.', 65),
('Design Patterns: Elements of Reusable Object-Oriented Software', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', '978-0201633610', 'Computer Science', 4, 2, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400', 'Captures solutions to common software design problems in object-oriented programming.', 'Addison-Wesley', 1994, 649.00, 'Floor 2, Section CS-01, Rack B, Shelf 4', 'https://archive.org/details/design-patterns', '# Chapter 1: Introduction\n\nDesigning object-oriented software is hard, and designing reusable object-oriented software is even harder.\n\nExpert designers know not to solve every problem from first principles; they reuse solutions that have worked for them in the past.', 48),
('To Kill a Mockingbird', 'Harper Lee', '978-0061120084', 'Fiction', 6, 5, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400', 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.', 'J. B. Lippincott & Co.', 1960, 399.00, 'Floor 1, Section FIC-02, Rack A, Shelf 1', 'https://archive.org/details/to-kill-a-mockingbird', '# Chapter 1\n\nWhen he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem\'s fears of never being able to play football were assuaged, he was seldom self-conscious about his injury.', 32),
('1984', 'George Orwell', '978-0451524935', 'Dystopian Fiction', 8, 6, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', 'A chilling prophecy about the future and totalitarian rule in a world of total surveillance.', 'Secker & Warburg', 1949, 299.00, 'Floor 1, Section DYS-01, Rack C, Shelf 2', 'https://archive.org/details/1984-george-orwell', '# Part One: Chapter I\n\nIt was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions.', 45),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '978-0062316097', 'History', 5, 4, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400', '100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.', 'Harper', 2014, 499.00, 'Floor 3, Section HIS-04, Rack A, Shelf 5', 'https://archive.org/details/sapiens-harari', '# Part One: The Cognitive Revolution\n\n100,000 years ago, at least six different species of humans inhabited Planet Earth. They were animals of no great importance.\n\nToday, only one remains: Homo sapiens. Rules the world.', 58),
('Atomic Habits', 'James Clear', '978-0735211292', 'Self-Help', 7, 5, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400', 'An Easy and Proven Way to Build Good Habits and Break Bad Ones.', 'Avery', 2018, 450.00, 'Floor 1, Section SLF-03, Rack D, Shelf 2', 'https://archive.org/details/atomic-habits', '# The Fundamentals: Why Tiny Changes Make a Big Difference\n\nChanges that seem small and unimportant at first will compound into remarkable results if you\'re willing to stick with them for years.\n\nYou do not rise to the level of your goals. You fall to the level of your systems.', 74),
('The Pragmatic Programmer', 'David Thomas, Andrew Hunt', '978-0135957059', 'Computer Science', 4, 3, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400', 'Your journey to mastery in modern software engineering.', 'Addison-Wesley', 2019, 699.00, 'Floor 2, Section CS-02, Rack B, Shelf 1', 'https://archive.org/details/the-pragmatic-programmer', '# A Pragmatic Philosophy\n\nCare About Your Craft. Think! About Your Work. Provide Options, Don\'t Make Lame Excuses. Don\'t Live with Broken Windows.', 52);

-- ----------------------------------------------------------------------------
-- Table 3: issued_book (Circulation Transactions, Due Dates & Dynamic Fines)
-- ----------------------------------------------------------------------------
CREATE TABLE `issued_book` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `book_id` BIGINT NOT NULL,
  `book_title` VARCHAR(255) NOT NULL,
  `book_isbn` VARCHAR(50) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `user_full_name` VARCHAR(150),
  `issue_date` VARCHAR(50) NOT NULL,
  `due_date` VARCHAR(50) NOT NULL,
  `return_date` VARCHAR(50),
  `status` VARCHAR(50) NOT NULL DEFAULT 'ISSUED', -- ISSUED, RETURNED, OVERDUE
  `fine_amount` DOUBLE NOT NULL DEFAULT 0.00 -- Calculated at ₹10.00 / overdue day in INR
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Circulation Transactions
INSERT INTO `issued_book` (`book_id`, `book_title`, `book_isbn`, `username`, `user_full_name`, `issue_date`, `due_date`, `status`, `fine_amount`) VALUES
(1, 'Clean Code: A Handbook of Agile Software Craftsmanship', '978-0132350884', 'member', 'Alex Morgan', CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY), 'ISSUED', 0.00),
(2, 'Design Patterns: Elements of Reusable Object-Oriented Software', '978-0201633610', 'john_doe', 'John Doe', DATE_SUB(CURRENT_DATE, INTERVAL 20 DAY), DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY), 'ISSUED', 50.00);

-- ----------------------------------------------------------------------------
-- Table 4: book_reservation (Online Book Reservations & Queue Tracker)
-- ----------------------------------------------------------------------------
CREATE TABLE `book_reservation` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `book_id` BIGINT NOT NULL,
  `book_title` VARCHAR(255) NOT NULL,
  `book_isbn` VARCHAR(50) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `user_full_name` VARCHAR(150),
  `reservation_date` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, READY_FOR_PICKUP, FULFILLED, CANCELLED
  `queue_position` INT NOT NULL DEFAULT 1,
  `notes` VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Reservations
INSERT INTO `book_reservation` (`book_id`, `book_title`, `book_isbn`, `username`, `user_full_name`, `reservation_date`, `status`, `queue_position`, `notes`) VALUES
(1, 'Clean Code: A Handbook of Agile Software Craftsmanship', '978-0132350884', 'emily_clark', 'Emily Clark', DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY), 'PENDING', 1, 'Hold for study project'),
(6, 'Atomic Habits', '978-0735211292', 'john_doe', 'John Doe', CURRENT_DATE, 'READY_FOR_PICKUP', 1, 'Reserved via AI Recommendation');

-- ----------------------------------------------------------------------------
-- Table 5: notification (Automated Email Alerts & Overdue Notices)
-- ----------------------------------------------------------------------------
CREATE TABLE `notification` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL,
  `recipient_email` VARCHAR(150) NOT NULL,
  `type` VARCHAR(50) NOT NULL, -- OVERDUE_FINE, DUE_REMINDER, RESERVATION_READY, BOOK_ISSUED, WELCOME
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'SENT' -- SENT, READ
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Automated Notifications
INSERT INTO `notification` (`username`, `recipient_email`, `type`, `title`, `message`, `created_at`, `status`) VALUES
('john_doe', 'john@gmail.com', 'OVERDUE_FINE', 'Overdue Notice & Fine Calculation', 'Dear John, your book \'Design Patterns\' is 5 days overdue. Accrued fine: ₹50.00 INR (₹10/day). Please return promptly.', NOW(), 'SENT'),
('member', 'member@gmail.com', 'DUE_REMINDER', 'Upcoming Book Due Date Reminder', 'Dear Alex, \'Clean Code\' is due in 14 days. You can renew online in one click via your portal.', NOW(), 'SENT'),
('emily_clark', 'emily@gmail.com', 'RESERVATION_READY', 'Your Reserved Book is Ready for Pickup', 'Dear Emily, your reserved copy of \'Atomic Habits\' is now available at the circulation desk.', NOW(), 'SENT');

-- ----------------------------------------------------------------------------
-- Table 6: system_log (Audit Trail & Activity Log)
-- ----------------------------------------------------------------------------
CREATE TABLE `system_log` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `timestamp` VARCHAR(50) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` VARCHAR(1000)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Initial System Logs
INSERT INTO `system_log` (`timestamp`, `username`, `role`, `action`, `details`) VALUES
(NOW(), 'System', 'SYSTEM', 'SYSTEM_INIT', 'Library Management System database schema initialized successfully.'),
(NOW(), 'prasanna', 'ADMIN', 'ADMIN_SETUP', 'System Administrator account created with full permissions.'),
(NOW(), 'admin', 'ADMIN', 'CATALOG_INIT', 'Initialized baseline inventory catalog with pricing in Indian Rupees (₹ INR).');
