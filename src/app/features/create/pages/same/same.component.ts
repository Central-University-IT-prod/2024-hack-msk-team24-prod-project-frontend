import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { CreateGroupType1Request } from '../../../../../generated';
import { GroupsApiService } from '../../../main/services/groups-api.service';

@Component({
  selector: 'app-same',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './same.component.html',
  styleUrl: './same.component.css'
})
export default class SameComponent {
  group: CreateGroupType1Request = { title: '', price: 0 }
  profile;
  error: string | null = null;

  constructor(
    private router: Router,
    private profileService: ProfileApiService,
    private groupService: GroupsApiService
  ) {
    this.profile = this.profileService.currentUser;
  }

  create() {
    this.error = null;
    this.groupService.createSameGroup(this.group).then(resp => {
      console.log(resp);
      const groupId = resp.id;
      this.router.navigate([`/home/group/${groupId}`])
    }).catch(error => { this.error=error; console.log(this.error); })
  }
}
