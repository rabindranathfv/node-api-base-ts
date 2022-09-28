import { Response, Request, NextFunction} from 'express';
import { automaticGenerateTickets, generateTickets } from '../services/ticket.service';

export const generateTicketsCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    generateTickets(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}

export const automaticGenerateTicketsCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    automaticGenerateTickets(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}