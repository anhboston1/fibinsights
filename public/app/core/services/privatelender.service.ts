/**
 * Created by phuongnguyen on 10/6/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IPrivateLender, IPagedResults } from '../../shared/interfaces';

@Injectable()
export class PrivateLenderService {

    baseUrl: string = '/api/privatelenders';

    constructor(private http: Http) {

    }

    getPrivateLenders() : Observable<IPrivateLender[]> {
        return this.http.get(this.baseUrl)
            .map((res: Response) => {
                let privatelenders = res.json();
                //this.calculateCustomersOrderTotal(customers);
                return privatelenders;
            })
            .catch(this.handleError);
    }

    getPrivateLendersPage(page: number, pageSize: number) : Observable<IPagedResults<IPrivateLender[]>> {
        return this.http.get(`${this.baseUrl}/page/${page}/${pageSize}`)
            .map((res: Response) => {
                //alert("Entering getPrivateLendersPage");
                //console.log("Entering getPrivateLendersPage()...");
                const totalRecords = +res.headers.get('x-inlinecount');
                //alert("Entering getPrivateLendersPage 2");
                console.log("Entering getPrivateLendersPage()...2");
                let privatelenders = res.json();
                //alert(PrivateLenders );
                //alert(totalRecords );
                //this.calculateCustomersOrderTotal(customers);
                return {
                    results: privatelenders,
                    totalRecords: totalRecords
                };
            })
            .catch(this.handleError);
    }

    getPrivateLender(id: string) : Observable<IPrivateLender> {
        return this.http.get(this.baseUrl + '/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    insertPrivateLender(privatelender: IPrivateLender) : Observable<IPrivateLender> {
        return this.http.post(this.baseUrl, privatelender)
            .map((res: Response) => {
                const data = res.json();
                console.log('insertCustomer status: ' + data.status);
                return data.privatelender;
            })
            .catch(this.handleError);
    }

    updatePrivateLender(privatelender: IPrivateLender) : Observable<IPrivateLender> {
        return this.http.put(this.baseUrl + '/' + privatelender._id, privatelender)
            .map((res: Response) => {
                const data = res.json();
                console.log('updatePrivateLender status: ' + data.status);
                return data.cashbuyer;
            })
            .catch(this.handleError);
    }

    deletePrivateLender(id: string) : Observable<boolean> {
        return this.http.delete(this.baseUrl + '/' + id)
            .map((res: Response) => res.json().status)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch(err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}

