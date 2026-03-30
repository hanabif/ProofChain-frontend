import { useAuthStore } from '../store/authStore';
import { useRequestStore } from '../store/requestStore';
import { useActivityStore } from '../store/activityStore';
import { toast } from '../components/ui/Toast';

class WebSocketService {
  private socket: WebSocket | null = null;
  private url = 'wss://proofchain-api.onrender.com/ws/transactions/';
  private reconnectTimeout: number | null = null;
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;

  connect() {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.warn('WS: No token found, skipping connection.');
      return;
    }

    if (this.socket?.readyState === WebSocket.OPEN) return;

    console.log('WS: Connecting...');
    this.socket = new WebSocket(`${this.url}?token=${token}`);

    this.socket.onopen = () => {
      console.log('WS: Connected');
      this.reconnectAttempts = 0;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('WS: Failed to parse message', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WS: Closed', event.code, event.reason);
      this.socket = null;
      if (useAuthStore.getState().token) {
        this.attemptReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('WS: Error', error);
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('WS: Max reconnect attempts reached');
      toast.error('Real-time connection failed. Please refresh.');
      return;
    }

    this.reconnectAttempts++;
    console.log(`WS: Reconnecting in 5s (Attempt ${this.reconnectAttempts})...`);
    this.reconnectTimeout = window.setTimeout(() => this.connect(), 5000);
  }

  private handleMessage(message: any) {
    const { event, data } = message;
    const store = useRequestStore.getState();

    switch (event) {
      case 'new_transaction_request':
        store.addIncomingRequest(data);
        useActivityStore.getState().addActivity({
          type: 'request_received',
          title: `New licensing request received`,
          subtitle: `FROM: ${data.requesterName}`,
        });
        toast.info(`New request from ${data.requesterName}`);
        break;

      case 'request_accepted':
        store.updateRequestStatus(data.request_id, 'approved');
        toast.success('Request accepted');
        break;

      case 'request_rejected':
        store.updateRequestStatus(data.request_id, 'declined');
        toast.warning('Request rejected');
        break;

      case 'error':
        toast.error(data.message || 'An error occurred');
        break;

      default:
        console.log('WS: Unknown event', event, data);
    }
  }

  send(action: string, payload: any) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      toast.error('Not connected to server');
      return;
    }

    this.socket.send(JSON.stringify({
      action,
      ...payload
    }));
  }

  disconnect() {
    if (this.socket) {
      this.socket.onclose = null; // Prevent reconnect
      this.socket.close();
      this.socket = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  // Helper for testing
  simulate(event: string, data: any) {
    this.handleMessage({ event, data });
  }
}

export const webSocketService = new WebSocketService();

// Expose to window for manual testing/verification
if (typeof window !== 'undefined') {
  (window as any).simulateWS = (event: string, data: any) => webSocketService.simulate(event, data);
}
