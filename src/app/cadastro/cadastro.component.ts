import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

    public idCliente: number;
    public cliente: Cliente;

    formCadastro: FormGroup = new FormGroup({
        _id: new FormControl(new Date().getTime()),
        name: new FormControl(null, [Validators.required]),
        cpf: new FormControl(null, [Validators.required]),
        contact: new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            tel: new FormControl(null, [Validators.required]),
        }),
        status: new FormControl('', [Validators.required])
    });

    // Adicioana dados por padrão na primeira abertura do App
    constructor(private router: Router, private route: ActivatedRoute) {
        route.params.subscribe((params) => {
            this.idCliente = params['index'];
            if (this.idCliente) {
                const clientes = JSON.parse(localStorage.getItem('clientes'));
                this.cliente = clientes[this.idCliente];

                this.formCadastro.patchValue(this.cliente);
            }
        });
    }

    ngOnInit() {
    }

    cadastro() {
        if (this.formCadastro.status === 'INVALID') {
            // Verificar se validação está funcionando
            // console.log('formulário está inválido');

            this.formCadastro.get('name').markAsTouched();
            this.formCadastro.get('cpf').markAsTouched();
            this.formCadastro.get('contact').get('email').markAsTouched();
            this.formCadastro.get('contact').get('tel').markAsTouched();
            this.formCadastro.get('status').markAsTouched();
        } else {

            const cliente = new Cliente(
                this.formCadastro.value.name,
                this.formCadastro.value.cpf,
                this.formCadastro.controls['contact'].value,
                this.formCadastro.value.status,
                );

                let clientes = JSON.parse(localStorage.getItem('clientes'));
                if (clientes === null || clientes.constructor !== Array) {
                    clientes = [];
                }
                // Verifica se id existe para inserção ou atualização de dados
                if (this.idCliente) {
                    clientes[this.idCliente] = cliente;
                } else {
                    clientes.push(cliente);
                }
                localStorage.setItem('clientes', JSON.stringify(clientes));

                // Mensagem de alerta
                if (this.idCliente) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Cadastro atualizado.',
                        type: 'success'
                    });
                } else {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Cadastro Adicionado.',
                        type: 'success'
                    });
                }
                // Redireciona para Listagem
                this.router.navigate(['/']);
            }
        }

}

class Cliente {
    constructor(
        public name: string,
        public cpf: string,
        public contact: Object,
        public status: string
    ) {}
        // public email: string,
        // public tel: string,
}
