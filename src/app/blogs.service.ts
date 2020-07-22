import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// @Injectable({
//   providedIn: 'root'
// })
// export class BlogsService {

//   constructor() { }
// }

@Injectable()
export class Blogs {

  data: any;

  constructor(public http: Http, private httpClient: HttpClient) {
    this.data = null;
  }

  getBlogs(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/api/blogs')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  createBlog(blog){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/api/blogs', JSON.stringify(blog), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });

  }

  deleteBlog(id){

    this.http.delete('http://localhost:8080/api/blogs/' + id).subscribe((res) => {
      console.log(res.json());
    });    

  }

}