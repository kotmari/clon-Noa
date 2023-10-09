import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  { path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule) 
  },
  { path: 'contact',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule) 
  },
  { path: 'doctavka',
    loadChildren: () => import('./pages/doctavka/doctavka.module').then(m => m.DoctavkaModule) 
  },
  { path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule) 
  },
  { path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) 
  },
  { path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  { path: 'vacancies',
    loadChildren: () => import('./pages/vacancies/vacancies.module').then(m => m.VacanciesModule)
  },
  { path: 'oferta',
    loadChildren: () => import('./pages/oferta/oferta.module').then(m => m.OfertaModule)
  },
  { path: 'product/:category',
    loadChildren: () => import('./pages/product-category/product-category.module').then(m => m.ProductCategoryModule)
  },
  { path: 'thai-market/:market', 
  loadChildren: () => import('./pages/thai-market/thai-market/thai-market.module').then(m => m.ThaiMarketModule) 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
