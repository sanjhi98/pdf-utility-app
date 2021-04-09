import { Component,ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modal-app';
  blobUrl:URL;
  

  constructor(private modalService: NgbModal) {}

  openXl(content) {
    this.modalService.open(content, { size: 'xl',scrollable:true});
  }

  public fund:any= [{
    "name" : "Harry",
    "place": "London",
    "occupation":"Actor"
    },
    {
    "name" : "Tyler",
    "place": "California",
    "occupation":"Painter"
    },
    {
    "name" : "Rose",
    "place":"Melbourne",
    "occupation":"Singer"
    
    },
    {
    "name" : "Nora",
    "place":"Vancouver",
    "occupation":"Dancer"
    },
    ];

    
    
    col = ["NAME","PLACE","OCCUPATION"];
    rows;

  createPdf() {
    const doc = new jsPDF();
    this.rows=[];

    doc.setFontSize(18);
    doc.text('My PDF Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    let i=0;
    for(let key in this.fund){
      let t=this.fund[key];
      let temp=[t.name,t.place,t.occupation];
      this.rows.push(temp);
      i++;
  }
    //(doc as any).autoTable(this.col,this.rows);
    (doc as any).autoTable({
      styles:{font:'helvetica',fontStyle:'normal',fontSize:5},
     head: [this.col],
     body: this.rows
    })


    // Open PDF document in new tab
    //doc.output('dataurlnewwindow');
    //this.blobPDF= new Blob([doc.output('blob')],{type:'application/pdf'});
    //this.blobUrl= URL.createObjectURL(this.blobPDF);
    //var reader=new window.FileReader();
    this.blobUrl=doc.output('bloburl');
    doc.close();

    // Download PDF document  
    //doc.save('table.pdf');
  }
  callAll(content){
    this.openXl(content);
    this.createPdf();

  }

}
