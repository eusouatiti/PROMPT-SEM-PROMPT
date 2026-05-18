import {Routes} from '@angular/router';
import {Home} from './home';
import {Quiz} from './quiz';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'quiz', component: Quiz},
];
