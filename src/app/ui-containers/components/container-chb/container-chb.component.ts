import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnDestroy,
  AfterContentInit
} from '@angular/core';

import { IValue } from '../../models';
import { ContainerComponent } from '../container/container.component';

import { Subscription, Observable, merge, of } from 'rxjs';


@Component({
  selector: 'container-chb',
  templateUrl: './container-chb.component.html',
  providers: [{
    provide: ContainerComponent,
    useExisting: forwardRef(() => ContainerChbComponent)
  }],
})
export class ContainerChbComponent extends ContainerComponent
                                   implements OnDestroy, AfterContentInit {
  value: IValue = {
    selected: false,
    valid: false,
  };

  // if true only one child container can be active at a time
  @Input() set radioSelectChild(value) {
    this._radioSelect = value !== undefined;
  }

  @Input() isHidden: boolean;
  @Input() subtitle: string;

  @Output() checked$ = new EventEmitter();

  onselect(ischecked: boolean) {
    this.value.selected = ischecked;
    // send notification to enclosing parent
    this.checked$.emit({ selected: this.value.selected } );
    this.notifyChange();
  }

  isRadioSelectContainer() {
    return this._radioSelect;
  }

  isChildSelected()  {
    return this.children && this.children.toArray().filter(
      // do not check first child as it is element itself
      (child, index) => index && child.value.selected
    ).length || false;
  }

  get isSelected() { return this.value.selected; }

  validateComponentValue() {
    this.value.valid = this.value.selected;
  }

  postApply() {
    this.checked$.emit({ selected: this.value.selected } );
  }

  ngAfterContentInit() {
    // subscribe to merged all children checked$ streams if container is required
    // or radioSelectContainer
    if (this.value.isrequired || this.isRadioSelectContainer()) {
      this.subscription$ = this.children.reduce(
        (acc, childItem) => {
          if (childItem instanceof ContainerChbComponent) {
            return merge(acc, childItem.checked$);
            // return acc.merge(childItem.checked$);
          } else {
            return acc;
          }
        }, of({}))
      .subscribe( value => {
        const newIsSelected = this.isChildSelected() > 0;
        if (newIsSelected !== this.value.selected) {
          this.value.valid  = this.isChildSelected() > 0;
          this.value.selected = this.value.valid;
          // notify parent
          this.checked$.emit({ selected: newIsSelected });
          this.notifyChange();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  private _radioSelect: boolean;
  private subscription$: Subscription;

}
