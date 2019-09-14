import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  datasList:Data[];
  dataObj=new Data();
  constructor(private router:Router,
    private dataService:DataService) { }

  ngOnInit() {

  }
  createDataInitiate(){
    return this.dataService.createData(this.dataObj).subscribe(data=>{
      console.log(data);
    })
  }


}
