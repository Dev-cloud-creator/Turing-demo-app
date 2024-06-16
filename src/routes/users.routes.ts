// src/routes/users.routes.ts
import { Router, Request, Response } from 'express';
import User, { UserMap } from '../models/user';
import { database } from '../database';
import Review, { ReviewMap } from '../models/review';
import { Roles, authorize, issueToken } from '../authorization/authorize';
const router = Router();

// GET - Admin - List all users
router.get('/', authorize(Roles.Admin), async (req: Request, res: Response) => {
    try{
        UserMap(database);
        const result = await User.findAll();    
        res.status(200).json({ users: result });
    }
    catch(ex)
    {
        res.status(501).json({ exception: ex });
    }
});

// GET - Admin - get a user - users/:id
router.get('/:id', authorize(Roles.Admin), async (req: Request, res: Response) => {
    try{
        UserMap(database);
        ReviewMap(database);
        const result = await User.findByPk(req.params.id);
        res.status(200).json({ users: result });
    }
    catch(ex)
    {
        res.status(501).json({ exception: ex });
    }
});

// POST - Admin - Create a user
router.post('/', authorize(Roles.Admin), async (req: Request, res: Response) => {
  
  try {
    UserMap(database);
    const result = await User.create(req.body);
    let newUser = result.dataValues as User;
    const token = issueToken(newUser);
    res.status(201).json({ ...newUser, token });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});
export default router;