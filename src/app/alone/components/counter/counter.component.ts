import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, scan } from 'rxjs';


@Component({
  selector: 'alone-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent implements OnInit{

  @Input()
  public initValue: number = 0;
  public counterSubject$?: BehaviorSubject<null>;
  public counter$?: Observable<number>;


  ngOnInit(): void {
    this.counterSubject$ = new BehaviorSubject(null);
    this.counter$ = this.counterSubject$.pipe(
    scan( (acc) => acc + 1, (this.initValue - 1))
  )
  }

  subsCounter(){
    this.counterSubject$!.next(null);
  }

}
