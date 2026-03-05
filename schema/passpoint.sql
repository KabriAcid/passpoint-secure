-- =========================================
-- DATABASE
-- =========================================

CREATE DATABASE passpoint_auth_system;
USE passpoint_auth_system;


-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    image_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- CLICKPOINTS TABLE
-- =========================================

CREATE TABLE clickpoints (
    click_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    x_coordinate DECIMAL(10,6) NOT NULL,
    y_coordinate DECIMAL(10,6) NOT NULL,
    sequence_order INT NOT NULL,

    CONSTRAINT fk_clickpoints_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- =========================================
-- OTP TABLE
-- =========================================

CREATE TABLE otp_codes (
    otp_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    expiration_time DATETIME NOT NULL,
    status ENUM('pending','used','expired') DEFAULT 'pending',

    CONSTRAINT fk_otp_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- =========================================
-- LOGIN LOG TABLE
-- =========================================

CREATE TABLE login_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    login_status ENUM(
        'success',
        'failed_clickpoint',
        'failed_otp',
        'account_locked'
    ),

    CONSTRAINT fk_loginlog_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- =========================================
-- INDEXES (Performance Optimization)
-- =========================================

CREATE INDEX idx_clickpoints_user
ON clickpoints(user_id);

CREATE INDEX idx_otp_user
ON otp_codes(user_id);

CREATE INDEX idx_loginlog_user
ON login_logs(user_id);