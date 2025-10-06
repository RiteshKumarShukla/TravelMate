import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TourLeader {
  name: string;
  email: string;
  phone?: string;
}

interface NewTourLeader {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface Message {
  text: string;
  sender: string;
  time: string;
}

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-leaders.component.html',
  styleUrls: ['./tour-leaders.component.css'],
  imports:[FormsModule,CommonModule]
})
export class TourLeadersComponent implements OnInit {
  loading: boolean = false;
  users: TourLeader[] = [];
  
  // Create Modal
  isCreateModalOpen: boolean = false;
  newLeader: NewTourLeader = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  // Chat Modal
  isChatOpen: boolean = false;
  selectedUser: TourLeader | null = null;
  messages: Message[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadTourLeaders();
  }

  loadTourLeaders(): void {
    this.loading = true;
    
    // Simulating data load - replace with your actual service call
    setTimeout(() => {
      this.users = [
        { name: 'Ritesh Shukla', email: 'ritesh@example.com', phone: '+91-987654321' },
        { name: 'Kuldeep Gope', email: 'kuldeep@example.com', phone: '+91-987654322' },
        { name: 'Swati Rawat', email: 'swati@example.com', phone: '+91-987654323' }
      ];
      this.loading = false;
    }, 1000);
  }

  // Create Modal Methods
  openCreateModal(): void {
    this.isCreateModalOpen = true;
    this.resetNewLeaderForm();
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.resetNewLeaderForm();
  }

  resetNewLeaderForm(): void {
    this.newLeader = {
      name: '',
      email: '',
      phone: '',
      password: ''
    };
  }

  createTourLeader(): void {
    // Validate form
    if (!this.newLeader.name || !this.newLeader.email || !this.newLeader.phone || !this.newLeader.password) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newLeader.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Add new tour leader to the list (Frontend only)
    const newTourLeader: TourLeader = {
      name: this.newLeader.name,
      email: this.newLeader.email,
      phone: this.newLeader.phone
    };

    this.users.push(newTourLeader);

    // Show success message
    alert(`Tour Leader "${this.newLeader.name}" created successfully!`);

    // Close modal and reset form
    this.closeCreateModal();
  }

  // Chat Modal Methods
  openChat(leader: TourLeader): void {
    this.selectedUser = leader;
    this.isChatOpen = true;
    
    // Load mock conversation between Gourav and Ritesh
    this.messages = [
      { text: 'Hey Goury! Are you ready for tomorrow\'s tour?', sender: 'other', time: '09:15' },
      { text: 'Hi Ritesh! Yes, I\'ve prepared everything. Which group am I taking?', sender: 'me', time: '09:17' },
      { text: 'You\'ll be handling the Jaipur heritage tour. 25 tourists from Delhi.', sender: 'other', time: '09:18' },
      { text: 'Perfect! I\'ve checked the itinerary. Are we starting from Hawa Mahal?', sender: 'me', time: '09:20' },
      { text: 'Yes, exactly. Then Amber Fort, City Palace, and Jantar Mantar.', sender: 'other', time: '09:21' },
      { text: 'Got it. What about lunch arrangements?', sender: 'me', time: '09:23' },
      { text: 'Lunch is booked at Chokhi Dhani at 1 PM. Traditional Rajasthani thali.', sender: 'other', time: '09:24' },
      { text: 'Excellent choice! The tourists will love it. Any special requirements?', sender: 'me', time: '09:26' },
      { text: 'Yes, 3 tourists are vegetarian and 2 have requested Jain food.', sender: 'other', time: '09:27' },
      { text: 'Noted. I\'ll inform the restaurant in advance. What time is pickup?', sender: 'me', time: '09:29' },
      { text: 'Bus will be at the hotel at 8 AM sharp. Don\'t be late!', sender: 'other', time: '09:30' },
      { text: 'I\'ll reach by 7:45 AM. Have you arranged the entry tickets?', sender: 'me', time: '09:32' },
      { text: 'All tickets are booked. I\'ll email you the vouchers by evening.', sender: 'other', time: '09:33' },
      { text: 'Thanks! What about the sound system for the bus?', sender: 'me', time: '09:35' },
      { text: 'Already installed. You can use the wireless mic for commentary.', sender: 'other', time: '09:36' },
      { text: 'Great! I\'ve prepared some interesting stories about Jaipur\'s history.', sender: 'me', time: '09:38' },
      { text: 'That\'s what makes you the best guide, Ritesh! 😊', sender: 'other', time: '09:39' },
      { text: 'Haha, thanks! Any emergency contact numbers I should have?', sender: 'me', time: '09:41' },
      { text: 'I\'ll share the tourist group leader\'s number and hotel manager\'s contact.', sender: 'other', time: '09:42' },
      { text: 'Perfect. What\'s the expected return time?', sender: 'me', time: '09:44' },
      { text: 'Around 7 PM. But you know Jaipur traffic, might take longer.', sender: 'other', time: '09:45' },
      { text: 'True! I\'ll keep some buffer time. Weather forecast looks good?', sender: 'me', time: '09:47' },
      { text: 'Yes, sunny day expected. Temperature around 28°C. Comfortable.', sender: 'other', time: '09:48' },
      { text: 'Perfect for sightseeing! Should I carry the company banner?', sender: 'me', time: '09:50' },
      { text: 'Yes please! And don\'t forget your ID card and guide license.', sender: 'other', time: '09:51' },
      { text: 'Always carry them. Anything else I should know?', sender: 'me', time: '09:53' },
      { text: 'The group includes 5 senior citizens. Please be mindful of the pace.', sender: 'other', time: '09:54' },
      { text: 'Absolutely! I\'ll make sure everyone is comfortable. Thanks for letting me know.', sender: 'me', time: '09:56' },
      { text: 'That\'s why you\'re my go-to guide for such groups! 👍', sender: 'other', time: '09:57' },
      { text: 'I appreciate the trust, Gourav. I\'ll make it memorable for them!', sender: 'me', time: '09:59' },
      { text: 'I know you will. Call me if you need anything during the tour.', sender: 'other', time: '10:00' },
      { text: 'Sure thing! Talk to you tomorrow then.', sender: 'me', time: '10:02' },
      { text: 'All the best, Ritesh! Have a great tour! 🎉', sender: 'other', time: '10:03' }
    ];
  }

  closeChat(): void {
    this.isChatOpen = false;
    this.selectedUser = null;
    this.messages = [];
    this.newMessage = '';
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'me',
        time: this.getCurrentTime()
      });
      this.newMessage = '';
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        const chatBody = document.querySelector('.chat-body');
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }, 100);
    }
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}