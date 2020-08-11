const Match = require("../../model/match");

class MatchMapper {
    toResource(matchRequest) {
        return new Match()
            .matchId(matchRequest.matchId)
            .winnerId(matchRequest.winnerId)
            .playersNumber(Number(matchRequest.playersNumber))
            .startTime(matchRequest.startTime)
            .endTime(matchRequest.endTime)
            .matchType(matchRequest.matchType);
    }

    toRecord(matchResource) {
        return {
            "matchId": { S: matchResource.matchId },
            "startTime": { S: matchResource.startTime },
            "endTime": { S: matchResource.endTime },
            "winnerId": { S: matchResource.winnerId },
            "playersNumber": { N: matchResource.playersNumber.toString() },
            "matchType": { S: matchResource.matchType }
        }
    }
}

module.exports = MatchMapper;