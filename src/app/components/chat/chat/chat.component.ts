import {AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../../models/user/user';
import {Message} from '../../../models/message/message';
import {ChatService} from '../../../services/chat/chat.service';
import {UserService} from '../../../services/user/user.service';
import {Chat} from '../../../models/chat/chat';
import {BookingService} from '../../../services/booking/booking.service';
import {MatDialog} from '@angular/material';
import {MenuInfoComponent} from '../../menu/menu-info/menu-info.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [BookingService]
})

export class ChatComponent implements OnInit, AfterViewChecked {

  @Input() user: User;
  chatUser: User;
  isHost: boolean;
  messageContent: string;
  maximized: boolean;
  windowIcon: string;
  @Input() index: number;
  @Input() chat: Chat;
  @ViewChild('scrollMe') private chatContent: ElementRef;
  @Output() deleteEmitter = new EventEmitter<number>();
  messageSize: number;
  focused: boolean;


  constructor(private chatService: ChatService, private bookingService: BookingService, private userService: UserService,
              private dialog: MatDialog) {
    this.maximized = true;
    this.windowIcon = 'keyboard_arrow_down';
    this.focused = true;
  }

  ngOnInit() {
    if (this.chat.host._id === this.user._id) {
      this.isHost = true;
      this.chatUser = this.chat.guest;
    } else {
      this.chatUser = this.chat.host;
      this.isHost = false;
    }
    this.messageSize = this.chat.messages.length;
    this.chatService.closeOpenedChatsEmitter.subscribe(() => {
      if (this.maximized) {
        this.chatService.closeChat(this.chat);
      }
    });
  }

  confirmBooking() {
    this.bookingService.confirmBooking(this.chat.booking._id).subscribe((booking) => {
      this.chat.booking = booking;
      this.chatService.sendChangeBookingState(booking);
    });
  }


  cancelBooking() {
    this.bookingService.canceledBooking(this.chat.booking._id).subscribe((booking) => {
      this.chat.booking = booking;
      this.chatService.sendChangeBookingState(booking);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onFocus() {
    this.focused = true;
    this.messageSize = this.chat.messages.length;
  }

  onBlur() {
    this.focused = false;
  }

  getHeaderClass() {
    if ((this.messageSize !== this.chat.messages.length) && (this.focused === false)) {
      return 'mat-card-header blink';
    } else {
      this.messageSize = this.chat.messages.length;
      return 'mat-card-header';
    }
  }

  public sendMessage(content: string): void {
    if (!content) {
      return;
    }
    const message = {
      chat: this.chat,
      from: this.user._id,
      message: content,
      date: new Date()
    };
    this.chatService.sendMessage(message);
    this.messageContent = null;
  }

  scrollToBottom(): void {
    if (this.chatContent !== undefined) {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    }
  }


  getClass(message: Message) {
    if (!message.from) {
      return 'notification-message message';
    } else if (message.from === this.user._id) {
      return 'user-message message';
    } else {
      return 'chat-message message';
    }
  }

  getChatPosition() {
    if (this.index === 0) {
      return 0;
    } else {
      return (this.index * 350 + (this.index * 10)) + 'px';
    }
  }

  close() {
    this.chatService.closeChat(this.chat);
    this.deleteEmitter.emit(this.index);
  }

  toggleWindow() {
    if (this.maximized) {
      this.maximized = false;
      this.windowIcon = 'keyboard_arrow_up';
      this.chatService.minimizeChat(this.chat);
    } else {
      this.maximized = true;
      this.windowIcon = 'keyboard_arrow_down';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MenuInfoComponent, {
      width: '400px'
    });
    const instance = dialogRef.componentInstance;
    instance.date = this.chat.booking.menuDate;
    instance.address = this.chat.booking.menu.address;
    instance.available = this.chat.booking.menu.available;
    instance.description = this.chat.booking.menu.description;
    instance.host = this.chat.booking.host;
    instance.state = 'booking';
    instance.name = this.chat.booking.menu.name;
    instance.price = this.chat.booking.menu.price;
    instance.guests = this.chat.booking.menu.guests;
    instance.starters = this.chat.booking.menu.starters;
    instance.mains = this.chat.booking.menu.mains;
    instance.desserts = this.chat.booking.menu.desserts;
  }
}
