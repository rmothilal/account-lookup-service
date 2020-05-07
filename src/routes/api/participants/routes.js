/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * ModusBox
 - Rajiv Mothilal <rajiv.mothilal@modusbox.com>

 --------------
 ******/
'use strict'

const Validator = require('@mojaloop/ml-schema-validator').Validators
const Joi = require('@hapi/joi')

const Enum = require('@mojaloop/central-services-shared').Enum
const postParticipants = require('../../../handlers/participants').post
const participantsByTypeId = require('../../../handlers/participants/{Type}/{ID}')
const participantsByTypeIdError = require('../../../handlers/participants/{Type}/{ID}/error')
const participantsByTypeIdSubId = require('../../../handlers/participants/{Type}/{ID}/{SubId}')
const participantsByTypeIdSubIdError = require('../../../handlers/participants/{Type}/{ID}/{SubId}/error')
const tags = ['api', 'participants', Enum.Tags.RouteTags.SAMPLED]

module.exports = [
  {
    method: Enum.Http.RestMethods.POST,
    path: '/participants',
    handler: postParticipants,
    config: {
      id: 'post_participants',
      tags: tags,
      description: 'POST Participants',
      validate: {
        headers: Validator.HeadersValidator.postHeadersSchema.append({
          traceparent: Joi.string().optional(),
          tracestate: Joi.string().optional()
        }).unknown(false).options({ stripUnknown: true }),
        payload: Validator.ParticipantValidator.postBulkParticipantSchema
      }
    }
  }
]