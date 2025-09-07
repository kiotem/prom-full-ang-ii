import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { PropertiesListPage } from './pages/properties/properties-list-page/properties-list-page';
import { PropertiesCreatePage } from './pages/properties/properties-create-page/properties-create-page';
import { ClientsListPage } from './pages/clients/clients-list-page/clients-list-page';
import { PropertiesMapPage } from './pages/properties/properties-map-page/properties-map-page';
import { ClientsCreatePage } from './pages/clients/clients-create-page/clients-create-page';
import { PropertiesQuotePage } from './pages/properties/properties-quote-page/properties-quote-page';
import { LinksListPage } from './pages/wallet/links/links-list-page/links-list-page';

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
        path: 'properties/map',
        component: PropertiesMapPage
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
        path: 'properties/quote',
        component: PropertiesQuotePage
    },
    {
        path: 'clients/list',
        component: ClientsListPage
    },
    {
        path: 'clients/create',
        component: ClientsCreatePage
    },
    {
        path: 'links/list',
        component: LinksListPage
    },
    {
        path: 'links/create',
        component: LinksListPage
    }
];
