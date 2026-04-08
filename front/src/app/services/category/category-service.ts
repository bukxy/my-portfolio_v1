import { inject, Injectable } from '@angular/core';
import { ProjectInterface } from '../../interfaces/project-interface';
import { map } from 'rxjs';
import { DataModel } from '../../interfaces/data-model-interface';
import { FormGroup } from '@angular/forms';
import { RequesterService } from '../requester/requester-service';
import { CategoriesInterface } from '../../interfaces/category-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly request = inject(RequesterService);

  getAll() {
    return this.request.get<DataModel<CategoriesInterface>>('category').pipe(map((res) => res.data));
  }

  add(formGroup: FormGroup) {
    return this.request.post<DataModel<ProjectInterface>>('category', formGroup);
  }

  update(id: number, formGroup: FormGroup) {
    return this.request.put<DataModel<ProjectInterface>>(`category/${id}`, formGroup);
  }

  delete(id: number) {
    return this.request.delete(`category/${id}`);
  }
}
