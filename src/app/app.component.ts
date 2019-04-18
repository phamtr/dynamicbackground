import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamicbackground2';
  imagesHorizontal = ['https://picsum.photos/900/500?image=1','https://picsum.photos/900/500?image=2', 'https://picsum.photos/900/500?image=3', 'https://picsum.photos/900/500?image=4']
}
