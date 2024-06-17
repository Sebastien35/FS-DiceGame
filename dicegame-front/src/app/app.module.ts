import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ConnectComponent } from "./connect/connect.component";
import { GameOverComponent } from "./game-over/game-over.component";
import { GameComponent } from "./game/game.component";
import { RegisterComponent } from "./register/register.component";







@NgModule({
  declarations: [
    
  ],
  imports: [ BrowserModule, HttpClientModule],
  exports: []
})
export class AppModule {}