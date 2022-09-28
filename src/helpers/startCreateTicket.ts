import { AMOUNT_DEF, ALGORITHM_DEF } from '../constants';
import { AlgorithmTypes } from '../types/types';
import { asignAlgorithmType } from '../utils/asignAlgorithmType';
import { clearProcessData } from './../utils/clearProcessData';

export const startCreateTickets = (fileDataBuffer: Buffer) => {
  const buffer = Buffer.from(fileDataBuffer);
  const bufferToCleanStr = clearProcessData(buffer.toString())
  const amountIndex = bufferToCleanStr.indexOf(AMOUNT_DEF) + 1;
  const algorithmIndex = bufferToCleanStr.indexOf(ALGORITHM_DEF) + 1;
  const amountTickets: string | undefined = bufferToCleanStr[amountIndex];
  const algorithmType: AlgorithmTypes | undefined = asignAlgorithmType(bufferToCleanStr[algorithmIndex]);

  return {
    amountTickets,
    algorithmType,
    bufferToCleanStr,
  }
}