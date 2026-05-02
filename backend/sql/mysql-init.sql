-- Initialise la base et l'utilisateur pour Edukini (MySQL local)
CREATE DATABASE IF NOT EXISTS edukini_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'edukini'@'localhost' IDENTIFIED BY 'edukini123';
GRANT ALL PRIVILEGES ON edukini_db.* TO 'edukini'@'localhost';
FLUSH PRIVILEGES;

-- Vérif rapide
SELECT user, host FROM mysql.user WHERE user IN ('edukini', 'root');
