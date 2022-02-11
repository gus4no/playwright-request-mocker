import { RecordRequest } from "./models";
export declare const readHarFile: (path: string, route: string) => Promise<RecordRequest[]>;
export declare const recordHar: (route: string, urlPattern: string, filePath?: string, logRecording?: boolean) => Promise<RecordRequest[]>;
//# sourceMappingURL=recorder.d.ts.map