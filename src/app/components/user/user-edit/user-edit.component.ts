import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng4-validators';
import * as moment from 'moment';
import {ValidateDateFormat} from '../../../other/custom.validator';
import {AddressService} from '../../../services/address.service';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Address} from '../../../models/address';
import {User} from '../../../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {EventService} from '../../../services/event.service';
import {Sport} from '../../../models/sport';
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.pug',
    styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit, OnDestroy {
    private addressSub: Subscription;
    private dialogSub: Subscription;

    private userForm: FormGroup;
    private addressLoading = false;
    private user: User;
    private sports: Sport[];

    constructor(private addressService: AddressService, private eventService: EventService, private userService: UserService,
                public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) {}

    ngOnInit() {
        this.userService.getCurrentUser().then((user: User) => { this.initForm(user); });
        this.eventService.getSports().then((sports: Sport[]) => this.sports = sports);
    }

    initForm(user: User) {
        this.user = user;
        this.userForm = new FormGroup({
            firstName: new FormControl(user.firstname, Validators.required),
            lastName: new FormControl(user.lastname, Validators.required),
            email: new FormControl(user.email, [Validators.required, CustomValidators.email]),
            birth: new FormControl(user.birth, [
                Validators.required,
                ValidateDateFormat,
                CustomValidators.maxDate(moment().format())]),
            gender: new FormControl(user.gender, Validators.required),
            registerAddress: new FormGroup({
                postalCode: new FormControl(user.address.postal_code, [
                    Validators.required,
                    Validators.pattern(/^[1-9][0-9]{3}(?!sa|sd|ss)[a-z]{2}$/i),
                    Validators.maxLength(6)]),
                number: new FormControl(user.address.number, [Validators.required, CustomValidators.digits, Validators.maxLength(4)]),
                suffix: new FormControl(user.address.suffix ? user.address.suffix : null),
                city: new FormControl({ value: user.address.city, disabled: true}),
                street: new FormControl({ value: user.address.street, disabled: true})
            }),
            favorite_sports: new FormControl(user.favorite_sports ? user.favorite_sports : null),
            biography: new FormControl(user.biography ? user.biography : null)
        });
    }

    getAddress() {
        this.addressLoading = true;
        this.requestAddress();
    }

    requestAddress() {
        const values = this.userForm.value.registerAddress;
        this.addressSub = this.addressService.getAddress(values.postalCode, values.number, values.suffix).subscribe((res: Address) => {
            this.addressLoading = false;
            this.user.address = res;
            console.log(res);
        }, (err: HttpErrorResponse) => {
            this.userForm.get('registerAddress.city').patchValue(null);
            this.userForm.get('registerAddress.street').patchValue(null);
            this.user.address.city = null;
            this.user.address.street = null;
            this.addressLoading = false;
            this.userForm.get('registerAddress').setErrors({noAddress: true});
        });
    }

    updateUser() {
        const form = this.userForm.value;
        const userObject: User = {
            email: form.email,
            password: form.password,
            firstname: form.firstName,
            lastname: form.lastName,
            birth: moment(form.birth).toDate(),
            gender: form.gender,
            address: {
                street: this.user.address.street,
                number: this.user.address.number,
                suffix: this.user.address.suffix ? this.user.address.suffix : null,
                postal_code: this.user.address.postal_code,
                city: this.user.address.city,
                state: this.user.address.state,
                geometry: {
                    coordinates: this.user.address.coordinates,
                }
            },
            favorite_sports: form.favorite_sports,
            biography: form.biography
        };

        this.userService.updateUser(userObject).then((res) => {
            this.router.navigate(['/profile']);
        }).catch((err) => console.log(err));
    }

    openDialog() {
        const dialogRef = this.dialog.open(UserDialogComponent, {width: `${this.getDialogWidth()}vw`});

        this.dialogSub = dialogRef.afterClosed().subscribe(result => {
            if (result.passwordChanged) {
                this.snackBar.open('Wachtwoord gewijzigd!', 'Sluiten', { duration: 2000 });
            }
        });
    }

    ngOnDestroy() {
        if (this.dialogSub) { this.dialogSub.unsubscribe(); }
        if (this.addressSub) { this.addressSub.unsubscribe(); }
    }

    private getDialogWidth(): number {
        const screenwidth = window.screen.width;

        if (screenwidth <= 600) {
            return 90;
        } else if (screenwidth <= 992) {
            return 80;
        } else if (screenwidth <= 1200) {
            return 50;
        } else {
            return 30;
        }
    }
}
