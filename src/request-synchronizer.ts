import { Request, Response } from 'express'

export type RequestFunction = (req: Request, res: Response) => Promise<any>

export interface RequestData {
  func: RequestFunction
  req: Request
  res: Response
  errCallback?: (err: any) => any
}

const DEFAULT = 'default'

export default class RequestSynchronizer {
  private static _requestQueueGroups: {
    [index: string]: Promise<any>
  } = {
    default: new Promise((resolve) => resolve(null))
  }

  public static resolveRequest (reqData: RequestData, group = DEFAULT) {
    if (!RequestSynchronizer._requestQueueGroups[group]) {
      RequestSynchronizer._requestQueueGroups[group] = new Promise((resolve) => resolve(null))
    }

    RequestSynchronizer._requestQueueGroups[group] = RequestSynchronizer._requestQueueGroups[group].then(
      () => reqData.func(reqData.req, reqData.res),
      (err) => {
        reqData.errCallback ? reqData.errCallback(err) : console.log(`Error in queue: ${err}`)
        return new Promise((resolve) => resolve(null))
      }
    )
  }
}