import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {   path: 'registration',
        loadComponent: () => import('./registration/registration.component').then(m => m.RegistrationComponent)
    },
    {   path: 'forgot-password',
        loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent)
    },
    {   path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    },
    {   path: 'dashboard',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {   path: 'privacy-statement',
        loadComponent: () => import('./privacy-statement/privacy-statement.component').then(m => m.PrivacyStatementComponent)
    },
    {   path: 'end-user-agreement',
        loadComponent: () => import('./end-user-agreement/end-user-agreement.component').then(m => m.EndUserAgreementComponent)
    },
    { 
        path: '404',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
      },
      {
        path: '**',
        redirectTo: '/404'
      },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
