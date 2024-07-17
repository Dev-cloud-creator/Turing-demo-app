// src/routes/Reviews.routes.ts
import { Router, Request, Response } from 'express';
import { Roles, authorize } from '../authorization/authorize';
import { AdminController } from '../controllers/admin.controller';
const router = Router();
const _adminController = new AdminController();

// GET - Admin - List all Reviews
router.get('/', authorize(Roles.Admin), async (req: Request, res: Response) => {
  try {
    const result = await _adminController.ListReviews();
    res.status(200).json({ Reviews: result });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Admin - List one review by id - Reviews/:id
router.get('/:id', authorize(Roles.Admin), async (req: Request, res: Response) => {
  try {
    const result = await _adminController.GetReviewById(req.params.id);
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
    if (userid)
      res.status(200).json({ Review: await _adminController.GetReviewsByUser(userid) });
    else
      res.status(404).json({ Message: "notfound" });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});

// POST - Admin - update any review
router.post('/', authorize(Roles.Admin), async (req: Request, res: Response) => {

  try {
    const result = await _adminController.CreateOrUpdateReview(req.body);
    res.status(201).json({ Review: result });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});

// PUT - Admin - Cancel a Review
router.put('/cancelReview/:id', authorize(Roles.Admin), async (req: Request, res: Response) => {

  try {
    let result = await _adminController.CancelReview(req.params.id);
    if (result) {
      res.status(202).json({ Review: result });
    }
    else
      res.status(412).json({ Message: "failed to update" });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});

export default router;