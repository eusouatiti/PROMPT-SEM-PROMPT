import {ChangeDetectionStrategy, Component, inject, computed} from '@angular/core';
import {Wizard} from './wizard';
import {CommonModule} from '@angular/common';
import {jsPDF} from 'jspdf';
import {Router} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
})
export class Result {
  wizard = inject(Wizard);
  router = inject(Router);

  prompt = computed(() => {
    const answers = this.wizard.answers();
    const formatAnswer = (val: any) => Array.isArray(val) ? val.join(', ') : val;
    return `Explique "${this.wizard.topic()}". Foco: ${formatAnswer(answers[1])}. Objetivo: ${formatAnswer(answers[2])}. Formato: ${formatAnswer(answers[3])}. Profundidade: ${answers[4]}. Linguagem: ${formatAnswer(answers[5])}. Incluir: ${formatAnswer(answers[6])}. Seja direto e prático.`;
  });

  copyToClipboard() {
    navigator.clipboard.writeText(this.prompt());
    alert('Prompt copiado!');
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.text(this.prompt(), 10, 10, { maxWidth: 180 });
    doc.save("prompt.pdf");
  }

  restart() {
    this.wizard.step.set(1);
    this.wizard.answers.set({});
    this.wizard.topic.set('');
    this.router.navigate(['/']);
  }
}
