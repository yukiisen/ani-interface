import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VimComponent } from './vim.component';

describe('VimComponent', () => {
  let component: VimComponent;
  let fixture: ComponentFixture<VimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
