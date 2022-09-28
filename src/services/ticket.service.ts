
import { Response, Request, NextFunction } from 'express';
import fs from 'fs';
import { CONFIG_FILES, CONFIG_PATH } from '../config/config';
import { getConnection } from '../db/db';

import { FileInput, FileInputConfig } from './../interfaces/file.interface';
import { AlgorithmTypes, Ticket } from '../types/types';
import { INCREMENTAL_CODE } from '../constants';

import { generateRandomId } from '../helpers/generateRandomId';
import { incrementalId } from './../helpers/generateIncrementalId';
import { startCreateTicketsConfig } from '../helpers/startCreateTicketConfig';
import { startCreateTickets } from './../helpers/startCreateTicket';

import { parseObjectType } from './../utils/parseObjectType';
import { clearProcessData } from './../utils/clearProcessData';

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
        const { amountTickets, algorithmType } = startCreateTickets(file.data.data)
        return amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      }))

      return res.status(200).json({
        ok: true,
        msg: 'ticket generated suceesfully',
        tickets: ticketsDone && await (await ticketsDone).filter(f=>f).flat()
      });
    } else {
      const { amountTickets, algorithmType } = startCreateTickets(filesAttach.data.data)
      const ticketDone = amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      return res.status(200).json({
        ok: true,
        msg: 'ticket generated suceesfully',
        tickets: ticketDone && await ticketDone
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error generating tickets using POST method'
    })
  }
}

export const automaticGenerateTickets = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    let filesToRead: any[] = [];
    for (let index = 1; index <= Number(CONFIG_FILES); index++) {
      const fileData = fs.readFileSync(`${CONFIG_PATH}${index}.txt`, { encoding: 'utf-8'})
      filesToRead.push({ path: `${CONFIG_PATH}${index}.txt`, data: clearProcessData(fileData)})
    }
    // console.log("🚀 ~ file: ticket.service.ts ~ line 69 ~ automaticGenerateTickets ~ configPath", filesToRead)
    const ticketsDone = Promise.all(filesToRead.map( async (file: FileInputConfig) => {
        const { amountTickets, algorithmType } = startCreateTicketsConfig(file)
        return amountTickets && algorithmType && await processTicket(Number(amountTickets), algorithmType)
      }))

    ticketsDone && createTickets(await (await ticketsDone).filter(f=>f) as Ticket[])

    return res.status(200).json({
      ok: true,
      msg: 'ticket generated suceesfully',
      tickets: ticketsDone && await (await ticketsDone).filter(f=>f).flat()
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error generating tickets using GET Method'
    })
  }
}

export const getTickets = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const tickets = getConnection().get('tickets').values()

    return res.status(200).json({
      ok: true,
      msg: 'ticket generated suceesfully',
      tickets
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error getAllTickets'
    })
  }
}

const createTickets = async (tickets: Ticket[]) => {
  try {
    const plainTickets = tickets.flat()
    for (let index = 0; index < plainTickets.length; index++) {
      getConnection().get('tickets').push(plainTickets[index]).write()
    }
    console.log("paso x aqui")
  } catch (error) {
    console.log('Error insert into DB', error)
  }
}