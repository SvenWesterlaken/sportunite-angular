import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatCardModule, MatChipsModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {StepperModule} from './stepper.module';
import {DatepickerModule} from './datepicker.module';
import {UserDetailComponent} from '../components/user/user-detail/user-detail.component';
import {UserEditComponent} from '../components/user/user-edit/user-edit.component';
import {UserComponent} from '../components/user/user.component';
import {UserRoutingModule} from '../routes/user.routing.module';
import {UserService} from '../services/user.service';
import {UserDialogComponent} from '../components/user/user-edit/user-dialog/user-dialog.component';
import {MomentModule} from 'angular2-moment';
import {UserListComponent} from '../components/user/user-list/user-list.component';
import {UserListItemComponent} from '../components/user/user-list/user-list-item/user-list-item.component';
import {UserListItemDetailComponent} from '../components/user/user-list/user-list-item/user-list-item-detail/user-list-item-detail.component';
import {UserDetailDialogComponent} from '../components/user/user-detail/user-detail-dialog/user-detail-dialog.component';
import {UserSportEventListItemComponent} from '../components/user/user-list/user-list-item/user-list-item-detail/user-sportevent-list-item/sportevent-list-item.component';
import {FriendsListItemComponent} from '../components/user/user-list/friend-list-item/user-list-item.component';

@NgModule({
    entryComponents: [
        UserDialogComponent,
        UserDetailDialogComponent
    ],
    declarations: [
        UserComponent,
        UserEditComponent,
        UserDetailComponent,
        UserDialogComponent,
        UserListComponent,
        UserListItemComponent,
        UserListItemDetailComponent,
        UserDetailDialogComponent,
        UserSportEventListItemComponent,
        FriendsListItemComponent
    ],
    imports: [
        SharedModule,
        UserRoutingModule,
        ReactiveFormsModule,
        StepperModule,
        DatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MomentModule,
        MatChipsModule
    ],
    providers: [
        UserService
    ]

})
export class UserModule {
}
