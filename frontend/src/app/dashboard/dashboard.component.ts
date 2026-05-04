import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StudentService } from '../etudiants/student.service';
import { EcoleService } from '../ecole/ecole.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('admissionsChart', { static: false }) admissionsChartRef!: ElementRef;

  totalEtudiants = 0;
  totalEcoles = 0;
  totalFilieres = 0;
  private chart: Chart | null = null;

  constructor(
    private studentService: StudentService,
    private ecoleService: EcoleService,
  ) {}

  ngOnInit(): void { this.loadStats(); }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (this.admissionsChartRef) this.buildChart();
      }, 100);
    }
  }

  loadStats(): void {
    const ecoles = this.ecoleService.getAll();
    this.totalEtudiants = 800;
    this.totalEcoles = ecoles.length;
    this.totalFilieres = 4;
  }

  buildChart(): void {
    const ctx = this.admissionsChartRef.nativeElement.getContext('2d');
    if (this.chart) this.chart.destroy();
    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, 'rgba(37, 99, 235, 0.9)');
    gradientBlue.addColorStop(1, 'rgba(37, 99, 235, 0.2)');
    const gradientTeal = ctx.createLinearGradient(0, 0, 0, 300);
    gradientTeal.addColorStop(0, 'rgba(13, 148, 136, 0.9)');
    gradientTeal.addColorStop(1, 'rgba(13, 148, 136, 0.2)');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          { label: 'Admis', data: [3100, 3300, 3250, 3500, 3800], backgroundColor: gradientBlue, borderRadius: 8, barPercentage: 0.5, categoryPercentage: 0.65 },
          { label: 'Refusés', data: [1600, 1500, 1150, 1300, 1050], backgroundColor: gradientTeal, borderRadius: 8, barPercentage: 0.5, categoryPercentage: 0.65 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
    });
  }

}