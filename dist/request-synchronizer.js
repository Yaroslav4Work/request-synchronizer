'use strict'
exports.__esModule = true
var DEFAULT = 'default'
var RequestSynchronizer = /** @class */ (function () {
  function RequestSynchronizer () {
  }

  RequestSynchronizer.resolveRequest = function (reqData, group) {
    if (group === void 0) { group = DEFAULT }
    if (!RequestSynchronizer.requestQueueGroups[group]) {
      RequestSynchronizer.requestQueueGroups[group] = new Promise(function (resolve) { return resolve(null) })
    }
    RequestSynchronizer.requestQueueGroups[group] = RequestSynchronizer.requestQueueGroups[group].then(function () { return reqData.func(reqData.req, reqData.res) }, function (err) {
      console.log('Error in queue: '.concat(err))
      return new Promise(function (resolve) { return resolve(null) })
    })
  }
  RequestSynchronizer.requestQueueGroups = {
    'default': new Promise(function (resolve) { return resolve(null) })
  }
  return RequestSynchronizer
}())
exports['default'] = RequestSynchronizer
//# sourceMappingURL=request-synchronizer.js.map