import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestService } from './Services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Login With Google';
  auth2: any;
  public data = "";
  googledata : ExternalAuthDto = new ExternalAuthDto();
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor(private _testService: TestService) { }
  ngOnInit() {

    this.googleAuthSDK();
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {
        //Print profile details in the console logs
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        debugger;
        this._testService.getdata()
              .subscribe((result) =>{
                console.warn(result);
              }) 
        // debugger;
        // this.dataTest.name = "testtiiingg.";
        // this._testService.putData(this.dataTest).subscribe((result) =>{
        //   console.warn(result);
        // }) 
        this.googledata.idToken = googleAuthUser.getAuthResponse().id_token;
        this.googledata.provider = "GOOGLE";
        // debugger;
        this._testService.postGoolgle(this.googledata).subscribe((result) =>{
          console.warn(result);
        }) 
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: "493866613519-m580sid9slrk81pgn1p6s41jlj4p9k3v.apps.googleusercontent.com",
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}

export class ExternalAuthDto
{
  provider : string ="";
  idToken : string =""; 
}