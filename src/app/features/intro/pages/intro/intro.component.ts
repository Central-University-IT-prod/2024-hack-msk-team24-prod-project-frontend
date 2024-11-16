import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class IntroComponent implements AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>
  currentSlideName: string = 'Сканер QR-кодов';

  constructor(
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.swiper.nativeElement.addEventListener('swiperslidechange', (event) => {
      setTimeout(() => this.onSlideChange(), 10);
    });
  }

  onSlideChange() {
    try {
      this.currentSlideName = (document.getElementsByClassName('swiper-slide-active').item(0)!.children.item(0)!.innerHTML);
    } catch (e: any) {}
  }

  navigate() {
    this.router.navigate(['/auth/login']).then();
  }

  goToCodePage() {
    this.router.navigate(['/auth/code']).then();
  }

  next() {
    this.swiper.nativeElement.swiper.slideNext();
  }

  prev() {
    this.swiper.nativeElement.swiper.slidePrev();
  }

  protected readonly window = window;
}
