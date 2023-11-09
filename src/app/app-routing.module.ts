import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { content } from "./shared/routes/routes";

// Guard
import { IsLoginGuard } from "./shared/guard/is-login.guard";
import { IsNotLoginGuard } from "./shared/guard/is-not-login.guard";
import { ViewProductComponent } from "./components/admin/product/view-product/view-product.component";

// login
import { LoginComponent } from "./shared/Models/login/login.component";
 

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [IsNotLoginGuard],
    children: content,
  },
  {
    path: "content",
    component: ContentComponent,
    canActivate: [IsLoginGuard],
    children: content,
  },
  {
    path: '**',
    redirectTo:'/content/admin',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
        relativeLinkResolution: "legacy",
      }),
    ],
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
