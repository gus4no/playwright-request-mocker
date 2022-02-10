import { RecordRequest } from "../models";
export declare const writeFile: (filePath: string, requests: RecordRequest[]) => Promise<void>;
export declare const removeFile: (filePath: string) => Promise<void>;
export declare const readFile: (filePath: string) => Promise<RecordRequest[]>;
export declare const waitForFileExists: (filePath: string, currentTime?: number, timeout?: number) => Promise<boolean>;
export declare const getCallerFile: () => string;
//# sourceMappingURL=file-utils.d.ts.map