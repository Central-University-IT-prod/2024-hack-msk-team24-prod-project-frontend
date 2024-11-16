import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', loadComponent: () => import('./pages/intro/intro.component'), pathMatch: "full" },
    ]
  }
];

export default routes;
