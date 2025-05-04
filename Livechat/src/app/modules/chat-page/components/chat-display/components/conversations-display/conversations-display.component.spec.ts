import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsDisplayComponent } from './conversations-display.component';

describe('ConversationsDisplayComponent', () => {
  let component: ConversationsDisplayComponent;
  let fixture: ComponentFixture<ConversationsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
