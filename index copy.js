function rollTheDice(numDice: number) {
  const rolls = [];
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  return rolls;
}

function playDiceGame(players: number, diceUnits: number) {
  const playerDice = new Array(players).fill(diceUnits);
  const playerScores = new Array(players).fill(0);

  let round = 0;

  while (playerDice.filter((dice) => dice > 0).length > 1) {
    round++;

    console.log("\n====================\n");
    console.log(`Turn ${round} roll the dice:`);

    for (let player = 0; player < players; player++) {
      if (playerDice[player] > 0) {
        const rolls = rollTheDice(playerDice[player]);
        console.log(
          `Player #${player + 1} (${playerScores[player]}): ${rolls.join(",")}`
        );

        for (let i = 0; i < rolls.length; i++) {
          if (rolls[i] === 6) {
            // If dice is 6, go to next player
            playerScores[player]++;
          } else if (rolls[i] === 1) {
            // If dice is 1, next player will get the 1 point
            const nextPlayer = (player + 1) % players;
            playerScores[nextPlayer]++;
          } else {
            rolls[i]--;
          }
        }

        playerDice[player] = rolls.filter((roll) => roll > 1).length;
      }
    }

    console.log("After evaluation:");
    for (let player = 0; player < players; player++) {
      console.log(
        `Player #${player + 1} (${playerScores[player]}): ${
          playerDice[player] > 0
            ? playerDice[player]
            : "_ (Stop playing because it has no dice)"
        }`
      );
    }
  }

  console.log("\n========== [FINAL OUTPUT] ==========\n");
  const remainingPlayer = playerDice.findIndex((dice) => dice > 0);
  if (remainingPlayer !== -1) {
    console.log(
      `Game ends because only player #${remainingPlayer + 1} has dice.`
    );
  }
  const maxScore = Math.max(...playerScores);
  const winningPlayers = playerScores.reduce((acc, score, index) => {
    if (score === maxScore) {
      acc.push({
        score: score,
        player: index + 1,
      });
    }
    return acc;
  }, []);

  console.log(
    `Game won by player ${winningPlayers.map(
      (item: { score: number; player: number }) =>
        `#${item.player} (Score: ${item.score})`
    )} because they have the highest score.`
  );
  console.log("\n========== [FINAL OUTPUT] ==========\n");
}

const numPlayers = 3;
const numDiceUnits = 4;

playDiceGame(numPlayers, numDiceUnits);
