import { DDCShelf, DDCShelfCatalog } from "@/types/shelf";

export const INITIAL_DDC_SHELVES: DDCShelf[] = [
  {
    shelfID: "Shelf_DDC_000_ComputerScience",
    shelfCode: "SHELF 004–006",
    categoryTitle: "Computer Science & Programming",
    targetCollege: "College of Engineering and Computer Studies",
    iconType: "Journal",
    generalCollectionSummary: "Programming, software, database at computer networks.",
    studentGuidance: "Stack 000.01–320.99. Call number C 004–006.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_100_Philosophy",
    shelfCode: "SHELF 100–199",
    categoryTitle: "Philosophy & Psychology",
    targetCollege: "General Education / CAS",
    iconType: "Journal",
    generalCollectionSummary: "Pilosopiya, sikolohiya, ethics, at lohika.",
    studentGuidance: "Ground floor general stacks 100–199.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_200_Religion",
    shelfCode: "SHELF 200–299",
    categoryTitle: "Religion & Mythology",
    targetCollege: "General Education / CAS",
    iconType: "Journal",
    generalCollectionSummary: "Relihiyon, mitolohiya, theology, at world faiths.",
    studentGuidance: "Ground floor general stacks 200–299.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_300_SocialSciences",
    shelfCode: "SHELF 300–399",
    categoryTitle: "Social Sciences & Education",
    targetCollege: "College of Education and Social Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Batas, sosyolohiya, edukasyon, ekonomiya at lipunan.",
    studentGuidance: "Stack 000.01–320.99 at 321.00–424.99. Call number C 300–399.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_400_Language",
    shelfCode: "SHELF 400–499",
    categoryTitle: "Language & Linguistics",
    targetCollege: "College of Arts and Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Grammar, linggwistika, diksyunaryo, at wikang banyaga.",
    studentGuidance: "Ground floor general stacks 400–499.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_500_PureSciences",
    shelfCode: "SHELF 500–599",
    categoryTitle: "Pure Sciences & Mathematics",
    targetCollege: "College of Arts and Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Math, chemistry, physics, biology, at ecology.",
    studentGuidance: "Stack 425.00–550.00 at 550.01–612.00. Call number C 500–599.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_600_Agriculture",
    shelfCode: "SHELF 630–639",
    categoryTitle: "Agriculture & Animal Science",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "Journal",
    generalCollectionSummary: "Pananim at palay, lupa, peste, forestry at paghahayupan.",
    studentGuidance: "Stack 612.01–634.69, nagpapatuloy sa 634.70–658.09. Call number C 630–639.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_600_Technology",
    shelfCode: "SHELF 600–629",
    categoryTitle: "Technology & Applied Sciences",
    targetCollege: "College of Engineering and Computer Studies",
    iconType: "Journal",
    generalCollectionSummary: "Engineering, applied sciences, manufacturing at teknolohiya.",
    studentGuidance: "Ground floor general stacks 600–629.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_636_AnimalHusbandry",
    shelfCode: "SHELF 636",
    categoryTitle: "Animal Husbandry & Livestock",
    targetCollege: "College of Veterinary Medicine & Agriculture",
    iconType: "Journal",
    generalCollectionSummary: "Pagaalaga ng hayop, poultry, swine, at pasture management.",
    studentGuidance: "West wall stacks 636.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_637_Veterinary",
    shelfCode: "SHELF 637–658",
    categoryTitle: "Veterinary & Dairy Science",
    targetCollege: "College of Veterinary Medicine",
    iconType: "Journal",
    generalCollectionSummary: "Veterinary medicine, dairy processing, at animal health.",
    studentGuidance: "West wall stacks 637–658.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_658_Management",
    shelfCode: "SHELF 658",
    categoryTitle: "Management & Commerce",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Business management, accounting, marketing, at entrepreneurship.",
    studentGuidance: "West wall stacks 658.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_660_ChemicalEngg",
    shelfCode: "SHELF 660–699",
    categoryTitle: "Chemical Engineering",
    targetCollege: "College of Engineering",
    iconType: "Journal",
    generalCollectionSummary: "Chemical technology, manufacturing, at food processing.",
    studentGuidance: "West wall stacks 660–699.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_700_Arts",
    shelfCode: "SHELF 700–799",
    categoryTitle: "Arts & Recreation",
    targetCollege: "College of Arts and Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Musika, sining, arkitektura, sports, at recreation.",
    studentGuidance: "Ground floor general stacks 700–799.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_800_Literature",
    shelfCode: "SHELF 800–899",
    categoryTitle: "Literature",
    targetCollege: "General Education / All Colleges",
    iconType: "Journal",
    generalCollectionSummary: "Tula, dula, sanaysay, rhetoric at literary criticism.",
    studentGuidance: "Mga bookcase sa pader: 700.00–807.99, 808.00–808.819 at 808.82–939.99.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_900_History",
    shelfCode: "SHELF 900–999",
    categoryTitle: "History & Geography",
    targetCollege: "General Education / All Colleges",
    iconType: "Journal",
    generalCollectionSummary: "Kasaysayan ng daigdig, heograpiya, talambuhay, at mapa.",
    studentGuidance: "Ground floor general stacks 900–999.",
    floor: "ground",
    lastUpdated: "2026-09-24T00:00:00Z"
  },
  {
    shelfID: "Shelf_DDC_FIL_Filipiniana",
    shelfCode: "FILIPINIANA (FIL)",
    categoryTitle: "Filipiniana Collection",
    targetCollege: "All Students & Researchers",
    iconType: "Journal",
    generalCollectionSummary: "Mga aklat tungkol sa Pilipinas o isinulat ng mga Pilipino, kasama ang Pampanga.",
    studentGuidance: "Filipiniana Section, Second Floor. Ang call number ay nagsisimula sa FIL.",
    floor: "second",
    lastUpdated: "2026-09-24T00:00:00Z"
  }
];

export const INITIAL_CATALOG: DDCShelfCatalog = {
  version: "1.0",
  lastUpdated: "2026-09-24T00:00:00Z",
  shelves: INITIAL_DDC_SHELVES
};
