import { Component, ViewChild  } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { CSVRecord } from './CSVModel';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csv-importer';
  csvContent: string;

  public csv={"first":"1","second":"2"};

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

//   constructor(){}
//     ngOnInit(){
//     }
//   onFileLoad(fileLoadedEvent) {
//     const textFromFileLoaded = fileLoadedEvent.target.result;              
//     this.csvContent = textFromFileLoaded;     
    
// }

// onFileSelect(input: HTMLInputElement) {

// const files = input.files;
// var content = this.csvContent;    
// if (files && files.length) {


//   const fileToRead = files[0];

//   const fileReader = new FileReader();
//   fileReader.onload = this.onFileLoad;

//   fileReader.readAsText(fileToRead, "UTF-8");
// }

// }

//   public app = angular.module('plunker', []);

// app.controller('MainCtrl', function($scope) {
//   $scope.title = 'Read CSV file with Angular';
// });

// app.directive('fileReader', function() {
//   return {
//     scope: {
//       fileReader:"="
//     },
//     link: function(scope, element) {
//       $(element).on('change', function(changeEvent) {
//         var files = changeEvent.target.files;
//         if (files.length) {
//           var r = new FileReader();
//           r.onload = function(e) {
//               var contents = e.target.result;
//               scope.$apply(function () {
//                 scope.fileReader = contents;
//                 scope.testing = contents;
//               });
//           };
          
//           r.readAsText(files[0]);
//         }
//       });
//     }
//   };
// });

}
