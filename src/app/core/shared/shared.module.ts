import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import {HighlightDirective} from "./services/highlight.directive";
import {AutoFocusDirective} from "./services/auto-focus.directive";


@NgModule({
  declarations: [
    SharedComponent,
    HighlightDirective,
    AutoFocusDirective,
  ],
  exports: [
    HighlightDirective,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
