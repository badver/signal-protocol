// checked 08-04-2020

/*
  * jobQueue manages multiple queues indexed by device to serialize
  * session io ops on the database.
  */
'use strict';

var PQueue = require('p-queue').default;

var SessionLock = {};

var jobQueue = {};

SessionLock.queueJobForNumber = function queueJobForNumber(number, runJob) {
    jobQueue[number] = jobQueue[number] || new PQueue({ concurrency: 1 });
    var queue = jobQueue[number];

    return queue.add(runJob);
};

module.exports = SessionLock;
