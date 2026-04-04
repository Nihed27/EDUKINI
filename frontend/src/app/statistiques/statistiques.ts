import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface StatCard {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
  trend?: number;
}

interface Demande {
  mois: string;
  total: number;
  acceptees: number;
  refusees: number;
  enAttente: number;
}

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistiques.html',
  styleUrls: ['./statistiques.css'],
})
export class StatistiquesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('filiereChart') filiereChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('specialiteChart') specialiteChartRef!: ElementRef<HTMLCanvasElement>;

  private charts: any[] = [];

  selectedPeriode = 'mois';
  selectedFiliere = 'all';
  selectedNiveau = 'all';
  selectedType = 'all';

  periodes = [
    { value: 'jour', label: 'Par jour' },
    { value: 'mois', label: 'Par mois' },
    { value: 'annee', label: 'Par année' },
  ];

  filieres = [
    { value: 'all', label: 'Toutes les filières' },
    { value: 'gi', label: 'Génie Informatique' },
    { value: 'meca', label: 'Mécatronique' },
    { value: 'indus', label: 'Industriel' },
    { value: 'info', label: 'Infotronique' },
  ];

  niveaux = [
    { value: 'all', label: 'Tous les niveaux' },
    { value: '1', label: '1ère année' },
    { value: '2', label: '2ème année' },
    { value: '3', label: '3ème année' },
  ];

  types = [
    { value: 'all', label: 'Tous les types' },
    { value: 'attestation', label: 'Attestation' },
    { value: 'releve', label: 'Relevé de notes' },
    { value: 'stage', label: 'Attestation de stage' },
    { value: 'bourse', label: 'Demande de bourse' },
  ];

  statCards: StatCard[] = [
    { label: 'Total étudiants', value: 847, icon: '👥', colorClass: 'card-blue', trend: 5.2 },
    { label: 'Total demandes', value: 312, icon: '📄', colorClass: 'card-purple', trend: 12.1 },
    { label: 'Acceptées', value: 198, icon: '✅', colorClass: 'card-green', trend: 8.4 },
    { label: 'Refusées', value: 47, icon: '❌', colorClass: 'card-red', trend: -3.1 },
    { label: 'En attente', value: 67, icon: '⏳', colorClass: 'card-yellow', trend: 2.0 },
  ];

  recommendations = [
    { label: 'Génie Informatique', count: 289, pct: 78 },
    { label: 'Infotronique', count: 121, pct: 52 },
    { label: 'Mécatronique', count: 98, pct: 42 },
    { label: 'Industriel', count: 74, pct: 32 },
  ];

  tauxSatisfaction = 84;

  correlations = [
    { filiere: 'Génie Informatique', moyenne: 14.2, taux: 91 },
    { filiere: 'Infotronique', moyenne: 13.8, taux: 85 },
    { filiere: 'Mécatronique', moyenne: 13.1, taux: 79 },
    { filiere: 'Industriel', moyenne: 12.6, taux: 72 },
  ];

  predictions = [
    { filiere: 'Génie Informatique', score: 94, trend: 'hausse' },
    { filiere: 'Infotronique', score: 71, trend: 'stable' },
    { filiere: 'Mécatronique', score: 58, trend: 'stable' },
    { filiere: 'Industriel', score: 42, trend: 'baisse' },
  ];

  private demandesData: Demande[] = [
    { mois: 'Sep', total: 18, acceptees: 12, refusees: 3, enAttente: 3 },
    { mois: 'Oct', total: 24, acceptees: 16, refusees: 4, enAttente: 4 },
    { mois: 'Nov', total: 31, acceptees: 20, refusees: 5, enAttente: 6 },
    { mois: 'Déc', total: 22, acceptees: 14, refusees: 4, enAttente: 4 },
    { mois: 'Jan', total: 45, acceptees: 30, refusees: 8, enAttente: 7 },
    { mois: 'Fév', total: 38, acceptees: 25, refusees: 6, enAttente: 7 },
    { mois: 'Mar', total: 52, acceptees: 35, refusees: 9, enAttente: 8 },
    { mois: 'Avr', total: 41, acceptees: 27, refusees: 7, enAttente: 7 },
    { mois: 'Mai', total: 29, acceptees: 19, refusees: 5, enAttente: 5 },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.initCharts(), 100);
    }
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }

  private initCharts(): void {
    this.createBarChart();
    this.createPieChart();
    this.createLineChart();
    this.createFiliereChart();
    this.createSpecialiteChart();
  }

  private createBarChart(): void {
    const ctx = this.barChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.demandesData.map(d => d.mois),
        datasets: [
          { label: 'Acceptées', data: this.demandesData.map(d => d.acceptees), backgroundColor: '#16a34a', borderRadius: 6, barPercentage: 0.6 },
          { label: 'Refusées', data: this.demandesData.map(d => d.refusees), backgroundColor: '#dc2626', borderRadius: 6, barPercentage: 0.6 },
          { label: 'En attente', data: this.demandesData.map(d => d.enAttente), backgroundColor: '#d97706', borderRadius: 6, barPercentage: 0.6 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 12 } } },
          y: { grid: { color: '#f3f4f6' }, ticks: { color: '#6b7280', font: { size: 12 } } },
        },
      },
    });
    this.charts.push(chart);
  }

  private createPieChart(): void {
    const ctx = this.pieChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Attestation scolarité', 'Relevé de notes', 'Attestation stage', 'Demande bourse'],
        datasets: [{
          data: [38, 27, 21, 14],
          backgroundColor: ['#2563eb', '#7c3aed', '#059669', '#d97706'],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: { legend: { display: false } },
      } as any,
    });
    this.charts.push(chart);
  }

  private createLineChart(): void {
    const ctx = this.lineChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.demandesData.map(d => d.mois),
        datasets: [{
          label: 'Total demandes',
          data: this.demandesData.map(d => d.total),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2563eb',
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 12 } } },
          y: { grid: { color: '#f3f4f6' }, ticks: { color: '#6b7280', font: { size: 12 } } },
        },
      },
    });
    this.charts.push(chart);
  }

  private createFiliereChart(): void {
    const ctx = this.filiereChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Génie Info.', 'Infotronique', 'Mécatronique', 'Industriel'],
        datasets: [{
          label: 'Étudiants',
          data: [312, 218, 187, 130],
          backgroundColor: ['#2563eb', '#7c3aed', '#059669', '#d97706'],
          borderRadius: 8,
          barPercentage: 0.55,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: '#f3f4f6' }, ticks: { color: '#6b7280' } },
          y: { grid: { display: false }, ticks: { color: '#374151', font: { size: 12 } } },
        },
      } as any,
    });
    this.charts.push(chart);
  }

  private createSpecialiteChart(): void {
    const ctx = this.specialiteChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['IA & Data', 'Réseaux', 'Robotique', 'Automatique', 'Systèmes Emb.', 'IoT'],
        datasets: [{
          data: [145, 98, 112, 87, 134, 84],
          backgroundColor: [
            'rgba(37,99,235,0.75)', 'rgba(124,58,237,0.75)', 'rgba(5,150,105,0.75)',
            'rgba(217,119,6,0.75)', 'rgba(220,38,38,0.75)', 'rgba(14,165,233,0.75)',
          ],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: { ticks: { display: false }, grid: { color: '#e5e7eb' } },
        },
      } as any,
    });
    this.charts.push(chart);
  }

  onFilterChange(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    if (typeof window !== 'undefined') {
      setTimeout(() => this.initCharts(), 50);
    }
  }

  exportPDF(): void { window.print(); }
  exportExcel(): void { alert('Export Excel en cours de génération...'); }
  exportReport(): void { alert('Rapport automatique généré.'); }

  getTrendIcon(trend: number): string { return trend >= 0 ? '↑' : '↓'; }
  getTrendClass(trend: number): string { return trend >= 0 ? 'trend-up' : 'trend-down'; }

  getPredictionClass(trend: string): string {
    if (trend === 'hausse') return 'pred-up';
    if (trend === 'baisse') return 'pred-down';
    return 'pred-stable';
  }

  getPredictionLabel(trend: string): string {
    if (trend === 'hausse') return '↑ Hausse';
    if (trend === 'baisse') return '↓ Baisse';
    return '→ Stable';
  }
}