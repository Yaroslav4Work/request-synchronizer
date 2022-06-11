'use strict'
exports.__esModule = true
var DEFAULT = 'default'
var RequestSynchronizer = /** @class */ (function () {
  function RequestSynchronizer () {
  }

  RequestSynchronizer.resolveRequest = function (reqData, group) {
    if (group === void 0) { group = DEFAULT }
    if (!RequestSynchronizer._requestQueueGroups[group]) {
      RequestSynchronizer._requestQueueGroups[group] = new Promise(function (resolve) { return resolve(null) })
    }
    RequestSynchronizer._requestQueueGroups[group] = RequestSynchronizer._requestQueueGroups[group].then(function () { return reqData.func(reqData.req, reqData.res) }, function (err) {
      reqData.errCallback ? reqData.errCallback(err) : console.log('Error in queue: '.concat(err))
      return new Promise(function (resolve) { return resolve(null) })
    })
  }
  RequestSynchronizer._requestQueueGroups = {
    'default': new Promise(function (resolve) { return resolve(null) })
  }
  return RequestSynchronizer
}())
exports['default'] = RequestSynchronizer
//# sourceMappingURL=request-synchronizer.js.map