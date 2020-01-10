import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PlatformLocation, Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private saveRow = 10;
  public histStoryPage: string[] = [];
  private isBackUrl = false;
  private sub: any;
  constructor(
    private rt: Router,
    private pl: PlatformLocation,
    private location: Location
  ) { }

  public start() {
    this.histStoryPage = [];
    this.sub = this.rt.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        if (!this.isBackUrl) {
          this.histStoryPage.push(x.url);
          while (this.histStoryPage.length > this.saveRow) {
            this.histStoryPage.splice(0, 1);
          }
        }
        this.isBackUrl = false;
      }
    });
    // fix back browse load data page
    this.pl.onPopState(() => {
      this.isBackUrl = true;
      if (this.histStoryPage.length > 0) {
        this.histStoryPage.splice(this.histStoryPage.length - 1, 1);
      }
    });
  }

  public end() {
    this.sub.unsubscribe();
  }

  public getUrlPage(index: number = 1) {
    if (index < this.histStoryPage.length) {
      return this.histStoryPage[this.histStoryPage.length - 1 - index];
    }
    return null;
  }

  public getHistory() {
    const data = this.getHistory;
    return data;
  }

  public backUrl(urlDefault: string = null, mapUrl: boolean = false) {
    let urlOld = this.getUrlPage(1);
    const urlBase = environment.apiUrl;
    if (urlOld !== null) {
      this.isBackUrl = true;
      if (this.histStoryPage.length > 0) {
        this.histStoryPage.splice(this.histStoryPage.length - 1, 1);
      }
      if (urlBase !== '') {
        urlOld = urlOld.replace(urlBase, '');
      }
      if (mapUrl) {
        if (urlOld.startsWith(urlDefault)) {
          this.rt.navigateByUrl(urlOld);
        } else {
          this.rt.navigateByUrl(urlDefault);
        }
      } else {
        this.rt.navigateByUrl(urlOld);
      }
    } else if (urlDefault) {
      this.isBackUrl = true;
      if (this.histStoryPage.length > 0) {
        this.histStoryPage.splice(this.histStoryPage.length - 1, 1);
      }
      this.rt.navigateByUrl(urlDefault);
    } else {
      this.location.back();
    }
  }

  public pushState(url: string, viewUrl: boolean = true) {
    const urlBase = url;
    const lc: any = this.location;
    const linkBase = lc._baseHref;
    if (url.startsWith(linkBase) && linkBase !== '') {
      url = url.replace(linkBase, '');
    }
    // fix dup history
    if (
      this.histStoryPage.length == 0 ||
      this.histStoryPage[this.histStoryPage.length - 1] !== url
    ) {
      this.histStoryPage.push(url);
      while (this.histStoryPage.length > this.saveRow) {
        this.histStoryPage.splice(0, 1);
      }
    }

    if (viewUrl) {
      history.pushState('', '', urlBase);
    }
  }
}
