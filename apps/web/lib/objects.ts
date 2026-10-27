/**
 * Single source of truth for objects and their curated material palettes.
 * Palettes deliberately repeat across compatible families as the collection grows;
 * don't invent an unrelated brand colour for every new component.
 */
export type ObjectStatus = "available" | "planned";
export type ObjectArt = "envelope" | "journal" | "polaroid" | "sticky";

export type ObjectEntry = {
  id: string;
  name: string;
  collection: string;
  description: string;
  status: ObjectStatus;
  art: ObjectArt;
  href?: string;
  palette: "paper" | "botanical" | "lilac" | "butter";
};

export const objects: ObjectEntry[] = [
  {
    id: "001",
    name: "Envelope",
    collection: "Paper",
    description: "A little note worth opening.",
    status: "available",
    art: "envelope",
    href: "/components/envelope",
    palette: "paper",
  },
  {
    id: "002",
    name: "Journal",
    collection: "Paper",
    description: "Pages you can actually turn.",
    status: "planned",
    art: "journal",
    palette: "botanical",
  },
  {
    id: "003",
    name: "Polaroid",
    collection: "Memories",
    description: "A moment that slowly develops.",
    status: "planned",
    art: "polaroid",
    palette: "lilac",
  },
  {
    id: "004",
    name: "Sticky Note",
    collection: "Paper",
    description: "Peel, place, and rethink.",
    status: "planned",
    art: "sticky",
    palette: "butter",
  },
];
