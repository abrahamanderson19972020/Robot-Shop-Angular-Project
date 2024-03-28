import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUser: User | null | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.isUser = res;
    });
  }

  logOut() {
    this.userService.signOut();
  }
}
