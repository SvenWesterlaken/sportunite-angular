import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../other/auth.guard';
import {UserComponent} from '../components/user/user.component';
import {UserDetailComponent} from '../components/user/user-detail/user-detail.component';
import {UserEditComponent} from '../components/user/user-edit/user-edit.component';
import {UserListComponent} from "../components/user/user-list/user-list.component";
import {UserListItemDetailComponent} from "../components/user/user-list/user-list-item/user-list-item-detail/user-list-item-detail.component";

const routes = [
    { path: 'profile', component: UserComponent, canActivate: [AuthGuard], children: [
        { path: '', component: UserDetailComponent },
        { path: 'edit', component: UserEditComponent }
    ]},
    {path: 'users', component: UserComponent, canActivate: [AuthGuard], children: [
        { path: '', component: UserListComponent },
        { path: ':id', component: UserListItemDetailComponent }
    ]},
    {path: 'friends', component: UserComponent, canActivate: [AuthGuard], children: [
        { path: '', component: UserListComponent },
        { path: ':id', component: UserListItemDetailComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {}
