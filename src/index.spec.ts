import computeTennisScore, { GameStatus } from "../src/index";

test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "0", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "onGoing", scores: { player1: "15", player2: "0" } };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "15", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "onGoing", scores: { player1: "30", player2: "0" } };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "30", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "onGoing", scores: { player1: "40", player2: "0" } };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "30", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player2");

  // Then
  const expectedScore: GameStatus = { type: "onGoing", scores: { player1: "30", player2: "15" } };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "40", player2: "0" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "finished", winner: "player1" };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "40", player2: "30" } };

  // When
  const actualScore = computeTennisScore(previousScore, "player2");

  // Then
  const expectedScore: GameStatus = { type: "Deuce" };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "onGoing", scores: { player1: "30", player2: "40" } };

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
  const expectedScore: GameStatus = { type: "advantage", advantage: "player1" };
  expect(actualScore).toEqual(expectedScore);
});

test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "advantage", advantage: "player1" };

  // When
  const actualScore = computeTennisScore(previousScore, "player1");

  // Then
  const expectedScore: GameStatus = { type: "finished", winner: "player1" };
  expect(actualScore).toEqual(expectedScore);
});
test("That's a test!", () => {
  // Given
  const previousScore: GameStatus = { type: "advantage", advantage: "player1" };

  // When
  const actualScore = computeTennisScore(previousScore, "player2");

  // Then
  const expectedScore: GameStatus = { type: "Deuce" };
  expect(actualScore).toEqual(expectedScore);
});
