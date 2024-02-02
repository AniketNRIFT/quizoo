import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  result: {
    totalQuestions: number,
    attemptedQuestions: number,
    correctAnswers: number,
    incorrectAnswers: number,
    totalScore: number
  } | null = null;
  constructor(private router:Router, private storage:LocalService, private quiz:QuizService) {

  }
  ngOnInit(): void {
    const answeredQuestions = this.storage.getData<number[]>("answeredQuestions");
    if (answeredQuestions) {
      const currentTime = this.storage.getData<number>("currentTime");
      if (currentTime && currentTime<=this.quiz.duration) {
        this.router.navigateByUrl("/question");
      } else {
        const _result = {
          totalQuestions: 0,
          attemptedQuestions: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          totalScore: 0         
        };
        _result.totalQuestions = this.quiz.questions.length;
        answeredQuestions.forEach((option, i)=>{
          _result.attemptedQuestions+= answeredQuestions[i]===-1?0:1;
          _result.correctAnswers+= answeredQuestions[i]===this.quiz.answerIndices[i]?1:0;
          _result.incorrectAnswers+= answeredQuestions[i]!==-1 ? answeredQuestions[i]===this.quiz.answerIndices[i]?0:1:0;
        });
        _result.totalScore = _result.correctAnswers*this.quiz.correctMarks + _result.incorrectAnswers*this.quiz.incorrectMarks;
        this.result = _result;
        console.log(this.result);
      }
      this.storage.reset();
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
