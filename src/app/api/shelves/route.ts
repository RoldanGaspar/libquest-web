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
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
          "Surrogate-Control": "no-store",
        },
      });
    }

    // 2. Return compact JSON payload with zero edge caching
    return NextResponse.json(catalog, {
      status: 200,
      headers: {
        "ETag": versionTag,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    console.error("[API /api/shelves] Unexpected error:", error);
    return NextResponse.json(INITIAL_CATALOG, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
