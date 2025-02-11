import { open } from "sqlite";
import { dbConfig } from ".";

export async function getFavoriteAsteroids(userId: string) {
    const db = await open(dbConfig);
    try {
        const asteroids = await db.all<Array<{user_id: string, asteroid_id: string, created_at: string}>>(
            'SELECT * FROM user_asteroid WHERE user_id = ?',
            [userId]
        );
        return asteroids
    } catch (error) {
        console.error("Error al recuperar asteroides favoritos:", error);
        return [];
    }
}

export async function addFavoriteAsteroid(userId: string, asteroidId: string) {
    const db = await open(dbConfig);
    try {
      const result = await db.run(
        'INSERT OR IGNORE INTO user_asteroid (user_id, asteroid_id) VALUES (?, ?)',
        [userId, asteroidId]
      );
      const changes = result.changes ?? 0;
      return changes > 0;
    } catch (error) {
      console.error('Error adding asteroid to favorites:', error);
      return false;
    }
}

// Eliminar un asteroide de favoritos
export async function removeFavoriteAsteroid(userId: string, asteroidId: string) {
  try {
      const db = await open(dbConfig);
  const result = await db.run(
    'DELETE FROM user_asteroid WHERE user_id = ? AND asteroid_id = ?',
    [userId, asteroidId]
      );
      const changes = result.changes ?? 0;
      return changes > 0;
  } catch (error) {
      console.error('Error removing asteroid from favorites:', error);
      return false;
  }
}

// Obtener todos los asteroides favoritos de un usuario
export async function getUserFavoriteAsteroids(userId: string): Promise<Set<string>> {
  try {
      const db = await open(dbConfig);
      const favorites = await db.all<Array<{asteroid_id: string}>>(
      'SELECT asteroid_id FROM user_asteroid WHERE user_id = ?',
      [userId]
      );
      return new Set(favorites.map(fav => fav.asteroid_id));
  } catch (error) {
      console.error('Error getting user favorite asteroids:', error);
      return new Set();
  }
}

// Verificar si un asteroide es favorito de un usuario
export async function getAsteroidFavoriteId(userId: string, asteroidId: string) {
  try {
      const db = await open(dbConfig);
      const result = await db.get(
      'SELECT 1 FROM user_asteroid WHERE user_id = ? AND asteroid_id = ?',
      [userId, asteroidId]
      );
      return result ? result.id : undefined;
  } catch (error) {
      console.error('Error checking if asteroid is favorite:', error);
      return false;
  }
}