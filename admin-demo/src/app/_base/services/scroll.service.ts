import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PlatformLocation } from '@angular/common';

declare var $;
@Injectable()
export class ScrollService {

  public scrollPos: any = {};
  public interval: any;
  public lastRoute: string;
  public sub: any;

  constructor(
    private router: Router,
    private pl: PlatformLocation,
  ) { }

  public start() {
    this.sub = this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        this.saveScroll();
        this.lastRoute = this.routeName(this.router.url);
      }
    }, error => console.error(error));

    this.pl.onPopState(() => {
      console.log(`setInverval waiting...`);
      this.interval = setInterval(() => this.resolveScroll(), 400);
    });
  }

  public end() {
    this.sub.unsubscribe();
  }

  public resolveScroll() {
    const url = this.routeName(this.router.url);
    const position = this.scrollPos[url] ? this.scrollPos[url] : 0;

    if (position == 0) {
      this.scrollTo(position);
    } else if ($('html').height() >= position) {
      this.scrollTo(position);
    }
  }

  public scrollToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 700);
  }

  public scrollTo(position) {
    if (!this.interval) {
      return;
    }

    $('body, html').scrollTop(position);
    this.destroyScrollListener();
  }

  public destroyScrollListener() {
    clearInterval(this.interval);
    this.interval = null;
  }

  private routeName(url: string) {
    if (!url) { return null; }

    const slashIndex = url.indexOf('/');
    const matrixParamsIndex = url.indexOf(';') != -1 ? url.indexOf(';') : url.length;

    url = url.substring(slashIndex, matrixParamsIndex);

    return url;
  }

  private saveScroll() {
    const url = this.routeName(this.router.url);
    const position = Math.floor(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);

    console.log(`saving (${position}) - ${url}`);

    this.scrollPos[url] = position;
  }
}
