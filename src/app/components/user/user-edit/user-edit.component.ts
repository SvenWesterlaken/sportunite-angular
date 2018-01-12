import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng4-validators';
import * as moment from 'moment';
import {ValidateDateFormat} from '../../../other/custom.validator';
import {AddressService} from '../../../services/address.service';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Address} from '../../../models/address';
import {User} from "../../../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatSnackBar} from "@angular/material";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {EventService} from "../../../services/event.service";
import {Sport} from "../../../models/sport";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.pug',
    styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit, OnDestroy {

    private addressSub: Subscription;
    private userForm: FormGroup;
    private addressLoading = false;
    private user: User;
    private sports: Sport[];

    constructor(private addressService: AddressService, private eventService: EventService, private userService: UserService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.userService.getUser().then((user: User) => {
            this.initForm(user)
        });

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
                city: new FormControl(user.address.city),
                street: new FormControl(user.address.street)
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
            this.addressLoading = false;

            if (err.status === 404 && err.error.error === 'No address with this suffix') {
                this.userForm.get('registerAddress').setErrors({noAddress: true});
            } else if (err.status === 404 && err.error.error === 'No address found') {
                this.userForm.get('registerAddress').setErrors({noAddress: true});
            }
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
            console.log(res);
            this.snackBar.open("Gegevens opgeslagen!", "Sluiten", {
                duration: 2000
            })
        }), (err) => console.log(err);
    }

    openDialog() {
        let dialogRef = this.dialog.open(UserDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result.passwordChanged)
                this.snackBar.open("Wachtwoord gewijzigd!", "Sluiten", {
                    duration: 2000
                });
        });
    }

    ngOnDestroy() {
        this.addressSub.unsubscribe();
    }
}
