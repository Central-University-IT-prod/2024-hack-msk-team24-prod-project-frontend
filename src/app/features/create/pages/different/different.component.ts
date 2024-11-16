import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { CreateGroupType2Request } from '../../../../../generated';
import { GroupsApiService } from '../../../main/services/groups-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-different',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './different.component.html',
  styleUrl: './different.component.css'
})
export default class DifferentComponent {
  group: CreateGroupType2Request = {
    title: '', products: []
  }
  profile;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  error: string | null = null;

  constructor(
    private router: Router,
    private profileService: ProfileApiService,
    private groupService: GroupsApiService
  ) {
    this.profile = this.profileService.currentUser;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
      this.groupService.getProductsFromQR(formData)
        .then(resp => this.group.products = resp)
        .catch(error => {
          console.log(error);
          this.group.products = [];
        });
    }
  }

  remove(product: any) {
    this.group.products = this.group.products.filter((e: any) => e !== product);
  }

  create() {
    this.error = null;
    this.groupService.createDifferentGroup(this.group).then(resp => {
      console.log(resp);
      const groupId = resp.id;
      this.router.navigate([`/home/group/${ groupId }`])
    }).catch(error => { this.error=error; console.log(this.error); })
  }
}
