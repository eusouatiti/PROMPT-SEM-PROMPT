import {Injectable, signal, computed} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Wizard {
  topic = signal('');
  step = signal(1);
  answers = signal<Record<number, any>>({});
  
  setTopic(topic: string) {
    this.topic.set(topic);
    this.step.set(1);
  }

  setAnswer(step: number, answer: any) {
    this.answers.update(a => ({...a, [step]: answer}));
    this.step.set(step + 1);
  }

  goBack() {
    if (this.step() > 1) {
      this.step.set(this.step() - 1);
    }
  }
}
