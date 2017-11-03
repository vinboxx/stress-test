'use strict';

var loadtest = require('loadtest');

function statusCallback(error, result, latency) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('[%j] Status: %j Body: %j', result.requestIndex, result.statusCode, result.body);
}

var options = {
    url: 'http://localhost:8180/test-endpoint',
    method: 'POST',
    concurrency: 1,
    maxRequests: 100000,
    maxSeconds: 30,
    requestsPerSecond: 500,
    statusCallback: statusCallback,
    contentType: "application/json",
    headers: {
        "accept": "application/json",
        "authorization": "Bearer ..."
    },
    body: {
        "any1": "aaa",
        "any2": "bbb",
        "any3": "ccc"
    }
};

loadtest.loadTest(options, function (error, results) {
    if (error) {
        return console.error('Got an error: %s', error);
    }
    console.dir(results);
    console.log('\nTests run successfully');
    process.exit()
});
