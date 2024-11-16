import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', loadComponent: () => import('./pages/profile/profile.component'), pathMatch: "full" },
    ]
  }
];

export default routes;
