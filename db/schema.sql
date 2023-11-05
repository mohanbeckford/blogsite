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
  content TEXT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Comments table
CREATE TABLE Comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INT,
  user_id INT,
  FOREIGN KEY (post_id) REFERENCES Post(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);
