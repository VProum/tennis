/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
type Player = "player1" | "player2";

const SCORES = ["0", "15", "30", "40"] as const;
type Score = typeof SCORES[number];

type AbstactState<T extends string> = {
  type: T;
  score: (scoringPlayer: Player) => GameStatus;
};

export type OnGoing = AbstactState<"OnGoing"> & { scores: Record<Player, Score> };
export type Finished = AbstactState<"Finished"> & { winner: Player };
export type Deuce = AbstactState<"Deuce">;
export type Advantage = AbstactState<"Advantage"> & { advantage: Player };

export type GameStatus = OnGoing | Finished | Deuce | Advantage;

const OTHER_PLAYER: Record<Player, Player> = {
  player1: "player2",
  player2: "player1",
};

const extractOtherPlayer = (player: Player): Player => {
  return OTHER_PLAYER[player];
};

const createDeuceGame = (): Deuce => {
  return {
    type: "Deuce",
    score: (scoringPlayer: Player) => {
      return createAdvantageGame(scoringPlayer);
    },
  };
};
const createFinishedGame = (winner: Player): Finished => {
  return {
    type: "Finished",
    winner,
    score: () => {
      throw Error("Game is already finished");
    },
  };
};

const createAdvantageGame = (player: Player): Advantage => {
  return {
    advantage: player,
    type: "Advantage",
    score: (scoringPlayer: Player) => {
      if (scoringPlayer === player) {
        return createFinishedGame(scoringPlayer);
      }
      return createDeuceGame();
    },
  };
};

export const createOnGoingGame = (scores: Record<Player, Score>): OnGoing => {
  return {
    type: "OnGoing",
    scores,
    score: (scoringPlayer: Player) => {
      if (scores[scoringPlayer] === "30" && scores[extractOtherPlayer(scoringPlayer)] === "40") {
        return createDeuceGame();
      }

      if (scores[scoringPlayer] === "40") {
        return createFinishedGame(scoringPlayer);
      }

      const indexScorePlayer = SCORES.indexOf(scores[scoringPlayer]);
      return createOnGoingGame({ ...scores, [scoringPlayer]: SCORES[indexScorePlayer + 1] });
    },
  };
};

const computeTennisScore = (previousScore: OnGoing | Deuce | Advantage, scoringPlayer: Player): GameStatus => {
  if (previousScore.type === "Advantage") {
    if (scoringPlayer === previousScore.advantage) {
      return { winner: scoringPlayer, type: "Finished" };
    }
    return { type: "Deuce" };
  }

  if (previousScore.type === "Deuce") {
    return { advantage: scoringPlayer, type: "Advantage" };
  }

  if (
    previousScore.scores[scoringPlayer] === "30" &&
    previousScore.scores[extractOtherPlayer(scoringPlayer)] === "40"
  ) {
    return { type: "Deuce" };
  }

  if (previousScore.scores[scoringPlayer] === "40") {
    return { winner: scoringPlayer, type: "Finished" };
  }

  const indexScorePlayer = SCORES.indexOf(previousScore.scores[scoringPlayer]);

  return { type: "OnGoing", scores: { ...previousScore.scores, [scoringPlayer]: SCORES[indexScorePlayer + 1] } };
};

export default computeTennisScore;
