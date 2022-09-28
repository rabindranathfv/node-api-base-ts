export interface BufferInput {
  type: string;
  data: Buffer;
}

export interface FileInput {
  name: string;
  data: BufferInput;
  size: number;
  enconding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  content: ArrayBuffer;
  processData?: string;
}

export interface FileInputConfig {
  data: string;
  path: string;
}