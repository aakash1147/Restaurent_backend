import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'lazy-loading');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    const img = this.el.nativeElement as HTMLImageElement;
    img.src = this.appLazyLoad;
    img.onload = () => {
      this.renderer.removeClass(img, 'lazy-loading');
      this.renderer.addClass(img, 'lazy-loaded');
    };
  }
}

@Directive({
  selector: '[appDebounce]',
  standalone: true
})
export class DebounceDirective {
  @Input() appDebounce: number = 300;
  private timeout: any;

  @HostListener('keyup')
  onKeyUp(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // Delegate to parent component
    }, this.appDebounce);
  }
}

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() set appHighlight(value: string) {
    this.el.nativeElement.style.backgroundColor = value || 'yellow';
  }

  constructor(private el: ElementRef) {}
}

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleClick(event: Event): void {
    // Implementation for detecting clicks outside element
  }
}

@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}

@Directive({
  selector: '[appLoadingSpinner]',
  standalone: true
})
export class LoadingSpinnerDirective {
  @Input() set appLoadingSpinner(isLoading: boolean) {
    if (isLoading) {
      this.renderer.addClass(this.el.nativeElement, 'loading');
      this.el.nativeElement.style.pointerEvents = 'none';
      this.el.nativeElement.style.opacity = '0.6';
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'loading');
      this.el.nativeElement.style.pointerEvents = 'auto';
      this.el.nativeElement.style.opacity = '1';
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
