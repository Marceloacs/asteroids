
import { open } from "sqlite";
import { dbConfig } from ".";
import type { DB_user } from "asteroids-schema";

export async function createUser(user: { name: string }) {
    try {
        const db = await open(dbConfig);
        const result = await db.run(
            'INSERT INTO users (name) VALUES (?)',
            [user.name]
        );

        return {
            id: result.lastID!,
            name: user.name,
            created_at: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUserById(id: number) {
    try {
        const db = await open(dbConfig);
        const user = await db.get<DB_user>('SELECT * FROM users WHERE id = ?', [id]);
        return user;
    } catch (error) {
        console.error('Error getting user by id:', error);
        throw error;
    }
}

export async function getUserByName(name: string) {
    try {
        const db = await open(dbConfig);
        const user = await db.get<DB_user>('SELECT * FROM users WHERE name = ?', [name]);
        return user;
    } catch (error) {
        console.error('Error getting user by name:', error);
        throw error;
    }
}
