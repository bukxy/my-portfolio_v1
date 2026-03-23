import {inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataModel} from '../../interfaces/data-model-interface';
import {FormGroup} from '@angular/forms';
import {RequesterService} from '../requester/requester-service';
import {SnackBarCall} from '../snack-bar/snack-bar';
import {SkillInterface, SkillsInterface} from '../../interfaces/skill-interface';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private refresh$ = new Subject<void>();
  onRefresh$ = this.refresh$.asObservable();

  readonly request = inject(RequesterService);
  private snackBar = inject(SnackBarCall);

  triggerRefresh() {
    this.refresh$.next();
  }

  getAll() {
    return this.request.get<SkillsInterface>('skill');
  }

  add(formGroup: FormGroup) {
    return this.request.post<DataModel>('skill', formGroup.value);
  }

  update(id: number, formGroup: FormGroup) {
    return this.request.put<DataModel>(`skill/${id}`, formGroup.value);
  }
}
