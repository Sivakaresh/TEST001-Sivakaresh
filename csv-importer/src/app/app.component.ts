import { Component, ViewChild  } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { CSVRecord } from './CSVModel';  
import { Data } from 'src/app/data.model';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csv-importer';
  csvContent: string;

  // datasList:Data[];
  // dataObj=new Data();

  constructor(private papa: Papa) {
    const csvData = '"Hello","World!","pen"';
    
    this.papa.parse(csvData,{
        complete: (result) => {
            console.log('Parsed: ', result);
        }
    });
}
onFileLoad(fileLoadedEvent) {
  const textFromFileLoaded = fileLoadedEvent.target.result;              
  this.csvContent = textFromFileLoaded;     
  alert(this.csvContent);
}

onFileSelect(input: HTMLInputElement) {

const files = input.files;
var content = this.csvContent;    
if (files && files.length) {

console.log("Filename: " + files[0].name);
console.log("Type: " + files[0].type);
console.log("Size: " + files[0].size + " bytes");


const fileToRead = files[0];

const fileReader = new FileReader();
fileReader.onload = this.onFileLoad;

// fileReader.readAsText(fileToLoad, "UTF-8");
}

}
// constructor(private router:Router,
//   private dataService:DataService) { }
// createDataInitiate(){
//   return this.dataService.createData(this.dataObj).subscribe(data=>{
//     console.log(data);
//   })
// }

  public records: any[] = [];  
  @ViewChild('csvReader',{static: true}) csvReader: any;  
  
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.region = curruntRecord[0].trim();  
        csvRecord.country = curruntRecord[1].trim();  
        csvRecord.itemType = curruntRecord[2].trim();  
         
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  


}
