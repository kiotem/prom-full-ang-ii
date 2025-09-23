// src/locale/es.ts
    import { DecimalPipe, JsonPipe, registerLocaleData } from '@angular/common';
    import { LOCALE_ID } from '@angular/core';
    import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
    import localeEs from '@angular/common/locales/es';

    registerLocaleData(localeEs, 'es');

    // Configura los formatos de fecha para el español
    export const MY_DATE_FORMATS: MatDateFormats = {
      parse: {
        dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
      },
      display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'long' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
      },
    };

    export const ES_LOCALE_PROVIDER = [
      { provide: LOCALE_ID, useValue: 'es-ES' }, // Configura el locale a español
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
      { provide: JsonPipe, useClass: JsonPipe },
      { provide: DecimalPipe, useValue: 'en-US' }
      ];

    export const US_LOCALE_PROVIDER = [
      { provide: LOCALE_ID, useValue: 'es-ES' }, // Configura el locale a inglés (Estados Unidos)
      { provide: JsonPipe, useClass: JsonPipe },
      { provide: DecimalPipe, useValue: 'en-US' }
    ];
