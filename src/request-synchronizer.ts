import { Request, Response } from 'express'

export type RequestFunction = (req: Request, res: Response) => Promise<any>

export interface RequestData {
  func: RequestFunction
  req: Request
  res: Response,
}

export default class RequestSynchronizer {
  private static lastPromise: Promise<any> = new Promise((resolve) => resolve(null))

  public static resolveRequest (reqData: RequestData) {
    RequestSynchronizer.lastPromise.then(() => reqData.func(reqData.req, reqData.res))
  }
}