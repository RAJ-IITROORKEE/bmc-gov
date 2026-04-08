export interface PrincipalMessageItem {
  id: string;
  key: string;
  name: string;
  designation: string;
  message: string;
  profileImageUrl: string;
  officeEmail: string | null;
  updatedAt: string;
}

export interface PrincipalMessageInput {
  name: string;
  designation: string;
  message: string;
  profileImageUrl: string;
  officeEmail?: string;
}
