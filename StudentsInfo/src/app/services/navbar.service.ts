import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  visible = new BehaviorSubject<boolean>(false);
  isDefaultDate = new BehaviorSubject<boolean>(true);

  constructor() {}
}
