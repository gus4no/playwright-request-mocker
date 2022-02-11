import { Page } from '@playwright/test';
import { RecordRequest } from '../models';
export declare const mockRequests: (data: RecordRequest[], page: Page) => Promise<void>;
export declare const mockRouteResponse: (page: Page, url: string, mock: {
    [key: string]: any;
}, status?: number, headers?: {
    'access-control-allow-origin': string;
}) => Promise<void>;
export declare const endpointOfUrl: (route: string) => string;
export declare const setHttpLogs: (page: Page, urlPattern: RegExp) => void;
//# sourceMappingURL=requests-utils.d.ts.map