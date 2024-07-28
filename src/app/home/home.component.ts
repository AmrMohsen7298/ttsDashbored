import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../backend-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  formData = {
   
    title: '',
    description: '',
    level: '',
    isPaid: false,
    image: null as any
  };
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 3; // Change this value as needed
  lessons: any[] ;
filteredLessons: any[] = [];
selectedCategory: string = '';
  totalPages: number = 0;
  // Pagination methods
  constructor(private formBuilder: FormBuilder,private router: Router,private http: HttpClient,private back:BackendServiceService) { 
    this.lessons = [];
   
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
    return this.filteredLessons.filter((lesson:any) =>
      lesson.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  getPages(): number[] {
    const totalLessons = this.filterLessons().length;
    const totalPages = Math.ceil(totalLessons / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
addLesson(id:any){
   this.back.tutotrialid = id
   console.log(this.back.tutotrialid)
   this.router.navigate(['Home']);
  
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
    this.back.isLogin =  true
    this.http.get<any[]>('https://tts.eliteacademyeg.com/api/tutorials')
    .subscribe(
      (response: any[]) => {
        console.log(response.values)
        this.lessons = response;
        this.filteredLessons = this.lessons;
        const totalLessons = this.filterLessons().length;
        this.totalPages = Math.ceil(totalLessons / this.pageSize);
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );

   
  }



  onSubmit() {
    // Handle form submission here
    console.log(this.formData);
    const formData_ = new FormData();
    
    formData_.append('file', this.formData.image); // Assuming this.formData.imageFile is the file blob
    
    const params = new HttpParams()
  .set('title', this.formData.title)
  .set('description', this.formData.description)
  .set('level', this.formData.level)
  .set('isPaid', this.formData.isPaid);

    this.http.post<any>('https://tts.eliteacademyeg.com/api/tutorials', formData_,{params})
      .subscribe(
        response => {
          
          this.back.tutotrialid = response.id
          console.log(this.back.tutotrialid)
          console.log('API Response:', response);
          // Handle response as needed
          this.router.navigate(['Home']);
          
        },
        error => {
          console.error('API Error:', error);
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
