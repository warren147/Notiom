export interface NotiomDoc {
  _id: string;
  user?: string;
  title: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityLog {
  _id: string;
  documentId: string;
  type: 'create' | 'update' | string;
  message: string;
  timestamp: string;
}
