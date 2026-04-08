import type { PrincipalMessageInput } from "@/lib/principal-message/types";

export const PRINCIPAL_MESSAGE_KEY = "principal_message";

export const DEFAULT_PRINCIPAL_MESSAGE: PrincipalMessageInput = {
  name: "Prof. (Dr.) Mousumi Bandyopadhyay",
  designation: "Principal, Burdwan Medical College",
  message: `Welcome to Burdwan Medical College and Hospital, an institution with a rich legacy of excellence in medical education and healthcare services. Since our establishment, we have been committed to nurturing competent and compassionate healthcare professionals who serve society with dedication.

Our college provides a comprehensive learning environment where students receive hands-on clinical exposure, guided by experienced faculty members. We emphasize both academic excellence and ethical medical practice, preparing our students to meet the challenges of modern healthcare.

As we continue to grow and evolve, our focus remains steadfast on providing quality medical education, advancing research, and delivering superior patient care to the community we serve.`,
  profileImageUrl: "/bmc_logo.jpg",
  officeEmail: "",
};
