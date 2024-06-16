// src/routes/Reviews.routes.ts
import { Router, Request, Response } from 'express';
import Review, { ReviewMap, StateType } from '../models/review';
import User, { UserMap } from '../models/user';
import { database } from '../database';
import { Roles, authorize } from '../authorization/authorize';
import { Op } from 'sequelize';
const router = Router();

// GET - Admin - List all Reviews
router.get('/', authorize(Roles.Admin), async (req: Request, res: Response) => {
  try {
    ReviewMap(database);
    const result = await Review.findAll();
    res.status(200).json({ Reviews: result });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Admin - List one review by id - Reviews/:id
router.get('/:id', authorize(Roles.Admin), async (req: Request, res: Response) => {
  try {
    ReviewMap(database);
    const result = await Review.findByPk(req.params.id);
    res.status(200).json({ Reviews: result });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Admin - List any users review - Reviews/:id
router.get('/getReviewsForUser/:userid', authorize(Roles.Admin), async (req: Request, res: Response) => {

  try {
    const { userid } = req.params;
    ReviewMap(database);
    let result = await Review.findAll({
      where: {
        [Op.or]: [
          { mentor_id: Number(userid) },
          { student_id: Number(userid) }
        ]
      }
    });
    res.status(200).json({ Review: result });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});

// POST - Admin - update any review
router.post('/', authorize(Roles.Admin), async (req: Request, res: Response) => {

  try {
    UserMap(database);
    ReviewMap(database);
    const result = await Review.create(req.body);
    let newReview = result.dataValues as Review;
    res.status(201).json({ Review: newReview });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});



// POST - Admin - Cancel a Review
router.put('/cancelReview/:id', authorize(Roles.Admin), async (req: Request, res: Response) => {

  try {
    ReviewMap(database);
    let result = await Review.findByPk<Review>(req.params.id);
    if (result) {
      result.statetype = StateType.CANCELED;
      result.save()
      res.status(202).json({ Review: result });
    }
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});

export default router;