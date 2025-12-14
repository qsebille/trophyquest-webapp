import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {NavbarComponent} from './navbar.component';
import {Component} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    @Component({selector: 'app-dummy-players', template: ''})
    class DummyPlayersComponent {
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
            providers: [
                provideRouter([
                    {path: 'players', component: DummyPlayersComponent},
                ]),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the application title', () => {
        const title = fixture.nativeElement.querySelector('.navbar-title');

        expect(title?.textContent?.trim()).toBe('TrophyQuest');
    });

    it('should link to the players page when clicking on link', fakeAsync(() => {
        const router = TestBed.inject(Router);
        const playersLink = fixture.debugElement.query(By.css('#navbar-players-link'));

        playersLink.triggerEventHandler('click', {button: 0});
        tick();

        expect(playersLink.nativeElement.textContent.trim()).toBe('Players');
        expect(router.url).toBe('/players');
    }));

});
