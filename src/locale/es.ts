// src/locale/es.ts
    import { LOCALE_ID } from '@angular/core';
    import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

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
    ];