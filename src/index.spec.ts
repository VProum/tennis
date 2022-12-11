import computeTennisScore, { createOnGoingGame, Finished, GameStatus, OnGoing } from "../src/index";

test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = createOnGoingGame({ player1: "0", player2: "0" });

  // When
  const actualScore = previousScore.score("player1") as OnGoing;

  // Then
  const expectedScore = { type: "OnGoing", scores: { player1: "15", player2: "0" } };
  expect({ type: actualScore.type, scores: actualScore.scores }).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = createOnGoingGame({ player1: "15", player2: "0" });

  // When
  const actualScore = previousScore.score("player1") as OnGoing;

  // Then
  const expectedScore = { type: "OnGoing", scores: { player1: "30", player2: "0" } };
  expect({ type: actualScore.type, scores: actualScore.scores }).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "OnGoing", scores: { player1: "30", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "OnGoing", scores: { player1: "40", player2: "0" } };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "OnGoing", scores: { player1: "30", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player2");

  // Then
  const expectedScore: GameStatus = { type: "OnGoing", scores: { player1: "30", player2: "15" } };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = createOnGoingGame({ player1: "0", player2: "0" })
    .score("player1")
    .score("player1")
    .score("player1");

  // When
  const actualScore = previousScore.score("player1") as Finished;

  // Then
  const expectedScore = { type: "Finished", winner: "player1" };
  expect({ type: actualScore.type, winner: actualScore.winner }).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "OnGoing", scores: { player1: "40", player2: "30" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player2");

  // Then
  const expectedScore: GameStatus = { type: "Deuce" };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "OnGoing", scores: { player1: "30", player2: "40" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "Deuce" };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "Deuce" };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "Advantage", advantage: "player1" };
  expect(actualScore).toEqual(expectedScore);
});

test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "Advantage", advantage: "player1" };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "Finished", winner: "player1" };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "Advantage", advantage: "player1" };

  // When
  const actualScore = computeTennisScore(previousScore, "player2");

  // Then
  const expectedScore: GameStatus = { type: "Deuce" };
  expect(actualScore).toEqual(expectedScore);
});
