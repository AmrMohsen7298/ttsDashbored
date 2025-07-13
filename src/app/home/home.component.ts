import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../backend-service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  getTutorials: boolean = false
  formData = {
   
    title: '',
    description: '',
    level: '',
    isPaid: false,
    image: null as any

  };
  


  // Define the levels for the dropdown
  addlessonstatus: boolean = false
  page = 0
  numPage: any
  pagesArray:any
 stringPage :any
  levels = ['مستوي اول', 'مستوي الثاني', 'مستوي الثالث', 'مستوي الرابع', 'مستوي الخامس','مستوي السادس'];
  searchText: string = '';
  currentPage: number = 1;
  pageList:any
  pageSize: number = 3; // Change this value as needed
  lessons: any[]  ;
filteredLessons: any[] = [];
selectedCategory: string = '';
  totalPages: number = 0;
  homeModel:boolean = false
  // Pagination methods
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private router: Router,private http: HttpClient,private back:BackendServiceService) {
    this.lessons = [];
    this.page = 0
  }
  toggleLiveDemo() {
    this.homeModel = !this.homeModel;
  }
  getSpescficPage(page: any) {
    debugger
    localStorage.setItem('page', page.toString());
    this.getLesson()

  }
  handleLiveDemoChange(event: any) {
    this.homeModel = event;
  }
  nextPage(): void {
    this.page += 1
    localStorage.setItem('page', this.page.toString());
    this.getLesson()
  }

  prevPage(): void {
    if (this.page != 0) {
      this.page -= 1
      localStorage.setItem('page', this.page.toString());
      this.getLesson()
    }
   
  }

  // Filtering method
  filterLessons(): any[] {
    return this.filteredLessons.filter((lesson:any) =>
      lesson.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  getPages(){
     
    this.http.get<any>(`https://bel-arabi.com/api/tutorials/Size`)
      .subscribe(
        (response: any) => {
          debugger
          console.log("size response"+response)
         this.numPage = response

          //this.filteredLessons = this.lessons;
          //const totalLessons = this.filterLessons().length;
          //this.totalPages = Math.ceil(totalLessons / this.pageSize);
          this.pageList = Math.ceil(this.numPage / 10);
          this.pagesArray = Array.from({ length: this.pageList }, (_, i) => i);
        },
        (error) => {
          console.error('Error fetching lessons:', error);
        }
    );
    
    

  }
addLesson(id:any){
   this.back.tutotrialid = id
   localStorage.setItem('tutorialId', id.toString());
   console.log(this.back.tutotrialid)
   this.router.navigate(['add-lesson']);
  
}
filterByCategory(category:string): void{
  this.selectedCategory = category;
    if (category === 'All Categories') {
      this.filteredLessons = this.lessons;
    } else {
      this.filteredLessons = this.lessons.filter(lesson => lesson.category === category);
    }

}


  ngOnInit(): void {
    this.back.isLogin = true
    if (this.page == null) {
      this.page = 0
    }
    else if(this.page >=0){
      this.stringPage = localStorage.getItem('page')
      this.page = parseInt(this.stringPage)

    }
    this.getLesson()
    this.getPages();
   
  }
  getLesson() {
    this.getTutorials = true
    debugger
    this.stringPage = localStorage.getItem('page')
    if (this.stringPage == null) {
      this.page = 0
    }
    else {

    this.page = parseInt(this.stringPage)
    }
    
    console.log(this.page+" page")
    this.http.get<any[]>(`https://bel-arabi.com/api/tutorials?page=${this.page}&size=10`)
  .subscribe(
    (response: any[]) => {
      console.log(response.values)
      this.lessons = response

      //this.filteredLessons = this.lessons;
      //const totalLessons = this.filterLessons().length;
      //this.totalPages = Math.ceil(totalLessons / this.pageSize);
      this.getTutorials = false
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );
}
  deleteLesson() {
    this.http.post<any[]>('https://bel-arabi.com/api/tutorials/delete/' + this.back.tutotrialid, null)
      .subscribe(
        (response: any[]) => {
          console.log(response)
         
          this.getLesson()
        },
        (error) => {
          debugger
          this.toastr.error('you must delete the content first!', 'Error', {

            positionClass: 'toast-top-full-width', // You can change the position

            timeOut: 4000, // Duration in milliseconds

          });
          console.error('Error fetching lessons:', error);
          
        })
  }

  onSubmit() {
    // Handle form submission here
    this.addlessonstatus = true
    console.log(this.formData);
    const formData_ = new FormData();
    
    formData_.append('file', this.formData.image); // Assuming this.formData.imageFile is the file blob
    if (this.formData.level == 'مستوي اول') {
      this.formData.level = 'اولي ابتدائي'

    }
    if (this.formData.level == 'مستوي الثاني') {
      this.formData.level = 'ثانية ابتدائي'

    }
    if (this.formData.level == 'مستوي الثالث') {
      this.formData.level = 'ثالثة ابتدائي'

    }
    if (this.formData.level == 'مستوي الرابع') {
      this.formData.level = 'رابعة ابتدائي'

    }
    if (this.formData.level == 'مستوي الخامس') {
      this.formData.level = 'خامسة ابتدائي'

    }
    if (this.formData.level == 'مستوي السادس') {
      this.formData.level = 'سادسة ابتدائي'

    }
    const params = new HttpParams()
  .set('title', this.formData.title)
      .set('description', this.formData.description)
      .set('level', this.formData.level)
      .set('isPaid', this.formData.isPaid);

   
    console.log(params)
    this.http.post<any>('https://bel-arabi.com/api/tutorials', formData_,{params})
      .subscribe(
        response => {
          
          this.back.tutotrialid = response.id
          console.log(this.back.tutotrialid)
          console.log('API Response:', response);
          // Handle response as needed
          this.getLesson()
          this.handleLiveDemoChange(false)
          
        },
        error => {
          console.error('API Error:', error);
          this.getLesson()
          this.handleLiveDemoChange(false)
          // Handle error as needed
        }
      );
  }

  onFileChange(event:any) {
    // Handle file input change here
    const file = event.target.files[0];
    const reader = new FileReader();

  reader.onload = () => {
    // Convert the binary string to a byte array
    const byteArray = new Uint8Array(reader.result as ArrayBuffer);
    
    // Now you have the byte array, you can do whatever you want with it
    console.log(byteArray);
    const blob = new Blob([byteArray], { type: 'multipart/form-data' });
    this.formData.image = blob
  };
  reader.readAsArrayBuffer(file);
  // Read the file as a binary string
 
   
    // You may need to handle file upload logic here
    console.log(file);
  }
 


}
