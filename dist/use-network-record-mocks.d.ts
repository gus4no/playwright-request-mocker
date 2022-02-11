import { Page } from "@playwright/test";
import { RecordRequest } from "./models";
/**
 *
 * @param identifier For when you need to have more than one Mock version for a single .spec, it will look for a file containing such identifier (e.g. for test.specs.ts, and identifier "test2", it will look for ``test.spec.test2.mocks.json``).
 * @param recordRoute When recording a new network mock file, it will use this path to open the new page.
 * @param logRecording When recording a new network mock file, enables console logging of every xhr request happening.
 * @param overrideResponses To use other values instead of the ones recorded for given tests.
 *
 *  ```e.g. { ["/url_to_override"]: myCustomMockData }```
 * @returns
 */
export declare const useNetworkRecordMocks: (page: Page, configs?: {
    identifier?: string;
    recordRoute?: string;
    logRecording?: boolean;
    fileName?: string;
    overrideResponses?: {
        [key: string]: any;
    };
}) => Promise<RecordRequest[]>;
//# sourceMappingURL=use-network-record-mocks.d.ts.map