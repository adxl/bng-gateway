import { Request, Response, NextFunction } from 'express';

export function securityMiddleware(req: Request, res: Response, next: NextFunction) {
  const headerKey = req.header('X-BNG-KEY');

  if (headerKey !== 'esgi') {
    return res.status(401).json({
      code: 401,
      message: "Robots can't access this API ! 🤖",
      hint_for_humans: 'Check the README 😉',
    });
  }

  next();
}
