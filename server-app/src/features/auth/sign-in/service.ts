/* 
 Este proyecto es un una demo, por lo que el sign-in no se hace de manera real, 
 se crea un usuario de manera fija en la base de datos y se genera un token de sesión
*/

import { createUser, getUserByName } from "../../../integrations/db/user";
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default async function singInService(name: string) {
    try {
        // Obtenemos el usuario de la base de datos si existe
        const user = await getUser(name);

        if (!user) {
            throw new Error('Error getting user');
        }

        // generamos un token JWT de sesión
        const token = jwt.sign({ id: user.id, name: user.name, createdAt: user.created_at }, JWT_SECRET);

        return {
            token
        };

    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

async function getUser(name: string) {
    const user = await getUserByName(name);
    if (!user) {
        const newUser = await createUser({ name });
        return newUser;
    }
    return user;
}