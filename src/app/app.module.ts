import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component'; 
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { provideHttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, GridComponent, CanvasRenderer]);
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
   
  ],
  imports: [
    AppComponent,
    LoginComponent,
    BrowserModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    DialogModule,
    ConfirmPopupModule,
    ToastModule,
    NgxEchartsModule.forRoot({ echarts }),
    NgxPaginationModule

  ],
  schemas: [NO_ERRORS_SCHEMA],  // Add this line

  providers: [MessageService,ConfirmationService],
  //bootstrap: [AppComponent]
})
export class AppModule {}
