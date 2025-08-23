import { HttpHeaders } from "@angular/common/http";

export const API_URL: string = 'https://promotorasfull.b4a.app/functions/';

export const API_URL_WOMPI: string = 'https://product.wompi.co/v1/';
export const API_URL_WOMPI_TEST: string = 'https://sandbox.wompi.co/v1/';

export const httpOptions = {
      headers: new HttpHeaders({
        'X-Parse-Application-Id': 'qXvO3F6Xh4GB5uUtgOkq7ZgNrOFcAbTetBycIMiL',
        'X-Parse-REST-API-Key': 'vmyFAL7mCKiHm1IQLMbH3yO3Plbf59yl6JDpZHO1',
        'X-Parse-Revocable-Session': '1'
      })
    };

export const httpWompiOptions = 
{
    headers: new HttpHeaders({
      'authorization': 'Bearer prv_test_E7fLR5OpFVCbgHaZTNRDc1yEQvMmTScg'
    })
};