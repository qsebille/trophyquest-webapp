import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLinkActive,
        RouterLink,
        NgOptimizedImage,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
}
