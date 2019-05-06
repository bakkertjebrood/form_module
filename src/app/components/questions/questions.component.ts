import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/Question';
import { Answer } from '../../models/Answer';

import data from '../../../assets/data/data.json';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
    title: string;
    subtitle: string;
    minimal_weight: number;
    summary: boolean;
    questions: Question[];

    constructor() { }

    ngOnInit() {
        this.title = 'Garantie Inkomen Lijfrente';
        this.subtitle = '4. U maakt nu een kennis- en ervaringstoets';
        this.minimal_weight = 5;

        this.questions = this.shuffle(data.questions);
        this.questions.forEach((question,key) => {
            question.number = key +1;
            if(key == 0){
                question.active = true;
            }else{
                question.active = false;
            }
            question.options = this.shuffle(question.options);
        });
        this.summary = false;
    }

    shuffle(array){
        return array.sort(() => Math.random() - 0.5);
    }

    get getQuestion(){
        let question = this.questions.find(question => question.active == true);
        return question;
    }

    get answerred(){
        let count = this.questions.filter(question => question.answer_id != 0).length;
        let percentage = Math.floor((count / this.questions.length) * 100);

        let answerred = {
            count: count,
            percentage: percentage
        }
        return answerred
    }

    get isAnswerred(){
        if(this.getQuestion.answer_id != 0){
            return true;
        }else{
            return false;
        }
    }

    get isCompleted(){
        if(this.questions.length == this.answerred.count){
            return true;
        }else{
            return false;
        }
    }

    get myScore(){
        let weight = 0;

        data.answers.forEach(answer => {
            if(this.questions.find(question => question.id == answer.question_id).answer_id == answer.answer_id){
                weight = weight + answer.weight;
            }
        });

        let myScore = {
            count: this.questions.filter(question => question.answer_id == data.answers.find(answer => answer.question_id == question.id).answer_id).length,
            weight: weight
        }
        return myScore;
    }

    get passed(){
        if(this.myScore.weight < this.minimal_weight){
            return false;
        }else{
            return true;
        }
    }

    previousQuestion(){
        let index = this.questions.map(question => question.id).indexOf(this.getQuestion.id);

        if(index == 0){
            return this.getQuestion;
        }else{
            this.questions.forEach((question,key) => {
                if(key == index){
                    question.active = false;
                }

                if(key == index -1){
                    question.active = true;
                }
            });
        }
    }

    nextQuestion(){
        let index = this.questions.map(question => question.id).indexOf(this.getQuestion.id);

        if(index == this.questions.length - 1){
            if(this.isCompleted == true){
                this.summary = true;
            }else{
                return this.getQuestion;
            }
        }else{
            this.questions.forEach((question,key) => {
                if(key == index){
                    question.active = false;
                }

                if(key == index +1){
                    question.active = true;
                }
            });
        }
    }

}
