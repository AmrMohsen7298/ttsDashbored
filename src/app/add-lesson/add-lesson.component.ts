import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../backend-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
interface formDataGrammer {

  grammar_id: number;

  tutorialId: number;

  topic: string;

  header: string;

  example: string;

  description: string;

}
interface FormDataKeyword {
  keyword_id:number,
  tutorialId: number;

  type: string;

  description: string;

  translation: string;

  keyFlag: boolean;

  audio: string;

  text: string;

  level: string;

}
interface FormDataStory {

  id :number,


  tutorialId: number;

  name: string;

  paragraph: string;
  translation:string
 

}
export interface Quiz {

  id: number;

  code: string;

  tutorialId: number;

  questions: Question[];

}


export interface Question {

  // add properties for Question interface here

  id: number;

  quizId: number;

  code: string;

  text: string;

  choices: string[];

  answer: string;

}
@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 3; // Change this value as needed
  grammer: any[] ;
filteredLessons: any[] = [];
selectedCategory: string = '';
  totalPages: number = 0;
//////////////////////////////////////////////keywords///////////////////////////
searchTextKeyword: string = '';
currentPageKeyword: number = 1;
pageSizeKeyword: number = 3; // Change this value as needed
keywords: any[] ;
filteredLessonsKeyword: any[] = [];
selectedCategoryKeyword: string = '';
totalPagesKeyword: number = 0;
keywordForm: FormGroup 
////////////////////////////quizez////////////////////////////
searchTextQuiz: string = '';
currentPageQuiz: number = 1;
pageSizeQuiz: number = 3; // Change this value as needed
quizData: Quiz | undefined ;
filteredLessonsQuiz: any = [];
selectedCategoryQuiz: string = '';
totalPagesQuiz: number = 0;
  // Pagination methods
  grammarData: any = {
    grammar_id:0,
    topic: '',

    header: '',

    example: '',

    description: ''

  };
  formDataGrammer: formDataGrammer  = {
    grammar_id: 0,
    tutorialId: 0,
    topic: '',
    header: '',
    example: '',
    description: ''
  }
  FormDataKeyword: FormDataKeyword  = {
    keyword_id: 0,
    tutorialId: 0,
    type: '',
    description: '',
    translation: '',
    keyFlag: false,
    audio: '',
    text: '',
    level: ''
  }
  FormDataStory: FormDataStory  = {
    tutorialId: 0,

    name: '',
    paragraph: '',
    id: 0,
    translation: ''
  }
  storyAdd = {

    tutorialId: 0,

    name: '',

    paragraph:''};
  quiz:any
  quizEdit:any
  story: any ;
  addquizstatus :boolean = false 
  addGrammerstatus:boolean = false 
  addKeywordsstatus:boolean = false 
  addStorystatus:boolean = false 
  editquizstatus:boolean = false 
  editGrammerstatus:boolean = false 
  editKeywordsstatus:boolean = false 
  editStorystatus:boolean = false 
  deletequizstatus:boolean = false 
  deleteGrammerstatus:boolean = false 
  deleteKeywordsstatus:boolean = false 
  deleteStorystatus:boolean = false 
  constructor(private formBuilder: FormBuilder,private router: Router,private http: HttpClient,private back:BackendServiceService) { 
    this.grammer = [];
    this.keywords = [];
    this.keywordForm = formBuilder.group([])
    this.keywordForm = this.formBuilder.group({
      keyword_id: [''],
      tutorialId: [''],
      type: ['', Validators.required],
      description: ['', Validators.required],
      translation: [''],
      keyFlag: [''],
      audio: [''],
      text: ['', Validators.required],
      level: ['', Validators.required],
    });
    this.quiz = {

      id: 0,
  
      code: this.back.questionCode.toString(),
  
      tutorialId: this.back.tutotrialid,
  
      questions: [
  
        {
  
         
  
        code: this.back.quizquestionslength.toString(),
  
        text: '',
  
        choices: ['', '', ''],
  
        answer: ''
        }
  
      ]
  
    };
    this.quizEdit= {

      id: 0,
  
      code: this.back.questionCode.toString(),
  
      tutorialId: this.back.tutotrialid,
  
      questions: [
  
        {
  
         
  
        code: this.back.quizquestionslength.toString(),
  
        text: '',
  
        choices: ['', '', ''],
  
        answer: ''
        }
  
      ]
  
    };
    
  }

 


  ngOnInit(): void {
    this.back.tutotrialid =localStorage.getItem('tutorialId')
    this.http.get<any[]>('https://tts.eliteacademyeg.com/api/grammars/getTutorial/'+this.back.tutotrialid)
    .subscribe(
      (response: any[]) => {
        console.log(response)
        this.grammer = response;
        this.filteredLessons = this.grammer;
        const totalLessons = this.filterLessons().length;
        this.totalPages = Math.ceil(totalLessons / this.pageSize);
        this.http.get<any[]>('https://tts.eliteacademyeg.com/keywords/getByTutorial/'+this.back.tutotrialid)
        .subscribe(
          (response: any[]) => {
            console.log(response)
            this.keywords = response;
            this.filteredLessonsKeyword = this.keywords;
            const totalLessons = this.filterLessonsKeyword().length;
            this.totalPagesKeyword = Math.ceil(totalLessons / this.pageSizeKeyword);
            this.http.get<any>('https://tts.eliteacademyeg.com/api/v1/quiz/tutorial/'+this.back.tutotrialid)
            .subscribe(
              (response: any) => {
                console.log(response)
                debugger
                const jsonString = JSON.stringify(response); // Convert the object to JSON
                this.quizData = JSON.parse(jsonString); // Parse the JSON string back to an object
                console.log("quiz parsed " + this.quizData);
                this.http.get<any>('https://tts.eliteacademyeg.com/api/v1/story/tutorial/'+this.back.tutotrialid)
                .subscribe(
                  (response: any) => {
                    debugger
                    console.log(response)
                    const jsonString = JSON.stringify(response); // Convert the object to JSON
                    this.story = JSON.parse(jsonString); // Parse the JSON string back to an object
                    console.log("story parsed " + this.story);
                  },
                  (error) => {
                    console.error('Error fetching lessons:', error);
                  }
                );
            
              
              },
              (error) => {
                console.error('Error fetching lessons:', error);
              }
            );


          },
          (error) => {
            console.error('Error fetching lessons:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
   

   
  }
  


nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

// Filtering method
filterLessons(): any[] {
  return this.filteredLessons.filter((grammer:any) =>
    grammer.topic.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
getPages(): number[] {
  const totalLessons = this.filterLessons().length;
  const totalPages = Math.ceil(totalLessons / this.pageSize);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

nextPageKeyword(): void {
  if (this.currentPageKeyword < this.totalPagesKeyword) {
    this.currentPageKeyword++;
  }
}

prevPageKeyword(): void {
  if (this.currentPageKeyword > 1) {
    this.currentPageKeyword--;
  }
}

// Filtering method
filterLessonsKeyword(): any[] {
  return this.filteredLessonsKeyword.filter((keyword:any) =>
    keyword.text.toLowerCase().includes(this.searchTextKeyword.toLowerCase())
  );
}
getPagesKeyword(): number[] {
  const totalLessons = this.filterLessonsKeyword().length;
  const totalPages = Math.ceil(totalLessons / this.pageSizeKeyword);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}




createGrammer(){
  this.addGrammerstatus = true
 // Here you can handle form submission, e.g., send data to server
 this.grammarData.tutorialId = this.back.tutotrialid
 this.grammarData.grammar_id = 0
  console.log('Form submitted:', this.grammarData);
debugger
  this.http.post<any>('https://tts.eliteacademyeg.com/api/grammars', this.grammarData)
  .subscribe(
    response => {
      
      
      
      console.log('API Response:', response);
      // Handle response as needed
      this.addGrammerstatus = false
      window.location.reload();
    },
    error => {
      console.error('API Error:', error);
      this.addGrammerstatus = false
      window.location.reload();
      // Handle error as needed
    }
  );
}
editGrammer(id:any){

this.http.get<FormData>('https://tts.eliteacademyeg.com/api/grammars/'+id)
.subscribe(
  (response: any) => {
    console.log(response)
    this.formDataGrammer = response;
   
  },
  (error) => {
    console.error('Error fetching lessons:', error);
  }
);


}
onsubmitEditGrammer()
{
  this.editGrammerstatus = true
  console.log(this.formDataGrammer);
  this.http.post<any[]>('https://tts.eliteacademyeg.com/api/grammars/delete/'+this.formDataGrammer.grammar_id,null)
.subscribe(
  (response: any[]) => {
    console.log(response)
    debugger
   
    
    
    this.formDataGrammer.tutorialId=this.back.tutotrialid
   
    this.http.post<any>('https://tts.eliteacademyeg.com/api/grammars', this.formDataGrammer)
    .subscribe(
      response => {
        
        
        
        console.log('API Response:', response);
        this.editGrammerstatus = false
        // Handle response as needed
        window.location.reload();
       
      },
      error => {
        console.error('API Error:', error);
        window.location.reload();
        // Handle error as needed
      }
    );
  },
  
  (error) => {
    console.error('Error fetching lessons:', error);
  }
);
}
deleteGrammer(id:any)
{
  this.deleteGrammerstatus = true
this.http.post<any[]>('https://tts.eliteacademyeg.com/api/grammars/delete/'+id,null)
.subscribe(
  (response: any[]) => {
    console.log(response)
    this.deleteGrammerstatus = false
    window.location.reload();
  },
  (error) => {
    console.error('Error fetching lessons:', error);
  }
);



}

createKeyword(){
 

}

editKeyword(id:any){
  this.http.get<FormData>('https://tts.eliteacademyeg.com/keywords/'+id)
  .subscribe(
    (response: any) => {
      console.log(response)
      this.FormDataKeyword = response;
     
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );
}
deleteKeyword(id:any)
{ this.deleteKeywordsstatus = true
  this.http.post<any[]>('https://tts.eliteacademyeg.com/keywords/delete/'+id,null)
  .subscribe(
    (response: any[]) => {
      console.log(response)
      this.deleteKeywordsstatus = false
      window.location.reload();
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );

 

}
onsubmitCreateKeyword(){
  this.addKeywordsstatus = true
  if (this.keywordForm.valid) {
    // Here you can handle form submission, e.g., send data to server
    this.keywordForm.value.tutorialId = this.back.tutotrialid
    this.keywordForm.value.keyword_id = 0
    this.keywordForm.value.keyFlag = true

    console.log('Form submitted:', this.keywordForm.value);
    this.http.post<any>('https://tts.eliteacademyeg.com/keywords', this.keywordForm.value)
    .subscribe(
      response => {
        
        
        
        console.log('API Response:', response);
        // Handle response as needed
        this.addKeywordsstatus = false
        window.location.reload();
       
        
      },
      error => {
        console.error('API Error:', error);
        // Handle error as needed
        this.addKeywordsstatus = false
        window.location.reload();
      }
    );
  }
}
onsubmitEditKeyword(){
    // Call API to update data
this.editKeywordsstatus = true
    console.log(this.FormDataKeyword);
    this.http.post<any[]>('https://tts.eliteacademyeg.com/keywords/delete/'+this.FormDataKeyword.keyword_id,null)
  .subscribe(
    (response: any[]) => {
      console.log(response)
      debugger
      this.FormDataKeyword.keyword_id = 0
      this.FormDataKeyword.audio=''
      this.FormDataKeyword.keyFlag=true
      this.FormDataKeyword.tutorialId=this.back.tutotrialid
      this.FormDataKeyword.translation=''
      this.http.post<any>('https://tts.eliteacademyeg.com/keywords', this.FormDataKeyword)
      .subscribe(
        response => {
          
          
          
          console.log('API Response:', response);
          // Handle response as needed
          this.editKeywordsstatus = false
          window.location.reload();
        },
        error => {
          console.error('API Error:', error);
          // Handle error as needed
          this.editKeywordsstatus = false
          window.location.reload();
        }
      );
    },
    
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );
    
}



editQuiz(id:any){
  this.back.quizId = id
  this.http.get<any>('https://tts.eliteacademyeg.com/api/v1/quiz/tutorial/'+this.back.tutotrialid)
  .subscribe(
    (response: any) => {
      console.log(response)
      debugger
      const jsonString = JSON.stringify(response); // Convert the object to JSON
      this.quizEdit = JSON.parse(jsonString); // Parse the JSON string back to an object
      console.log("quiz parsed " + this.quizEdit);
    
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );
}
deleteQuiz(id:any)
{
  debugger
  this.deletequizstatus = true
  this.http.post<any>('https://tts.eliteacademyeg.com/api/v1/quiz/delete/'+id,null)
  .subscribe(
    (response: any) => {
      
      console.log(response)
      this.deletequizstatus = false
      window.location.reload();
    },
    (error) => {
      console.error('Error fetching lessons:', error);
      
    }
  );

 

}
addQuestion(): void {

  this.quiz.questions.push({

  

    code: (this.back.quizquestionslength + 1).toString(),

    text: '',

    choices: ['', '', ''],

    answer: ''

  });

}


addChoice(index: number): void {

  this.quiz.questions[index].choices.push('');

}
removeQuestion(index: number): void {

  this.quiz.questions.splice(index, 1);

}
removeChoice(index: number): void {

  this.quiz.questions[index].choices.pop();

}
onSubmitAddQuiz(): void {
  this.addquizstatus = true
this.back.questionCode ++
this.http.post<any>('https://tts.eliteacademyeg.com/api/v1/quiz', this.quiz)
.subscribe(
response => {
  
  
  
  console.log('API Response:', response);
  // Handle response as needed
  this.addquizstatus = false
  window.location.reload();
  
},
error => {
  console.error('API Error:', error);
  this.addquizstatus = false
  window.location.reload();
  // Handle error as needed
}
);
  console.log(this.quiz);

}

addQuestionEdit(): void {

  this.quiz.questions.push({

   

  

    code: (this.back.quizquestionslength + 1).toString(),

    text: '',

    choices: ['', '', ''],

    answer: ''

  });

}


removeQuestionEdit(index: number): void {

  this.quiz.questions.splice(index, 1);

}
onSubmitEditQuiz(){

this.editquizstatus = true
this.updateQuiz(this.quizEdit.id, this.quizEdit.code, this.quizEdit.tutorialId, this.quizEdit.questions).subscribe(response => {
debugger
  console.log(response);
  
  window.location.reload();

});


}
private apiUrl = 'https://tts.eliteacademyeg.com/api/v1/quiz/update';
updateQuiz(quizId: number, code: string, tutorialId: number, questions: Question[]): Observable<any> {
debugger
const requestBody = {

code ,

tutorialId,

questions

};
console.log("this json "+requestBody)
const headers = new HttpHeaders({

'Content-Type': 'application/json'

});
this.editquizstatus = false
return this.http.post(`${this.apiUrl}/${quizId}`,requestBody,{ headers } );
}




createStory(){
  
  this.router.navigate(['/add-Story']);
}
editStory(id:any){
  this.back.storyid = id
  this.http.get<FormDataStory>('https://tts.eliteacademyeg.com/api/v1/story/tutorial/'+this.back.tutotrialid)
  .subscribe(
    (response: any) => {
      console.log(response)
      debugger
      this.FormDataStory = response;
     
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );
}
deleteStory(id:any)
{ this.deleteStorystatus = true
  this.http.post<any[]>('https://tts.eliteacademyeg.com/api/v1/story/delete/'+id,null)
  .subscribe(
    (response: any[]) => {
      console.log(response)
      this.deleteStorystatus = false
      window.location.reload();
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );

 

}
onSubmitEditStory() {

  // Call API to update data
this.editStorystatus =true
  console.log(this.FormDataStory);
  this.http.post<any[]>('https://tts.eliteacademyeg.com/api/v1/story/delete/'+this.back.storyid,null)
.subscribe(
  (response: any[]) => {
    console.log(response)
    debugger
   
    
    
    this.FormDataStory.tutorialId=this.back.tutotrialid
   this.FormDataStory.translation = ''
   this.FormDataStory.id = 0
   debugger
    this.http.post<any>('https://tts.eliteacademyeg.com/api/v1/story', this.FormDataStory)
    .subscribe(
      response => {
        debugger
        
        
        console.log('API Response:', response);
        // Handle response as needed
        this.editStorystatus =false
        window.location.reload();
      },
      error => {
        console.error('API Error:', error);
        this.editStorystatus =false
        window.location.reload();
        // Handle error as needed
      }
    );
  },
  
  (error) => {
    console.error('Error fetching lessons:', error);
  }
);
  
}
onSubmitAddStory() {
this.addStorystatus = true
  console.log(this.storyAdd);
this.storyAdd.tutorialId = this.back.tutotrialid
  // Call your API to save the quiz data
  this.http.post<any>('https://tts.eliteacademyeg.com/api/v1/story', this.storyAdd)
  .subscribe(
    response => {
      debugger
      
      
      console.log('API Response:', response);
      // Handle response as needed
      this.addStorystatus = false
      window.location.reload();
    },
    error => {
      console.error('API Error:', error);
      this.addStorystatus = false
      window.location.reload();
      // Handle error as needed
    }
  );
}
}
