import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { LocalService } from '../../services/local.service';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit, OnDestroy {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  qid:number | null = null;
  question:string | null = null;
  options:string[] | null = null;
  answerIndex:number | null = null;
  selectedOption:number | null = null;
  nQuestions:number = 0;
  testCompleted:boolean = false;
  timeLeft:number = 0;
  constructor(private router:Router, private timer:TimerService, private storage:LocalService, private quiz:QuizService) {
    this.nQuestions = quiz.questions.length;
  }
  ngOnInit() {
    const _cachedId = this.storage.getData<number>("qid");
    this.qid = _cachedId ? _cachedId : 0;
    const answeredQuestions = this.storage.getData<number[]>("answeredQuestions");
    if (!answeredQuestions) {
      this.storage.setData<number[]>("answeredQuestions", Array(this.quiz.questions.length).fill(-1));
    }
    this.question = this.quiz.questions[this.qid];
    this.options = this.quiz.options[this.qid];
    this.answerIndex = this.quiz.answerIndices[this.qid];
    this.storage.setData<number>("qid", this.qid);
    this.timer.startTimer(this.quiz.duration, ()=>{
      this.timeLeft-= 1;
    }, ()=>{
      this.testCompleted = true;
      setTimeout(()=>{
        this.router.navigateByUrl('/results');
      }, 5000);
    });
    this.timeLeft = this.quiz.duration - this.timer.currentTime;
  }
  previousQuestion () {
    if (this.qid === null || this.qid - 1 < 0) {
      return;
    }
    this.qid-= 1;
    this.question = this.quiz.questions[this.qid];
    this.options = this.quiz.options[this.qid];
    this.answerIndex = this.quiz.answerIndices[this.qid];
    this.storage.setData<number>("qid", this.qid);
    const answeredQuestions = this.storage.getData<number[]>("answeredQuestions");
    if (answeredQuestions && answeredQuestions[this.qid]!==-1) {
      this.selectedOption = answeredQuestions[this.qid];
    } else {
      this.selectedOption = null;
    }
  }
  nextQuestion() {
    if (this.qid === null || this.qid + 1 >= this.quiz.questions.length) {
      return;
    }
    this.qid+= 1;
    this.question = this.quiz.questions[this.qid];
    this.options = this.quiz.options[this.qid];
    this.answerIndex = this.quiz.answerIndices[this.qid];
    this.storage.setData<number>("qid", this.qid);
    const answeredQuestions = this.storage.getData<number[]>("answeredQuestions");
    if (answeredQuestions && answeredQuestions[this.qid]!==-1) {
      this.selectedOption = answeredQuestions[this.qid];
    } else {
      this.selectedOption = null;
    }
  }
  answer(optionId:number) {
    if (this.selectedOption===null) {
      this.selectedOption = optionId;
      const answeredQuestions = this.storage.getData<number[]>("answeredQuestions");
      if (answeredQuestions && this.qid) {
        answeredQuestions[this.qid] = optionId;
        this.storage.setData<number[]>("answeredQuestions", answeredQuestions);
      }
      setTimeout(()=> {
        this.selectedOption = null;
        this.nextQuestion();
      }, 1000);
    }
  }
  ngOnDestroy() {
    this.timer.stopTimer();
  }
}
