declare namespace Express {
    interface User {
      id: string;
      role: 'trainer' | 'client';
    }
    interface Request {
      user?: User;
    }
  }