import { CommonModule } from '@angular/common';
import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class ChatComponent implements AfterViewChecked {
  isChatOpen = false;
  messages = [
    { user: 'bot', text: 'Hi! How can I help you?' }
  ];
  newMessage = '';

  @ViewChild('chatBody') private chatBody!: ElementRef;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    setTimeout(() => this.scrollToBottom(), 100); // scroll when modal opens
  }

  sendMessage() {
    const msg = this.newMessage.trim();
    if (msg) {
      this.messages.push({ user: 'user', text: msg });
      this.newMessage = '';
      this.scrollToBottom();

      // TODO: Add API call to send message to backend or bot
    }
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
