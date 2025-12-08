import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Collection} from '../../core/models/dto/collection';

@Component({
    selector: 'app-collection-summary',
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './collection-summary.component.html',
    styleUrl: './collection-summary.component.scss',
})
export class CollectionSummaryComponent {
    @Input({required: true}) collection: Collection | null = null;
}
