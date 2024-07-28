import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';

  password = '';
  errorMessage = '';
  errorMessagebool=false
constructor(private router: Router,private back:BackendServiceService){
  this.back.isLogin = false
}
  login() {

    if (this.username === 'admin' && this.password === 'P@$$w0rd') {

      console.log('Login successful!');
      this.back.isLogin = true
      this.router.navigate(['Home']);
      // Redirect to dashboard or perform other login logic

    } 

    else 
    {
      this.errorMessagebool=true
      this.errorMessage = 'Invalid username or password';

    }

  }
}
