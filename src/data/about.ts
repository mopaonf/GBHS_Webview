export type SchoolFact = {
  label: string;
  value: string;
  placeholder?: boolean;
};

export type PrincipalMessageData = {
  name: string;
  title: string;
  photo?: string;
  pullQuote: string;
  paragraphs: string[];
};

export type LeadershipMember = {
  name: string;
  role: string;
  responsibility: string;
  photo?: string;
};

export type StudentLeader = {
  name: string;
  role: string;
  photo?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  subject?: string;
  photo?: string;
  bio?: string;
};

// TODO: replace with real information
export const schoolFacts: SchoolFact[] = [
  { label: "Founded", value: "19XX", placeholder: true },
  { label: "Motto", value: "Placeholder motto", placeholder: true },
  { label: "Location", value: "Ntamulung - Bamenda II" },
  { label: "Classes", value: "Form 1 to Upper Sixth" },
];

// TODO: replace with real information
export const principalMessage: PrincipalMessageData = {
  name: "Principal's Name",
  title: "Principal, GBHS Bamenda",
  photo: "/images/complete-bilingual-school-experience.png",
  pullQuote: "Every learner should feel welcomed, challenged, and ready for what comes next.",
  paragraphs: [
    "Welcome to GBHS Bamenda, a school community shaped by the belief that every learner deserves a warm welcome and the confidence to participate fully. We aim to make school a place where curiosity is encouraged and every voice is treated with care.",
    "Our shared values of curiosity, creativity, confidence, and collaboration guide the way we learn and live together. They help us build thoughtful relationships, make room for new ideas, and support one another through each stage of the school journey.",
    "We hold high ambitions for our students and support them as they work towards their GCE Ordinary Level and Advanced Level. Academic challenge sits alongside the wider development of independent, responsible, and kind young people.",
    "To parents and families, thank you for the trust you place in our community. We look forward to working with you openly and warmly as we help each student discover their strengths and take their next step.",
  ],
};

// TODO: replace with real information
export const leadership: LeadershipMember[] = [
  { name: "Principal's Name", role: "Principal", responsibility: "Sets the direction and culture of the school.", photo: "/images/complete-bilingual-school-experience.png" },
  { name: "Mr. Surname", role: "Vice Principal", responsibility: "Supports learning and student life across the school." },
  { name: "Mrs. Surname", role: "Dean of Studies", responsibility: "Supports learning and student life across the school." },
  { name: "Mr. Surname", role: "Discipline Master", responsibility: "Helps students grow through clear expectations and care." },
];

// TODO: replace with real information
export const studentLeaders: StudentLeader[] = [
  { name: "Senior Prefect Boy", role: "Senior Prefect Boy" },
  { name: "Senior Prefect Girl", role: "Senior Prefect Girl" },
  { name: "Assistant Senior Prefect Boy", role: "Assistant Senior Prefect Boy" },
  { name: "Assistant Senior Prefect Girl", role: "Assistant Senior Prefect Girl" },
];

// TODO: replace with real information
export const staff: StaffMember[] = [
  { id: "staff-1", name: "Mr. Surname", role: "Teacher", department: "Sciences", subject: "Mathematics" },
  { id: "staff-2", name: "Mrs. Surname", role: "Teacher", department: "Sciences", subject: "Biology" },
  { id: "staff-3", name: "Mr. Surname", role: "Teacher", department: "Sciences", subject: "Physics" },
  { id: "staff-4", name: "Mrs. Surname", role: "Teacher", department: "Languages", subject: "English" },
  { id: "staff-5", name: "Mr. Surname", role: "Teacher", department: "Languages", subject: "French" },
  { id: "staff-6", name: "Mrs. Surname", role: "Teacher", department: "Arts and Humanities", subject: "History" },
  { id: "staff-7", name: "Mr. Surname", role: "Teacher", department: "Arts and Humanities", subject: "Geography" },
  { id: "staff-8", name: "Mrs. Surname", role: "Teacher", department: "Technical and Vocational", subject: "Computer Science" },
  { id: "staff-9", name: "Mr. Surname", role: "Teacher", department: "Technical and Vocational", subject: "Technical Drawing" },
  { id: "staff-10", name: "Mrs. Surname", role: "Administration", department: "Administration", subject: "School office" },
  { id: "staff-11", name: "Mr. Surname", role: "Administration", department: "Administration", subject: "Admissions" },
  { id: "staff-12", name: "Mrs. Surname", role: "Teacher", department: "Sciences", subject: "Chemistry" },
];
