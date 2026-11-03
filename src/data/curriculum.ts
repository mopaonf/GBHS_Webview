export type Stage = {
  id: string;
  label: string; // stepper label
  badge: string; // small line under the label
  title: string; // panel heading
  tagline: string;
  /** Each inner array is one slot. One entry = a single subject. Several entries = alternatives. */
  slots: string[][];
  classes?: { code: string; name: string }[];
};

const single = (subjects: string[]) => subjects.map((subject) => [subject]);

export const intro = {
  kicker: "Explore our",
  text: "Our ambitious curriculum supports the Cameroon pathway from Form 1 through Form 5, then Lower Sixth and Upper Sixth. Students build strong foundations for the GCE Ordinary Level and Advanced Level while being challenged to achieve their best.",
};

export const stages: Stage[] = [
  {
    id: "form-1-2",
    label: "Form 1 – 2",
    badge: "Foundation years",
    title: "Form 1 – 2",
    tagline: "A broad foundation across the sciences, languages, humanities and business subjects.",
    slots: single([
      "Mathematics",
      "Biology",
      "Citizenship",
      "English Language",
      "Computer Science",
      "Physics",
      "History",
      "French",
      "Accounting",
      "Geography",
      "Literature",
      "Chemistry",
      "Moral Education",
      "Business Mathematics",
    ]),
  },
  {
    id: "form-3",
    label: "Form 3",
    badge: "Building up",
    title: "Form 3",
    tagline: "Subjects widen to include Economics, Commerce and Logic as students build on their foundations.",
    slots: single([
      "Mathematics",
      "English Language",
      "Biology",
      "Citizenship",
      "Religious Studies",
      "Chemistry",
      "History",
      "Economics",
      "Commerce",
      "Computer Science",
      "Physics",
      "French",
      "Geography",
      "Literature",
      "Logic",
    ]),
  },
  {
    id: "form-4-5",
    label: "Form 4 – 5",
    badge: "GCE Ordinary Level",
    title: "Form 4 – 5",
    tagline: "Focused preparation for the GCE Ordinary Level, with subject options in selected areas.",
    slots: [
      ["Mathematics"],
      ["English Language"],
      ["Biology", "Commerce"],
      ["Citizenship", "Human Biology", "Additional Mathematics"],
      ["Religious Studies"],
      ["Chemistry", "History"],
      ["Economics"],
      ["Computer Science"],
      ["French"],
      ["Geography"],
      ["Literature", "Physics"],
      ["Logic"],
    ],
  },
  {
    id: "sixth-form",
    label: "Lower & Upper Sixth",
    badge: "GCE Advanced Level",
    title: "Lower & Upper Sixth",
    tagline: "Advanced study in grouped subject options, leading to the GCE Advanced Level.",
    classes: [
      { code: "LSS", name: "Lower Sixth Science" },
      { code: "LSA", name: "Lower Sixth Arts" },
      { code: "USS", name: "Upper Sixth Science" },
      { code: "USA", name: "Upper Sixth Arts" },
    ],
    slots: [
      ["Mathematics", "History"],
      ["Physics", "Geology", "Literature"],
      ["Biology", "Geography", "Computer Science", "English Language"],
      ["Economics", "Chemistry", "French"],
      ["Further Mathematics", "ICT"],
    ],
  },
];
