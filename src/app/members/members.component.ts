import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    if (this.appService.getUsername() === null || this.appService.getUsername() === undefined) {
        this.router.navigate(['/login']);
    }
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
      this.router.navigate(['/new-member']);
  }

  editMemberByID(id: number) {}

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(result => {
        this.appService.getMembers().subscribe(members => (this.members = members));
    });
  }
}
