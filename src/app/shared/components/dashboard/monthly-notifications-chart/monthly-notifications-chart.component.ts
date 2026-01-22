
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexStroke, ApexLegend, ApexYAxis, ApexGrid, ApexFill, ApexTooltip } from 'ng-apexcharts';
import { MonthlyCount } from '../../../../services/notifications.service';

@Component({
  selector: 'app-monthly-notifications-chart',
  standalone: true,
  imports: [
    NgApexchartsModule,
],
  templateUrl: './monthly-notifications-chart.component.html'
})

export class MonthlyNotificationsChartComponent implements OnChanges {

  @Input() monthCount!: MonthlyCount;

  public series: ApexAxisChartSeries = [
    {
      name: 'Notification',
      data: [],
    },
  ];

  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 180,
    toolbar: { show: false },
  };

  public xaxis: ApexXAxis = {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
  };

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  };

  public dataLabels: ApexDataLabels = { enabled: false };
  public stroke: ApexStroke = {
    show: true,
    width: 4,
    colors: ['transparent'],
  };
  public legend: ApexLegend = {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Outfit',
  };
  public yaxis: ApexYAxis = { title: { text: undefined } };
  public grid: ApexGrid = { yaxis: { lines: { show: true } } };
  public fill: ApexFill = { opacity: 1 };
  public tooltip: ApexTooltip = {
    x: { show: false },
    y: { formatter: (val: number) => `${val}` },
  };
  public colors: string[] = ['#465fff'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthCount'] && this.monthCount?.data) {
      const monthlyData = Array.from({ length: 12 }, (_, index) =>
        this.monthCount.data[index + 1] ?? 0
      );

      this.series = [
        {
          ...this.series[0],
          name: `Sales ${this.monthCount.year}`,
          data: monthlyData,
        },
      ];
    }
  }
}
