import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  selectedFile: File = null;

  // tslint:disable-next-line: typedef
  onFileSelected(event){
    console.log(event);
    this.selectedFile = (event.target.files[0] as File);
  }

  // tslint:disable-next-line: typedef
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name); // Sends file name
    // this.http.post('', fd).subscribe(res => {
    this.http.post('', this.selectedFile).subscribe(res => {  //Sends a binary data

      console.log(res);
    });

  }

}
