import {Component, computed, forwardRef, input, signal} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/input';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-chips-list',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsList),
      multi: true
    }
  ],
  imports: [
    MatIcon,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    FormsModule,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatChipRemove,
  ],
  templateUrl: './chips-list.html',
  styleUrl: './chips-list.css',
})
class ChipsList implements ControlValueAccessor{
  label = input<string>('');
  placeholder = input<string>('Ajouter...');

  suggestions = input<Option[]>([]);
  selectedItems = signal<Option[]>([]);

  currentInput = '';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  filteredSuggestions = computed(() =>
    this.suggestions().filter(s =>
      !this.selectedItems().some(i => i.id === s.id) &&
      s.name.toLowerCase().includes(this.currentInput.toLowerCase())
    )
  );

  private onChange = (value: Option[]) => {};
  private onTouched = () => {};

  writeValue(value: Option[] | number[]): void {
    if (!value || !value.length) {
      this.selectedItems.set([]);
      return;
    }

    if (typeof value[0] === 'number') {
      const ids = value as number[];
      const options = ids
      .map(id => this.suggestions().find(s => s.id === id))
      .filter(s => s !== undefined) as Option[];
      this.selectedItems.set(options);
    } else {
      this.selectedItems.set(value as Option[]);
    }
  }

  registerOnChange(fn: (value: Option[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  remove(item: Option) {
    this.selectedItems.update(items => items.filter(i => i.id !== item.id));
    this.onChange(this.selectedItems());
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value as Option;
    if (!this.selectedItems().some(i => i.id === value.id)) {
      this.selectedItems.update(items => [...items, value]);
      this.onChange(this.selectedItems());
    }
    this.currentInput = '';
  }
}

export default ChipsList
