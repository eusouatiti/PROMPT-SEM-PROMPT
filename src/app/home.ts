import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Wizard} from './wizard';
import {ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
})
export class Home {
  wizard = inject(Wizard);
  router = inject(Router);
  topicControl = new FormControl('');

  start() {
    if (this.topicControl.value) {
      this.wizard.setTopic(this.topicControl.value);
      this.router.navigate(['/quiz']);
    }
  }
}
