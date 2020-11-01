import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { timer } from 'rxjs';

import { oneSecMillis } from '../account/shared/shared.const';

@Injectable({
  providedIn: 'root',
})
export class CssClassCleanerService {
  private readonly renderer: Renderer2;

  constructor(
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // Performs cleanup of CSS class to allow further animation executions
  public cleanElementWithClass(className: string): void {
    // 1 second delay to ensure animation had room to happen
    timer(oneSecMillis).subscribe(() => {
      const element = this.document.querySelector(`.${className}`);

      if (element) {
        this.renderer.removeClass(element, className);
      }
    });
  }
}
