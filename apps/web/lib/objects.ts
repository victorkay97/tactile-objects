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
    description: "An inviting book with pages that turn.",
    status: "available",
    art: "journal",
    href: "/components/journal",
    palette: "botanical",
  },
  {
    id: "003",
    name: "Polaroid",
    collection: "Memories",
    description: "Watch a little moment develop and flip.",
    status: "available",
    art: "polaroid",
    href: "/components/polaroid",
    palette: "lilac",
  },
  {
    id: "004",
    name: "Sticky Note",
    collection: "Paper",
    description: "Peel it loose, move it, and pin it back.",
    status: "available",
    art: "sticky",
    href: "/components/sticky-note",
    palette: "butter",
  },
];
