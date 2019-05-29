'use strict'const Test = require('ava')const Sinon = require('sinon')const Mockgen = require('../../../../../util/mockgen.js')const initServer = require('../../../../../../src/server').initializeconst Db = require('../../../../../../src/lib/db')const Logger = require('@mojaloop/central-services-shared').Loggerconst util = require('../../../../../../src/lib/util')const participants = require('../../../../../../src/domain/participants')const getPort = require('get-port')const requestLogger = require('../../../../../../src/lib/requestLogger')let serverlet sandboxlet destinationFsp = 'dfsp2'let sourceFsp = 'dfsp1'let resource = 'participants'let subID = 'employee1'Test.beforeEach(async () => {    console.log('step_1')    sandbox = Sinon.createSandbox()    sandbox.stub(Db, 'connect').returns(Promise.resolve({}))    sandbox.stub(requestLogger, 'logRequest').returns({})    sandbox.stub(requestLogger, 'logResponse').returns({})})Test.afterEach(async () => {    console.log('step_2')    sandbox.restore()})Test('test getParticipantsSubIdByTypeAndID endpoint', async test => {    console.log('step_3')    try {        server = await initServer(await getPort())        const requests = new Promise((resolve, reject) => {            Mockgen().requests({                path: '/participants/{Type}/{ID}/{SubID}',                operation: 'get'            }, function (error, mock) {                return error ? reject(error) : resolve(mock)            })        })        const mock = await requests        test.pass(mock)        test.pass(mock.request)        const options = {            method: 'get',            url: mock.request.path,            headers: util.defaultHeaders(destinationFsp, resource, sourceFsp, subID)        }        if (mock.request.body) {            // Send the request body            options.payload = mock.request.body        } else if (mock.request.formData) {            // Send the request form data            options.payload = mock.request.formData            // Set the Content-Type as application/x-www-form-urlencoded            options.headers = util.defaultHeaders(destinationFsp, resource, sourceFsp, subID) || {}        }        // If headers are present, set the headers.        if (mock.request.headers && mock.request.headers.length > 0) {            options.headers = util.defaultHeaders(destinationFsp, resource, sourceFsp, subID)        }        sandbox.stub(participants, 'getParticipantsSubIdByTypeAndI').returns({})        const response = await server.inject(options)        await server.stop()        test.is(response.statusCode, 202, 'Ok response status')    } catch (e) {        Logger.error(e)        test.fail()    }})