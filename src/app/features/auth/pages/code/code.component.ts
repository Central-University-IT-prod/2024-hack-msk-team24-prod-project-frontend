import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Event, Router, RouterLink } from "@angular/router";
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { GroupsApiService } from '../../../main/services/groups-api.service';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export default class CodeComponent implements AfterViewInit {
  @ViewChildren('inputElement') inputElements!: QueryList<HTMLInputElement>;

  codes: string[] = [];

  error: string | null = null;

  constructor(
    private profileService: ProfileApiService,
    private router: Router,
    private groupService: GroupsApiService
  ) {
    for (let i = 0; i < 6; i++)
      this.codes.push('');
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.inputElements.forEach((input: ElementRef<HTMLInputElement>) => input.nativeElement.onfocus = () => input.nativeElement.select());
  }

  inputHandler(index:  number, event: any) {
    // @ts-ignore
    const inputs = this.inputElements._results;
    const currentInput: ElementRef<HTMLInputElement> = inputs[index-1];
    this.codes[index - 1] = currentInput.nativeElement.value;

    if (currentInput.nativeElement.value === '') { // handle Backspace
      if (index === 1) return;
      const prevInput: ElementRef<HTMLInputElement> = inputs[index-2];
      prevInput.nativeElement.focus();
    } else { // handle input
      if (index === 6) return;
      const nextInput: ElementRef<HTMLInputElement> = inputs[index];
      nextInput.nativeElement.focus();
    }
  }


  login() {
    this.error = null;
    this.groupService.joinGuestGroupById(this.codes.join(''))
      .then(resp => this.router.navigate(['/home']))
      .catch(error => this.error = error)
  }
}
