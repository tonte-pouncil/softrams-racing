import { Component, OnInit, OnChanges } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: {
      'id': number,
      'name': string
  },
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [
      {
          'id': 1,
          'name': 'Formula 1 - Car 77'
      },
      {
          'id': 2,
          'name': 'Formula 1 - Car 8'
      },
      {
          'id': 3,
          'name': 'Formula 2 - Car 54'
      },
      {
          'id': 4,
          'name': 'Formula 2 - Car 63'
      },
      {
          'id': 5,
          'name': 'Deutsche Tourenwagen Masters - Car 117'
      },
      {
          'id': 6,
          'name': 'Deutsche Tourenwagen Masters - Car 118'
      },
      {
          'id': 7,
          'name': 'World Endurance Championship - Car 99'
      },
      {
          'id': 8,
          'name': 'World Endurance Championship - Car 5'
      },
      {
          'id': 9,
          'name': 'World Rally Championship - Car 77'
      },
      {
          'id': 10,
          'name': 'World Rally Championship - Car 90'
      }
  ];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
      this.memberForm = this.createFormGroup();
      this.route.params.subscribe(params => {});
  }

  ngOnInit() {
      const memberId = this.route.snapshot.paramMap.get('memberId');
      this.appService.getMember(memberId).subscribe(member => {
          let teamMember;
          this.teams.some(team => {
              if (team.name === member.team) {
                  teamMember = team;
                  return true;
              }
          });
          this.memberForm.setValue({
              firstName: member.firstName,
              lastName: member.lastName,
              jobTitle: member.jobTitle,
              team: teamMember,
              status: member.status
          });
      });
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
  }

  private createFormGroup() {
      return new FormGroup({
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          jobTitle: new FormControl(''),
          team: new FormControl(''),
          status: new FormControl('')
      });
  }

  public compareFn(c1: any, c2:any): boolean {
      return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
