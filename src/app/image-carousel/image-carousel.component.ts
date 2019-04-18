import { AnimationBuilder, AnimationFactory, AnimationPlayer, animate, style } from '@angular/animations';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  providers:[
  ]
})
export class ImageCarouselComponent implements OnInit, AfterViewInit, OnDestroy {

  IMAGE_CHANGE_TIME = 3; // seconds

  @Input()
  imagesHorizontal: any[];

  imageHorizontalLeft: any;
  imageHorizontalRight: any;
  notificationState = 'unready';
  timing = '1s 0.1s ease-in-out';
  tickerInstanceHorizontal: any;
  elementsHorizontal: any[];
  private indexHorizontal = 0;

  constructor(private builder: AnimationBuilder, private elRef: ElementRef) { }

  ngOnInit() {

    if (this.imagesHorizontal.length > 0) {
      this.imageHorizontalLeft = {'background-image': 'url(' + this.imagesHorizontal[0] + ')'};
    }
    if (this.imagesHorizontal.length > 1) {
      this.imageHorizontalRight = {'background-image': 'url(' + this.imagesHorizontal[1] + ')'};
      this.tickerInstanceHorizontal = setInterval(() => { this.tickerHorizontal(); }, this.IMAGE_CHANGE_TIME * 1000);
    } 
   
  }

  ngAfterViewInit() {
    this.elementsHorizontal = this.elRef.nativeElement.getElementsByClassName('image-tile-small');
  }

  ngOnDestroy() {
    if (this.tickerInstanceHorizontal) {
      clearInterval(this.tickerInstanceHorizontal);
    }
  }

  private tickerHorizontal() {
    
    this.indexHorizontal += 1;
    this.indexHorizontal = this.indexHorizontal > (this.imagesHorizontal.length - 1) ? 0 : this.indexHorizontal;
    const indexBottom = this.indexHorizontal >= (this.imagesHorizontal.length - 1) ? 0 : this.indexHorizontal + 1;

    for (let i = 0; i < this.elementsHorizontal.length; i++) {

      const ndx = i;
      const tickerAnimation: AnimationFactory = this.builder.build([
        style({ left: '0%' }),
        animate('2s', style({ left: '-50%' }))
      ]);

      const playr: AnimationPlayer = tickerAnimation.create(this.elementsHorizontal[ndx]);
      playr.play();
      playr.onDone(() => {
              this.imageHorizontalLeft = {'background-image': 'url(' + this.imagesHorizontal[this.indexHorizontal] + ')'};
              this.imageHorizontalRight = {'background-image': 'url(' + this.imagesHorizontal[indexBottom]+ ')'};
              const switchAnimation: AnimationFactory = this.builder.build([
                style({ left: '-50%' }),
                animate('0s', style({ left: '0%' }))
              ]);
              const player: AnimationPlayer = switchAnimation.create(this.elementsHorizontal[ndx]);
              player.play();
            
          });
      }
  }
}
