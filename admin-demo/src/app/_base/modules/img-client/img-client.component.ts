import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';

declare var $;
@Component({
  selector: 'img-client',
  templateUrl: './img-client.component.html',
  styleUrls: ['./img-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImgClientComponent implements OnInit {

  @Input('src') src: any;
  @Input('alt') alt: any;
  @Input('class') class: any;
  public isLoad: boolean = false;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    let img = this.el.nativeElement;
    let urlBase = this.src;
    let index = urlBase.lastIndexOf('.');
    let urlname = urlBase.substring(0, index);
    let urlextent = urlBase.substring(index);
    let w = $(img).width();
    //let h = $(img).height();

    if (w < 768) {
      //moblie 
      this.src = `${urlname}_mobile${urlextent}`;
    } else if (w < 1280) {
      //tablet
      this.src = `${urlname}_tablet${urlextent}`;
    } else if (w < 1440) {
      //pc
    } else {
      //tv
      this.src = `${urlname}_tv${urlextent}`;    
    }

    $(this.el.nativeElement).removeClass(this.class);
    this.isLoad = true;
  }

}
