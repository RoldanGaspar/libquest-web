export interface DDCShelf {
  shelfID: string;
  shelfCode: string;
  categoryTitle: string;
  targetCollege: string;
  iconType: string;
  generalCollectionSummary: string;
  studentGuidance: string;
  floor: "ground" | "second" | "third";
  lastUpdated: string;
}

export interface DDCShelfCatalog {
  version: string;
  lastUpdated: string;
  shelves: DDCShelf[];
}
