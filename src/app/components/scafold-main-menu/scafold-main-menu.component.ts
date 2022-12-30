import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-scafold-main-menu',
  templateUrl: './scafold-main-menu.component.html',
  styleUrls: ['./scafold-main-menu.component.scss']
})

export class ScafoldMainMenuComponent {
  showFiller = false;
  events: string[] = [];
  opened: boolean = false;
}