import { Component } from '@angular/core';
import { ContentfulService } from './services/api/contentful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';

  constructor(private contentfulService: ContentfulService) {
  }
}
