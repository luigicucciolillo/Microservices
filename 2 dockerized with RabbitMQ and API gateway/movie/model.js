import mysql from 'mysql2/promise';
 
async function connect() {
  const connection = await mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'topSecret',
    database: 'Movie',
  });
 
  connection.connect();
 
  return connection;
}
 
export async function getAll() {
  const connection = await connect();
 
  const query = 'SELECT * FROM Movie';
  const [data] = await connection.query(query);
 
  connection.end();
 
  return data;
}
 
export async function create(movie) {
  const connection = await connect();
 
  const query = 'INSERT INTO Movie (title, year) VALUES (?, ?)';
  const [result] = await connection.query(query, [movie.title, movie.year]);
 
  connection.end();
 
  return { ...movie, id: result.insertId };
} 