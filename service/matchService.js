const DynamoDB = require('aws-sdk/clients/dynamodb');
const MatchMapper = require('./mapper/matchMapper')

class MatchService {

    static TABLE_NAME = 'matchResults';

    constructor() {
        this.dynamoClient = new DynamoDB();
        this.matchMapper = new MatchMapper();
    }

    async registerMatchResult(matchResult) {
        const match = this.matchMapper.toResource(matchResult);

        return this.dynamoClient.putItem({ TableName: MatchService.TABLE_NAME, Item: this.matchMapper.toRecord(match)})
            .promise()
            .then(matchResult)
            .catch(e => { throw new Error(`A tremendous error has occurred ${e.stack}`); });
    }

    async fetchResult(matchId) {
        return this.dynamoClient.getItem({ TableName: MatchService.TABLE_NAME, Key: { "matchId": { S: matchId } }})
            .promise()
            .then(data => {
                console.log(`-----> ${data.Item}`);
                if (!data.Item) {
                    throw new Error(`Ah bueno adios master :v`);
                }
                return data;
            })
            .then(item => DynamoDB.Converter.unmarshall(item))
            .then(parsedItem => this.matchMapper.toResource(parsedItem))
            .catch(e => { throw new Error(`A tremendous error has occurred ${e.stack}`); });
    }
}

module.exports = new MatchService();