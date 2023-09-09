import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {LoadingApiService} from "../services/loading-api";

@Injectable()
export class LoadingApiInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loadingApiService: LoadingApiService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loadingApiService.isLoading.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.requests.pop();
        if (this.requests.length === 0) {
          this.loadingApiService.isLoading.next(false);
        }
      })
    );
  }
}
