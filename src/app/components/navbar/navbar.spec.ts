import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {RouterLink} from '@angular/router';

import {Navbar} from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, Navbar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Navbar);
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

  it('should link to the users page', () => {
    const usersLink = fixture.debugElement.query(By.css('.navbar-links a'));
    const routerLink = usersLink.injector.get(RouterLink);

    expect(usersLink.nativeElement.textContent.trim()).toBe('Utilisateurs');
    expect(routerLink.routerLink).toEqual('/users');
  });

  it('should display the logo with expected dimensions', () => {
    const logo: HTMLImageElement | null = fixture.nativeElement.querySelector('.navbar-logo');

    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('height')).toBe('32');
    expect(logo?.getAttribute('width')).toBe('32');
  });
});
