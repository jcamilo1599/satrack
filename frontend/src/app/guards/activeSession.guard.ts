import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";

export function activeSessionGuard(guardDestination: string): CanActivateFn {
  return () => {
    let response: boolean = false;

    const token: string | null = sessionStorage.getItem('token');
    const session: boolean = !!token;
    const router: Router = inject(Router);

    if (session) {
      response = true;
    }

    return response || router.navigateByUrl(guardDestination).then(undefined);
  };
}
