import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public data: any;

  constructor(private http: HttpClient) {
    // this.openInAppBrowser();
  }

  openCapacitorSite = async () => {
    await Browser.open({ url: 'https://ruts.rmutsv.ac.th/' });
  };

  ngOnInit() {
    this.http
      .get('https://e-service.rmutsv.ac.th/faisol/rutsapp/student_system.php')
      .subscribe((res) => {
        this.data = res;
        console.log(this.data);
      });
  }
}
