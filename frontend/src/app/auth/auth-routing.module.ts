import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth/signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
