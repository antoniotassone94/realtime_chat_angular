import {inject} from "@angular/core";
import {CanActivateFn} from "@angular/router";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  return authService.isLogged();
};
