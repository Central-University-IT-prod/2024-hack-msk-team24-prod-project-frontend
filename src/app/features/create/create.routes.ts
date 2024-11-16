import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: 'same', loadComponent: () => import('./pages/same/same.component'), pathMatch: "full" },
      { path: 'different', loadComponent: () => import('./pages/different/different.component'), pathMatch: "full" },
      { path: 'hard', loadComponent: () => import('./pages/hard/hard.component'), pathMatch: "full" },
    ]
  }
];

export default routes;
