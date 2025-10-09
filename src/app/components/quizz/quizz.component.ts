import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-quizz',
    imports: [],
    templateUrl: './quizz.component.html',
    styleUrl: './quizz.component.css'
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

  quizzQuestions: any;

  ngOnInit(): void {


    

    /*
    this.questionIndex = 0;
    this.finished = false;
    this.title = quizz_questions.title;

    this.questions = quizz_questions.questions;
    this.questionSelected = this.questions[this.questionIndex];
    this.questionMaxIndex = this.questions.length - 1;
    */
  }

}
