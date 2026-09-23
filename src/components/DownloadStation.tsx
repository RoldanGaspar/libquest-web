"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, QrCode, Smartphone, HelpCircle, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";

export const DownloadStation: React.FC = () => {
  // Configurable download link (Google Drive / Mediafire / Direct)
  const [downloadUrl] = useState(
    process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || 
    "https://drive.google.com/drive/folders/libquest-psau-apk-placeholder"
  );

  const [showInstallGuide, setShowInstallGuide] = useState(false);

  return (
    <section id="download" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Smartphone className="w-4 h-4" />
            <span>Android Mobile Installation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Download LibQuest for Android
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Get the APK directly on your phone or scan the QR code from your computer screen.
          </p>
        </div>

        {/* Download Card Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          {/* Left Column: Direct Download Details */}
          <div className="space-y-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-3">
                BUILD: v1.0.0-CAPSTONE-LTS
              </div>
              <h3 className="text-2xl font-bold text-white">LibQuest Android APK</h3>
              <p className="text-xs text-slate-400 mt-1">
                Target: Android 10.0+ (ARM64 / Landscape 60 FPS Target)
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Offline Story & Exploration Mode</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>PSAU 3D Library & Agricultural Museum</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Automatic local save progression (JSON)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Cloud sync support for updated DDC shelves</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Direct Download APK</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={() => setShowInstallGuide(!showInstallGuide)}
                className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-all"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>{showInstallGuide ? "Hide Guide" : "Install Guide"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: QR Code Station */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
            <div className="p-3 bg-white rounded-xl shadow-lg shadow-black/40 mb-3">
              <QRCodeSVG
                value={downloadUrl}
                size={160}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 mb-1">
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan to Download on Phone</span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-[200px]">
              Open your phone camera to scan and start downloading the APK directly.
            </p>
          </div>
        </div>

        {/* Expandable Installation Guide */}
        {showInstallGuide && (
          <div className="max-w-4xl mx-auto mt-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>How to Install on Android Devices</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed pl-1">
              <li>
                <strong className="text-white">Download the APK:</strong> Click the button above or scan the QR code to save the `.apk` file to your device.
              </li>
              <li>
                <strong className="text-white">Allow Unknown Sources:</strong> When prompted by Android, go to <em>Settings &gt; Security (or Apps)</em> and enable <em>&quot;Install unknown apps&quot;</em> for your browser or file manager.
              </li>
              <li>
                <strong className="text-white">Install and Open:</strong> Tap the downloaded file in your Notification tray or Downloads folder and tap <strong>Install</strong>.
              </li>
              <li>
                <strong className="text-white">Start Orienting:</strong> Launch <strong>LibQuest</strong> from your app drawer. You can play 100% offline immediately!
              </li>
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};
