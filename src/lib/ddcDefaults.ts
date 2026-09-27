import { DDCShelf, DDCShelfCatalog } from "@/types/shelf";

export const INITIAL_DDC_SHELVES: DDCShelf[] = [
  // =========================================================================
  // GROUND FLOOR (18 Objects)
  // =========================================================================
  {
    shelfID: "00.01 - 320.99 to 321.00 - 424.99",
    shelfCode: "00.01 - 320.99 to 321.00 - 424.99",
    categoryTitle: "General Works, Philosophy, Religion & Social Sciences",
    targetCollege: "College of Arts and Sciences / General Education",
    iconType: "Journal",
    generalCollectionSummary: "Comprehensive stacks covering DDC Classes 000 (Computer Science, Information, Systems), 100 (Philosophy & Psychology), 200 (Religion & Mythology), 300 (Social Sciences, Law, Education), and 400 (Language & Linguistics).",
    studentGuidance: "Ground floor main aisle stacks. Check DDC range 000–424.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 12.4, y: 16.2 },
    subdivisions: [
      "[000 – GENERALITIES & INFORMATION]",
      "Bibliography",
      "Library & Information Sciences",
      "General Encyclopedic works",
      "General serials & their indexes",
      "General organizations & Museology",
      "News media, journalism, publishing",
      "General collections",
      "Manuscripts & rare books",
      "[100 – PHILOSOPHY & PSYCHOLOGY]",
      "Metaphysics",
      "Epistemology, causation, humankind",
      "Paranormal phenomena",
      "Specific Philosophical Schools",
      "Psychology",
      "Logic",
      "Ethics (Moral Philosophy)",
      "Ancient, medieval, Oriental philosophy",
      "Modern Western philosophy",
      "[200 – RELIGION & THEOLOGY]",
      "Natural theology",
      "Bible",
      "Christian theology",
      "Christian moral & devotional theology",
      "Christian orders & local church",
      "Christian social theology",
      "Christian church history",
      "Christian denominations & sects",
      "Other & comparative religions",
      "[300 – SOCIAL SCIENCES]",
      "Political science",
      "Economics",
      "Law",
      "Public administration",
      "Social services; associations",
      "Education",
      "Commerce, communications, transport",
      "Customs, etiquette, folklore",
      "[400 – LANGUAGE & LINGUISTICS]",
      "Linguistics",
      "English & Old English",
      "Germanic languages; German",
      "Romance languages; French",
      "Italian, Romanian, Rhaeto-Romantic",
      "Spanish & Portuguese languages",
      "Italic languages; Latin",
      "Hellenic languages; Classical Greek",
      "Other languages"
    ],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "425.00 - 550.00 to 550.01 - 612.00",
    shelfCode: "425.00 - 550.00 to 550.01 - 612.00",
    categoryTitle: "Languages, Pure Sciences & Early Applied Sciences",
    targetCollege: "College of Arts and Sciences / Engineering",
    iconType: "Star",
    generalCollectionSummary: "Covers grammar, linguistics (400s), pure sciences including mathematics, physics, chemistry, biology, earth sciences (500s), and human physiology / early medical sciences (600s).",
    studentGuidance: "Ground floor middle aisle. Call numbers 425 to 612.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 16.4, y: 16.2 },
    subdivisions: [
      "[400 – LANGUAGE & LINGUISTICS]",
      "425 - English Grammar & Syntax",
      "[500 – NATURAL SCIENCES & MATHEMATICS]",
      "500 - Pure Sciences & Natural Sciences",
      "510 - Mathematics & Geometry",
      "530 - Physics & Chemistry",
      "550 - Earth Sciences & Geology",
      "570 - Life Sciences & Biology",
      "[600 – TECHNOLOGY & APPLIED SCIENCES]",
      "610 - Human Anatomy & Medical Sciences"
    ],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "612.01 - 631.29 to 631.30 - 634.69",
    shelfCode: "612.01 - 631.29 to 631.30 - 634.69",
    categoryTitle: "Medical Sciences, Engineering & Crop Agriculture",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Human anatomy, pharmacology, engineering operations, agricultural engineering, agronomy, soil chemistry, and field crop cultivation (DDC 612–634).",
    studentGuidance: "Ground floor agriculture stacks. Call numbers 612.01 to 634.69.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 20.5, y: 16.2 },
    subdivisions: [
      "612 - Human Physiology & Health",
      "620 - Engineering & Applied Sciences",
      "630 - Agriculture & Farming Systems",
      "631 - Agronomy, Soil Sciences & Irrigation",
      "632 - Plant Pathology & Pest Management",
      "633 - Field Crops & Cereals",
      "634 - Orchards, Fruit Culture & Forestry"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "634.70 - 636.29 to 636.30 - 658.09",
    shelfCode: "634.70 - 636.29 to 636.30 - 658.09",
    categoryTitle: "Horticulture, Animal Husbandry & Commercial Tech",
    targetCollege: "College of Veterinary Medicine & Agriculture",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Fruit culture, forestry, animal husbandry, poultry science, veterinary medicine, home economics, and commercial operations (DDC 634–658).",
    studentGuidance: "Ground floor agriculture & animal science stacks. Call numbers 634.70 to 658.09.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 10.6, y: 53.9 },
    subdivisions: [
      "635 - Garden Crops & Horticulture",
      "636 - Animal Husbandry & Poultry",
      "637 - Dairy Products & Processing",
      "639 - Fisheries, Aquaculture & Wildlife",
      "640 - Home Economics & Food Management",
      "650 - Business & Management Auxiliaries"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "658.10 - 658.79",
    shelfCode: "658.10 - 658.79",
    categoryTitle: "Business Administration & Management",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Corporate organization, financial administration, executive management, personnel management, and business logistics (DDC 658).",
    studentGuidance: "Ground floor management aisle. Call numbers 658.10 to 658.79.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 10.6, y: 67.9 },
    subdivisions: [
      "658.1 - Corporate Organization & Finance",
      "658.3 - Human Resource Management",
      "658.4 - Executive Leadership & Strategy",
      "658.5 - Production & Operations Management",
      "658.7 - Materials Management & Logistics"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "658.10 - 699.99",
    shelfCode: "658.10 - 699.99",
    categoryTitle: "Applied Management, Chemical Tech & Manufacturing",
    targetCollege: "College of Business Studies & Engineering",
    iconType: "Journal",
    generalCollectionSummary: "Comprehensive management literature, marketing, chemical engineering, manufacturing processes, and building construction (DDC 658–699).",
    studentGuidance: "Ground floor south stacks. Call numbers 658.10 to 699.99.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 10.6, y: 48.4 },
    subdivisions: [
      "658 - Enterprise & Business Management",
      "660 - Chemical Engineering & Technology",
      "670 - Manufacturing & Factory Operations",
      "680 - Manufacture for Specific Uses",
      "690 - Construction & Building Trades"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "700.00 - 807.99",
    shelfCode: "700.00 - 807.99",
    categoryTitle: "The Arts, Recreation & World Literature Stacks",
    targetCollege: "College of Arts and Sciences / General Education",
    iconType: "Star",
    generalCollectionSummary: "Civic & landscape art, architecture, sculpture, painting, photography, music, sports, recreation, and literary criticism (DDC 700–807).",
    studentGuidance: "Ground floor west wall stacks. Call numbers 700 to 807.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 15.2, y: 70.4 },
    subdivisions: [
      "700 - The Arts & Art History",
      "720 - Architectural Design & Spaces",
      "740 - Graphic Arts & Drawing",
      "770 - Photography & Digital Imaging",
      "780 - Music & Performing Arts",
      "790 - Sports, Recreation & Athletics",
      "800 - Literature, Criticism & Rhetoric"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "808.00 - 808.819",
    shelfCode: "808.00 - 808.819",
    categoryTitle: "Rhetoric, Literary Composition & Poetry Anthologies",
    targetCollege: "College of Arts and Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Rhetoric, speech communication, creative writing, literary collections, and poetry anthologies (DDC 808).",
    studentGuidance: "Ground floor west wall stacks. Call numbers 808.00 to 808.819.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 20.6, y: 70.4 },
    subdivisions: [
      "808.0 - Composition & Style Guides",
      "808.1 - Poetry Analysis & Anthologies",
      "808.3 - Fiction Writing Techniques",
      "808.5 - Public Speaking & Debate",
      "808.8 - World Literary Collections"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "808.82 - 939.99",
    shelfCode: "808.82 - 939.99",
    categoryTitle: "Drama, World Literature & Ancient World History",
    targetCollege: "College of Arts and Sciences / General Education",
    iconType: "Compass",
    generalCollectionSummary: "Dramatic literature, world literary anthologies, geography, travel, biographies, and ancient world history (DDC 808–939).",
    studentGuidance: "Ground floor southwest stacks. Call numbers 808.82 to 939.99.",
    floor: "ground",
    zone: "ddc_stacks",
    position: { x: 25.4, y: 70.4 },
    subdivisions: [
      "808.82 - Drama & Theatrical Works",
      "820 - English Literature & Essays",
      "899 - Philippine & Austronesian Literatures",
      "900 - World History & Civilization",
      "910 - Geography, Cartography & Travel",
      "920 - Biography & Memoir Collections",
      "930 - Ancient History to 499 AD"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "Fiction 1",
    shelfCode: "FICTION 1",
    categoryTitle: "Fiction & Novels (Authors A–H)",
    targetCollege: "All Students & Leisure Readers",
    iconType: "Journal",
    generalCollectionSummary: "Koleksyon ng mga nobelang Ingles at Filipino, contemporary fiction, at literary prose mula A hanggang H.",
    studentGuidance: "Nasa hilagang pader ng General Circulation Hall.",
    floor: "ground",
    zone: "circulation",
    position: { x: 6.0, y: 47.4 },
    subdivisions: [
      "Contemporary Philippine Novels (A-H)",
      "Young Adult Fiction & Bestsellers",
      "Literary Classics & Drama (A-H)"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "Fiction 2",
    shelfCode: "FICTION 2",
    categoryTitle: "Fiction & Literature (Authors I–P)",
    targetCollege: "All Students & Leisure Readers",
    iconType: "Journal",
    generalCollectionSummary: "Pangalawang seksyon ng mga kathang-isip at international bestsellers mula I hanggang P.",
    studentGuidance: "Nasa gitnang hilagang pader ng General Circulation Hall.",
    floor: "ground",
    zone: "circulation",
    position: { x: 6.0, y: 56.4 },
    subdivisions: [
      "World Literature & Novels (I-P)",
      "Mystery, Adventure & Historical Fiction",
      "Filipino Contemporary Literature (I-P)"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "Fiction 3",
    shelfCode: "FICTION 3",
    categoryTitle: "Classic Literature (Authors Q–Z)",
    targetCollege: "All Students & Leisure Readers",
    iconType: "Journal",
    generalCollectionSummary: "Mga klasikong panitikan, anthologies, at nobela mula Q hanggang Z.",
    studentGuidance: "Nasa dulong hilagang pader ng General Circulation Hall.",
    floor: "ground",
    zone: "circulation",
    position: { x: 6.0, y: 66.8 },
    subdivisions: [
      "Classic Masterpieces & Anthologies (Q-Z)",
      "Science Fiction & Modern Fantasy",
      "Literature & Translated Works (Q-Z)"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "GRADUATE STUDIES",
    shelfCode: "GRADUATE STUDIES",
    categoryTitle: "Graduate Studies Collection",
    targetCollege: "Graduate School / Advanced Research",
    iconType: "Journal",
    generalCollectionSummary: "Koleksyon ng mga masteral at doctoral theses, research monographs, at specialized academic references para sa post-graduate studies.",
    studentGuidance: "Nasa unang malaking estante sa kanang bahagi ng Circulation and Reservation Room.",
    floor: "ground",
    zone: "circulation",
    position: { x: 25.8, y: 51.2 },
    subdivisions: [
      "Doctoral Dissertations (Ph.D. / Ed.D.)",
      "Master of Science Theses (M.S. Agriculture / Forestry)",
      "Master in Business Administration (MBA Papers)",
      "Educational Leadership & Curriculum Studies"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "TEN YEARS RECENCY A",
    shelfCode: "10-YR RECENCY (A)",
    categoryTitle: "Ten Years Recency (Stack A)",
    targetCollege: "General Circulation / All Colleges",
    iconType: "Journal",
    generalCollectionSummary: "Unang bahagi ng pinakabagong mga aklat (published within the last 10 years) para sa pananaliksik ng mga mag-aaral.",
    studentGuidance: "Nasa dulong estante sa itaas na kanang bahagi ng Circulation and Reservation Room.",
    floor: "ground",
    zone: "circulation",
    position: { x: 25.8, y: 60.6 },
    subdivisions: [
      "Agriculture & Life Sciences (2016-Present)",
      "Veterinary & Animal Science Recent Titles",
      "Environmental Science & Agroforestry"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "TEN YEARS RECENCY B",
    shelfCode: "10-YR RECENCY (B)",
    categoryTitle: "Ten Years Recency (Stack B)",
    targetCollege: "General Circulation / All Colleges",
    iconType: "Journal",
    generalCollectionSummary: "Koleksyon ng mga aklat na inilathala sa loob ng nakaraang sampung taon para sa updated instructional reference at curriculum-aligned study.",
    studentGuidance: "Nasa gitnang estante sa kanang bahagi ng Circulation and Reservation Room.",
    floor: "ground",
    zone: "circulation",
    position: { x: 25.8, y: 55.8 },
    subdivisions: [
      "Engineering & Computer Science (2016-Present)",
      "Business & Hospitality Recent Publications",
      "Teacher Education & Social Sciences"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "COMPUTER ID SCANNER",
    shelfCode: "ID SCANNER",
    categoryTitle: "Computer ID Scanner Turnstile",
    targetCollege: "All Students & Faculty",
    iconType: "Monitor",
    generalCollectionSummary: "Electronic entrance turnstile para sa biometric at barcode scanning ng PSAU Student ID alinsunod sa Library Entry Protocols.",
    studentGuidance: "Nasa pangunahing bungad ng library entrance lobby.",
    floor: "ground",
    zone: "facility",
    position: { x: 43.5, y: 76.8 },
    subdivisions: [
      "Biometric Fingerprint Scanner",
      "Barcode & RFID Student ID Reader",
      "Automated Turnstile Gate Entry",
      "Library Attendance Monitoring System"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "BAGGAGE",
    shelfCode: "BAGGAGE COUNTER",
    categoryTitle: "Baggage Drop-off Counter",
    targetCollege: "All Students & Visitors",
    iconType: "Storage",
    generalCollectionSummary: "Lalagyan ng bag, backpacks, at personal na gamit ng mga estudyante bago pumasok sa reading at stack areas.",
    studentGuidance: "Nasa bungad ng kwarto sa tapat ng entrance doors.",
    floor: "ground",
    zone: "facility",
    position: { x: 39.1, y: 69.0 },
    subdivisions: [
      "Bag Deposit Counter",
      "Personal Belongings Security Cubbies",
      "Visitor Baggage Pass Verification",
      "Library Security Checkpoint"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "OPAC TERMINAL ",
    shelfCode: "OPAC TERMINAL",
    categoryTitle: "Online Public Access Catalog (OPAC)",
    targetCollege: "All Students & Faculty",
    iconType: "Monitor",
    generalCollectionSummary: "Dedicated computer terminals para mag-search ng availability, author, call numbers, at shelf location ng mga aklat sa PSAU library.",
    studentGuidance: "Nakatayo malapit sa entrance partition at katabi ng circulation desk.",
    floor: "ground",
    zone: "facility",
    position: { x: 28.8, y: 28.0 },
    subdivisions: [
      "Koha Online Public Access Catalog",
      "Title, Author & Subject Search",
      "Book Call Number & Shelf Location Finder",
      "Real-Time Book Availability Check"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },

  // =========================================================================
  // SECOND FLOOR (28 Objects: 1 Facility, 13 Filipiniana/Special, 13 Theses)
  // =========================================================================
  {
    shelfID: "Facility_BookReturn",
    shelfCode: "RETURN BOX",
    categoryTitle: "Circulation Book Return Station",
    targetCollege: "All Borrowers",
    iconType: "Storage",
    generalCollectionSummary: "Drop box para sa pagsasauli ng hiniram na libro pagkatapos ng borrowing period o kung sarado ang counter upang maiwasan ang multa.",
    studentGuidance: "Nasa bukana ng 2nd floor malapit sa hagdan at Filipiniana Section.",
    floor: "second",
    zone: "facility",
    position: { x: 21.0, y: 52.3 },
    subdivisions: [
      "Automated Book Return Drop Slot",
      "Circulation Check-In Station",
      "Barcode Return Scanner",
      "Cleared Borrowing Account Status"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 01: FIL 001.3 — FIL 304.6",
    shelfCode: "FIL 001.3 — FIL 304.6",
    categoryTitle: "Filipiniana: Generalities to Social Groups",
    targetCollege: "All Students & Researchers",
    iconType: "Journal",
    generalCollectionSummary: "Philippine research, humanities, indigenous knowledge systems, Philippine psychology, and sociological studies.",
    studentGuidance: "Filipiniana Row 1, Unit 01. Stacks FIL 001.3 to FIL 304.6.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 21.0, y: 64.3 },
    subdivisions: [
      "FIL 001 - Philippine Generalities & Research",
      "FIL 100 - Filipino Philosophy & Values",
      "FIL 200 - Philippine Church History & Faith",
      "FIL 300 - Filipino Social Systems & Culture"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 02: FIL 305.3 — FIL 338.16",
    shelfCode: "FIL 305.3 — FIL 338.16",
    categoryTitle: "Filipiniana: Social Structure & Agrarian Economics",
    targetCollege: "College of Education & Social Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Philippine gender studies, community development, political science, and agricultural economics in the Philippines.",
    studentGuidance: "Filipiniana Row 1, Unit 02. Stacks FIL 305.3 to FIL 338.16.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 21.0, y: 71.5 },
    subdivisions: [
      "FIL 305 - Social Groups & Philippine Communities",
      "FIL 320 - Philippine Politics & Governance",
      "FIL 330 - Philippine Economics & Agrarian Reform",
      "FIL 338 - Philippine Agricultural Industries"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 03: FIL 338.4 — FIL 371.10",
    shelfCode: "FIL 338.4 — FIL 371.10",
    categoryTitle: "Filipiniana: Philippine Industry & Education",
    targetCollege: "College of Education & Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Philippine economic industries, labor laws, public administration, and pedagogical systems in Philippine schools.",
    studentGuidance: "Filipiniana Row 1, Unit 03. Stacks FIL 338.4 to FIL 371.10.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 21.0, y: 78.0 },
    subdivisions: [
      "FIL 338.4 - Philippine Services & Manufacturing",
      "FIL 340 - Philippine Constitution & Laws",
      "FIL 350 - Public Administration & Local Government",
      "FIL 370 - Philippine Education System"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 04: FIL 371.27 — FIL 428",
    shelfCode: "FIL 371.27 — FIL 428",
    categoryTitle: "Filipiniana: Educational Assessment & Tagalog Linguistics",
    targetCollege: "College of Education & Arts & Sciences",
    iconType: "Journal",
    generalCollectionSummary: "School administration, educational testing, Filipino language studies, grammar, and bilingual education.",
    studentGuidance: "Filipiniana Row 1, Unit 04. Stacks FIL 371.27 to FIL 428.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 21.0, y: 84.0 },
    subdivisions: [
      "FIL 371 - School Management & Educational Tests",
      "FIL 380 - Philippine Commerce & Trade",
      "FIL 390 - Filipino Customs, Folklore & Traditions",
      "FIL 400 - Wikang Filipino & Katutubong Wika"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 05: FIL 428 — FIL 574.07",
    shelfCode: "FIL 428 — FIL 574.07",
    categoryTitle: "Filipiniana: Philippine Languages & Local Flora/Fauna",
    targetCollege: "College of Arts & Sciences",
    iconType: "Star",
    generalCollectionSummary: "Philippine linguistics, mathematics education in the Philippines, and Philippine biodiversity and biological studies.",
    studentGuidance: "Filipiniana Row 2, Unit 05. Stacks FIL 428 to FIL 574.07.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 10.1, y: 82.9 },
    subdivisions: [
      "FIL 428 - Philippine English & Bilingualism",
      "FIL 499 - Tagalog, Kapampangan & Regional Dialects",
      "FIL 500 - Philippine Flora, Fauna & Natural Sciences",
      "FIL 550 - Philippine Geology & Natural Hazards"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 06: FIL 574.88 — FIL 630",
    shelfCode: "FIL 574.88 — FIL 630",
    categoryTitle: "Filipiniana: Philippine Biology & Tropical Agriculture",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Tropical ecosystems, Philippine medicinal plants, public health in the Philippines, and baseline Philippine agriculture.",
    studentGuidance: "Filipiniana Row 2, Unit 06. Stacks FIL 574.88 to FIL 630.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 12.5, y: 82.8 },
    subdivisions: [
      "FIL 574 - Philippine Ecology & Biodiversity",
      "FIL 610 - Traditional Philippine Herbal Medicine",
      "FIL 620 - Philippine Engineering Innovations",
      "FIL 630 - Tropical Agriculture & Crop Production"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 07: FIL 630 — FIL 633.18",
    shelfCode: "FIL 630 — FIL 633.18",
    categoryTitle: "Filipiniana: Philippine Rice Farming & Crop Production",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Philippine rice farming techniques (Palay), soil management, irrigation, and field crop production across Luzon.",
    studentGuidance: "Filipiniana Row 2, Unit 07. Stacks FIL 630 to FIL 633.18.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 15.1, y: 82.7 },
    subdivisions: [
      "FIL 631 - Philippine Soil Science & Irrigation",
      "FIL 632 - Tropical Pest Management in PH",
      "FIL 633 - Rice (Palay) Cultivation & Corn Crops",
      "FIL 633.18 - Comprehensive Philippine Rice Studies"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 08: FIL 633.18 — FIL 693.3",
    shelfCode: "FIL 633.18 — FIL 693.3",
    categoryTitle: "Filipiniana: Livestock, Fisheries & Applied Philippine Tech",
    targetCollege: "College of Veterinary Medicine & Agriculture",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Philippine animal husbandry, aquaculture, native dishes and culinary arts, and local construction methods.",
    studentGuidance: "Filipiniana Row 2, Unit 08. Stacks FIL 633.18 to FIL 693.3.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 17.4, y: 82.8 },
    subdivisions: [
      "FIL 634 - Philippine Fruit Crops & Agroforestry",
      "FIL 636 - Carabao, Cattle & Poultry in PH",
      "FIL 639 - Philippine Freshwater & Marine Aquaculture",
      "FIL 641 - Kapampangan & Regional Filipino Cuisine"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 09: FIL 641.33 — FIL 659.1",
    shelfCode: "FIL 641.33 — FIL 659.1",
    categoryTitle: "Filipiniana: Philippine Commerce, Accounting & Marketing",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Filipino entrepreneurship, accounting practices, business marketing, and small enterprise management.",
    studentGuidance: "Filipiniana Row 3, Unit 09. Stacks FIL 641.33 to FIL 659.1.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 10.1, y: 90.0 },
    subdivisions: [
      "FIL 641 - Culinary Arts & Food Technology",
      "FIL 650 - Philippine Small & Medium Enterprises (SMEs)",
      "FIL 657 - Philippine Accounting & Taxation",
      "FIL 658 - Filipino Corporate Management Styles"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 10: FIL 660.6 — FIL 808.84",
    shelfCode: "FIL 660.6 — FIL 808.84",
    categoryTitle: "Filipiniana: Philippine Arts & Literature Anthologies",
    targetCollege: "College of Arts & Sciences",
    iconType: "Star",
    generalCollectionSummary: "Philippine art history, music, film, folk traditions, and literary essays written in Filipino and English.",
    studentGuidance: "Filipiniana Row 3, Unit 10. Stacks FIL 660.6 to FIL 808.84.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 12.5, y: 90.0 },
    subdivisions: [
      "FIL 660 - Philippine Biotechnology & Sugar Tech",
      "FIL 700 - Traditional Filipino Arts & Architecture",
      "FIL 780 - Kundiman & Original Pilipino Music (OPM)",
      "FIL 800 - Panitikang Pilipino & Sanaysay"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 11: FIL 808.85 — FIL 899.9",
    shelfCode: "FIL 808.85 — FIL 899.9",
    categoryTitle: "Filipiniana: Tagalog & Kapampangan Literary Works",
    targetCollege: "College of Arts & Sciences",
    iconType: "Journal",
    generalCollectionSummary: "Kapampangan poetry, plays, epic narratives, contemporary Philippine novels, and regional folklore.",
    studentGuidance: "Filipiniana Row 3, Unit 11. Stacks FIL 808.85 to FIL 899.9.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 15.1, y: 90.0 },
    subdivisions: [
      "FIL 808 - Philippine Speeches & Balagtasan",
      "FIL 899 - Tagalog, Ilokano & Kapampangan Literature",
      "FIL 899.2 - Mga Maikling Kwento at Nobela",
      "FIL 899.3 - Contemporary Philippine Poetry"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 12: FIL 900 — FIL 920",
    shelfCode: "FIL 900 — FIL 920",
    categoryTitle: "Filipiniana: Philippine History & Provincial Biographies",
    targetCollege: "All Students & Historians",
    iconType: "Compass",
    generalCollectionSummary: "General Philippine history, pre-colonial chronicles, the Philippine Revolution, and national hero biographies.",
    studentGuidance: "Filipiniana Row 3, Unit 12. Stacks FIL 900 to FIL 920.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 17.4, y: 90.0 },
    subdivisions: [
      "FIL 900 - Kasaysayan ng Pilipinas (Pre-Colonial to Present)",
      "FIL 910 - Heograpiya at Turismo ng Pilipinas",
      "FIL 920 - Talambuhay ng mga Bayani at Pangulo",
      "FIL 929 - Talaangkanan at Historical Chronicles"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "RIZALIANA: FIL 920 — FIL 959",
    shelfCode: "RIZALIANA: FIL 920 — FIL 959",
    categoryTitle: "Rizaliana Collection & Local Heritage",
    targetCollege: "All PSAU Students (GE-Rizal)",
    iconType: "Compass",
    generalCollectionSummary: "Comprehensive scholarly collection on Dr. Jose Rizal's life, writings, novels (Noli Me Tangere, El Filibusterismo), and Magalang / Pampanga historical records.",
    studentGuidance: "Second floor Rizaliana special bay. Required reading for Rizal course.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 21.0, y: 90.0 },
    subdivisions: [
      "Buhay, Ginawa at Sinulat ni Dr. Jose Rizal",
      "Noli Me Tangere & El Filibusterismo Analyses",
      "Rizal's Letters, Poems & Historical Essays",
      "The Philippine Revolution & Katipunan History"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SPECIAL SECTION: TEN YEARS RECENCY",
    shelfCode: "SPECIAL: 10-YR RECENCY",
    categoryTitle: "Second Floor 10-Years Recency Special Stacks",
    targetCollege: "All Academic Colleges",
    iconType: "Journal",
    generalCollectionSummary: "Recent acquisitions and reference textbooks in Filipiniana and agricultural disciplines published within the last decade.",
    studentGuidance: "Second floor dedicated recency shelf near the study carrels.",
    floor: "second",
    zone: "filipiniana",
    position: { x: 11.5, y: 41.1 },
    subdivisions: [
      "Recent Philippine Academic Publications",
      "Updated Philippine Law & Jurisprudence (2016-Present)",
      "Philippine Statistics Authority (PSA) Compendiums",
      "Contemporary Philippine Agricultural Research"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },

  // THESIS SECTION (Shelving Units 01–13)
  {
    shelfID: "SHELVING UNIT 01 BS ENTREPRENURSHIP UT AND TR",
    shelfCode: "THESIS UNIT 01",
    categoryTitle: "BS Entrepreneurship (UT / TR)",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Undergraduate Theses at Terminal Reports para sa BS Entrepreneurship. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row A, Unit 01.",
    floor: "second",
    zone: "theses",
    position: { x: 19.3, y: 35.8 },
    subdivisions: [
      "Business Feasibility Studies & Business Plans",
      "Agri-Enterprise Startup Models",
      "Market Demand & Product Innovation Theses",
      "Terminal Reports on Small Business Incubation"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 02 BS BIOLOGY UNDERGRADUATE THESIS (UT) & BS FISHERIES UNDERGRADUATE THESIS (UT)",
    shelfCode: "THESIS UNIT 02",
    categoryTitle: "BS Biology & BS Fisheries (UT)",
    targetCollege: "College of Arts & Sciences / Agriculture",
    iconType: "Star",
    generalCollectionSummary: "Undergraduate Theses for BS Biology and BS Fisheries covering aquatic ecosystems, botanical biodiversity, and fish culture. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row A, Unit 02.",
    floor: "second",
    zone: "theses",
    position: { x: 23.7, y: 35.8 },
    subdivisions: [
      "Plant & Animal Botanical Surveys (Mt. Arayat)",
      "Microbiology & Ethnobotanical Studies",
      "Freshwater Tilapia & Catfish Aquaculture",
      "Fish Nutrition, Water Quality & Hatchery Studies"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 03 BS AGRICULTURAL BUSINESS UNDERGRADUATE THESIS (UT)  SPECIAL PROBLEM (SP)",
    shelfCode: "THESIS UNIT 03",
    categoryTitle: "BS Agricultural Business (UT / SP)",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Undergraduate Theses and Special Problems in Agribusiness value chain analysis, agricultural marketing, and enterprise management. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row A, Unit 03.",
    floor: "second",
    zone: "theses",
    position: { x: 28.0, y: 35.8 },
    subdivisions: [
      "Agribusiness Supply Chain Management",
      "Value Chain Analysis of Rice & Sweet Potato",
      "Agricultural Cooperative Management",
      "Special Problem Practicum Research"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 04 BS INFORMATION TECHNOLOGY UNDERGRADUATE THESIS (UT)  CAPSTONE PROJECT (CP)",
    shelfCode: "THESIS UNIT 04",
    categoryTitle: "BS Information Technology (UT / CP)",
    targetCollege: "College of Engineering & Computer Studies",
    iconType: "Monitor",
    generalCollectionSummary: "Capstone Projects, Software Documentation, and Systems Engineering theses submitted by BSIT graduates. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row A, Unit 04.",
    floor: "second",
    zone: "theses",
    position: { x: 16.5, y: 46.2 },
    subdivisions: [
      "Web & Mobile Information Systems",
      "Internet of Things (IoT) in Smart Agriculture",
      "Library Management & E-Learning Portals",
      "Database & Android Mobile Applications"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 05 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT)  FARM PRACTICES (FP)",
    shelfCode: "THESIS UNIT 05",
    categoryTitle: "BSA Animal Science (UT / FP - Vol 1)",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Undergraduate Theses and Farm Practices reports focusing on livestock management, swine production, and poultry science. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row A, Unit 05.",
    floor: "second",
    zone: "theses",
    position: { x: 21.3, y: 46.2 },
    subdivisions: [
      "Swine & Broiler Growth Performance Studies",
      "Alternative Forage & Feed Formulations",
      "Ruminant Nutrition (Goat, Cattle, Carabao)",
      "Poultry Farm Practicum Operations"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 06 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT) FARM PRACTICES (FP)",
    shelfCode: "THESIS UNIT 06",
    categoryTitle: "BSA Animal Science (UT / FP - Vol 2)",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Continuing volume of BSA Animal Science undergraduate research and field farm practices. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row A, Unit 06.",
    floor: "second",
    zone: "theses",
    position: { x: 25.0, y: 46.2 },
    subdivisions: [
      "Livestock Disease Prevention & Sanitation",
      "Animal Breeding & Reproductive Physiology",
      "Pasture Management & Silage Production",
      "Commercial Livestock Farm Practices"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 07 BSA ANIMAL SCIENCE FARM PRACTICES (FP), BSA MATHEMATICS UNDERGRADUATE THESIS (UT), BSA AGROFORESTRY UNDERGRADUATE THESIS (UT) FIELD PRACTICUM (FP)",
    shelfCode: "THESIS UNIT 07",
    categoryTitle: "Animal Sci / Math / Agroforestry (UT / FP)",
    targetCollege: "CAST & CAS",
    iconType: "Journal",
    generalCollectionSummary: "Interdisciplinary manuscripts spanning Animal Science farm practices, Applied Mathematics theses, and Agroforestry field practicums. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 07.",
    floor: "second",
    zone: "theses",
    position: { x: 16.5, y: 53.0 },
    subdivisions: [
      "Livestock Production Management",
      "Applied Statistical Models & Mathematical Research",
      "Agroforestry Farming Systems & Carbon Sequestration",
      "Watershed & Forest Nursery Practicum"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 08 BS DEVELOPEMTN COMMUNICATION UNDERGRADAUTE THESIS (UT), BS FORESTRY UNDERGRADUATE THESIS (UT)",
    shelfCode: "THESIS UNIT 08",
    categoryTitle: "BS DevComm & BS Forestry (UT)",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "Journal",
    generalCollectionSummary: "Undergraduate Theses on Development Communication, community extension, forest conservation, and watershed management. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 08.",
    floor: "second",
    zone: "theses",
    position: { x: 21.3, y: 53.0 },
    subdivisions: [
      "Community Journalism & Development Broadcasting",
      "Educational Information Campaigns in Agriculture",
      "Silviculture & Forest Tree Species Ecology",
      "Timber & Non-Timber Forest Product Valuation"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 09 BS HOSPITALITY MANAGEMENT PRACTICUM REPORT (PR)",
    shelfCode: "THESIS UNIT 09",
    categoryTitle: "BS Hospitality Management (PR - Vol 1)",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Practicum and terminal industry training reports in hotel, restaurant, and resort operations submitted by BSHM seniors. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 09.",
    floor: "second",
    zone: "theses",
    position: { x: 25.0, y: 53.0 },
    subdivisions: [
      "Hotel & Resort Front Office Operations",
      "Food & Beverage Management Practicum",
      "Housekeeping Operations & Customer Service",
      "Culinary Industry On-the-Job Training Archives"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 10 BS HOSPITALITY MANAGEMENT PRACTICUM REPORT (PR) UNDERGRADAUTE THESIS REASEARCH PAPER (PR)",
    shelfCode: "THESIS UNIT 10",
    categoryTitle: "BS Hospitality Management (PR / UT - Vol 2)",
    targetCollege: "College of Business Studies",
    iconType: "Journal",
    generalCollectionSummary: "Advanced undergraduate research papers and practicum reports on hospitality trends, tourism, and food service. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 10.",
    floor: "second",
    zone: "theses",
    position: { x: 29.8, y: 53.0 },
    subdivisions: [
      "Tourism Destination Planning & Development",
      "Food Safety & Sanitation Compliance Studies",
      "Event Management & Catering Case Studies",
      "Hospitality Customer Satisfaction Research"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 11 BAELS UNDERGRADAUTE THESIS (UT), BS GEODETIC ENGINEERING UNDERGRADUATE THESIS (UT)",
    shelfCode: "THESIS UNIT 11",
    categoryTitle: "BAELS & BS Geodetic Engineering (UT)",
    targetCollege: "CAS & College of Engineering",
    iconType: "Journal",
    generalCollectionSummary: "Undergraduate theses in English language linguistics, discourse analysis, geodetic surveying, GIS mapping, and cadastral systems. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 11.",
    floor: "second",
    zone: "theses",
    position: { x: 16.5, y: 59.5 },
    subdivisions: [
      "Discourse Analysis & Sociolinguistic Studies",
      "English Language Teaching & Pedagogy",
      "Topographic Land Surveying & Cadastral Mapping",
      "Geographic Information Systems (GIS) Remote Sensing"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 12 BSA ABE UNDERGRADAUTE THESIS (UT)",
    shelfCode: "THESIS UNIT 12",
    categoryTitle: "BS Agricultural & Biosystems Engineering (UT)",
    targetCollege: "College of Engineering",
    iconType: "Star",
    generalCollectionSummary: "Theses in agricultural mechanization, post-harvest engineering, renewable energy, and soil & water conservation engineering. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 12.",
    floor: "second",
    zone: "theses",
    position: { x: 21.3, y: 59.5 },
    subdivisions: [
      "Farm Power & Agricultural Machinery Design",
      "Postharvest Handling, Drying & Processing Systems",
      "Soil & Water Conservation Engineering",
      "Farm Structures & Renewable Energy Applications"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVING UNIT 13 BS CROP SCIENCE UNDERGRADAUTE THESIS (UT) FARM PRACTICES (FP), BS AGRICULTURE UNDERGRADUATE THESIS (UT)",
    shelfCode: "THESIS UNIT 13",
    categoryTitle: "BS Crop Science & BS Agriculture (UT / FP)",
    targetCollege: "College of Agriculture Systems & Technology",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Crop breeding, soil management, agronomy, farm practices, and comprehensive agricultural research papers. Room Use Only.",
    studentGuidance: "Nasa Thesis Section, Second Floor. Row B, Unit 13.",
    floor: "second",
    zone: "theses",
    position: { x: 29.8, y: 46.2 },
    subdivisions: [
      "Organic Fertilizer & Biostimulant Field Trials",
      "Crop Protection against Pests & Fungi",
      "Varietal Evaluation of Corn, Rice & Vegetables",
      "Seed Technology, Propagation & Farm Practicum"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },

  // =========================================================================
  // THIRD FLOOR (8 Objects: 1 Admin Desk, 5 Reference Shelves, 1 Periodicals, 1 Reading Area)
  // =========================================================================
  {
    shelfID: "Facility_AdminInfoDesk",
    shelfCode: "ADMIN & INFO DESK",
    categoryTitle: "Administration & Information Desk (OLM)",
    targetCollege: "All Students, Faculty & Visitors",
    iconType: "Monitor",
    generalCollectionSummary: "Office of Library Services and Museum (OLM). Sentrong tanggapan para sa opisyal na konsultasyon, student clearance, reference guidance, at pamamahala ng aklatan sa pamumuno ni OIC Director Sharon G. Rulloda.",
    studentGuidance: "Third Floor main administrative foyer directly across the stairs.",
    floor: "third",
    zone: "facility",
    position: { x: 48.0, y: 35.0 },
    subdivisions: [
      "Office of Library Services Management",
      "Student Clearance & Account Validation",
      "Reference Librarian Consultation Desk",
      "Inter-Library Loan & External Resource Inquiries"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVE REF 1",
    shelfCode: "REF SHELF 1",
    categoryTitle: "General Reference: Dictionaries & Encyclopedias",
    targetCollege: "All Colleges & General Education",
    iconType: "Journal",
    generalCollectionSummary: "General encyclopedias, international multilingual dictionaries, biographical dictionaries, and language references. Room Use Only.",
    studentGuidance: "Third Floor Reference Section, Unit 1.",
    floor: "third",
    zone: "reference",
    position: { x: 18.0, y: 40.0 },
    subdivisions: [
      "General Encyclopedias (Britannica, Americana)",
      "English & Multilingual Dictionaries (Oxford, Webster)",
      "Thesauri & Language Reference Handbooks",
      "Biographical Dictionaries & World Almanacs"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVE REF 2",
    shelfCode: "REF SHELF 2",
    categoryTitle: "Scientific & Technical Reference Handbooks",
    targetCollege: "College of Engineering & Pure Sciences",
    iconType: "Star",
    generalCollectionSummary: "Engineering handbooks, scientific tables, mathematical formulas, chemical reference data, and environmental encyclopedias. Room Use Only.",
    studentGuidance: "Third Floor Reference Section, Unit 2.",
    floor: "third",
    zone: "reference",
    position: { x: 22.0, y: 40.0 },
    subdivisions: [
      "Science & Technology Reference Handbooks",
      "CRC Handbooks of Chemistry & Physics",
      "Engineering Formulas & Technical Tables",
      "Biological & Environmental Science Encyclopedias"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVE REF 3",
    shelfCode: "REF SHELF 3",
    categoryTitle: "Agricultural & Biological Reference Manuals",
    targetCollege: "College of Agriculture & Veterinary Medicine",
    iconType: "HolographicBookCrest",
    generalCollectionSummary: "Comprehensive veterinary compendiums, agricultural encyclopedias, botanical guides, and plant disease handbooks. Room Use Only.",
    studentGuidance: "Third Floor Reference Section, Unit 3.",
    floor: "third",
    zone: "reference",
    position: { x: 26.0, y: 40.0 },
    subdivisions: [
      "Agricultural Reference Encyclopedias",
      "Soil, Fertilizer & Plant Nutrient Manuals",
      "Veterinary Drug Compendiums & Disease Handbooks",
      "Pest & Weed Control Global Manuals"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVE REF 4",
    shelfCode: "REF SHELF 4",
    categoryTitle: "Social Sciences, Law & Statistical Yearbooks",
    targetCollege: "College of Education & Social Sciences",
    iconType: "Compass",
    generalCollectionSummary: "Philippine statistical yearbooks, legal codes, educational directories, and international organization reports. Room Use Only.",
    studentGuidance: "Third Floor Reference Section, Unit 4.",
    floor: "third",
    zone: "reference",
    position: { x: 18.0, y: 55.0 },
    subdivisions: [
      "Social Science & Law Reference Collections",
      "Philippine Law Reprints & Legal Dictionaries",
      "Education & Educational Research Handbooks",
      "Business & Financial Reference Manuals"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "SHELVE REF 5",
    shelfCode: "REF SHELF 5",
    categoryTitle: "Atlases, Gazetteers & Geographic Indices",
    targetCollege: "All Students & Researchers",
    iconType: "Compass",
    generalCollectionSummary: "World and Philippine cartographic atlases, topographical maps, geographical gazetteers, and chronological almanacs. Room Use Only.",
    studentGuidance: "Third Floor Reference Section, Unit 5.",
    floor: "third",
    zone: "reference",
    position: { x: 22.0, y: 55.0 },
    subdivisions: [
      "Literature Reference & Poetry Indexes",
      "Historical Atlases & World Gazetteers",
      "Philosophical & Theological Reference Works",
      "Bibliographical Directories & Citation Guides"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "Shelf_REF_ReferencePeriodicals",
    shelfCode: "PERIODICALS & SERIALS",
    categoryTitle: "Bound Periodicals & Academic Journals",
    targetCollege: "All Researchers & Graduate Students",
    iconType: "Journal",
    generalCollectionSummary: "Bound volumes of Philippine and international peer-reviewed journals, agricultural magazines, university research bulletins, and newspapers. Room Use Only.",
    studentGuidance: "Third Floor Periodicals Section east wall racks.",
    floor: "third",
    zone: "periodicals",
    position: { x: 28.0, y: 55.0 },
    subdivisions: [
      "Philippine Agricultural Research Journals",
      "CHED-Accredited Scholarly Journals",
      "International Science & Technology Serials",
      "Bound Scholarly Periodicals & Archives"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  },
  {
    shelfID: "READING AREA",
    shelfCode: "QUIET STUDY AREA",
    categoryTitle: "Third Floor Quiet Study & Reading Zone",
    targetCollege: "All Students",
    iconType: "Journal",
    generalCollectionSummary: "Itinalagang tahimik na lugar para sa seryosong pag-aaral at pananaliksik. Panatilihing maayos ang mga upuan at mesa. Mahigpit na ipinagbabawal ang pag-iwan ng personal na gamit, pagkain, at maingay na usapan.",
    studentGuidance: "Third Floor open hall with individual study carrels.",
    floor: "third",
    zone: "facility",
    position: { x: 45.0, y: 65.0 },
    subdivisions: [
      "Designated Silent Study Booths",
      "Wide Collaborative Research Desks",
      "Comfortable Ergonomic Seating",
      "Power Outlets for Academic Laptops"
],
    lastUpdated: "2026-09-27T00:00:00Z"
  }
];

export const INITIAL_CATALOG: DDCShelfCatalog = {
  version: "2.0",
  lastUpdated: "2026-09-27T00:00:00Z",
  shelves: INITIAL_DDC_SHELVES
};
