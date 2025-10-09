import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from '../../../assets/data/quizz_questions.json';
@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = "";

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  optionCorrect:number = 0;
  optionError:number = 0;

  numberOfCorrect:number = 0;
  numberOfErrors:number = 0;  

  constructor() { }

  ngOnInit(): void {

    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }

  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
      
      this.numberOfCorrect = await this.countAnswersCorrect(this.answers);
      this.numberOfErrors = await this.countAnswersError(this.answers);
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous;
      }else{
        return current;
      }
    })

    return result;
  }

  async countAnswersCorrect(anwsers:string[]) {
    const result = anwsers.filter((item:string) => item === "C").length;
    return result;
  }

  async countAnswersError(anwsers:string[]) {
    const result = anwsers.filter((item:string) => item === "E").length;
    return result;
  }
}