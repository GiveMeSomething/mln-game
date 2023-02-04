export class Chip {
  // ID to identify the chip
  public readonly id: number;

  // Text to display on the chip
  public readonly text: string;

  // Specify the correct answers
  // -1 mean that the chip is a static chip
  public readonly belongTo: number[];

  constructor(id: number, text: string, belongto: number[]) {
    this.id = id;
    this.text = text;
    this.belongTo = belongto;
  }
}
