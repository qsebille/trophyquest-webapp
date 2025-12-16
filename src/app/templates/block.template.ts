import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[appBlockHeader]'})
export class BlockHeaderTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}

@Directive({selector: 'ng-template[appBlockContent]'})
export class BlockContentTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}