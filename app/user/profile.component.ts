import {Component, Inject, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {TOASTER_TOKEN, Toastr} from "../common/toastr.service";

@Component({
    templateUrl: 'app/user/profile.component.html',
    styles: [`
        em {float: right; color: #305c65; padding-left: 10px;}
        .error input {background-color:#e3c3c5;}
        .error ::-webkit-input-placeholder {color: #999;}
        .error ::-moz-placeholder {color:#999;}
        .error :-moz-placeholder {color:#999;}
        .error :-ms-input-placeholder {color:#999;}
    `]
})
export class ProfileComponent implements OnInit{
    constructor(private authService: AuthService,
                private router: Router,
                @Inject(TOASTER_TOKEN) private toastr: Toastr
    ){}
    profileForm: FormGroup;
    private firstName: FormControl;
    private lastName: FormControl;

    ngOnInit(){
        this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*]')]);
        this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)

        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }
    cancel(){
        this.router.navigate(['events'])
    }
    saveProfile(formValue){
        if( this.profileForm.valid){
            this.authService.updateCurrentUser(formValue.firstName, formValue.lastName);
            this.toastr.success('Profile Saved')
        }
    }

    validateLastName(){
        return this.lastName.valid || this.lastName.untouched
    }
    validateFirstName(){
        return this.firstName.valid || this.firstName.untouched
    }
}