import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry

export default function hander(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message: `El id ${ id } no es válido` });
    }

    switch (req.method) {
        case 'PUT':            
            return updateEntry( req, res );

        case 'GET':
            return getEntry( req, res );

        case 'DELETE':
            return deleteEntry( req, res );
    
        default:
            return res.status(400).json({ message: 'Metodo no existe' });
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {

        await db.disconnect();
        return res.status(400).json({ message: `No hay entrada con el id ${ id }` });
    }

    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

    try {
   
        //const updateEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true } );
        entryToUpdate.description = description;
        entryToUpdate.status = status;
        await entryToUpdate.save(); 
        await db.connect();   
        res.status(200).json( entryToUpdate! );
        
    } catch (error: any) {
        console.log(error);
        await db.connect();  
        res.status(400).json({ message: error.errors.status.message });
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    
    try {
        await db.connect();
        const entry = await Entry.findById( id );

        if ( !entry ) {

            await db.disconnect();
            return res.status(400).json({ message: `No hay entrada con el id ${ id }` });
        }
   
        await db.connect();   
        res.status(200).json( entry! );
        
    } catch (error: any) {
        console.log(error);
        await db.connect();  
        res.status(400).json({ message: error.errors.status.message });
    }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    try {
        const entry = await Entry.findById( id );

        if ( !entry ) {

            await db.disconnect();
            return res.status(400).json({ message: `No hay entrada con el id ${ id }` });
        }

        entry.deleteOne();
   
        await db.connect();   
        res.status(200).json( entry! );
        
    } catch (error: any) {
        console.log(error);
        await db.connect();  
        res.status(400).json({ message: error.errors.status.message });
    }
}