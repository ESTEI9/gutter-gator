import { Routes } from '@angular/router';

export const routes: Routes = [
    //   {
    //     path: '',
    //     loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    //   },
    {
        path: '',
        loadComponent: () =>
            import('@app/features/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'article/:category/:workType/:subType',
        pathMatch: 'full',
        loadComponent: () => import('@app/features/article/article.component').then((m) => m.ArticleComponent)
    }
];
