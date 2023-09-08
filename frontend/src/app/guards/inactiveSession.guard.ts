import {CanActivateFn, Router, UrlTree} from "@angular/router";
import {inject} from "@angular/core";

export function inactiveSessionGuard(): CanActivateFn {
  return () => {
    let response: boolean | UrlTree = true;

    const token: string | null = sessionStorage.getItem("token");
    const session: boolean = !!token;
    const router: Router = inject(Router);

    if (session) {
      response = router.createUrlTree(["/"]);
    }

    return response;
  };
}
