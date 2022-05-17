import { Request, Response } from 'express'

export type RequestFunction = (req: Request, res: Response) => Promise<any>

export interface RequestData {
  func: RequestFunction
  req: Request
  res: Response,
}

const DEFAULT = 'default'

export default class RequestSynchronizer {
  private static requestQueueGroups: {
    [index: string]: Promise<any>
  } = {
    default: new Promise((resolve) => resolve(null))
  }

  public static resolveRequest (reqData: RequestData, group = DEFAULT) {
    if (!RequestSynchronizer.requestQueueGroups[group]) {
      RequestSynchronizer.requestQueueGroups[group] = new Promise((resolve) => resolve(null))
    }

    RequestSynchronizer.requestQueueGroups[group] = RequestSynchronizer.requestQueueGroups[group].then(
      () => reqData.func(reqData.req, reqData.res),
      (err) => {
        console.log(`Error in queue: ${err}`)
        return new Promise((resolve) => resolve(null))
      }
    )
  }
}