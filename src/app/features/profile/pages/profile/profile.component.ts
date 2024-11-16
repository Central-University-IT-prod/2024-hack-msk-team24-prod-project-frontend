import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { ProfileApiService } from '../../services/profile-api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  cardCVV: string = '';
  card_number: string = '';
  chosenLabel: string = '';
  chosenMonth: string = 'Январь';
  chosenYear: number;

  error: string | null = null;

  public readonly months: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  public readonly years: number[] = []

  constructor(
    private router: Router,
    private profileService: ProfileApiService,
  ) {
    const currentYear = Number(new Date().getFullYear());
    this.chosenYear = currentYear;
    for (let year = currentYear; year < currentYear+50; year++)
      this.years.push(year);
  }

  confirm() {
    this.error = null;
    this.profileService.connectCard({ card: this.card_number })
      .then(resp => { console.log(resp); this.router.navigate(['/home']); })
      .catch(error => {
        this.error = error;
      })
  }

  cardNumberInput(event: Event) {
    // @ts-ignore
    const text = event.target!.value;
    if (text.length > 16) { // @ts-ignore
      event.target!.value = this.card_number;
    } else this.card_number = text;
  }

  cardCVVInput(event: Event) {
    // @ts-ignore
    const text = event.target!.value;
    if (text.length > 3) { // @ts-ignore
      event.target!.value = this.cardCVV;
    } else this.cardCVV = text;
  }

  convertCardNumber() {
    let result = this.card_number;
    let arr:string[] = result.match(/.{1,4}/g) || []
    for (let i = 0; i < 4; i++) {
      if (i >= arr.length) arr.push("####");
      else arr[i] = arr[i].padEnd(4, '#')
    }
    let res = '';
    for (const a of arr)
      res += '<span>'+a+'</span>'
    return res;
  }

  displayCVV() {
    let result = this.cardCVV;
    result = result.padEnd(3, '#');
    return result;
  }

  displayDate() {
    const monthIndex : string = String(this.months.indexOf(this.chosenMonth) + 1).padStart(2,'0');
    const year = String(this.chosenYear).slice(2,4);
    return monthIndex + '/' + year;
  }
}
