'use strict';

const matchService = require('./service/matchService');

const handleRegisterResult = async event => {
  try {
    const result = await matchService.registerMatchResult(JSON.parse(event.body));
    return { statusCode: 201, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: `An unexpected error has occurred ${e}` }
  }
}

const handleFetchResult = async event => {
  try {
    const result = await matchService.fetchResult(event.pathParameters.matchId);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: `An unexpected error has occurred ${e}` }
  }
};

module.exports = { handleRegisterResult, handleFetchResult };