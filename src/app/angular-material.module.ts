import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from "@angular/common/http";

@NgModule({

    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        HttpClientModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class AngularMaterialModule {



}