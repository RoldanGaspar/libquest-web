import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { INITIAL_CATALOG } from "@/lib/ddcDefaults";
import { DDCShelfCatalog } from "@/types/shelf";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    let catalog: DDCShelfCatalog = INITIAL_CATALOG;

    // Attempt to read published catalog from Firestore
    try {
      const catalogRef = doc(db, "catalogs", "ddc_shelves");
      const snap = await getDoc(catalogRef);
      if (snap.exists()) {
        catalog = snap.data() as DDCShelfCatalog;
      }
    } catch (firestoreError) {
      console.warn("[API /api/shelves] Firestore read failed, serving default catalog:", firestoreError);
      catalog = INITIAL_CATALOG;
    }

    const versionTag = `"${catalog.version || "1.0"}"`;

    // 1. Check client ETag for 304 Not Modified optimization
    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch && ifNoneMatch === versionTag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          "ETag": versionTag,
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    // 2. Return compact JSON payload
    return NextResponse.json(catalog, {
      status: 200,
      headers: {
        "ETag": versionTag,
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    console.error("[API /api/shelves] Unexpected error:", error);
    return NextResponse.json(INITIAL_CATALOG, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }
}
