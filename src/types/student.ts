export interface StudentRecord {
  uid: string;
  fullName: string;
  email: string;
  studentId: string;
  characterType: "Boy" | "Girl";
  role: "student" | "admin";
  createdAt: string;
}
