import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      epassport: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      // Replace 'https://eloginx.rmutsv.ac.th/' with the actual URL of your backend API.
      const backendUrl = 'https://eloginx.rmutsv.ac.th/';

      // Payload with epassport and password for login.
      const loginPayload = {};

      this.http.post<any>(backendUrl, loginPayload).subscribe(
        (response: any) => {
          if (response.status === true) {
            // Successfully logged in, navigate to the profile page.
            this.navCtrl.navigateForward('/profile');
          } else {
            // Show an alert for invalid credentials.
            this.presentAlert(
              'Login Failed',
              'Invalid credentials. Please try again.'
            );
          }
        },
        (error) => {
          console.error('Login Error:', error);
          this.presentAlert(
            'Login Error',
            'An error occurred during login. Please try again later.'
          );
        }
      );
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
