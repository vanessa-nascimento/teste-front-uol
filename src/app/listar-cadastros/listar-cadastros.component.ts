import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-listar-cadastros',
    templateUrl: './listar-cadastros.component.html',
    styleUrls: ['./listar-cadastros.component.scss']
})
export class ListarCadastrosComponent implements OnInit {

    private clientes;
    private statusClasses = {
        'Ativo': 'ativo',
        'Inativo': 'inativo',
        'Aguardando ativação': 'aguardando-ativacao',
        'Desativado': 'desativado',
    };
    constructor(private http: HttpClient) {
        this.clientes = JSON.parse(localStorage.getItem('clientes'));
        if (!this.clientes) {
            const customers = this.http.get('https://demo5283088.mockable.io/customers');
            customers.subscribe((res) => {
                localStorage.setItem('clientes', JSON.stringify(res['data']));
                this.clientes = JSON.parse(localStorage.getItem('clientes'));
            });
        }
    }

    ngOnInit() {
    }

}
