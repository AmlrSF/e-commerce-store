import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  copyIcon = 'fa-copy';

  copyToClipboard(apiUrl :string) {
    
    const tempInput = document.createElement('textarea');
    tempInput.value = apiUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    
    this.copyIcon = 'fa-check';

    
    setTimeout(() => {
      this.copyIcon = 'fa-copy';
    }, 3000);
  }
}
