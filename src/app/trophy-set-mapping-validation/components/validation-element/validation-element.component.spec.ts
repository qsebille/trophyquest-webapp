import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidationElementComponent} from './validation-element.component';

describe('ValidationElementComponent', () => {
    let component: ValidationElementComponent;
    let fixture: ComponentFixture<ValidationElementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ValidationElementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ValidationElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
