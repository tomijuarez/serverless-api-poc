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

        console.log("matchRecord ->", this.matchMapper.toRecord(match));

        return this.dynamoClient.put({ TableName: MatchService.TABLE_NAME, Item: this.matchMapper.toRecord(match)})
            .promise()
            .then(matchResult)
            .catch(e => { throw new Error(`A tremendous error has occurred ${e.stack}`); });
    }

    async fetchResult(matchId) {
        return this.dynamoClient.get({ TableName: MatchService.TABLE_NAME, Key: { "matchId": matchId } })
            .promise()
            .then(data => {
                console.log(`-----> ${JSON.stringify(data)}`);
                if (data.Item === undefined) {
                    throw new Error(`Ah bueno adios master :v`);
                }
                return data.Item;
            })
            .then(item => this.matchMapper.toResource(item))
            .catch(e => { throw new Error(`A tremendous error has occurred ${e.stack}`); });
    }
}

module.exports = new MatchService();