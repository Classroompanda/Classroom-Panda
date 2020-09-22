import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard, IsLoggedInAuthGuard } from './shared/services/guard';

const routes: Routes = [
    { path: 'home', loadChildren: './layout/layout.module#LayoutModule' },
    { path: '', loadChildren: './auth/auth.module#AuthModule', canActivate: [IsLoggedInAuthGuard] },
    { path: '**', redirectTo: 'not-found' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
