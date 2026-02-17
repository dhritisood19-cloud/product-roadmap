"use client";

import { useState } from "react";

interface PhaseItem {
  text: string;
  tag?: "automated" | "agent" | "improvement" | "new";
}

interface Phase {
  id: number;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  productInterventions: PhaseItem[];
  cxInterventions: PhaseItem[];
}

const phases: Phase[] = [
  {
    id: 1,
    name: "Phase 1",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-600",
    productInterventions: [
      { text: "FAQ Restructuring", tag: "improvement" },
      { text: "Enhanced visibility on app troubleshooting (manifest on homescreen also)", tag: "improvement" },
      { text: "Enhanced support discoverability", tag: "improvement" },
      { text: "Language switching option - more visibility", tag: "improvement" },
    ],
    cxInterventions: [
      { text: "Adapting categories based on VOCs we get", tag: "improvement" },
      { text: "Categorise available tags as Automated & Agent Required", tag: "automated" },
      { text: "CSAT scale change", tag: "improvement" },
      { text: "Existing tagging system update", tag: "improvement" },
    ],
  },
  {
    id: 2,
    name: "Phase 2",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconBg: "bg-purple-600",
    productInterventions: [
      { text: "Screen to Support - Every screen to have specific support articles", tag: "new" },
      { text: "Each article to have rich media", tag: "improvement" },
      { text: "Hidden contact support option only on TAGs where support is necessary", tag: "improvement" },
      { text: "Based on FAQ origin, invoke relevant support options (hand-hold user with VOC selection)", tag: "new" },
      { text: "Each screen to have dedicated bot flow with predefined user options to select", tag: "new" },
    ],
    cxInterventions: [
      { text: "Education First approach", tag: "new" },
      { text: "CSAT improvement plan", tag: "improvement" },
      { text: "Verloop inefficiencies leading to impacting experience - Deep dive", tag: "improvement" },
      { text: "SOPs across VOCs to be shared", tag: "improvement" },
    ],
  },
  {
    id: 3,
    name: "Phase 3",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    iconBg: "bg-emerald-600",
    productInterventions: [
      { text: "Ticket Tracker - In-app user ticket tracker for real-time status updates", tag: "new" },
      { text: "In-App Bot support", tag: "new" },
      { text: "In-App Voice support once bot structures across product journeys are finalized", tag: "new" },
    ],
    cxInterventions: [],
  },
];

function TagBadge({ tag }: { tag?: string }) {
  if (!tag) return null;
  const styles: Record<string, string> = {
    automated: "bg-sky-100 text-sky-700 border-sky-200",
    agent: "bg-amber-100 text-amber-700 border-amber-200",
    improvement: "bg-orange-100 text-orange-700 border-orange-200",
    new: "bg-green-100 text-green-700 border-green-200",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles[tag] || ""}`}>
      {tag}
    </span>
  );
}

function PhaseCard({ phase, isActive, onClick }: { phase: Phase; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer ${
        isActive
          ? `${phase.borderColor} ${phase.bgColor} shadow-lg scale-[1.02]`
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${phase.iconBg} flex items-center justify-center text-white font-bold text-sm`}>
          {phase.id}
        </div>
        <div>
          <h3 className={`text-lg font-bold ${isActive ? phase.color : "text-gray-800"}`}>{phase.name}</h3>
          <p className="text-xs text-gray-500">
            {phase.productInterventions.length + phase.cxInterventions.length} interventions
          </p>
        </div>
      </div>
    </button>
  );
}

function InterventionList({ title, items, accentColor }: { title: string; items: PhaseItem[]; accentColor: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${accentColor}`}>{title}</h4>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${accentColor.replace("text-", "bg-")}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-relaxed">{item.text}</p>
            </div>
            <TagBadge tag={item.tag} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activePhase, setActivePhase] = useState(0);
  const current = phases[activePhase];

  const totalItems = phases.reduce((sum, p) => sum + p.productInterventions.length + p.cxInterventions.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product & CX Interventions</h1>
              <p className="text-sm text-gray-500 mt-1">Phased roadmap for product and customer experience improvements</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{phases.length}</div>
                <div className="text-gray-500">Phases</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
                <div className="text-gray-500">Total Items</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2">
          {phases.map((phase, i) => (
            <div key={phase.id} className="flex-1 flex items-center gap-2">
              <div
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  i <= activePhase ? phase.iconBg : "bg-gray-200"
                }`}
              />
              {i < phases.length - 1 && (
                <svg className={`w-4 h-4 flex-shrink-0 ${i < activePhase ? "text-gray-600" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Phase Selector Sidebar */}
          <div className="lg:col-span-3 space-y-3">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.id} phase={phase} isActive={i === activePhase} onClick={() => setActivePhase(i)} />
            ))}

            {/* Legend */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TagBadge tag="new" />
                  <span className="text-xs text-gray-600">New Feature</span>
                </div>
                <div className="flex items-center gap-2">
                  <TagBadge tag="improvement" />
                  <span className="text-xs text-gray-600">Enhancement</span>
                </div>
                <div className="flex items-center gap-2">
                  <TagBadge tag="automated" />
                  <span className="text-xs text-gray-600">Automation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className={`lg:col-span-9 rounded-2xl border-2 ${current.borderColor} ${current.bgColor} p-8`}>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 rounded-xl ${current.iconBg} flex items-center justify-center text-white font-bold text-lg`}>
                {current.id}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${current.color}`}>{current.name}</h2>
                <p className="text-sm text-gray-500">
                  {current.productInterventions.length} product + {current.cxInterventions.length} CX interventions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <InterventionList
                title="Product Interventions"
                items={current.productInterventions}
                accentColor={current.color}
              />
              <InterventionList
                title="CX Interventions"
                items={current.cxInterventions}
                accentColor={current.color}
              />
            </div>

            {current.cxInterventions.length === 0 && (
              <div className="mt-4 p-6 rounded-xl bg-white/60 border border-dashed border-gray-300 text-center">
                <p className="text-sm text-gray-500">No CX interventions planned for this phase</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-gray-400 text-center">Product & CX Interventions Roadmap</p>
        </div>
      </footer>
    </div>
  );
}
