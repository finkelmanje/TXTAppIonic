import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AddBlogPage } from '../add-blog/add-blog.page';
import { Blogs } from '../blogs.service';
import {OverlayEventDetail} from '@ionic/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  blogs: any[] = [];

  constructor(public nav: NavController, public blogService: Blogs, public modalCtrl: ModalController) {}
  ngOnInit() {
    this.blogService.getBlogs().then((data) => {
      console.log(data);
      this.blogs = data;
    });

  }

   async addBlog(){
    const modal: HTMLIonModalElement =
       await this.modalCtrl.create({
          component: AddBlogPage
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
         console.log('The result:', detail.data);
         this.blogs.push(detail.data);
        this.blogService.createBlog(detail.data);
       }
    });
    
    await modal.present();
    // let modal =  await this.modalCtrl.create({
    //   component: AddBlogPage 
    // });
    // const blog = modal.onDidDismiss();
    // this.blogs.push(blog);
    //  this.blogService.createBlog(blog)
    //  modal.present();

    // const blog = modal.onDidDismiss();
    //   if(blog){
    //     this.blogs.push(blog);
    //     this.blogService.createBlog(blog);        
    //   }

    // modal.present();

  }

  deleteBlog(blog){

    //Remove locally
      let index = this.blogs.indexOf(blog);

      if(index > -1){
        this.blogs.splice(index, 1);
      }   

    //Remove from database
    this.blogService.deleteBlog(blog._id);
  }
}
