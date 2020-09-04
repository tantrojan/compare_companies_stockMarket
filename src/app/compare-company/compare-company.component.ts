import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.css']
})

export class CompareCompanyComponent implements OnInit {

  constructor(private http:HttpClient) { }

  //plot 1
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };  
  public lineChartLabels = [];
  public lineChartType = 'line';
  public lineChartLegend = true;  
  public lineChartData = [
    {data: <any>[], label: 'Company 1'}
  ];

  //plot 2
  public lineChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true
  };  
  public lineChartLabels2 = [];
  public lineChartType2 = 'line';
  public lineChartLegend2 = true;  
  public lineChartData2 = [
    {data: [], label: 'Company 2'}
  ];


  companies: any;
  stockExchanges: any;

  companyForm1 = new FormGroup({
    companySelect1: new FormControl('', [Validators.required  ]),
    stockExchangeSelect1 :new FormControl('' , [Validators.required  ] ),
  });

  companyForm2 = new FormGroup({
    companySelect2: new FormControl('' , [Validators.required  ] ),
    stockExchangeSelect2 :new FormControl('' , [Validators.required  ] ),
  });

  dateForm = new FormGroup({
    fromDate: new FormControl('' , [Validators.required  ] ),
    toDate :new FormControl('' , [Validators.required  ] ),
  });

  ngOnInit(): void {
    
    let resp = this.http.get("http://localhost:8080/getcompany");
    resp.subscribe((data)=>this.companies=data);

    let resp2 = this.http.get("http://localhost:3795/stockexchange/getstockexchangelist");
    resp2.subscribe((data)=>this.stockExchanges=data);
    
  }

  getStocks(): void {

    this.lineChartData[0].data = [];
    this.lineChartLabels = [];

    this.lineChartData2[0].data = [];
    this.lineChartLabels2 = [];

    let companySelect1 = this.companyForm1.get('companySelect1').value;
    let stockExchangeSelect1 = this.companyForm1.get('stockExchangeSelect1').value;

    let companySelect2 = this.companyForm2.get('companySelect2').value;
    let stockExchangeSelect2 = this.companyForm2.get('stockExchangeSelect2').value;
    
    let fromDate = this.dateForm.get('fromDate').value;
    let toDate = this.dateForm.get('toDate').value;

    // console.log(companySelect1);
    // console.log(stockExchangeSelect1);
    // console.log(companySelect2);
    // console.log(stockExchangeSelect2);
    // console.log(fromDate);
    // console.log(toDate);

    let company1 = {
      id: this.companies.filter((company)=>{
        return company.company_name == companySelect1;
      })[0].company_id,
      exchange: this.stockExchanges.filter((stockExchange)=>{
        return stockExchange.brief == stockExchangeSelect1;
      })[0].exchangeId,
      stockprices: <any>[]
    }

    let company2 = {
      id: this.companies.filter((company)=>{
        return company.company_name == companySelect2;
      })[0].company_id,
      exchange: this.stockExchanges.filter((stockExchange)=>{
        return stockExchange.brief == stockExchangeSelect2;
      })[0].exchangeId,
      stockprices: <any>[]
    }
    

    let resp = this.http.get("http://localhost:8080/getstockprice/"+company1.id+"/"+fromDate+"/"+toDate+"/"+company1.exchange);

    resp.subscribe((data)=>
    {
      company1.stockprices = data;
      console.log(company1);

      let resp2 = this.http.get("http://localhost:8080/getstockprice/"+company2.id+"/"+fromDate+"/"+toDate+"/"+company2.exchange);

      resp2.subscribe((data)=>
      {
        company2.stockprices = data;
        console.log(company2)

        
        for(let s of company1.stockprices){
          this.lineChartLabels.push(s.date);
          this.lineChartData[0].data.push(s.price);
        }

        for(let s of company2.stockprices){
          this.lineChartLabels2.push(s.date);
          this.lineChartData2[0].data.push(s.price);
        }

        console.log(this.lineChartLabels);
        console.log(this.lineChartData);

      });
    });

  }

}
