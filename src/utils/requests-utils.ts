import { Page, Request, Response } from '@playwright/test';

import { RecordRequest } from '../models';

export const mockRequests = async (data: RecordRequest[], page: Page): Promise<void> => {
  await Promise.all(
    data.map(async (request) => {
      await mockRouteResponse(page, `**${request.url}`, request.response);
    }),
  );
};

export const mockRouteResponse = async (
  page: Page,
  url: string,
  mock: { [key: string]: any },
  status = 200,
  headers = { 'access-control-allow-origin': '*' },
): Promise<void> => {
  await page.route(url, (route) =>
    route.fulfill({
      headers,
      status,
      body: JSON.stringify(mock),
    }),
  );
};

export const endpointOfUrl = (route: string): string => {
  const routeFrag = route.replace('https://', '');
  return routeFrag.substring(routeFrag.indexOf('/'));
};

export const setHttpLogs = (page: Page, urlPattern: RegExp): void => {
  page.on('request', (request: Request) => {
    if (request.resourceType() === 'xhr' && urlPattern ? urlPattern.test(request.url()) : true) {
      console.log('>>', endpointOfUrl(request.url()));
      console.dir(request.postData(), { depth: null });
    }
  });

  page.on('response', async (response: Response) => {
    if (response.request().resourceType() === 'xhr' && urlPattern ? urlPattern.test(response.url()) : true) {
      console.log('<<', endpointOfUrl(response.url()));
      let responseBody;
      try {
        responseBody = await response.json()
      } catch (e) {
        // if response is not json parseable (empty bodies) just do {}
        responseBody = {}
      }
      console.dir(responseBody, { depth: null });
    }
  });
};
