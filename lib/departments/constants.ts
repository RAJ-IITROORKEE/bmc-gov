export const DEFAULT_ROLE_HIERARCHY = [
  { key: "hod", label: "Head of Department" },
  { key: "professor_msvp", label: "Professor & MSVP" },
  { key: "professor", label: "Professor" },
  { key: "associate_professor", label: "Associate Professor" },
  { key: "assistant_professor", label: "Assistant Professor" },
  { key: "tutor", label: "Tutor" },
  { key: "demonstrator", label: "Demonstrator" },
  { key: "senior_resident", label: "Senior Resident" },
  { key: "junior_resident", label: "Junior Resident" },
  { key: "postgraduate_trainee", label: "Postgraduate Trainee" },
  { key: "other", label: "Other" },
] as const;

export const PROFESSOR_ROLE_KEYS = new Set<string>([
  "professor_msvp",
  "professor",
  "associate_professor",
  "assistant_professor",
]);
