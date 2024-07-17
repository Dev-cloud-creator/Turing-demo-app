// src/routes/Reviews.routes.ts
import { Router, Request, Response } from 'express';
import User from '../models/user';
import { Roles, authorize } from '../authorization/authorize';
import { StudentController } from '../controllers/student.controller';
const router = Router();
const _studentController = new StudentController();

// GET - Get free mentor next x hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hour', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    var loggedinUser = (req as any).user as User;
    const mentorsFree = await _studentController.GetFreeMentorsInNextXHours(loggedinUser.id, req.params.hour);
    res.status(200).json({ Reviews: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Get free mentor in any time upto in next 24 hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hour/:min', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    var loggedinUser = (req as any).user as User;
    const mentorsFree = await _studentController.GetFreeMentorsInNext24Hours(loggedinUser.id, req.params.hour, req.params.min);
    res.status(200).json({ Reviews: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Get free mentor in any time and date - Students/getmentor/:date/:hour/:min
router.get('/getmentor/:date/:hour/:min', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    var loggedinUser = (req as any).user as User;
    const mentorsFree = await _studentController.GetFreeMentorsAtTime(loggedinUser.id, req.params.date, req.params.hour, req.params.min);
    res.status(200).json({ Reviews: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Check Reviews for student - Student/getReviews
router.get('/getReviews', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    var loggedinUser = (req as any).user as User;
    const mentorsFree = await _studentController.ListReviews(loggedinUser.id);
    res.status(200).json({ Reviews: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});


// GET - schedule review with mentor
router.get('/schedulereview/:mentorid/:date/:hour/:min', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    var loggedinUser = (req as any).user as User;
    const mentorsFree = await _studentController.ScheduleReview(loggedinUser.id, req.params.mentorid, req.params.date, req.params.hour, req.params.min);
    res.status(200).json({ Review: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// PUT - Student - Cancel a Review associated to self
router.put('/cancelReview/:id', authorize(Roles.Student), async (req: Request, res: Response) => {  
  try {
    var loggedinUser = (req as any).user as User;
    const mentorsFree = await _studentController.CancelReview(req.params.id, loggedinUser.id);
    res.status(200).json({ Review: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }  
});

export default router;

