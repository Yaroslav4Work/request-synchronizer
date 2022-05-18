import { Request, Response } from 'express'

export declare type RequestFunction = (req: Request, res: Response) => Promise<any>;

export interface RequestData {
  func: RequestFunction;
  req: Request;
  res: Response;
}

export default class RequestSynchronizer {
  private static requestQueueGroups

  static resolveRequest (reqData: RequestData, group?: string): void;
}
//# sourceMappingURL=request-synchronizer.d.ts.map