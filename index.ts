class Player {
  private dice: number[];
  private points: number;

  constructor(private id: number, private totalDice: number) {
    this.dice = Array(totalDice).fill(1);
    this.points = 0;
  }

  public rollDice() {
    this.dice = this.dice.map(() => Math.floor(Math.random() * 6) + 1);
  }

  public evaluateAndPassDiceToNextPlayer(nextPlayer: Player) {
    for (let i = 0; i < this.dice.length; i++) {
      if (this.dice[i] === 6) {
        this.points++;
        this.dice.splice(i, 1);
        i--;
      } else if (this.dice[i] === 1) {
        nextPlayer.receiveDice([1]);
        this.dice.splice(i, 1);
        i--;
      }
    }
  }

  public receiveDice(dice: number[]) {
    this.dice = this.dice.concat(dice);
  }

  public hasDiceRemaining(): boolean {
    return this.dice.length > 0;
  }

  public getPoints(): number {
    return this.points;
  }

  public getId(): number {
    return this.id;
  }

  public getDice(): number[] {
    return this.dice;
  }
}

function playDiceGame(numPlayers: number, numDice: number) {
  let players: Player[] = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push(new Player(i + 1, numDice));
  }

  let round = 1;
  while (players.length > 1) {
    console.log(`Turn ${round} roll the dice:`);
    players.forEach((player) => {
      if (player.hasDiceRemaining()) {
        player.rollDice();
        console.log(
          `Player #${player.getId()} (${player.getPoints()}): ${player
            .getDice()
            .join(",")}`
        );
      }
    });

    console.log("After evaluation:");
    players.forEach((player) => {
      if (player.hasDiceRemaining()) {
        const nextPlayer = players[(player.getId() % numPlayers) - 1];
        player.evaluateAndPassDiceToNextPlayer(nextPlayer);
        console.log(
          `Player #${player.getId()} (${player.getPoints()}): ${player
            .getDice()
            .join(",")}`
        );
      }
    });

    players = players.filter((player) => player.hasDiceRemaining());
    round++;
  }

  const winningPlayer = players[0];
  console.log(
    `Game ends because only player #${winningPlayer.getId()} has dice.`
  );
  console.log(
    `Game won by player #${winningPlayer.getId()} with ${winningPlayer.getPoints()} points.`
  );
}

playDiceGame(3, 4);
