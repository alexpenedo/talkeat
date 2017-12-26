import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  image: string;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
    this.userService.showImageEmitter.subscribe((image) => {
      this.image = image;
    });
  }

  ngOnInit() {
    this.image = this.userService.getPhotoUrl();
  }
  uploadPhoto($event) {
    this.userService.uploadPhoto($event.target.files[0]);
  }
  updateUser() {
    this.userService.update(this.user);
  }
}