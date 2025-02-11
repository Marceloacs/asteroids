
/* 
 Este proyecto es un una demo, por lo que el sign-in no se hace de manera real, 
 se crea un usuario de manera fija en la base de datos y se genera un token de sesión
*/

import type { Request, Response } from 'express';
import singInService from './service';

export default async function signInController(req: Request, res: Response) {
    const { name } = req.body;
    const user = await singInService(name);
    if(!user){
        res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
}

