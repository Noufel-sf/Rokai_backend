
import { Request, Response, NextFunction } from "express";
import bcrypt, { hash } from "bcryptjs";

declare module 'express-session' {

  interface SessionData {
    isAdmin?: boolean;
    adminName?: string;
  }

}


const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
// bcrypt.hash("nounou12", 10).then(console.log);



export const AdminLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { adminName, password } = req.body;

  console.log('=== Admin Login Attempt ===');
  console.log('Received adminName:', adminName);
  console.log('Expected username:', ADMIN_USERNAME);

  if (adminName === ADMIN_USERNAME && ADMIN_PASSWORD_HASH) {
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log('Password valid:', isPasswordValid);

    if (isPasswordValid) {
      req.session.isAdmin = true;
      req.session.adminName = adminName;

      req.session.save(err => {
        if (err) {
          console.error('Session save error:', err);
          return next(err);
        }

        console.log('✅ Admin login successful, session saved');
        res.json({ success: true, isAdmin: true });
      });

      return;
    }
  }

  console.log('❌ Login failed: Invalid credentials');
  res.status(401).json({ error: 'Invalid credentials' });
};


export const AdminLogout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(err => {
        if (err) {
        console.error('Session destroy error:', err);
        return next(err);
        }
        console.log('✅ Admin logged out, session destroyed');
        res.json({ success: true, isAdmin: false });    
    });   
}