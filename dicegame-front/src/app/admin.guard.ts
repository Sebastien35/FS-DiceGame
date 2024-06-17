import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserServiceService } from "./services/user-service.service";
import { tap } from "rxjs";

export const AdminGuard = () => {
    const auth = inject(UserServiceService);
    const router = inject(Router);

    if(auth.isUserAuthenticated() && auth.hasRole('ADMIN')){
        return true;
    } else {
        router.navigateByUrl('/error?403');
    } 
    

    

    return true;

    
}