import type { RequestHandler } from "express";

const authorize: RequestHandler = (req, res, next) => {
  if (req.session.user){
      next()
  }else{
    res.status(401).json({ error: 'Not logged in' })
  }
  
}

export default {authorize}