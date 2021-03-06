import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng4-validators";
import {UserService} from "../../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.pug',
    styleUrls: ['./user-dialog.component.sass']
})
export class UserDialogComponent implements OnInit {
    passwordForm: FormGroup;

    constructor(private userService: UserService,
                public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const passwordControl = new FormControl(null, Validators.required);

        this.passwordForm = new FormGroup({
            oldPassword: new FormControl(null),
            newPassword: new FormGroup({
                password: passwordControl,
                passwordConfirmation: new FormControl(null, [Validators.required, CustomValidators.equalTo(passwordControl)])
            })
        });
    }

    closeDialog() {
        this.dialogRef.close({passwordChanged: false});
    }

    updatePassword() {
        const form = this.passwordForm.value;
        const passwordObject = {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword.password
        };
        this.userService.changePassword(passwordObject).then((res) => {
            this.dialogRef.close({passwordChanged: true});
        }, (err: HttpErrorResponse) => {
            console.log(err.error.error);
            if (err.status === 401 && err.error.error === 'Invalid password') {
                this.passwordForm.get('oldPassword').setErrors({wrongPassword: true});
            }
        });
    }
}
