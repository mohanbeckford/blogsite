// const fs = require('fs');
// const mysql = require('mysql');

// const data = JSON.parse(fs.readFileSync('./seeds/blogpost-seeds.json', 'utf-8'));

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Beeswasp2001@',
//   database: 'blog_db',
// });

// connection.connect();

// data.forEach(post => {
//   const { title, content } = post;
//   const insertQuery = `INSERT INTO blog_posts (title, content) VALUES ('${title}', '${content}')`;

//   connection.query(insertQuery, (error, results, fields) => {
//     if (error) throw error;
//     console.log('Inserted post:', results);
//   });
// });

// connection.end();
