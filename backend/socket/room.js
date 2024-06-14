class Room {
    constructor(roomId) {
        this.roomId = roomId;
        this.player1 = null;
        this.player2 = null;
        this.choice1 = null;
        this.choice2 = null;
        this.score1 = 0;
        this.score2 = 0;
        this.gameState = 'waiting for opponent to join';
    }

    addPlayer(playerId,playerName) {
        if (this.player1==null) {
            this.player1 = {
                playerId,
                playerName
            };
            return true;
        } else if (this.player2==null) {
            this.player2 = {
                playerId,
                playerName
            };
            this.gameState = 'waiting for players to make a choice';
            return true;
        }
        return false;
    }

    removePlayer(playerId) {
        if (this.player1.playerId === playerId) {
            this.player1 = null;
            this.choice1 = null;
        } else if (this.player2.playerId === playerId) {
            this.player2 = null;
            this.choice2 = null;
        }
        this.score1 = 0;
        this.score2 = 0;
    }

    makeChoice(playerId, choice) {
        if (this.player1.playerId === playerId) {
            this.choice1 = choice;
        } else if (this.player2.playerId === playerId) {
            this.choice2 = choice;
        }
        if (this.choice1 && this.choice2) {
            this.gameState = 'playing';
        } else {
            this.gameState = 'waiting for players to make a choice';
        }
    }

    calculateResult() {
        if (this.choice1!=null && this.choice2!=null) {
            if (this.choice1 === this.choice2) {
                this.score1 += 1;
                this.score2 += 1;
            } else if (
                (this.choice1 === 'rock' && this.choice2 === 'scissors') ||
                (this.choice1 === 'scissors' && this.choice2 === 'paper') ||
                (this.choice1 === 'paper' && this.choice2 === 'rock')
            ) {
                this.score1 += 3;
                this.score2 -= 1;
            } else {
                this.score1 -= 1;
                this.score2 += 3;
            }
            this.choice1 = null;
            this.choice2 = null;
        }
        if (this.score1 >= 12 || this.score2 >= 12) {
            this.gameState = 'finished';
        }
    }

    getState() {
        return {
            player1: this.player1?.playerName,
            player2: this.player2?.playerName,
            score1: this.score1,
            score2: this.score2,
            gameState: this.gameState,
        };
    }
    reset() {
        this.player1 = null;
        this.player2 = null;
        this.choice1 = null;
        this.choice2 = null;
        this.score1 = 0;
        this.score2 = 0;
        this.gameState = 'waiting for opponent to join';
    }
}

export default Room;
