import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, SecurityContext } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private readonly destroy$ = new Subject();

  public readonly title = 'TechNest Trial';
  public readonly links: { text: string; link: string; }[] = [
    {
      text: 'Accounts',
      link: 'accounts',
    },
  ];

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private readonly breakpointObserver: BreakpointObserver,
              private readonly iconRegistry: MatIconRegistry,
              private readonly sanitizer: DomSanitizer,
              @Inject(DOCUMENT) private readonly document: Document) {
    this.document.title = this.title;
    this.iconRegistry.addSvgIcon('btc', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconmonstr-bitcoin-3.svg'));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
