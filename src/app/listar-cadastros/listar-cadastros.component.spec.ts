import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCadastrosComponent } from './listar-cadastros.component';

describe('ListarCadastrosComponent', () => {
    let component: ListarCadastrosComponent;
    let fixture: ComponentFixture<ListarCadastrosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListarCadastrosComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListarCadastrosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
