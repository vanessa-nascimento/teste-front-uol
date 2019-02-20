import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListarCadastrosComponent } from './listar-cadastros/listar-cadastros.component';

const routes: Routes = [
  { path: '', component: ListarCadastrosComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:index', component: CadastroComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
