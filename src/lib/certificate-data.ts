export interface Certificate {
  id: string;
  title?: string;
  category: string;
  image: string;
  actualCertificateImage?: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  skills?: string;
}
