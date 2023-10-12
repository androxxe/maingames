interface Player {
  dice: number;
  name: number;
  score: number;
}

function rollTheDice(numDice: number) {
  const rolls: number[] = [];
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  return rolls;
}

function playDiceGame(totalPlayer: number, totalDice: number) {
  if (totalPlayer < 0) {
    throw new Error("Number of players must be greater than 0");
  }

  if (totalDice < 0) {
    throw new Error("Number of dice units must be greater than 0");
  }

  console.log("\n========== [START GAME] ==========\n");
  let playerDice: Player[] = [];
  for (let i = 1; i <= totalPlayer; i++) {
    playerDice.push({
      dice: totalDice,
      name: i + 1,
      score: 0,
    });
  }

  let round = 0;

  while (playerDice.filter((player) => player.dice > 0).length > 1) {
    round++;

    if (round > 1) {
      console.log("\n===================================\n");
      console.log(`Turn ${round} roll the dice:`);
    }

    playerDice.forEach((player, index) => {
      if (player.dice > 0) {
        const rolls = rollTheDice(player.dice);
        console.log(
          `Player #${player.name} (${player.score}): ${rolls.join(", ")}`
        );

        for (let i = 0; i < rolls.length; i++) {
          if (rolls[i] === 6) {
            // If dice is 6, go to next player
            // Dont use players to prevent unlimited loop
            playerDice[index] = { ...player, score: player.score + 1 };
          } else if (rolls[i] === 1) {
            // If dice is 1, next player will get the 1 point
            const nextPlayer = (index + 1) % totalPlayer;
            playerDice[nextPlayer].dice++;
          } else {
            rolls[i]--;
          }
        }

        // Dont use players to prevent unlimited loop
        playerDice[index] = {
          ...player,
          dice: rolls.filter((roll) => roll > 1).length,
        };
      }
    });

    console.log("After evaluation:");
    playerDice.forEach((player) => {
      console.log(
        `Player #${player.name} (${player.score}): ${
          player.dice > 0
            ? player.dice
            : "- (Stop playing because it has no dice)"
        }`
      );
    });
  }

  console.log("\n========== [END OF GAME] ==========\n");
  const remainingPlayer = playerDice.findIndex((player) => player.dice > 0);
  if (remainingPlayer !== -1) {
    console.log(
      `Game ends because only player #${playerDice[remainingPlayer].name} has dice.`
    );
  }
  const maxScore = Math.max(...playerDice.map((player) => player.score));
  const winningPlayers = playerDice.filter(
    (player) => player.score === maxScore
  );

  console.log(
    `Game won by player(s) ${winningPlayers.map(
      (player) => `#${player.name} (Score: ${player.score})`
    )} because they have the highest score.`
  );
  console.log("\n========== [END OF GAME] ==========\n");
}

const totalPlayer = 3;
const totalDice = 4;

playDiceGame(totalPlayer, totalDice);
