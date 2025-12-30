import {Component} from '@angular/core';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'tq-root',
    imports: [
        RouterOutlet,
        NavbarComponent,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
}
