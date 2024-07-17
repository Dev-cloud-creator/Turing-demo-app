// src/routes/users.routes.ts
import { Router, Request, Response } from 'express';
import { Roles, authorize, issueToken } from '../authorization/authorize';
import { AdminController } from '../controllers/admin.controller';
const router = Router();
const _adminController = new AdminController();

// GET - Admin - List all users
router.get('/', authorize(Roles.Admin), async (req: Request, res: Response) => {
    try{
        const result = await _adminController.ListUsers();    
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
        let result = await _adminController.GetUserById(req.params.id);
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
    let newUser = await _adminController.CreateOrUpdateUser(req.body);
    const token = issueToken(newUser);
    res.status(201).json({ ...newUser, token });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});
export default router;