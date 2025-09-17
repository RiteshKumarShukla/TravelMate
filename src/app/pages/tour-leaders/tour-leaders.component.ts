import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Message {
  sender: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-tour-leaders',
  templateUrl: './tour-leaders.component.html',
  styleUrls: ['./tour-leaders.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TourLeadersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isChatOpen = false;

  messages: Message[] = [
    { sender: 'me', text: 'Hi Kuldeep, this is Ritesh from the support team.', time: '09:10 AM' },
    { sender: 'other', text: 'Hello Ritesh! How are you doing today?', time: '09:11 AM' },
    { sender: 'me', text: 'I’m doing well, thank you. I wanted to check about the upcoming Manali tour.', time: '09:12 AM' },
    { sender: 'other', text: 'Yes, the preparations are going smoothly. We have confirmed 25 participants so far.', time: '09:14 AM' },
    { sender: 'me', text: 'That’s great! Do you think we need to arrange an additional vehicle?', time: '09:15 AM' },
    { sender: 'other', text: 'At this stage, one bus should be enough. But if we cross 30 participants, a mini-van would be safer.', time: '09:17 AM' },
    { sender: 'me', text: 'Makes sense. I’ll keep monitoring the bookings and update you if we cross that number.', time: '09:18 AM' },
    { sender: 'other', text: 'Perfect. Also, could you please confirm the accommodation details once again?', time: '09:20 AM' },
    { sender: 'me', text: 'Sure. We’ve booked 12 double rooms at Hotel Mountain View. Check-in on 25th Sept at 12 PM.', time: '09:21 AM' },
    { sender: 'other', text: 'Awesome, that works well. Do we also have a backup hotel in case of overbooking?', time: '09:23 AM' },
    { sender: 'me', text: 'Yes, we kept Hotel Snow Retreat as backup. They can provide up to 8 rooms if needed.', time: '09:25 AM' },
    { sender: 'other', text: 'Great planning 👌 That should cover us. One more thing—what about the medical kit and emergency contact list?', time: '09:27 AM' },
    { sender: 'me', text: 'The kit is ready and will be handed over to you on the reporting day. Emergency contacts are printed and shared with all participants.', time: '09:28 AM' },
    { sender: 'other', text: 'Fantastic! You guys always make things easy for us. I really appreciate the support.', time: '09:30 AM' },
    { sender: 'me', text: 'It’s our pleasure, Kuldeep. We want the trip to be smooth for both the leaders and the guests.', time: '09:32 AM' },
    { sender: 'other', text: 'Thanks again. I’ll share the final briefing document tomorrow morning.', time: '09:34 AM' },
    { sender: 'me', text: 'Sounds good 👍 Looking forward to a successful trip!', time: '09:35 AM' }
  ];


  newMessage = '';
  loading = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.stats.userList;
        console.log(this.users);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
      }
    });
  }

  openChat(user: User) {
    this.selectedUser = user;
    this.isChatOpen = true;
  }

  closeChat() {
    this.isChatOpen = false;
    this.selectedUser = null;
    this.newMessage = '';
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'me',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';

      // (Optional) Auto-scroll to bottom
      setTimeout(() => {
        const chatBody = document.querySelector('.chat-body');
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }, 100);
    }
  }
}
