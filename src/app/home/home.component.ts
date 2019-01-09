import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from '../app.service';
import {Item} from '../Item';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Observable<Item[]>;
  total: number = 0;
  length: number = 0;

  constructor(private httpService: HttpClient, private appService: AppService) {
    this.appService.getJSON().subscribe(data => {
      this.length++;
      this.items = data;
      this.length = data.length;
      console.log(data);
    });
  }


  ngOnInit() {
    this.totalPrice();
  }

  totalPrice() {
    this.total = 0;
    for (let i = 0; i < this.length; i++) {
      this.total += (this.items[i].price * this.items[i].quantity);
    }
    console.log(this.total);
  }


  add(pid) {
    console.log(pid);
    console.log(this.length);
    for (var i = 0; i < this.length; i++) {
      console.log(this.items[i].ID);
      if (this.items[i].ID === pid) {
        if (this.items[i].quantity < 3) {
          this.items[i].quantity += 1;
          console.log(this.items[i].quantity);
        }
      }
    }
    this.totalPrice();
    console.log(this.items);
  }

  del(pid) {
    console.log(pid);
    for (var i = 0; i < this.length; i++) {
      if (this.items[i].ID === pid) {
        this.items[i].quantity -= 1;
      }
    }
    this.totalPrice();
    console.log(this.items);
  }
}
