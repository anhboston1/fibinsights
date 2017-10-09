import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { ValidationService } from '../../core/services/validation.service';
import { IUserLogin } from '../../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';

@Component({
    selector: 'cm-login',
    templateUrl: './signup.component.html',
    styleUrls: [ './signup.component.css' ]
})
export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder, 
                private router: Router, 
                private authService: AuthService,
                private growler: GrowlerService
               ) { }

    ngOnInit() { 
        this.buildForm();
    }

    buildForm() {
        this.signupForm = this.formBuilder.group({
            email:      ['', [ Validators.required, ValidationService.emailValidator ]],
            password:   ['', [ Validators.required, ValidationService.passwordValidator ]],
            firstName:      ['', [ Validators.required ]],
            lastName:      ['', [ Validators.required ]],
        });
    }

    submit({ value, valid }: { value: IUserLogin, valid: boolean }) {
        //alert("Submitting signup now.")
        this.authService.signup(value)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    //alert(data.token);
                    this.growler.growl('Logged in', GrowlerMessageType.Info);
                    if (this.authService.redirectUrl) {
                        const redirectUrl = this.authService.redirectUrl;
                        this.authService.redirectUrl = '';
                        this.router.navigate([redirectUrl]);
                    } else {
                        this.router.navigate(['/about']);
                    }
                },
                error => {
                    console.error(error);
                    const loginError = 'Unable to login';
                    this.errorMessage = loginError;
                    this.growler.growl(loginError, GrowlerMessageType.Danger);
                }
            );
        /*
            .subscribe((status: boolean) => {
               
                if (status) {
                    //alert("signed up passed.")
                    //this.growler.growl('Logged in', GrowlerMessageType.Info);
                    if (this.authService.redirectUrl) {
                        const redirectUrl = this.authService.redirectUrl;
                        this.authService.redirectUrl = '';
                        this.router.navigate([redirectUrl]);
                    } else {
                        this.router.navigate(['/about']);
                    }
                } else {
                    const loginError = 'Unable to login';
                    alert("signup failed.")
                    this.errorMessage = loginError;
                    this.growler.growl(loginError, GrowlerMessageType.Danger);
                }
            },
            (err: any) => console.log(err));
            */
    }

}