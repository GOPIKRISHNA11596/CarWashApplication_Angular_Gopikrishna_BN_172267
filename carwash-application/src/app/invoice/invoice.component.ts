import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceRequest} from '../service-request/service-request';
import { ServiceRequestService } from '../service-request/service-request.service';
import { ActivatedRoute, Router} from '@angular/Router';
// import * as jsPDF from 'jspdf';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { PdfMakeWrapper } from 'pdfmake-wrapper';
// import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  pageTitle: string = 'Invoice';
  serviceRequest: ServiceRequest = new ServiceRequest();
  errorMessage = '';

  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(private serviceRequestService: ServiceRequestService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const carid = this.route.snapshot.paramMap.get('id');
    const id = +carid;
    this.serviceRequestService.getServiceRequestById(id).subscribe({
      next : data => {
        this.serviceRequest = data;
        console.log(this.serviceRequest.amount);
      },
     error : err => this.errorMessage = err
    });
  }
  // downloadAsPDF(){
    // const data = document.getElementById('pdfTable');
    // html2canvas(data).then((canvas) => {
    //   // <canvas width="540" height="729" style="width: 360px; height: 486px;"></canvas>
    //   canvas.height = 600;
    //   console.log(canvas);
    //   var imgData = canvas.toDataURL('image/png');
    //   var doc = new jsPDF();
    //   var imgHeight = canvas.height * 208 / canvas.width;

    //   doc.addImage(imgData, 0, 0, 208, 150);
    //   doc.save('image.pdf');
    // });
  // }

  // downloadAsPDF(){
  //   const data = document.getElementById('pdfTable');
  //   html2canvas(data).then(canvas => {
  //   const contentDataURL = canvas.toDataURL('innerHTML');
  //   const pdf = new jsPDF('p', 'cm', 'a4', true);
  //   pdf.addHTML(data, function(){
  //     pdf.save('Filename.pdf');
  //   });
  //   // pdf.addImage(contentDataURL, 'innerHTML', 0, 0, 29.7, 0);
  //   });
  // }

/*
  downloadAsPDF(){
    //const pdfTable = document.getElementById('pdfTable').innerHTML;

    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.header('Car Care Service');
    pdf.footer('Car Care Service');
    pdf.watermark('Car Care Service');
    pdf.pageSize('A4');
    pdf.pageOrientation('portrait');
    pdf.pageMargins([ 40, 60, 40, 60 ]);
    pdf.add(this.pdfTable);
    pdf.permissions(this.serviceRequest.username, {
      printing: 'lowResolution', // 'highResolution'
      copying: false,
      modifying: false,
      annotating: true,
      fillingForms: true,
      documentAssembly: true,
      contentAccessibility: true
      });
    pdf.create().download();
  }*/

}


