import { Component } from '@angular/core';
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { GroupsApiService } from '../../services/groups-api.service';
import { Router } from '@angular/router';
import { GroupResponse } from '../../../../../generated';
import { GroupsFilterPipe } from '../../pipes/groups-filter.pipe';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    GroupsFilterPipe
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export default class GroupsComponent {
  groups: GroupResponse[] = [];
  profile;
  activeFilter = '';

  constructor(
    public router: Router,
    private profileService: ProfileApiService,
    private groupsService: GroupsApiService
  ) {
    this.profile = this.profileService.currentUser;
    this.groupsService.getAllGroups().then(resp => this.groups = resp).catch(error => { console.log(error); })
  }

}
