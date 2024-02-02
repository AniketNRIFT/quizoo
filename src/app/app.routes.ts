import { Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'question',
        component: QuestionComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    }
];