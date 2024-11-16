import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', loadComponent: () => import('./pages/group/group.component'), pathMatch: "full" },
      { path: 'bill/:billId', loadComponent: () => import('./pages/bill/bill.component'), pathMatch: "full" },
    ]
  }
];

export default routes;
