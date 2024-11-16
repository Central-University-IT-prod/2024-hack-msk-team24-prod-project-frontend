import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', loadComponent: () => import('./pages/main/main.component'), pathMatch: "full" },
      { path: 'groups', loadComponent: () => import('./pages/groups/groups.component'), pathMatch: "full" },
      { path: 'group/:groupId', loadChildren: () => import('./pages/group/group.routes') },
      { path: 'create', loadChildren: () => import("../create/create.routes") },
    ]
  }
];

export default routes;
