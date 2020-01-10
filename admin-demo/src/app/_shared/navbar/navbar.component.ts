import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userName: Observable<string>;

  constructor(
    private authorizeService: AuthorizeService
  ) { }

  ngOnInit() {
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

}
