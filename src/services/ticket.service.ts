
import { Response, Request, NextFunction } from 'express';

import { parseObjectType } from './../utils/parseObjectType';

import { FileInput } from './../interfaces/file.interface';
import { AMOUNT_DEF, ALGORITHM_DEF, INCREMENTAL_CODE } from '../constants';
import { AlgorithmTypes } from '../types/types';
import { asignAlgorithmType } from './../utils/asignAlgorithmType';
import { generateRandomId } from './../utils/generateRandomId';
import { incrementalId } from './../helpers/generateIncrementalId';


const processTicket = (amountTickets: number , algorithmType: AlgorithmTypes) => {
  return new Promise( (resolve) => {
    let tickets = [];
    switch (algorithmType) {
      case AlgorithmTypes.RANDOMIDS:
        tickets = Array.from({length: amountTickets}, () => ({ id: generateRandomId() , description: 'some random description', date: new Date(), type: algorithmType}))
        break;
      default:
        for (let index = 1; index <= amountTickets; index++) {
          tickets.push({ id: incrementalId(index.toString(), INCREMENTAL_CODE) , description: 'some random description', date: new Date(), type: algorithmType})
        }
        break;
    }
    return resolve(tickets)
  })
}

export const generateTickets = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const files = parseObjectType(req.files)
    const filesAttach = files.fileName as FileInput
    let ticketsDone;
    if (Array.isArray(filesAttach)) {
        ticketsDone = Promise.all(filesAttach.map( async (file: FileInput) => {
        const buffer = Buffer.from(file.data.data);
        const bufferToCleanStr = buffer.toString().replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter(v => v);
        const amountIndex = bufferToCleanStr.indexOf(AMOUNT_DEF) + 1;
        const algorithmIndex = bufferToCleanStr.indexOf(ALGORITHM_DEF) + 1;
        const amountTickets: string | undefined = bufferToCleanStr[amountIndex];
        const algorithmType: AlgorithmTypes | undefined = asignAlgorithmType(bufferToCleanStr[algorithmIndex]);
        return amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      }))

      return res.status(200).json({
        ok: true,
        msg: 'ticket generated suceesfully',
        ticketsDone: ticketsDone && await (await ticketsDone).filter(f=>f)
      });
    } else {
      const buffer = Buffer.from(filesAttach.data.data);
      const bufferToCleanStr = buffer.toString().replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter(v => v);
      const amountIndex = bufferToCleanStr.indexOf(AMOUNT_DEF) + 1;
      const algorithmIndex = bufferToCleanStr.indexOf(ALGORITHM_DEF) + 1;
      const amountTickets: string | undefined = bufferToCleanStr[amountIndex];
      const algorithmType: AlgorithmTypes | undefined = asignAlgorithmType(bufferToCleanStr[algorithmIndex]);
      const ticketDone = amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      return res.status(200).json({
        ok: true,
        msg: 'ticket generated suceesfully',
        ticketsDone: ticketDone && await ticketDone
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error generating tickets'
    })
  }
}