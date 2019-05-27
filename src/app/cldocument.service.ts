import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CLDocument } from './cldocument';
import { validateConfig } from '@angular/router/src/config';

const httpOptions = {

}

@Injectable({
  providedIn: 'root'
})
export class CLDocumentService {

  constructor(private http: HttpClient) { }

  getCLDocuments(): Observable<CLDocument[]>{
    var ret = this.http.get<CLDocument[]>('http://localhost:3000/coverletter')
    .pipe(
      catchError(this.handleError<CLDocument[]>([]))
    );
    return ret;
  }


  downloadCLDocument(document: CLDocument){
    var id = document._id;
    console.log('In downloadCLDocument', id);
    var ret = this.http.post(`http://localhost:3000/coverletter/${id}/download`, {filename: "tseting"}, {
      responseType: "blob",
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    
    );
    return ret;
  }

 

  // postCLDocument (document: CLDocument): Observable<CLDocument>{
  //   var ret = this.http.post<CLDocument>('http://localhost:3000/coverletter', document, httpOptions);
  //   ret = ret.pipe( tap((newHero: CLDocument) => this.log(`added hero w/ id=${newHero.id}`)));
  //   return ret;
  // }

  postCLDocument (document: CLDocument): Observable<CLDocument> {
    var ret =  this.http.post<CLDocument>('http://localhost:3000/coverletter', document, httpOptions)
    .pipe(
      catchError(this.handleError<CLDocument>())
    );
    return ret;
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log('in handle error');
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
