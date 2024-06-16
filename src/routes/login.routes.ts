// src/routes/users.routes.ts
import { Router, Request, Response } from 'express';
import User, { UserMap } from '../models/user';
import { database } from '../database';
import Review, { ReviewMap } from '../models/review';
import {issueToken} from '../authorization/authorize'
const bcrypt = require('bcrypt');
const router = Router();

// POST - Login with email and pwd
router.post('/', async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        UserMap(database);
        const result = await User.findOne({
            where: {
              email: email,
              active: true,
            }
          });
          if(result && req.body.password)
            {
                var hashedpassword = result.password;
                var passwordresult =await bcrypt.compare(password, hashedpassword);
                if(passwordresult)
                    {
                        let user = result.get({plain: true});
                        const token = issueToken(user);
                        return res.status(200).json({ ...user, token });
                    }
            }    
        res.status(401).json({ message: "Sorry Not Allowed Here !" });
    }
    catch(ex)
    {
        res.status(501).json({ exception: ex });
    }
});

// GET - users/:id
router.get('/:id', async (req: Request, res: Response) => {
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

// POST - users
router.post('/', async (req: Request, res: Response) => {
  
  try {
    UserMap(database);
    const result = await User.create(req.body);
    let newUser = result.dataValues as User;
    res.status(201).json({ user: newUser });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});
export default router;