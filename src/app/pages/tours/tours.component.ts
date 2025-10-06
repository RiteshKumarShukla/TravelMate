import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TourLeader {
  id: string;
  name: string;
  contact: string;
}

interface AgentStaff {
  id: string;
  name: string;
  contact: string;
}

interface ELStaff {
  id: string;
  name: string;
  role: string;
}

interface EmergencyDutyStaff {
  id: string;
  name: string;
  contact: string;
}

interface Voucher {
  voucherId: string;
  service: string;
  fileUrl: string;
}

interface ServiceBooked {
  serviceId: string;
  type: string;
  provider: string;
  status: string;
}

interface TourDetails {
  brief: string;
  itinerary: string[];
  vouchers: Voucher[];
  servicesBooked: ServiceBooked[];
}

interface Driver {
  driverId: string;
  name: string;
  phone: string;
}

interface Restaurant {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface Contacts {
  drivers: Driver[];
  restaurants: Restaurant[];
}

interface Note {
  noteId: string;
  author: string;
  text: string;
  attachments: string[];
  timestamp: string;
}

interface Notification {
  notificationId: string;
  from: string;
  message: string;
  timestamp: string;
}

interface Feedback {
  serviceId: string;
  rating: string;
  suggestion: string;
  autoTaskCreated: boolean;
  taskId: string;
}

interface OptionalService {
  serviceId: string;
  name: string;
  status?: string;
  autoTaskCreated?: boolean;
  taskId?: string;
}

interface OptionalServices {
  approved: OptionalService[];
  requested: OptionalService[];
}

interface SupportRequest {
  requestId: string;
  message: string;
  autoTaskCreated: boolean;
  taskId: string;
  status: string;
}

interface Tour {
  tourId: string;
  tourName: string;
  assignedTourLeader: TourLeader;
  agentStaff: AgentStaff;
  elStaff: ELStaff[];
  emergencyDutyStaff: EmergencyDutyStaff;
  details: TourDetails;
  contacts: Contacts;
  notesAndUploads: Note[];
  notifications: Notification[];
  feedback: Feedback[];
  optionalServices: OptionalServices;
  supportRequests: SupportRequest[];
}

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  showModal = false;
  isEditMode = false;
  searchTerm = '';
  currentEditTourId: string | null = null;

  tourForm: Tour = this.getEmptyTourForm();

  ngOnInit(): void {
    this.loadHardcodedTours();
  }

  loadHardcodedTours(): void {
  this.tours = [
  {
    tourId: 'T10001',
    tourName: 'Golden Triangle Tour',
    assignedTourLeader: {
      id: 'TL001',
      name: 'Rohit Sharma',
      contact: '+91-9810012345'
    },
    agentStaff: {
      id: 'AG001',
      name: 'Delhi Travels Pvt Ltd',
      contact: '+91-9310011122'
    },
    elStaff: [
      { id: 'EL001', name: 'Ankit Verma', role: 'Monitoring' },
      { id: 'EL002', name: 'Priya Mehta', role: 'Logistics' }
    ],
    emergencyDutyStaff: {
      id: 'ED001',
      name: 'Rajesh Singh',
      contact: '+91-9910022233'
    },
    details: {
      brief: 'Delhi - Agra - Jaipur (6 Days / 5 Nights)',
      itinerary: [
        'Day 1: Delhi arrival & local sightseeing (India Gate, Qutub Minar)',
        'Day 2: Delhi to Agra, visit Taj Mahal & Agra Fort',
        'Day 3: Fatehpur Sikri & Mathura Temple visit',
        'Day 4: Jaipur Amber Fort & City Palace',
        'Day 5: Jaipur Hawa Mahal & Jantar Mantar',
        'Day 6: Return to Delhi'
      ],
      vouchers: [
        { voucherId: 'V001', service: 'Hotel Taj Palace Booking', fileUrl: 'https://example.com/voucher/delhi-hotel.pdf' }
      ],
      servicesBooked: [
        { serviceId: 'S001', type: 'Hotel', provider: 'Hotel Taj Palace, Delhi', status: 'Confirmed' },
        { serviceId: 'S002', type: 'Transport', provider: 'Delhi Tour Cabs', status: 'Confirmed' }
      ]
    },
    contacts: {
      drivers: [
        { driverId: 'D001', name: 'Suresh Kumar', phone: '+91-9810098765' }
      ],
      restaurants: [
        { name: 'Karim’s Jama Masjid', location: { lat: 28.6507, lng: 77.2334 } },
        { name: 'Chokhi Dhani Jaipur', location: { lat: 26.8242, lng: 75.8120 } }
      ]
    },
    notesAndUploads: [
      {
        noteId: 'N001',
        author: 'Rohit Sharma',
        text: 'Group reached Delhi safely, all settled in hotel.',
        attachments: ['https://example.com/photos/delhi-hotel.jpg'],
        timestamp: '2025-10-03T10:00:00Z'
      }
    ],
    notifications: [
      { notificationId: 'NT001', from: 'Agent Staff', message: 'Confirm Agra hotel check-in', timestamp: '2025-10-03T12:00:00Z' }
    ],
    feedback: [
      { serviceId: 'S001', rating: 'excellent', suggestion: 'Hotel staff was very helpful', autoTaskCreated: true, taskId: 'T_Nova_101' }
    ],
    optionalServices: {
      approved: [
        { serviceId: 'OPT001', name: 'Elephant Ride at Amber Fort', status: 'Approved by Agent Staff' }
      ],
      requested: [
        { serviceId: 'OPT002', name: 'Sound & Light Show, Red Fort', autoTaskCreated: true, taskId: 'T_Nova_102' }
      ]
    },
    supportRequests: [
      { requestId: 'SR001', message: 'Need extra bus for group of 10', autoTaskCreated: true, taskId: 'T_Nova_103', status: 'Open' }
    ]
  },
  {
    tourId: 'T10002',
    tourName: 'Kerala Backwaters Experience',
    assignedTourLeader: {
      id: 'TL002',
      name: 'Sneha Nair',
      contact: '+91-9847012345'
    },
    agentStaff: {
      id: 'AG002',
      name: 'Kerala Holidays Cochin',
      contact: '+91-9744011122'
    },
    elStaff: [
      { id: 'EL003', name: 'Vivek Menon', role: 'Coordination' }
    ],
    emergencyDutyStaff: {
      id: 'ED002',
      name: 'Meera Pillai',
      contact: '+91-9447012233'
    },
    details: {
      brief: 'Cochin - Alleppey - Munnar - Thekkady (7 Days)',
      itinerary: [
        'Day 1: Arrival in Cochin & Kathakali show',
        'Day 2: Cochin sightseeing (Fort Kochi, Marine Drive)',
        'Day 3: Alleppey houseboat cruise',
        'Day 4: Munnar tea gardens & waterfalls',
        'Day 5: Eravikulam National Park',
        'Day 6: Thekkady wildlife sanctuary',
        'Day 7: Departure from Cochin'
      ],
      vouchers: [
        { voucherId: 'V002', service: 'Houseboat Booking, Alleppey', fileUrl: 'https://example.com/voucher/houseboat.pdf' }
      ],
      servicesBooked: [
        { serviceId: 'S003', type: 'Hotel', provider: 'Le Meridien Kochi', status: 'Confirmed' },
        { serviceId: 'S004', type: 'Transport', provider: 'Kerala State Tours', status: 'Pending' }
      ]
    },
    contacts: {
      drivers: [
        { driverId: 'D002', name: 'Biju Thomas', phone: '+91-9847023456' }
      ],
      restaurants: [
        { name: 'Dhe Puttu Cochin', location: { lat: 9.9312, lng: 76.2673 } },
        { name: 'Saravana Bhavan Munnar', location: { lat: 10.0889, lng: 77.0595 } }
      ]
    },
    notesAndUploads: [
      {
        noteId: 'N002',
        author: 'Sneha Nair',
        text: 'Guests enjoyed houseboat lunch with local Kerala cuisine.',
        attachments: ['https://example.com/photos/houseboat.jpg'],
        timestamp: '2025-10-04T14:00:00Z'
      }
    ],
    notifications: [],
    feedback: [
      { serviceId: 'S004', rating: 'average', suggestion: 'Driver arrived late on day 2', autoTaskCreated: true, taskId: 'T_Nova_104' }
    ],
    optionalServices: {
      approved: [],
      requested: [
        { serviceId: 'OPT003', name: 'Ayurvedic Spa Session', autoTaskCreated: true, taskId: 'T_Nova_105' }
      ]
    },
    supportRequests: []
  },
  {
    tourId: 'T10003',
    tourName: 'Rajasthan Heritage Tour',
    assignedTourLeader: {
      id: 'TL003',
      name: 'Arjun Rathore',
      contact: '+91-9829012345'
    },
    agentStaff: {
      id: 'AG003',
      name: 'Jaipur Royal Travels',
      contact: '+91-9928011122'
    },
    elStaff: [
      { id: 'EL004', name: 'Manisha Chauhan', role: 'Logistics' }
    ],
    emergencyDutyStaff: {
      id: 'ED003',
      name: 'Karan Singh',
      contact: '+91-9818012233'
    },
    details: {
      brief: 'Jaipur - Jodhpur - Udaipur (6 Days)',
      itinerary: [
        'Day 1: Jaipur Amber Fort & Jal Mahal',
        'Day 2: Jaipur City Palace & Hawa Mahal',
        'Day 3: Jodhpur Mehrangarh Fort',
        'Day 4: Jodhpur local market visit',
        'Day 5: Udaipur Lake Pichola boat ride',
        'Day 6: Departure from Udaipur'
      ],
      vouchers: [],
      servicesBooked: [
        { serviceId: 'S005', type: 'Hotel', provider: 'Hotel Rajputana Palace, Jaipur', status: 'Confirmed' }
      ]
    },
    contacts: {
      drivers: [
        { driverId: 'D003', name: 'Mohammed Aslam', phone: '+91-9829023456' }
      ],
      restaurants: [
        { name: 'Rawat Misthan Bhandar Jaipur', location: { lat: 26.9124, lng: 75.7873 } },
        { name: 'Jodhpur Gypsy Dining Hall', location: { lat: 26.2389, lng: 73.0243 } }
      ]
    },
    notesAndUploads: [],
    notifications: [
      { notificationId: 'NT002', from: 'Tour Leader', message: 'Reached Jodhpur safely with group.', timestamp: '2025-10-05T09:00:00Z' }
    ],
    feedback: [],
    optionalServices: {
      approved: [],
      requested: [
        { serviceId: 'OPT004', name: 'Camel Safari in Jaisalmer (extension)', autoTaskCreated: true, taskId: 'T_Nova_106' }
      ]
    },
    supportRequests: []
  }
];

  }

  getEmptyTourForm(): Tour {
    return {
      tourId: '',
      tourName: '',
      assignedTourLeader: {
        id: '',
        name: '',
        contact: ''
      },
      agentStaff: {
        id: '',
        name: '',
        contact: ''
      },
      elStaff: [],
      emergencyDutyStaff: {
        id: '',
        name: '',
        contact: ''
      },
      details: {
        brief: '',
        itinerary: [''],
        vouchers: [],
        servicesBooked: []
      },
      contacts: {
        drivers: [],
        restaurants: []
      },
      notesAndUploads: [],
      notifications: [],
      feedback: [],
      optionalServices: {
        approved: [],
        requested: []
      },
      supportRequests: []
    };
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.tourForm = this.getEmptyTourForm();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.tourForm = this.getEmptyTourForm();
    this.currentEditTourId = null;
  }

  viewTour(tour: Tour): void {
    alert(`Viewing tour: ${tour.tourName}\nID: ${tour.tourId}\n\nDetails:\n${tour.details.brief}`);
  }

  editTour(tour: Tour): void {
    this.isEditMode = true;
    this.currentEditTourId = tour.tourId;
    this.tourForm = JSON.parse(JSON.stringify(tour)); // Deep copy
    this.showModal = true;
  }

  deleteTour(tourId: string): void {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.tours = this.tours.filter(t => t.tourId !== tourId);
      alert('Tour deleted successfully!');
    }
  }

  saveTour(): void {
    if (!this.tourForm.tourId || !this.tourForm.tourName) {
      alert('Please fill in Tour ID and Tour Name');
      return;
    }

    if (this.isEditMode && this.currentEditTourId) {
      // Update existing tour
      const index = this.tours.findIndex(t => t.tourId === this.currentEditTourId);
      if (index !== -1) {
        this.tours[index] = JSON.parse(JSON.stringify(this.tourForm));
        alert('Tour updated successfully!');
      }
    } else {
      // Create new tour
      const newTour = JSON.parse(JSON.stringify(this.tourForm));
      this.tours.push(newTour);
      alert('Tour created successfully!');
    }

    this.closeModal();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Itinerary methods
  addItinerary(): void {
    this.tourForm.details.itinerary.push('');
  }

  removeItinerary(index: number): void {
    this.tourForm.details.itinerary.splice(index, 1);
  }

  // Service methods
  addService(): void {
    this.tourForm.details.servicesBooked.push({
      serviceId: `S${Date.now()}`,
      type: '',
      provider: '',
      status: 'Pending'
    });
  }

  removeService(index: number): void {
    this.tourForm.details.servicesBooked.splice(index, 1);
  }

  // Driver methods
  addDriver(): void {
    this.tourForm.contacts.drivers.push({
      driverId: `D${Date.now()}`,
      name: '',
      phone: ''
    });
  }

  removeDriver(index: number): void {
    this.tourForm.contacts.drivers.splice(index, 1);
  }

  // Restaurant methods
  addRestaurant(): void {
    this.tourForm.contacts.restaurants.push({
      name: '',
      location: {
        lat: 0,
        lng: 0
      }
    });
  }

  removeRestaurant(index: number): void {
    this.tourForm.contacts.restaurants.splice(index, 1);
  }
}