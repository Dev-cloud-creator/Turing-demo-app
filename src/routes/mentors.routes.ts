// src/routes/Reviews.routes.ts
import { Router, Request, Response } from 'express';
import Review, { ReviewMap, StateType } from '../models/review';
import User, { UserMap } from '../models/user';
import { database } from '../database';
import { Op } from 'sequelize';
import { Roles, authorize } from '../authorization/authorize';
const router = Router();

// POST - Mentor - get all reviews - mentors/getReviews
router.get('/getReviews', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    var loggedinUser = (req as any).user as User;
    ReviewMap(database);
    let result = await Review.findAll({
      where: {
        mentor_id: Number(loggedinUser.id)
      }
    });
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
    ReviewMap(database);
    var loggedinUser = (req as any).user as User;
    let result = await Review.findOne<Review>({
      where: {
        id: req.params.id,
        mentor_id: loggedinUser.id,
      }
    });

    if(result && result.timestart && result.timestart <= Math.floor((new Date()).getTime() / 1000))
    {
      result.statetype = StateType.INPROGRESS;
      result.save()
      res.status(202).json({ Review: result });
    }
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

// PUT - Complete a Review by id with comments and score - mentors/completeReview/:id
router.put('/completeReview/:id', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    ReviewMap(database);
    var loggedinUser = (req as any).user as User;
    let result = await Review.findOne<Review>({
      where: {
        id: req.params.id,
        mentor_id: loggedinUser.id,
      }
    });

    if(result && result.timestart && result.statetype == StateType.INPROGRESS 
      && result.timestart <= Math.floor((new Date()).getTime() / 1000))
    {
      result.statetype = StateType.COMPLETED;
      result.score = req.body.score;
      result.comments = req.body.comments;
      result.save()
      res.status(202).json({ Review: result });
    }
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

// PUT - Mentor - Cancel a Review associated to self
router.put('/cancelReview/:id', authorize(Roles.Mentor), async (req: Request, res: Response) => {
  
  try {
    ReviewMap(database);
    var loggedinUser = (req as any).user as User;
    let result = await Review.findOne<Review>({
      where: {
        id: req.params.id,
        mentor_id: loggedinUser.id,
      }
    });

    if(result && result.timestart && result.timestart >= Math.floor((new Date()).getTime() / 1000))
    {
      result.statetype = StateType.CANCELED;
      result.save()
      res.status(202).json({ Review: result });
    }
  }
  catch(ex)
  {
    res.status(501).json({ exception: ex });
  }
  
});

export default router;
