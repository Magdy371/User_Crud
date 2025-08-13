import { Request, Response } from 'express';
import User from '../Models/userModel';
import { error } from 'console';

export const createUser = async (req: Request, res: Response)=>
{
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error:(error as Error).message});
    }
};

export const getUsers = async (req:Request, res:Response)=>
{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:(error as Error).message});
    }
};

export const getUserById  = async (req: Request, res: Response)=>
{
    try {
        const user = await User.findOne({uuid:req.params.id});
        if(!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateUser = async (req:Request, res:Response)=>
{
    try {
        const user = await User.findOneAndUpdate({uuid:req.params.id},req.body,{new:true, runValidators:true});
        if(!user) return res.status(404).json({error:'user cannot be found'});
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response) =>
{
    try {
        const user = await User.findOneAndDelete({uuid:req.params.id});
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}