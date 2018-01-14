import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../other/auth.guard';
import {UserComponent} from '../components/user/user.component';
import {UserDetailComponent} from '../components/user/user-detail/user-detail.component';
import {UserEditComponent} from '../components/user/user-edit/user-edit.component';

const routes = [
    { path: 'profile', component: UserComponent, canActivate: [AuthGuard], children: [
        { path: '', component: UserDetailComponent },
        { path: 'edit', component: UserEditComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {}
