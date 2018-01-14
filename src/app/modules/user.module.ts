import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {MatChipsModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule} from "@angular/material";
import {MatSelectModule, MatCardModule} from "@angular/material";
import {MatTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {StepperModule} from "./stepper.module";
import {DatepickerModule} from "./datepicker.module";
import {UserDetailComponent} from "../components/user/user-detail/user-detail.component";
import {UserEditComponent} from "../components/user/user-edit/user-edit.component";
import {UserComponent} from "../components/user/user.component";
import {UserRoutingModule} from "../routes/user.routing.module";
import {UserService} from "../services/user.service";
import {UserDialogComponent} from "../components/user/user-edit/user-dialog/user-dialog.component";
import {SuiModule} from 'ng2-semantic-ui';
import {MomentModule} from "angular2-moment";

@NgModule({
    entryComponents: [
        UserDialogComponent
    ],
    declarations: [
        UserComponent,
        UserEditComponent,
        UserDetailComponent,
        UserDialogComponent
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
