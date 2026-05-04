import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { StudentService } from '../etudiants/student.service';
import { EcoleService } from '../ecole/ecole.service';
import { NotificationService, Notification } from '../services/notification.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('admissionsChart', { static: false }) admissionsChartRef!: ElementRef;
  @ViewChild('enicarthageAdmissionsChart', { static: false }) enicarthageAdmissionsChartRef!: ElementRef;
  @ViewChild('filiereChart', { static: false }) filiereChartRef!: ElementRef;

  totalEtudiants = 0;
  totalEcoles = 0;
  totalFilieres = 0;
  private chart: Chart | null = null;
  eniChart!: Chart<'bar', number[], string>;
  pieChart!: Chart<'bar', number[], string>;

  // ── Notifications ──
  notifOpen = false;
  notifications: Notification[] = [];
  newTitre = '';
  newMessage = '';
  sending = false;
  private pollingInterval: any;

  constructor(
    private studentService: StudentService,
    private ecoleService: EcoleService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadNotifications();
    this.pollingInterval = setInterval(() => this.loadNotifications(), 30000);
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (this.admissionsChartRef) this.buildChart();
        this.buildEnicarthageChart();
        this.buildFiliereChart();
      }, 100);
    }
  }

  loadStats(): void {
    const ecoles = this.ecoleService.getAll();
    this.totalEtudiants = 800;
    this.totalEcoles = ecoles.length;
    this.totalFilieres = 4;
  }


  buildEnicarthageChart(): void {
    if (!this.enicarthageAdmissionsChartRef) return;
    const ctx = this.enicarthageAdmissionsChartRef.nativeElement.getContext('2d');
    if (this.eniChart) this.eniChart.destroy();

    const labels = ['GL', 'RSC', 'ESE'];
    const dataValues: number[] = [42, 35, 28];

    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, 'rgba(37, 99, 235, 0.9)');
    gradientBlue.addColorStop(1, 'rgba(37, 99, 235, 0.2)');

    this.eniChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Admis',
          data: dataValues,
          backgroundColor: gradientBlue,
          borderRadius: 8,
          barPercentage: 0.5,
          categoryPercentage: 0.65
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
    });
  }

  buildFiliereChart(): void {
    if (!this.filiereChartRef) return;
    const ctx = this.filiereChartRef.nativeElement.getContext('2d');
    if (this.pieChart) this.pieChart.destroy();

    const labels = ['GL', 'RSC', 'ESE'];
    const dataValues: number[] = [45, 32, 23];

    const gradientTeal = ctx.createLinearGradient(0, 0, 0, 300);
    gradientTeal.addColorStop(0, 'rgba(13, 148, 136, 0.9)');
    gradientTeal.addColorStop(1, 'rgba(13, 148, 136, 0.2)');

    this.pieChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Étudiants',
          data: dataValues,
          backgroundColor: gradientTeal,
          borderRadius: 8,
          barPercentage: 0.5,
          categoryPercentage: 0.65
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
    });
  }

  // ── Notifications ──
  loadNotifications(): void {
    this.notificationService.getAll().subscribe({
      next: (data) => this.notifications = data,
      error: (err) => console.error('Erreur chargement notifications', err)
    });
  }

  toggleNotif(): void {
    this.notifOpen = !this.notifOpen;
  }

  envoyerNotification(): void {
    if (!this.newTitre.trim() || !this.newMessage.trim()) return;
    this.sending = true;
    this.notificationService.creer({ titre: this.newTitre, message: this.newMessage }).subscribe({
      next: () => {
        this.newTitre = '';
        this.newMessage = '';
        this.sending = false;
        this.loadNotifications();
      },
      error: (err) => {
        console.error('Erreur envoi notification', err);
        this.sending = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return 'Il y a ' + diffMins + ' min';
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return 'Il y a ' + diffHours + 'h';
    return new Date(dateStr).toLocaleDateString('fr-FR');
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