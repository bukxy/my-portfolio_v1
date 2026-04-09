import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import {DataModel} from '../../interfaces/data-model-interface';
import {FormGroup} from '@angular/forms';
import {RequesterService} from '../requester/requester-service';
import {
  ProjectFilter,
  ProjectInterface,
  ProjectsInterface,
} from '../../interfaces/project-interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private refresh$ = new Subject<void>();
  onRefresh$ = this.refresh$.asObservable();

  readonly request = inject(RequesterService);

  private filters$ = new BehaviorSubject<ProjectFilter>({});

  setFilters(filters: ProjectFilter) {
    this.filters$.next(filters);
  }

  getFilters() {
    return this.filters$.asObservable();
  }

  triggerRefresh() {
    this.refresh$.next();
  }

  getAll(filters?: ProjectFilter): Observable<ProjectInterface[]> {
    const params: any = {};
    if (filters?.categoryIds?.length) params['categoryIds'] = filters.categoryIds;
    if (filters?.skillIds?.length) params['skillIds'] = filters.skillIds;

    return this.request
      .get<DataModel<ProjectsInterface>>('project', params)
      .pipe(map((res) => res.data));
  }

  add(formGroup: FormGroup) {
    const formData = this.toFormData(formGroup.value);
    return this.request.post<DataModel<ProjectInterface>>('project', formData);
  }

  update(id: number, formGroup: FormGroup) {
    const formData = this.toFormData(formGroup.value);
    return this.request.put<DataModel<ProjectInterface>>(`project/${id}`, formData);
  }

  delete(id: number) {
    return this.request.delete(`project/${id}`);
  }

  private toFormData(values: any): FormData {
    const formData = new FormData();
    const { images, ...data } = values;

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (Array.isArray(images)) {
      images.forEach((file: File) => formData.append('images', file, file.name));
    }

    return formData;
  }
}
