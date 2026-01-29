import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-medium-2",
  lesson: 9,
  difficulty: "medel",
  instructions:
    "Skapa ett enkelt regelssystem: poäng börjar på 0, lägg till 25 för en 'coin', sedan 50 för ett 'gem'. Skriv 'Du vann!' om poängen är 75 eller mer.",
  starterCode:
    'int poäng = 0;\npoäng += 25; // coin\npoäng += 50; // gem\n\nif (poäng  75)\n{\n    Console.WriteLine("Du vann!");\n}',
  expectedOutput: "Du vann!",
  hint: "Använd >= för att kolla om poängen är tillräckligt höga",
  tag: "Spellogik",
};
