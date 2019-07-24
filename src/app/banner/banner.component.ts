import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.appService.username = null;
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
