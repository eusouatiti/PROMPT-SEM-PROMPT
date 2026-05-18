import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Wizard} from './wizard';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Result} from './result';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-quiz',
  imports: [CommonModule, ReactiveFormsModule, Result],
  templateUrl: './quiz.html',
})
export class Quiz {
  wizard = inject(Wizard);
  
  steps = [
    {id: 1, title: 'O que você quer explorar dentro desse assunto?', options: ['Conceito geral', 'Componentes', 'Funcionamento', 'Comparação', 'Problemas comuns', 'Aplicações práticas', 'História', 'Tendências', 'Curiosidades', 'Outro']},
    {id: 2, title: 'Para que você quer essa resposta?', options: ['Aprender', 'Ensinar alguém', 'Criar conteúdo', 'Estudar para prova', 'Fazer uma apresentação', 'Explicar para cliente', 'Criar roteiro de vídeo', 'Criar post', 'Tomar uma decisão', 'Resolver um problema', 'Vender uma ideia', 'Criar uma aula', 'Outro'], multi: true, max: 3},
    {id: 3, title: 'Como você quer receber esse conteúdo?', options: ['Lista', 'Tópicos', 'Mapa mental', 'Tabela', 'Passo a passo', 'Explicação completa', 'Resumo', 'Notícia', 'Roteiro', 'Aula', 'Carrossel', 'Comparativo', 'Checklist', 'Fluxograma textual', 'E-book curto', 'Outro'], multi: true, max: 3},
    {id: 4, title: 'Qual nível de profundidade você quer?', options: ['Muito simples', 'Como se eu tivesse 10 anos', 'Intermediário', 'Avançado', 'Técnico', 'Profissional', 'Acadêmico', 'Estratégico', 'Completo, sem ser enrolado']},
    {id: 5, title: 'Como a IA deve falar?', options: ['Didática', 'Direta', 'Conversacional', 'Formal', 'Criativa', 'Humorada', 'Sarcástica', 'Jornalística', 'Técnica', 'Inspiradora', 'Estratégica', 'Simples e humana'], multi: true, max: 3},
    {id: 6, title: 'O que você quer que a resposta inclua?', options: ['Exemplos práticos', 'Analogias', 'Erros comuns', 'Curiosidades', 'Aplicações no dia a dia', 'Comparações', 'Referências históricas', 'Perguntas reflexivas', 'Exercícios', 'Resumo final', 'CTA', 'Sugestões de uso', 'Pontos de atenção', 'Próximos passos'], multi: true, max: 3},
  ];

  selectedOptions: string[] = [];
  
  get currentStep() {
    return this.steps.find(s => s.id === this.wizard.step());
  }

  selectOption(option: string) {
    if (this.currentStep?.multi) {
      if (this.selectedOptions.includes(option)) {
        this.selectedOptions = this.selectedOptions.filter(o => o !== option);
      } else if (this.selectedOptions.length < (this.currentStep.max || 1)) {
        this.selectedOptions.push(option);
      }
    } else {
      this.wizard.setAnswer(this.wizard.step(), option);
      this.selectedOptions = []; // Reset for good measure
    }
  }

  finishMulti() {
    if (this.selectedOptions.length > 0) {
      this.wizard.setAnswer(this.wizard.step(), this.selectedOptions);
      this.selectedOptions = [];
    }
  }
}
