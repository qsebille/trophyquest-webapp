import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeGameCardComponent} from './home-game-card.component';
import {Game} from '../../core/models/dto/game';

describe('HomeGameCardComponent', () => {
    let component: HomeGameCardComponent;
    let fixture: ComponentFixture<HomeGameCardComponent>;

    const gameMock: Game = {
        id: '001',
        title: 'Game 1',
        imageUrl: 'game.png'
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeGameCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeGameCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('game', gameMock);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
