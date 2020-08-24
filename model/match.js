class Match {

    matchId(matchId) {
        this.matchId = matchId;
        return this;
    }

    winnerId(winnerId) {
        this.winnerId = winnerId;
        return this;
    }

    startTime(startTime) {
        this.startTime = startTime;
        return this;
    }

    endTime(endTime) {
        this.endTime = endTime;
        return this;
    }

    playersNumber(playersNumber) {
        if (playersNumber > 1 && playersNumber <= 100) {
            this.playersNumber = playersNumber;
            return this;
        }

        throw new Error(`playersNumber should be a number between 2 and 100`);
    }

    matchType(matchType) {
        const matchTypes = ["SQUAD", "DUO", "ARENA-SINGLE", "ARENA-THREESOME"];

        if (matchTypes.includes(matchType)) {
            this.matchType = matchType;
            return this;
        }

        throw new Error(`"${matchType}" is not a valid match type.`);
    }
};

module.exports = Match;