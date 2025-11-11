import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = 'Ocorreu um erro inesperado.';

      if (error.status === 0) {
        errorMsg = 'Não foi possível conectar ao servidor. Entre em contato com o administrador.';
      } else if (error.status === 401) {
        errorMsg = 'Você não está autorizado. Faça login novamente.';
      } else if (error.status === 404) {
        errorMsg = 'Recurso não encontrado.';
      } else if (error.status === 500) {
        errorMsg = 'Erro interno no servidor.';
      } else if (error.error?.message) {
        errorMsg = error.error.message;
      }

      toastr.error(errorMsg, 'Erro', { timeOut: 4000 });
      return throwError(() => error);
    })
  );
};
