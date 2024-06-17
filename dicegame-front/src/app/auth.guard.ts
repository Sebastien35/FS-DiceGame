import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserServiceService } from "./services/user-service.service";
import { tap } from "rxjs";

export const AuthGuard = () => {
    const auth = inject(UserServiceService);
    const router = inject(Router);

    return auth.isUserAuthenticated();
      
    

    return true;

    
}