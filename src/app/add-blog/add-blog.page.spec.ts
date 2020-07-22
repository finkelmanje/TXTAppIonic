import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBlogPage } from './add-blog.page';

describe('AddBlogPage', () => {
  let component: AddBlogPage;
  let fixture: ComponentFixture<AddBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
