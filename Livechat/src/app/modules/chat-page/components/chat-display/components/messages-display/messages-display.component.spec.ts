import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDisplayComponent } from './messages-display.component';

describe('MessagesDisplayComponent', () => {
  let component: MessagesDisplayComponent;
  let fixture: ComponentFixture<MessagesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
