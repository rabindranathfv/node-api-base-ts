import { AlgorithmTypes } from "../types/types";

export const asignAlgorithmType = (input: string): AlgorithmTypes | undefined => {
  switch (input) {
    case AlgorithmTypes.SECUENCIAL:
      return AlgorithmTypes.SECUENCIAL
    case AlgorithmTypes.RANDOMIDS:
      return AlgorithmTypes.RANDOMIDS
    default:
      return undefined
  }
}