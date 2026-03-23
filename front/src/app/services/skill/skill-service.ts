import {inject, Injectable} from '@angular/core';
import {map, Subject} from 'rxjs';
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

  triggerRefresh() {
    this.refresh$.next();
  }

  getAll() {
    return this.request.get<DataModel<SkillsInterface>>('skill').pipe(
      map(res => res.data)
    )
  }

  add(formGroup: FormGroup) {
    return this.request.post<DataModel<SkillInterface>>('skill', formGroup.value);
  }

  update(id: number, formGroup: FormGroup) {
    return this.request.put<DataModel<SkillInterface>>(`skill/${id}`, formGroup.value);
  }
}
