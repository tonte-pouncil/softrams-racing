import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member';



@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  mode: string = 'update';
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
      this.memberForm = this.createFormGroup();
      this.route.params.subscribe(params => {});
  }

  ngOnInit() {
      const memberId = this.route.snapshot.paramMap.get('memberId');

      if (memberId === null || memberId === undefined) {
          this.mode = 'add';
      }

      this.appService.getTeams().then(teams => {
         this.teams = [...teams];
         return teams;
      }).then(teams => {
          this.appService.getMember(memberId).then(member => {
              let teamMember = null;
              const foundTeam = this.teams.some(team => {
                  if (team.name === member.team) {
                      teamMember = team;
                      return true;
                  }
              });
              this.memberForm.setValue({
                  id: memberId,
                  firstName: member.firstName,
                  lastName: member.lastName,
                  jobTitle: member.jobTitle,
                  team: teamMember,
                  status: member.status
              });
          });
      });
  }

  ngOnChanges() {}

  onSubmit(form: FormGroup) {
    this.memberModel = {
      id: form.value.id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      jobTitle: form.value.jobTitle,
      team: form.value.team.name,
      status: form.value.status
    };

    if (this.mode === 'update') {
        this.appService.updateMember(this.memberModel).subscribe(result => {
            this.router.navigate(['/members']);
        });
    } else {
        this.appService.addMember(this.memberModel).subscribe(result => {
            this.router.navigate(['/members']);
        });
    }
  }

  private createFormGroup() {
      return new FormGroup({
          id: new FormControl(''),
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          jobTitle: new FormControl(''),
          team: new FormControl({id: null, name: null}),
          status: new FormControl('')
      });
  }

  public compareFn(c1: any, c2: any): boolean {
      return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
