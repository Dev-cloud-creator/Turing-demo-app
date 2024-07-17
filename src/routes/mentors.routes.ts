// src/routes/Reviews.routes.ts
import { Router, Request, Response } from 'express';
import Review, { ReviewMap, StateType } from '../models/review';
import User, { UserMap } from '../models/user';
import { Op } from 'sequelize';
import { Roles, authorize } from '../authorization/authorize';
import { MentorController } from '../controllers/mentor.controller';
const router = Router();
const _mentorController = new MentorController();

// POST - Mentor - get all reviews - mentors/getReviews
router.get('/getReviews', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    var loggedinUser = (req as any).user as User;
    let result = await _mentorController.ListReviews(loggedinUser.id);
    res.status(200).json({ Review: result });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

// PUT - Mentor - Start a Review - mentors/startReview/:id
router.put('/startReview/:id', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    var loggedinUser = (req as any).user as User;
    let result = await _mentorController.StartReview(req.params.id,loggedinUser.id);
    res.status(202).json({ Review: result });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

// PUT - Complete a Review by id with comments and score - mentors/completeReview/:id
router.put('/completeReview/:id', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    var loggedinUser = (req as any).user as User;
    var result = await _mentorController.CompleteReview(req.params.id, loggedinUser.id, req.body.score, req.body.comments);
    res.status(202).json({ Review: result });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

// PUT - Mentor - Cancel a Review associated to self
router.put('/cancelReview/:id', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    var loggedinUser = (req as any).user as User;
    let result = await _mentorController.CancelReview(req.params.id, loggedinUser.id);
    res.status(202).json({ Review: result });
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

export default router;
