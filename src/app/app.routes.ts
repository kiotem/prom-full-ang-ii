import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { PropertiesListPage } from './pages/properties/properties-list-page/properties-list-page';
import { PropertiesCreatePage } from './pages/properties/properties-create-page/properties-create-page';
import { ClientsListPage } from './pages/clients/clients-list-page/clients-list-page';

export const routes: Routes = [
    {
        path: '',
        component: DashboardPage
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'dashboard',
        component: DashboardPage
    },
    {
        path: 'properties/list',
        component: PropertiesListPage
    },
    {
        path: 'properties/create',
        component: PropertiesCreatePage
    },
    {
        path: 'clients/list',
        component: ClientsListPage
    },
];
