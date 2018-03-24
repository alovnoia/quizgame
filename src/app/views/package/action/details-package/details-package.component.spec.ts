import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPackageComponent } from './details-package.component';

describe('DetailsPackageComponent', () => {
  let component: DetailsPackageComponent;
  let fixture: ComponentFixture<DetailsPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
