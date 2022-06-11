import { Request, Response } from 'express'

export declare type RequestFunction = (req: Request, res: Response) => Promise<any>;
export interface RequestData {
    func: RequestFunction;
    req: Request;
    res: Response;
    errCallback?: (err: any) => any;
}
export default class RequestSynchronizer {
    private static _requestQueueGroups

    static resolveRequest (reqData: RequestData, group?: string): void;
}
