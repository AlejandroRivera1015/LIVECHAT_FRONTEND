import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContactBarComponent } from './search-contact-bar.component';

describe('SearchContactBarComponent', () => {
  let component: SearchContactBarComponent;
  let fixture: ComponentFixture<SearchContactBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContactBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchContactBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
