/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access the Adobe Campaign Standard API
 */

const { Core } = require('@adobe/aio-sdk')
const { CampaignStandard } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = ['apiKey', 'tenant']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, ['Authorization'])
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the input request parameters
    const token = getBearerToken(params)

    // initialize the sdk
    const campaignClient = await CampaignStandard.init(params.tenant, params.apiKey, token)

    // get profiles from Campaign Standard
    const profiles = await campaignClient.getAllProfiles()
    logger.debug('profiles = ' + JSON.stringify(profiles, null, 2))
    const response = {
      statusCode: 200,
      body: profiles
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
