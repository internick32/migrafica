import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';



@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  public barChartType: ChartType = 'bar';
 
  public barChartData: ChartDataSets[] = [
      { data: [0, 0, 0, 0], label: 'Ventas' }
    ];
  
  
  constructor( private http: HttpClient, private wsService:WebsocketService ) { }

  ngOnInit() {
    this.getData();  
    this.escucharSocket();
  }

  getData(){
    this.http.get('http://localhost:5000/grafica')
    .subscribe( (data:any) => this.barChartData = data);
  }

  escucharSocket(){
    this.wsService.listen('cambio-grafica').subscribe( (data:any) => {
      console.log('socket', data);
      this.barChartData = data;
    });
  }

}
