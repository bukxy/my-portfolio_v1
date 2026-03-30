import {inject, Injectable} from '@angular/core';
import {map, Subject} from 'rxjs';
import {DataModel} from '../../interfaces/data-model-interface';
import {FormGroup} from '@angular/forms';
import {RequesterService} from '../requester/requester-service';
import {ProjectInterface, ProjectsInterface} from '../../interfaces/project-interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private refresh$ = new Subject<void>();
  onRefresh$ = this.refresh$.asObservable();

  readonly request = inject(RequesterService);

  triggerRefresh() {
    this.refresh$.next();
  }

  getAll() {
    return this.request.get<DataModel<ProjectsInterface>>('project').pipe(
      map(res => res.data)
    )
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
