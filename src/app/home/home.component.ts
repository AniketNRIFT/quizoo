import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {MatFormField} from '@angular/material/form-field';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, MatFormField],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  faInfo = faInfo;
  qid : number | null = null;
  constructor(private router:Router, private storage:LocalService) {
  }
  ngOnInit(): void {
    const _qid = this.storage.getData<number>("qid");
    this.qid = _qid ? _qid : 0;
  }
  startQuiz() {
    this.router.navigateByUrl("/question");
  }
}
