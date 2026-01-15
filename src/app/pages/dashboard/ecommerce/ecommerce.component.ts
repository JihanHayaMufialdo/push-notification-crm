import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../../../shared/components/ecommerce/ecommerce-metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../../../shared/components/ecommerce/monthly-sales-chart/monthly-sales-chart.component';
import { RecentOrdersComponent } from '../../../shared/components/ecommerce/recent-orders/recent-orders.component';

@Component({
  selector: 'app-ecommerce',
  imports: [
    EcommerceMetricsComponent,
    MonthlySalesChartComponent,
    RecentOrdersComponent,
  ],
  templateUrl: './ecommerce.component.html',
})
export class EcommerceComponent {}
