// src/routes/Reviews.routes.ts
import { Router, Request, Response } from 'express';
import Review, { ReviewMap, StateType } from '../models/review';
import User, { UserMap } from '../models/user';
import { database } from '../database';
import { Op } from 'sequelize';
import { Roles, authorize } from '../authorization/authorize';
const router = Router();

// GET - Get free mentor next x hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hours', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    let currentUTCTime = Math.floor((new Date()).getTime() / 1000);
    currentUTCTime = currentUTCTime - (3600 * 30);
    const endUTCDateTime = currentUTCTime + (3600 * Number(req.params.hours));
    console.log("querying with current utc time -->" + currentUTCTime);
    const mentorsFree = await GetFreeMentors(currentUTCTime, endUTCDateTime);
    res.status(200).json({ Reviews: mentorsFree });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Get free mentor in any time upto in next 24 hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hour/:min', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    let hour = Number(req.params.hour ?? -1);
    let min = Number(req.params.min ?? -1);
    if (hour && min && (hour >= 0 && hour <= 24) && (min == 0 || min == 30)) {
      let currentUTCTime = Math.floor((new Date()).getTime() / 1000);
      currentUTCTime = currentUTCTime - (60 * 30);
      const endUTCDateTime = currentUTCTime + (3600 * Number(req.params.hour));
      console.log("querying with current utc time -->" + currentUTCTime);
      const mentorsFree = await GetFreeMentors(currentUTCTime, endUTCDateTime);
      res.status(200).json({ Reviews: mentorsFree });
    }
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// GET - Get free mentor in any time and date - Students/getmentor/:date/:hour/:min
router.get('/getmentor/:date/:hour/:min', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    let date = new Date(req.params.date ?? new Date().toString());
    let hour = Number(req.params.hour ?? -1);
    let min = Number(req.params.min ?? -1);
    if (hour && min && (hour >= 0 && hour <= 24) && (min == 0 || min == 30)) {
      date.setHours(hour);
      date.setMinutes(min);
      let startUTCTime = Math.floor((new Date()).getTime() / 1000);
      startUTCTime = startUTCTime - (60 * 30);
      const endUTCDateTime = startUTCTime + 7200;
      console.log("querying with start utc time -->" + startUTCTime);
      const mentorsFree = await GetFreeMentors(startUTCTime, endUTCDateTime);
      res.status(200).json({ Reviews: mentorsFree });
    }
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }
});

// POST - Check Reviews for student - Student/getReviews
router.get('/getReviews', authorize(Roles.Student), async (req: Request, res: Response) => {

  try {
    var loggedinUser = (req as any).user as User;
    ReviewMap(database);
    let result = await Review.findAll({
      where: {
        student_id: Number(loggedinUser.id)
      }
    });
    res.status(200).json({ Review: result });
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});


// GET - schedule review with mentor
router.get('/schedulereview/:mentorid/:date/:hour/:min', authorize(Roles.Student), async (req: Request, res: Response) => {
  try {
    //UserMap(database);
    //ReviewMap(database);
    var loggedinUser = (req as any).user as User;
    let date = new Date(req.params.date ?? new Date().toString());
    let hour = Number(req.params.hour ?? -1);
    let min = Number(req.params.min ?? -1);
    if (hour >= 0 && hour <= 24 && (min == 0 || min == 30)) {
      date.setHours(hour);
      date.setMinutes(min);
      let startUTCTime = Math.floor(date.getTime() / 1000);
      let endUTCTime = startUTCTime + 3600;
      const mentorsFree = await GetFreeMentors(startUTCTime, endUTCTime);
      if (mentorsFree.filter(m => m.id == Number(req.params.mentorid)).length) {
        let reviewBody = {
          "statetype": "pending",
          "timestart": startUTCTime,
          "timeend": endUTCTime,
          "mentor_id": req.params.mentorid,
          "student_id": loggedinUser.id,
          "score": 0,
          "comments": ""
        };
        const result = await Review.create(reviewBody);
        let newReview = result.dataValues as Review;
        res.status(201).json({ Review: newReview });
      }
      else{
        res.status(412).json({ Message: "mentors are not available in selected timeslot!" });
      }
    }
  }
  catch (ex) {
    res.status(501).json({ exception: ex });
  }

});

// POST - Student - Cancel a Review associated to self
router.put('/cancelReview/:id', authorize(Roles.Student), async (req: Request, res: Response) => {
  
  try {
    ReviewMap(database);
    var loggedinUser = (req as any).user as User;
    let result = await Review.findOne<Review>({
      where: {
        id: req.params.id,
        student_id: loggedinUser.id,
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

async function GetFreeMentors(currentUTCTime: number, endUTCDateTime: number) {
  const mentorsBusy = await GetBusyMentors(currentUTCTime, endUTCDateTime);
  UserMap(database);
  let queryForMeentorsBusy = mentorsBusy && mentorsBusy.length ? {
    attributes: ['id', 'name'],
    where: {
      [Op.not]: [
        { id: mentorsBusy },
      ],
      active: true,
      usertype: "mentor"
    }
  } : {
    attributes: ['id', 'name'],
    where: {
      active: true,
      usertype: "mentor"
    }
  };
  const usersFree = await User.findAll(queryForMeentorsBusy);
  return usersFree;
}

async function GetBusyMentors(currentUTCTime: number, endUTCDateTime: number) {
  ReviewMap(database);
  const usersBusy = await Review.findAll({
    attributes: ['mentor_id'],
    where: {
      timestart: {
        [Op.gt]: currentUTCTime,
        [Op.lt]: endUTCDateTime
      }
    }
  });
  const mentorsBusy = usersBusy.map(a => a.mentor_id);
  return mentorsBusy;
}

