type Player = "player1" | "player2";

const SCORES = ["0", "15", "30", "40"] as const;
type Score = typeof SCORES[number];

export type OnGoing = { scores: Record<Player, Score>; type: "onGoing" };
export type Finished = { winner: Player; type: "finished" };
export type Deuce = { type: "Deuce" };
export type Advantage = { advantage: Player; type: "advantage" };

export type GameStatus = OnGoing | Finished | Deuce | Advantage;

const OTHER_PLAYER: Record<Player, Player> = {
  player1: "player2",
  player2: "player1",
};

const extractOtherPlayer = (player: Player): Player => {
  return OTHER_PLAYER[player];
};

const computeTennisScore = (previousScore: OnGoing | Deuce | Advantage, scoringPlayer: Player): GameStatus => {
  if (previousScore.type === "advantage") {
    if (scoringPlayer === previousScore.advantage) {
      return { winner: scoringPlayer, type: "finished" };
    }
    return { type: "Deuce" };
  }

  if (previousScore.type === "Deuce") {
    return { advantage: scoringPlayer, type: "advantage" };
  }

  if (
    previousScore.scores[scoringPlayer] === "30" &&
    previousScore.scores[extractOtherPlayer(scoringPlayer)] === "40"
  ) {
    return { type: "Deuce" };
  }

  if (previousScore.scores[scoringPlayer] === "40") {
    return { winner: scoringPlayer, type: "finished" };
  }

  const indexScorePlayer = SCORES.indexOf(previousScore.scores[scoringPlayer]);

  return { type: "onGoing", scores: { ...previousScore.scores, [scoringPlayer]: SCORES[indexScorePlayer + 1] } };
};

export default computeTennisScore;
