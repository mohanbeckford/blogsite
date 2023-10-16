-- Users table
CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- BlogPosts table
CREATE TABLE BlogPost (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  contents TEXT NOT NULL
);

-- Comments table
CREATE TABLE Comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  BlogPostId INT,
  UserId INT,
  FOREIGN KEY (BlogPostId) REFERENCES BlogPost(id),
  FOREIGN KEY (UserId) REFERENCES User(id)
);
