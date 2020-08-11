const dynamoDb = require('serverless-dynamodb-client');
const MatchMapper = require('./mapper/matchMapper')

class MatchService {

    static TABLE_NAME = 'matchResults';

    constructor() {
        this.dynamoClient = dynamoDb.doc;
        this.matchMapper = new MatchMapper();
    }

    async registerMatchResult(matchResult) {
        const match = this.matchMapper.toResource(matchResult);

        return this.dynamoClient.put({ TableName: MatchService.TABLE_NAME, Item: this.matchMapper.toRecord(match)})
            .promise()
            .then(matchResult)
            .catch(e => { throw new Error(`An error has occurred ${e.stack}`); });
    }

    async fetchResult(matchId) {
        return this.dynamoClient.get({ TableName: MatchService.TABLE_NAME, Key: { "matchId": matchId } })
            .promise()
            .then(data => {
                if (data.Item === undefined) {
                    throw new Error(`The requested item does not exist`);
                }
                return data.Item;
            })
            .then(item => this.matchMapper.toResource(item))
            .catch(e => { throw new Error(`An error has occurred ${e.stack}`); });
    }
}

module.exports = new MatchService();