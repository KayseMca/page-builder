import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-typography',
  templateUrl: './side-typography.component.html',
  styleUrls: ['./side-typography.component.css']
})
export class SideTypographyComponent implements OnInit {

  list = [1,3]
  constructor() { }

  ngOnInit(): void {
  }

}
