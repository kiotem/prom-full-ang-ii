export default class MenuItems {
  static items = [
    {
        "id": 'dashboard',
        "name": "Dashboard",
        "icon": "fa fa-th",
        "url": "dashboard.php",
        "is_action": true,
        "subitems":[]
    },
    {
        "id": 'properties',
        "name": "Propiedades",
        "icon": "fa fa-home",
        "url": "vehicles_add.php",
        "is_action": true,
        "subitems":[
            {
                "id": 'properties_list',
                "name": "Listar",
                "icon": "fa-solid fa-clipboard-list",
                "url": "vehicles.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'properties_add',
                "name": "Crear",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'properties_separate',
                "name": "Separar",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            }
        ]
    },
    {
        "id": 'clients',
        "name": "Clientes",
        "icon": "fa fa-users",
        "url": "vehicles_edit.php",
        "is_action": true,
        "subitems":[
            {
                "id": 'clients_list',
                "name": "Listar",
                "icon": "fa-solid fa-clipboard-list",
                "url": "vehicles.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'clients_create',
                "name": "Crear",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            }
        ]
    },
    {
        "id": 'cartera',
        "name": "Cartera",
        "icon": "fa fa-credit-card",
        "url": "vehicles.php",
        "is_action": true,
        "subitems":[
            {
                "id": 'create_link',
                "name": "Links de pago",
                "icon": "fa-solid fa-clipboard-list",
                "url": "vehicles.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_list',
                "name": "Registrar Pago",
                "icon": "fa-solid fa-clipboard-list",
                "url": "vehicles.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Pagos registrados",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Pagos Pendientes",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Pagos a terceros",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            },
            {
                "id": 'vehicles_add',
                "name": "Liquidar",
                "icon": "fa-solid fa-plus",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            }
        ]
    },
    {
        "id": 'reports',
        "name": "Reportes",
        "icon": "fa fa-bar-chart",
        "url": "users.php",
        "is_action": true,
        "subitems":[
            {
                "id": 'history',
                "name": "Proyectos",
                "icon": "fa-regular fa-route",
                "url": "vehicles.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'vehicle_status',
                        "name": "Listar Todos",
                        "icon": "fa-regular fa-car",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'history',
                        "name": "Nuevos",
                        "icon": "fa-regular fa-clock",
                        "url": "vehicles.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'history',
                        "name": "Finalizados",
                        "icon": "fa-regular fa-clock",
                        "url": "vehicles.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'history',
                        "name": "En proyección",
                        "icon": "fa-regular fa-clock",
                        "url": "vehicles.php",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'vehicle_status',
                "name": "Propiedades",
                "icon": "fa-regular fa-car",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'vehicle_status',
                        "name": "Listar Todos",
                        "icon": "fa-regular fa-car",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'vehicle_status',
                        "name": "Disponibles",
                        "icon": "fa-regular fa-car",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'vehicle_status',
                        "name": "Liberados",
                        "icon": "fa-regular fa-car",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'vehicle_status',
                        "name": "Finalizados",
                        "icon": "fa-regular fa-car",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'maintenances_list',
                "name": "Cartera",
                "icon": "fa-regular fa-screwdriver-wrench",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'maintenances_add',
                        "name": "Al día",
                        "icon": "fa-regular fa-plus",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'maintenances_add',
                        "name": "En mora",
                        "icon": "fa-regular fa-plus",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'maintenances_add',
                        "name": "Pagos liquidados",
                        "icon": "fa-regular fa-plus",
                        "url": "vehicles_add.php",
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
        "url": "settings.php",
        "is_action": true,
        "subitems":[
            {
                "id": 'settings_users',
                "name": "Usuarios",
                "icon": "fa-regular fa-clipboard-user",
                "url": "settings.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'users_list',
                        "name": "Listar",
                        "icon": "fa-regular fa-address-card",
                        "url": "devices.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'users_add',
                        "name": "Crear",
                        "icon": "fa-regular fa-plus",
                        "url": "devices_add.php",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'settings_agents',
                "name": "Agentes",
                "icon": "fa-regular fa-clipboard-user",
                "url": "settings.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'agents_list',
                        "name": "Listar",
                        "icon": "fa-regular fa-address-card",
                        "url": "devices.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'agents_add',
                        "name": "Crear",
                        "icon": "fa-regular fa-plus",
                        "url": "devices_add.php",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'projects',
                "name": "Proyectos",
                "icon": "fa-regular fa-building",
                "url": "settings.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'project_list',
                        "name": "Listar",
                        "icon": "fa-regular fa-city",
                        "url": "devices.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'operation_add',
                        "name": "Crear",
                        "icon": "fa-regular fa-plus",
                        "url": "devices_add.php",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'templates',
                "name": "Plantillas",
                "icon": "fa-regular fa-arrow-right-from-bracket",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[
                    {
                        "id": 'templates_list',
                        "name": "Whatsapp",
                        "icon": "fa-regular fa-arrow-right-from-bracket",
                        "url": "vehicles.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'templates_add',
                        "name": "Contratos",
                        "icon": "fa-regular fa-plus",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    },
                    {
                        "id": 'templates_add',
                        "name": "Promesas",
                        "icon": "fa-regular fa-plus",
                        "url": "vehicles_add.php",
                        "is_action": true,
                        "subitems":[]
                    }
                ]
            },
            {
                "id": 'logout',
                "name": "Cerrar sesión",
                "icon": "fa-regular fa-arrow-right-from-bracket",
                "url": "vehicles_add.php",
                "is_action": true,
                "subitems":[]
            }
        ]
    }
  ];
}