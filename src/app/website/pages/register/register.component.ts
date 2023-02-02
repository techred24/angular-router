import { Component, OnInit } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit {

  constructor() { }

  ngOnInit(): void {
  }

  onExit() {
    const response = confirm('Component. Seguro que deseas salir?');
    return response;
  }

}
