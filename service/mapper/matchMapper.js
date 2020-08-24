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
            "matchId": matchResource.matchId,
            "startTime": matchResource.startTime,
            "endTime": matchResource.endTime,
            "winnerId": matchResource.winnerId,
            "playersNumber": matchResource.playersNumber,
            "matchType": matchResource.matchType
        }
    }
}

module.exports = MatchMapper;