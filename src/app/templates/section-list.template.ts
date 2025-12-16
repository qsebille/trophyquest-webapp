import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[appSectionListHeader]'})
export class SectionListHeaderTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}

@Directive({selector: 'ng-template[appSectionListContent]'})
export class SectionListContentTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}