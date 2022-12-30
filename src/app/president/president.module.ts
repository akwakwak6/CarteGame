import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresidentRoutingModule } from './president-routing.module';
import { TableComponent } from './componants/table/table.component';
import { ShareModule } from '../share/share.module';
import { HandComponent } from './componants/hand/hand.component';
import { CardsCenterComponent } from './componants/cards-center/cards-center.component';
import { PlayerComponent } from './componants/player/player.component';


@NgModule({
    declarations: [
        TableComponent,
        HandComponent,
        CardsCenterComponent,
        PlayerComponent
    ],
    imports: [
        CommonModule,
        PresidentRoutingModule,
        ShareModule,
    ]
})
export class PresidentModule { }
