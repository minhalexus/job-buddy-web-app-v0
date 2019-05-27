import { Component, OnInit } from '@angular/core';
import { CLDocumentService } from './cldocument.service';
import { CLDocument } from './cldocument';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'job-buddy-web-app';
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl(''),
    address: new FormControl('')
  });

  documents: CLDocument[];

  constructor(private cldocumentService: CLDocumentService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDocuments();
  }

  getDocuments(): void{
    this.cldocumentService.getCLDocuments().subscribe(documents => this.documents = documents);
  }

  updateProfile() {
    //this.profileForm.first.setValue('Nancy');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);

    this.cldocumentService.postCLDocument( this.profileForm.value as CLDocument ).subscribe(
      document => { this.documents.push(document); }
    );
    this.profileForm.reset();
  }


  download(document : CLDocument){
    this.cldocumentService.downloadCLDocument( document ).subscribe(
      data => {
        console.log(data);
        saveAs(data, document._id);
      }
    );
  }
  
  

}
