import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { meta, contactConfig } from '../../content_option';

interface FormState {
  name: string;
  email: string;
  message: string;
  loading: boolean;
  show: boolean;
  alertmessage: string;
  variant: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);

  contactConfig = contactConfig;

  formData = signal<FormState>({
    name: '', email: '', message: '',
    loading: false, show: false, alertmessage: '', variant: '',
  });

  ngOnInit() {
    this.title.setTitle(`${meta.title} | Contact`);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.formData.update(f => ({ ...f, loading: true }));

    // Remplacer par EmailJS : npm install @emailjs/browser
    setTimeout(() => {
      this.formData.update(f => ({
        ...f, loading: false,
        alertmessage: 'SUCCESS! Thank you for your message',
        variant: 'success', show: true,
      }));
    }, 1500);
  }

  updateField(field: keyof FormState, value: string) {
    this.formData.update(f => ({ ...f, [field]: value }));
  }

  closeAlert() {
    this.formData.update(f => ({ ...f, show: false }));
  }
}
