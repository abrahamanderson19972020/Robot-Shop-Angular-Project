import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signin } from 'src/app/models/signin.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userSignin: Signin = { email: '', password: '' };
  siginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  signUser() {
    this.userService.signinUser(this.userSignin).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: () => {
        this.siginError = true;
        console.log('Error detected');
      },
    });
  }
}
