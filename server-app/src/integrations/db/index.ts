import { open } from 'sqlite';
import sqlite3 from 'sqlite3';


// Configuración de la base de datos SQLite
export const dbConfig = {
  filename: './demo.sqlite',
  driver: sqlite3.Database
};

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {

    console.log('SQLite database path:', dbConfig.filename);
    const db = await open(dbConfig);
    
    // Crear las tablas si no existen
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_asteroid (
        user_id INTEGER,
        asteroid_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, asteroid_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('Base de datos inicializada correctamente');
    return db;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}