// middlewares/isAdmin.js
import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  console.log('isAdmin middleware - Session:', req.session);
  
  if (req.session && req.session.isAdmin) {
    console.log('Admin authenticated:', req.session.adminName);
    return next();
  }
  
  console.log('Unauthorized access attempt');
  return res.status(401).json({ 
    message: "Unauthorized not the admin", 
    isAdmin: false 
  });
}



