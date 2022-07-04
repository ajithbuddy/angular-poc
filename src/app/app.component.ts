import { Component, Input, ViewChild,ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import  * as pdfFonts from "pdfmake/build/vfs_fonts";  
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'file_upload';
  format = "";
  showUsers:boolean = true;
  selectedUser:any;

  @ViewChild('myForm', { static: true }) myForm: any;
  @ViewChild('content', { static: false }) content!: ElementRef;
  
  displayStyle = "none";
  users = [{name:"aji",age:25},{name:"suji",age:26},{name:"kavin",age:27}];
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  onSubmit(format:any) {
    this.download(format);
  }

  createDocFile(keyCode: number){
    // var textAreaLength = this.myForm.form.value.myText.length;
    // if(keyCode != 8){
    //   if(textAreaLength == 1){
    //     var file = new Blob([""], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    //     // openfile(file);
    //     saveAs(file, "downloadbytyping.docx"); //first method for download files     
    //   }
    // }
  }

  download(format:any) {
    // var FileSaver = require('file-saver'); //first method for download files
    var file = new Blob([this.myForm.form.value.myText], { type: format });
    // openfile(file);
    // saveAs(file, "hello world.docx"); //first method for download files
    const nav = (window.navigator as any);
    // console.log(nav.msSaveOrOpenBlob);
    if (nav.msSaveOrOpenBlob) {
      // console.log("in if part");
      nav.msSaveOrOpenBlob(file, this.myForm.form.value.filename);
    }
    else {
      // Others
      //second method
      var a = document.createElement('a'),
      url = URL.createObjectURL(file);
      a.href = url;
      a.download = "download";
      document.body.appendChild(a);
      a.click();
      // setTimeout(function () {
      //   document.body.removeChild(a);
      //   window.URL.revokeObjectURL(url);
      // }, 0);  
    }
  }

  generatePDF() {  
    let docDefinition = { 
      content: this.myForm.form.value.myText 
    };  
   
    pdfMake.createPdf(docDefinition).download();  
  }
}

// function openfile(file: Blob) {
//   throw new Error('Function not implemented.');
// }

