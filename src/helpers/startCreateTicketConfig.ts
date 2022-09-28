import { AMOUNT_DEF, ALGORITHM_DEF } from '../constants';
import { FileInputConfig } from '../interfaces/file.interface';
import { AlgorithmTypes } from '../types/types';
import { asignAlgorithmType } from '../utils/asignAlgorithmType';

export const startCreateTicketsConfig = (fileProcess: FileInputConfig) => {
  const { data } = fileProcess;
  const amountIndex = data.indexOf(AMOUNT_DEF) + 1;
  const algorithmIndex = data.indexOf(ALGORITHM_DEF) + 1;
  const amountTickets: string | undefined = data[amountIndex];
  const algorithmType: AlgorithmTypes | undefined = asignAlgorithmType(data[algorithmIndex]);

  return {
    amountTickets,
    algorithmType,
  }
}