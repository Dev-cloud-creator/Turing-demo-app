// src/routes/users.routes.ts
import { Router, Request, Response } from 'express';
import {issueToken} from '../authorization/authorize'
import { AdminController } from '../controllers/admin.controller';
const bcrypt = require('bcrypt');
const router = Router();
const _adminController = new AdminController();

// POST - Login with email and pwd
router.post('/', async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const result = await _adminController.GetUserByEmail(email);
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
export default router;