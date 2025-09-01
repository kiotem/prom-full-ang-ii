export default class MenuItems {
  static items = [
    {
        "id": 'dashboard',
        "name": "Dashboard",
        "icon": "fa fa-th",
        "router": "dashboard",
        "is_action": true,
        "title": "Dashboard",
        "subitems":[]
    },
    {
        "id": 'properties',
        "name": "Propiedades",
        "icon": "fa fa-home",
        "router": "-",
        "title": "Propiedades",
        "is_action": false,
        "subitems":[
            {
                "id": 'properties_map',
                "name": "Mapa",
                "icon": "fa-solid fa-map",
                "router": "properties/map",
                "is_action": true,
                "title": "Propiedades / Mapa",
                "subitems":[]
            },
            {
                "id": 'properties_list',
                "name": "Listar",
                "icon": "fa-solid fa-clipboard-list",
                "router": "properties/list",
                "is_action": true,
                "title": "Propiedades / Listar",
                "subitems":[]
            },
            {
                "id": 'properties_cotizar',
                "name": "Separar",
                "icon": "fa-solid fa-house-laptop",
                "router": "properties/quote",
                "is_action": true,
                "title": "Propiedades / Cotizar",
                "subitems":[]
            },
            {
                "id": 'properties_create',
                "name": "Crear",
                "icon": "fa-solid fa-plus",
                "router": "properties/create",
                "title": "Propiedades / Crear",
                "is_action": true,
                "subitems":[]
            }
        ]
    },
    {
        "id": 'clients',
        "name": "Clientes",
        "icon": "fa fa-users",
        "router": "",
        "title": "",
        "is_action": false,
        "subitems":[
            {
                "id": 'clients_list',
                "name": "Listar",
                "icon": "fa-solid fa-clipboard-list",
                "router": "clients/list",
                "title": "Clientes / Listar",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'clients_create',
                "name": "Crear",
                "icon": "fa-solid fa-plus",
                "router": "clients/create",
                "title": "Clientes / Crear",
                "is_action": true,
                "subitems":[]
            }
        ]
    },
    {
        "id": 'cartera',
        "name": "Cartera",
        "icon": "fa fa-credit-card",
        "router": "-",
        "title": "-",
        "is_action": false,
        "subitems":[
            {
                "id": 'create_link',
                "name": "Links de pago",
                "icon": "fa-solid fa-clipboard-list",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_list',
                "name": "Registrar Pago",
                "icon": "fa-solid fa-clipboard-list",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Pagos registrados",
                "icon": "fa-solid fa-plus",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Pagos Pendientes",
                "icon": "fa-solid fa-plus",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Pagos a terceros",
                "icon": "fa-solid fa-plus",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Liquidar",
                "icon": "fa-solid fa-plus",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[]
            }
        ]
    },
    {
        "id": 'reports',
        "name": "Reportes",
        "icon": "fa fa-bar-chart",
        "router": "-",
        "title": "-",
        "is_action": true,
        "subitems":[
            {
                "id": 'history',
                "name": "Proyectos",
                "icon": "fa-regular fa-route",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'vehicle_status',
                        "name": "Listar Todos",
                        "icon": "fa-regular fa-car",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'history',
                        "name": "Nuevos",
                        "icon": "fa-regular fa-clock",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'history',
                        "name": "Finalizados",
                        "icon": "fa-regular fa-clock",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'history',
                        "name": "En proyección",
                        "icon": "fa-regular fa-clock",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'vehicle_status',
                "name": "Propiedades",
                "icon": "fa-regular fa-car",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'vehicle_status',
                        "name": "Listar Todos",
                        "icon": "fa-regular fa-car",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'vehicle_status',
                        "name": "Disponibles",
                        "icon": "fa-regular fa-car",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'vehicle_status',
                        "name": "Liberados",
                        "icon": "fa-regular fa-car",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'vehicle_status',
                        "name": "Finalizados",
                        "icon": "fa-regular fa-car",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'maintenances_list',
                "name": "Cartera",
                "icon": "fa-regular fa-screwdriver-wrench",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'maintenances_add',
                        "name": "Al día",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'maintenances_add',
                        "name": "En mora",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'maintenances_add',
                        "name": "Pagos liquidados",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            }
        ]
    },
    {
        "id": 'settings',
        "name": "Ajustes",
        "icon": "fa fa-cogs",
        "router": "-",
        "title": "-",
        "is_action": true,
        "subitems":[
            {
                "id": 'settings_users',
                "name": "Usuarios",
                "icon": "fa-regular fa-clipboard-user",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'users_list',
                        "name": "Listar",
                        "icon": "fa-regular fa-address-card",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'users_add',
                        "name": "Crear",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'settings_agents',
                "name": "Agentes",
                "icon": "fa-regular fa-clipboard-user",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'agents_list',
                        "name": "Listar",
                        "icon": "fa-regular fa-address-card",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'agents_add',
                        "name": "Crear",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'projects',
                "name": "Proyectos",
                "icon": "fa-regular fa-building",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'project_list',
                        "name": "Listar",
                        "icon": "fa-regular fa-city",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'operation_add',
                        "name": "Crear",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'templates',
                "name": "Plantillas",
                "icon": "fa-regular fa-arrow-right-from-bracket",
                "router": "-",
                "title": "-",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'templates_list',
                        "name": "Whatsapp",
                        "icon": "fa-regular fa-arrow-right-from-bracket",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'templates_add',
                        "name": "Contratos",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'templates_add',
                        "name": "Promesas",
                        "icon": "fa-regular fa-plus",
                        "router": "-",
                        "title": "-",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'logout',
                "name": "Cerrar sesión",
                "icon": "fa-regular fa-arrow-right-from-bracket",
                "router": "logout",
                "title": "-",
                "is_action": true,
                "subitems":[]
            }
        ]
    }
  ];
}