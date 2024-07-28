import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  tutotrialid:any
  grammerId:any
  keywordID:any
  questionCode= 1
  quizquestionslength=1
  quizId:any
  storyid:any
  isLogin:boolean = false
  constructor() { }
}
