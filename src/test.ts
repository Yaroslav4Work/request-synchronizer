import express, { Request, Response } from 'express'
import RequestSynchronizer from './request-synchronizer'

const app = express()
const port = 5000

const randInt = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

const getSimple = (data: any) => {
  return new Promise<boolean>((resolve) => {
    const timeOut = randInt(0, 2000)
    setTimeout(() => {
      resolve(true)
    }, timeOut)
  })
}

const getComplex = async (data: any) => {
  return new Promise<boolean>((resolve) => {
    const timeOut = randInt(0, 20000)
    setTimeout(() => {
      if (timeOut % 2 === 0) {
        resolve(true)
      }
      resolve(false)
    }, timeOut)
  })
}

const getSimpleHandler = async (req, res) => {
  // Can be validated before the request is added to the queue
  const data = req.body

  const result = await getSimple(data)

  if (result) {
    res.status(200).end()

  }

  res.status(500).end()
}

let complexCounter = 0

const getComplexHandler = async (req, res) => {
  console.log('complex handler started')
  // Can be validated before the request is added to the queue
  const data = req.body
  const counter = complexCounter

  console.log(`complex counter: ${counter}`)

  await getComplex(data)

  console.log('complex awaited')

  complexCounter = counter + 1

  console.log(`new complex counter: ${complexCounter}`)
}

app.get('/simple', async (req: Request, res: Response) => {
  RequestSynchronizer.resolveRequest({ func: getSimpleHandler, req, res, }, 'simple')
})

app.get('/complex', async (req: Request, res: Response) => {
  console.log('complex request started')
  RequestSynchronizer.resolveRequest({ func: getComplexHandler, req, res, }, 'complex')

  res.status(200).end()
})

app.get('/complex-result', async (req: Request, res: Response) => {
  res.json({ complexCounter }).status(200)
})

app.listen(port, () => console.log('server started'))