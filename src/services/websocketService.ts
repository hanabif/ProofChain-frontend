import { useAuthStore } from '../store/authStore';
import { useRequestStore } from '../store/requestStore';
import { useActivityStore } from '../store/activityStore';
import { toast } from '../components/ui/Toast';

class WebSocketService {
  private socket: WebSocket | null = null;
  private url = import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws/transactions/';
  private reconnectTimeout: number | null = null;
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;

  connect() {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.warn('[WS DEBUG] No token found, skipping connection.');
      return;
    }

    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log('[WS DEBUG] Socket already OPEN. Skipping.');
      return;
    }

    const wsUrl = `${this.url}?token=${token}`;
    console.log(`[WS DEBUG] Attempting connection to: ${wsUrl}`);
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('%c[WS DEBUG] ✅ Connection Successful', 'color: #00ff95; font-weight: bold');
      this.reconnectAttempts = 0;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    };

    this.socket.onmessage = (event) => {
      console.log('[WS DEBUG] 📥 Message Received:', event.data);
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('[WS DEBUG] ❌ Failed to parse message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.warn(`[WS DEBUG] ⚠️ Connection Closed (Code: ${event.code}, Reason: ${event.reason})`);
      this.socket = null;
      if (useAuthStore.getState().token) {
        this.attemptReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('[WS DEBUG] ❌ Socket Error Trace:', error);
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
        const errorDetail = message.error?.detail || message.data?.message || 'An error occurred';
        console.error('[WS DEBUG] 🛑 Server Error:', errorDetail);
        toast.error(errorDetail);
        break;

      default:
        console.log('WS: Unknown event', event, data);
    }
  }

  send(action: string, payload: any) {
    console.log(`[WS DEBUG] 📤 Sending Action: ${action}`, payload);
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      const state = this.socket ? ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][this.socket.readyState] : 'NULL';
      console.error(`[WS DEBUG] ❌ Cannot send. Socket State: ${state}`);
      toast.error('Real-time connection is down. Please wait or refresh.');
      return false;
    }

    this.socket.send(JSON.stringify({
      action,
      ...payload
    }));
    return true;
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
