import { Component, output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
})
export class Topbar {
  readonly menuRequested = output<void>();

  openMenu(): void { this.menuRequested.emit(); }
}
