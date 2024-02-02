import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  duration:number = 10*60;
  correctMarks:number = 10;
  incorrectMarks:number = -2.5;
  questions: string[] = [
    "What is the capital of France?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the chemical symbol for water?",
    "Which planet is known as the Red Planet?",
    "Who painted the Mona Lisa?",
    "What is the largest mammal in the world?",
    "Which country is known as the Land of the Rising Sun?",
    "What is the tallest mountain in the world?",
    "Who discovered penicillin?",
    "What is the currency of Japan?"
  ];

  options: string[][] = [
    ["Paris", "London", "Berlin", "Rome"],
    ["Harper Lee", "Jane Austen", "F. Scott Fitzgerald", "Charles Dickens"],
    ["H2O", "CO2", "NaCl", "O2"],
    ["Mars", "Venus", "Jupiter", "Mercury"],
    ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    ["Blue whale", "African elephant", "Giraffe", "Polar bear"],
    ["Japan", "China", "India", "South Korea"],
    ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Albert Einstein"],
    ["Yen", "Dollar", "Euro", "Pound"]
  ];

  answerIndices: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor() { }
}
