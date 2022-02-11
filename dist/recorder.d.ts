import { RecordRequest } from "./models";
export declare const readHarFile: (path: string, route: string, urlPattern: RegExp) => Promise<RecordRequest[]>;
export declare const recordHar: (route: string, urlPattern: RegExp, filePath?: string, logRecording?: boolean) => Promise<RecordRequest[]>;
//# sourceMappingURL=recorder.d.ts.map