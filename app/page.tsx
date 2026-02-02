'use client'

import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Minus, Plus, Info } from 'lucide-react';

// Type Definitions
interface Phase {
  name: string;
  price: number;
}

interface ROIImpact {
  timeEfficiency: number;
  brandValue: number;
  brandValueType: 'multiplier' | 'fixed';
  conversionLift: number;
}

interface Prerequisites {
  required: string[];
  logic: 'AND' | 'OR';
  message: string;
}

interface Decision {
  id: string;
  name: string;
  section: 'brand' | 'interface';
  category: string;
  tooltip: string;
  phases: Phase[];
  prerequisites: Prerequisites | null;
  roiImpact: ROIImpact;
  packageType?: 'system-package' | 'supporting-service';
}

interface WebsiteService {
  id: string;
  name: string;
  category: string;
  tooltip: string;
}

interface TierInfo {
  tier: string;
}

interface WebsitePages {
  'visual-design': number;
  development: number;
}

// Decision Data
const decisions: Decision[] = [
  { id: 'logo', name: 'Mother Brand Logo', section: 'brand', category: 'FOUNDATION', tooltip: 'The visual symbol that represents your company. A well-designed logo builds instant recognition and trust with your audience.', phases: [{ name: 'Discovery & Research', price: 1000 }, { name: 'Exploration of 2-3 Directions', price: 1500 }, { name: 'Refinement & Delivery', price: 1500 }], prerequisites: null, roiImpact: { timeEfficiency: 5, brandValue: 1.15, brandValueType: 'multiplier', conversionLift: 4 } },
  { id: 'typography', name: 'Typography System', section: 'brand', category: 'FOUNDATION', tooltip: 'A structured set of fonts and text styles that ensure consistency across all communications, from websites to business cards.', phases: [{ name: 'Audit & Analysis', price: 500 }, { name: 'Font Selection', price: 800 }, { name: 'Hierarchy Definition', price: 700 }, { name: 'Guidelines & Documentation', price: 500 }], prerequisites: null, roiImpact: { timeEfficiency: 5, brandValue: 1.08, brandValueType: 'multiplier', conversionLift: 2 } },
  { id: 'naming', name: 'Product Naming Strategy', section: 'brand', category: 'FOUNDATION', tooltip: 'Strategic development of names for products, features, or sub-brands that align with your master brand and resonate with customers.', phases: [{ name: 'Brand Architecture Review', price: 1000 }, { name: 'Name Generation', price: 1500 }, { name: 'Screening & Shortlisting', price: 1000 }, { name: 'Testing & Validation', price: 1000 }, { name: 'Final Selection & Guidelines', price: 500 }], prerequisites: null, roiImpact: { timeEfficiency: 3, brandValue: 1.12, brandValueType: 'multiplier', conversionLift: 3 } },
  { id: 'colour', name: 'Colour System', section: 'brand', category: 'FOUNDATION', tooltip: 'A defined palette of primary, secondary, and accent colours that evoke the right emotions and ensure brand consistency.', phases: [{ name: 'Colour Psychology Analysis', price: 700 }, { name: 'Palette Development', price: 1000 }, { name: 'Accessibility Testing', price: 600 }, { name: 'Application Guidelines', price: 700 }], prerequisites: null, roiImpact: { timeEfficiency: 5, brandValue: 1.10, brandValueType: 'multiplier', conversionLift: 4 } },
  { id: 'brand-audit', name: 'Brand Audit', section: 'brand', category: 'STRATEGIC', tooltip: 'A comprehensive review of your current brand presence, identifying strengths, weaknesses, and opportunities for improvement.', phases: [{ name: 'Stakeholder Interviews', price: 2000 }, { name: 'Competitive Analysis', price: 1500 }, { name: 'Touchpoint Audit', price: 2000 }, { name: 'Recommendations Report', price: 1500 }], prerequisites: null, roiImpact: { timeEfficiency: 8, brandValue: 1.20, brandValueType: 'multiplier', conversionLift: 5 } },
  { id: 'brand-architecture', name: 'Brand Architecture', section: 'brand', category: 'STRATEGIC', tooltip: 'The organisational structure of your brand portfolio—how your master brand, sub-brands, and products relate to each other.', phases: [{ name: 'Portfolio Mapping', price: 2500 }, { name: 'Architecture Options', price: 3000 }, { name: 'Stakeholder Alignment', price: 2000 }, { name: 'Implementation Roadmap', price: 2500 }], prerequisites: { required: ['brand-audit'], logic: 'AND', message: 'Requires BRAND_AUDIT completion' }, roiImpact: { timeEfficiency: 10, brandValue: 1.25, brandValueType: 'multiplier', conversionLift: 6 } },
  { id: 'visual-language', name: 'Visual Language & Iconography', section: 'brand', category: 'APPLICATION', tooltip: 'The complete visual toolkit including icons, illustrations, and imagery guidelines that make your brand instantly recognisable.', phases: [{ name: 'Visual Audit', price: 3000 }, { name: 'Style Definition', price: 4000 }, { name: 'Icon Library Creation', price: 4000 }, { name: 'Guidelines & Templates', price: 3000 }], prerequisites: { required: ['logo', 'typography', 'colour'], logic: 'AND', message: 'Requires LOGO, TYPOGRAPHY, COLOUR' }, roiImpact: { timeEfficiency: 8, brandValue: 50000, brandValueType: 'fixed', conversionLift: 12 } },
  { id: 'marketing-collateral', name: 'Marketing Collateral System', section: 'brand', category: 'APPLICATION', tooltip: 'Templated systems for presentations, brochures, social media, and other marketing materials that stay on-brand.', phases: [{ name: 'Needs Assessment', price: 2500 }, { name: 'Template Design', price: 6000 }, { name: 'Template Build', price: 4000 }, { name: 'Training & Handover', price: 2500 }], prerequisites: { required: ['logo', 'typography', 'colour'], logic: 'AND', message: 'Requires LOGO, TYPOGRAPHY, COLOUR' }, roiImpact: { timeEfficiency: 7, brandValue: 35000, brandValueType: 'fixed', conversionLift: 7 } },
  { id: 'health-check', name: 'Design System Health Check', section: 'interface', category: 'PACKAGE', packageType: 'system-package', tooltip: 'A diagnostic audit of your existing design system, identifying inconsistencies, gaps, and quick wins for improvement.', phases: [{ name: 'System Intake', price: 2000 }, { name: 'Component Review', price: 4000 }, { name: 'Token & Accessibility Scan', price: 3000 }, { name: 'Improvement Plan', price: 3000 }], prerequisites: null, roiImpact: { timeEfficiency: 15, brandValue: 1.02, brandValueType: 'multiplier', conversionLift: 5 } },
  { id: 'refresh', name: 'Design System Refresh', section: 'interface', category: 'PACKAGE', packageType: 'system-package', tooltip: 'Modernisation of your existing design system—updating tokens, normalising components, and improving documentation.', phases: [{ name: 'Foundation Token Redesign', price: 8000 }, { name: 'Component Normalization', price: 12000 }, { name: 'Accessibility Improvements', price: 6000 }, { name: 'Documentation Update', price: 5000 }, { name: 'Design-Code Alignment', price: 4000 }, { name: 'Team Training', price: 3000 }], prerequisites: { required: ['health-check'], logic: 'AND', message: 'Requires HEALTH_CHECK' }, roiImpact: { timeEfficiency: 25, brandValue: 1.05, brandValueType: 'multiplier', conversionLift: 10 } },
  { id: 'migration', name: 'Design System Migration', section: 'interface', category: 'PACKAGE', packageType: 'system-package', tooltip: 'Complete overhaul of your design system—new architecture, rebuilt components, and full governance setup.', phases: [{ name: 'Discovery & Planning', price: 10000 }, { name: 'Full System Audit', price: 8000 }, { name: 'Token System Redesign', price: 12000 }, { name: 'Component Rebuild', price: 25000 }, { name: 'Migration Execution', price: 10000 }, { name: 'Governance Setup', price: 6000 }], prerequisites: { required: ['health-check'], logic: 'AND', message: 'Requires HEALTH_CHECK' }, roiImpact: { timeEfficiency: 40, brandValue: 1.08, brandValueType: 'multiplier', conversionLift: 15 } },
  { id: 'component-library', name: 'Component Library Build', section: 'interface', category: 'SERVICE', packageType: 'supporting-service', tooltip: 'A library of pre-built, tested UI components (buttons, forms, cards) that developers can use to build products faster.', phases: [{ name: 'Component Inventory', price: 6000 }, { name: 'Design Specifications', price: 12000 }, { name: 'Development', price: 20000 }, { name: 'Testing & Documentation', price: 7000 }, { name: 'Integration Support', price: 3000 }], prerequisites: { required: ['refresh', 'migration'], logic: 'OR', message: 'Requires REFRESH or MIGRATION' }, roiImpact: { timeEfficiency: 30, brandValue: 1.03, brandValueType: 'multiplier', conversionLift: 8 } },
  { id: 'design-ops', name: 'Design Ops & Governance', section: 'interface', category: 'SERVICE', packageType: 'supporting-service', tooltip: 'Processes, workflows, and tooling that help design teams work efficiently—contribution guidelines, review processes, and release management.', phases: [{ name: 'Process Audit', price: 3000 }, { name: 'Governance Framework', price: 5000 }, { name: 'Tooling Setup', price: 4000 }, { name: 'Documentation & Training', price: 3000 }, { name: 'Rollout Support', price: 3000 }], prerequisites: { required: ['health-check'], logic: 'AND', message: 'Requires HEALTH_CHECK' }, roiImpact: { timeEfficiency: 35, brandValue: 1.02, brandValueType: 'multiplier', conversionLift: 4 } },
  { id: 'figma-setup', name: 'Figma Library & Variables', section: 'interface', category: 'SERVICE', packageType: 'supporting-service', tooltip: 'Professional Figma setup with variables, organised component libraries, and file structures that scale with your team.', phases: [{ name: 'Library Architecture', price: 4000 }, { name: 'Variables Setup', price: 5000 }, { name: 'Component Migration', price: 6000 }, { name: 'Documentation', price: 2000 }, { name: 'Team Onboarding', price: 2000 }], prerequisites: { required: ['logo', 'typography', 'colour'], logic: 'AND', message: 'Requires LOGO, TYPOGRAPHY, COLOUR' }, roiImpact: { timeEfficiency: 20, brandValue: 1.01, brandValueType: 'multiplier', conversionLift: 3 } }
];

const websiteServices: WebsiteService[] = [
  { id: 'visual-design', name: 'Visual Design', category: 'DESIGN', tooltip: 'Page-by-page visual design including layout, typography, imagery, and UI elements that bring your brand to life digitally.' },
  { id: 'development', name: 'Development', category: 'BUILD', tooltip: 'Front-end development of designed pages into a fully functional, responsive website with clean, maintainable code.' }
];

const calculateVisualDesignPrice = (pages: number): number => {
  if (pages === 0) return 0;
  if (pages <= 10) return pages * 700;
  if (pages <= 25) return 4700 + (pages - 10) * 560;
  if (pages <= 50) return 11700 + (pages - 25) * 370;
  if (pages <= 100) return 19600 + (pages - 50) * 230;
  return 30000 + (pages - 100) * 185;
};

const calculateDevelopmentPrice = (pages: number): number => {
  if (pages === 0) return 0;
  if (pages <= 10) return pages * 800;
  if (pages <= 25) return 5300 + (pages - 10) * 640;
  if (pages <= 50) return 13300 + (pages - 25) * 430;
  if (pages <= 100) return 22400 + (pages - 50) * 270;
  return 35000 + (pages - 100) * 215;
};

const getTierInfo = (pages: number): TierInfo => {
  if (pages === 0) return { tier: '—' };
  if (pages <= 10) return { tier: 'TIER 1' };
  if (pages <= 25) return { tier: 'TIER 2' };
  if (pages <= 50) return { tier: 'TIER 3' };
  if (pages <= 100) return { tier: 'TIER 4' };
  return { tier: 'TIER 5' };
};

const systemPackageIds = ['health-check', 'refresh', 'migration'];
const formatCurrency = (amount: number): string => amount === 0 ? '—' : `£${amount.toLocaleString()}`;

const Tooltip = ({ content }: { content: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-[#1F1E24] hover:opacity-60 transition-opacity ml-2"
        aria-label="More information"
      >
        <Info size={14} />
      </button>
      {show && (
        <div className="absolute z-50 w-64 p-3 text-xs leading-relaxed bg-[#1F1E24] text-white shadow-lg left-6 top-0">
          {content}
        </div>
      )}
    </div>
  );
};

interface DataRowProps {
  index: number;
  decision: Decision;
  isActive: boolean;
  onToggle: () => void;
  showPrerequisite: boolean;
  prerequisiteMessage: string;
  expanded: boolean;
  onExpandToggle: () => void;
}

const DataRow = ({ index, decision, isActive, onToggle, showPrerequisite, prerequisiteMessage, expanded, onExpandToggle }: DataRowProps) => {
  const total = decision.phases.reduce((sum: number, p: Phase) => sum + p.price, 0);
  return (
    <>
      <tr className={`border-b border-[#1F1E24] transition-colors ${isActive ? 'bg-[#f5f5f5]' : 'hover:bg-gray-50'}`}>
        <td className="py-3 px-3 text-[#1F1E24] font-mono text-xs border-r border-[#1F1E24] w-12">{String(index).padStart(2, '0')}</td>
        <td className="py-3 px-4 border-r border-[#1F1E24]">
          <div className="flex items-center gap-3">
            <button onClick={onExpandToggle} className="text-[#1F1E24] hover:opacity-70 transition-colors">
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <span className="text-sm text-[#1F1E24]">{decision.name}</span>
            {decision.tooltip && <Tooltip content={decision.tooltip} />}
          </div>
        </td>
        <td className="py-3 px-3 border-r border-[#1F1E24] w-32">
          <span className="font-mono text-[10px] px-2 py-1 border border-[#1F1E24] text-[#1F1E24] bg-gray-50">{decision.category}</span>
        </td>
        <td className="py-3 px-3 border-r border-[#1F1E24] text-right font-mono text-sm w-24">
          <span className="text-[#1F1E24]">{isActive ? formatCurrency(total) : '—'}</span>
        </td>
        <td className="py-3 px-4 w-20">
          <label className="flex items-center justify-center cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={onToggle} className="sr-only" />
            <div className={`w-5 h-5 border-2 border-[#1F1E24] flex items-center justify-center transition-all ${isActive ? 'bg-transparent' : 'bg-transparent hover:bg-[#f5f5f5]'}`}>
              {isActive && <span className="text-[#1F1E24] text-xs font-bold">✓</span>}
            </div>
          </label>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-[#1F1E24] bg-[#fafafa]">
          <td colSpan={5} className="p-0">
            <div className="px-12 py-4">
              {showPrerequisite && prerequisiteMessage && (
                <div className="flex items-center gap-2 mb-4 text-[#1F1E24] text-xs font-mono">
                  <AlertTriangle size={12} />
                  <span>WARNING: {prerequisiteMessage}</span>
                </div>
              )}
              <div className="text-[#1F1E24] text-xs mb-3 font-mono">PHASE BREAKDOWN</div>
              <table className="w-full">
                <tbody>
                  {decision.phases.map((phase: Phase, idx: number) => (
                    <tr key={idx} className="border-b border-[#1F1E24] last:border-b-0">
                      <td className="py-2 text-[#1F1E24] font-mono text-xs w-8">{String(idx + 1).padStart(2, '0')}</td>
                      <td className="py-2 text-sm text-[#1F1E24]">{phase.name}</td>
                      <td className="py-2 text-right font-mono text-xs text-[#1F1E24]">{formatCurrency(phase.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 pt-3 border-t border-[#1F1E24] flex justify-between items-center">
                <span className="font-mono text-xs text-[#1F1E24]">SUBTOTAL</span>
                <span className="font-mono text-sm text-[#1F1E24]">{formatCurrency(total)}</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

interface WebsiteServiceRowProps {
  index: number;
  service: WebsiteService;
  pages: number;
  onPagesChange: (pages: number) => void;
  isActive: boolean;
  price: number;
}

const WebsiteServiceRow = ({ index, service, pages, onPagesChange, isActive, price }: WebsiteServiceRowProps) => {
  const tierInfo = getTierInfo(pages);
  return (
    <tr className={`border-b border-[#1F1E24] transition-colors ${isActive ? 'bg-[#f5f5f5]' : 'hover:bg-gray-50'}`}>
      <td className="py-3 px-3 text-[#1F1E24] font-mono text-xs border-r border-[#1F1E24] w-12">{String(index).padStart(2, '0')}</td>
      <td className="py-3 px-4 border-r border-[#1F1E24]">
        <div className="flex items-center">
          <span className="text-sm text-[#1F1E24]">{service.name}</span>
          {service.tooltip && <Tooltip content={service.tooltip} />}
        </div>
      </td>
      <td className="py-3 px-3 border-r border-[#1F1E24] w-32">
        <span className="font-mono text-[10px] px-2 py-1 border border-[#1F1E24] text-[#1F1E24] bg-gray-50">{service.category}</span>
      </td>
      <td className="py-3 px-3 border-r border-[#1F1E24] w-32">
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => onPagesChange(Math.max(0, pages - 1))} className="w-6 h-6 border border-[#1F1E24] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
            <Minus size={12} className="text-[#1F1E24]" />
          </button>
          <span className="font-mono text-sm text-[#1F1E24] w-8 text-center">{pages}</span>
          <button onClick={() => onPagesChange(pages + 1)} className="w-6 h-6 border border-[#1F1E24] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
            <Plus size={12} className="text-[#1F1E24]" />
          </button>
        </div>
      </td>
      <td className="py-3 px-3 border-r border-[#1F1E24] text-right font-mono text-sm w-24">
        <span className="text-[#1F1E24]">{formatCurrency(price)}</span>
      </td>
      <td className="py-3 px-3 w-20 text-center">
        <span className="font-mono text-[10px] text-[#1F1E24]">{tierInfo.tier}</span>
      </td>
    </tr>
  );
};

export default function DesignInvestmentCalculator() {
  const [activeDecisions, setActiveDecisions] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [websitePages, setWebsitePages] = useState<WebsitePages>({ 'visual-design': 0, 'development': 0 });

  const handleToggle = (decisionId: string) => {
    const decision = decisions.find(d => d.id === decisionId);
    if (!decision) return;
    if (decision.packageType === 'system-package') {
      setActiveDecisions(prev => {
        const next = new Set(prev);
        if (next.has(decisionId)) { next.delete(decisionId); }
        else { systemPackageIds.forEach(id => next.delete(id)); next.add(decisionId); }
        return next;
      });
    } else {
      setActiveDecisions(prev => {
        const next = new Set(prev);
        if (next.has(decisionId)) { next.delete(decisionId); } else { next.add(decisionId); }
        return next;
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const checkPrerequisites = (decision: Decision): { show: boolean; message: string } => {
    if (!decision.prerequisites) return { show: false, message: '' };
    const { required, logic, message } = decision.prerequisites;
    if (logic === 'OR') { return { show: !required.some((reqId: string) => activeDecisions.has(reqId)), message }; }
    return { show: !required.every((reqId: string) => activeDecisions.has(reqId)), message };
  };

  const updateWebsitePages = (serviceId: keyof WebsitePages, pages: number) => {
    setWebsitePages(prev => ({ ...prev, [serviceId]: pages }));
  };

  const section3Total = useMemo(() => {
    const visualPages = websitePages['visual-design'];
    const devPages = websitePages['development'];
    return calculateVisualDesignPrice(visualPages) + calculateDevelopmentPrice(devPages);
  }, [websitePages]);

  const calculations = useMemo(() => {
    let section1Total = 0, section2Total = 0, timeEfficiency = 0, brandMultiplier = 1, brandFixed = 0, conversionLift = 0;
    decisions.forEach(d => {
      if (activeDecisions.has(d.id)) {
        const cost = d.phases.reduce((sum, p) => sum + p.price, 0);
        if (d.section === 'brand') section1Total += cost; else section2Total += cost;
        timeEfficiency += d.roiImpact.timeEfficiency;
        if (d.roiImpact.brandValueType === 'multiplier') brandMultiplier *= d.roiImpact.brandValue;
        else brandFixed += d.roiImpact.brandValue;
        conversionLift += d.roiImpact.conversionLift;
      }
    });
    const brandValue = Math.round(brandFixed * brandMultiplier);
    const combinedTotal = section1Total + section2Total + section3Total;
    return { section1Total, section2Total, section3Total, combinedTotal, timeEfficiency: Math.min(timeEfficiency, 70), brandValue, conversionLift: Math.min(conversionLift, 45) };
  }, [activeDecisions, section3Total]);

  const brandDecisions = decisions.filter(d => d.section === 'brand');
  const interfaceDecisions = decisions.filter(d => d.section === 'interface');

  return (
    <div className="min-h-screen bg-white text-[#1F1E24] font-sans">
      <header className="border-b border-[#1F1E24] px-6 py-4">
        <div className="flex items-baseline gap-4">
          <h1 className="font-mono text-xs text-[#1F1E24]">BLOTT_SYS</h1>
          <span className="text-[#1F1E24]">/</span>
          <h2 className="text-sm tracking-wide text-[#1F1E24] font-bold">GTM INVESTMENT CALCULATOR</h2>
        </div>
      </header>

      <div className="border-b border-[#1F1E24] px-6 py-3 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-[#1F1E24]">SYSTEM ACTIVE</span>
          <span className="font-mono text-[10px] text-[#1F1E24]">|</span>
          <span className="font-mono text-[10px] text-[#1F1E24]">{activeDecisions.size} ITEMS SELECTED</span>
        </div>
        <div className="font-mono text-[10px] text-[#1F1E24]">v2.0.0</div>
      </div>

      <div className="flex">
        <div className="flex-1 border-r border-[#1F1E24]">
          {/* Section 01 */}
          <div className="border-b border-[#1F1E24]">
            <div className="px-6 py-3 border-b border-[#1F1E24] flex items-center justify-between" style={{ backgroundColor: '#1F1E24' }}>
              <span className="font-mono text-[10px] text-white">SECTION 01 :: BRAND & GRAPHIC DESIGN</span>
              <span className="font-mono text-[10px] text-white">{formatCurrency(calculations.section1Total)}</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1F1E24] text-left">
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">ID</th>
                  <th className="py-2 px-4 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">SERVICE</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">TYPE</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24] text-right">COST</th>
                  <th className="py-2 px-4 font-mono text-[10px] text-[#1F1E24] font-normal text-center">SEL</th>
                </tr>
              </thead>
              <tbody>
                {brandDecisions.map((decision, idx) => {
                  const isActive = activeDecisions.has(decision.id);
                  const prereq = checkPrerequisites(decision);
                  return <DataRow key={decision.id} index={idx + 1} decision={decision} isActive={isActive} onToggle={() => handleToggle(decision.id)} showPrerequisite={isActive && prereq.show} prerequisiteMessage={prereq.message} expanded={expandedRows.has(decision.id)} onExpandToggle={() => toggleExpand(decision.id)} />;
                })}
              </tbody>
            </table>
          </div>

          {/* Section 02 */}
          <div className="border-b border-[#1F1E24]">
            <div className="px-6 py-3 border-b border-[#1F1E24] flex items-center justify-between" style={{ backgroundColor: '#1F1E24' }}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-white">SECTION 02 :: INTERFACE & SYSTEM DESIGN</span>
                <span className="font-mono text-[10px] text-white">[SELECT ONE PACKAGE]</span>
              </div>
              <span className="font-mono text-[10px] text-white">{formatCurrency(calculations.section2Total)}</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1F1E24] text-left">
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">ID</th>
                  <th className="py-2 px-4 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">SERVICE</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">TYPE</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24] text-right">COST</th>
                  <th className="py-2 px-4 font-mono text-[10px] text-[#1F1E24] font-normal text-center">SEL</th>
                </tr>
              </thead>
              <tbody>
                {interfaceDecisions.filter(d => d.packageType === 'system-package').map((decision, idx) => {
                  const isActive = activeDecisions.has(decision.id);
                  const prereq = checkPrerequisites(decision);
                  return <DataRow key={decision.id} index={idx + 1} decision={decision} isActive={isActive} onToggle={() => handleToggle(decision.id)} showPrerequisite={isActive && prereq.show} prerequisiteMessage={prereq.message} expanded={expandedRows.has(decision.id)} onExpandToggle={() => toggleExpand(decision.id)} />;
                })}
                <tr className="border-b border-[#1F1E24]" style={{ backgroundColor: '#1F1E24' }}>
                  <td colSpan={5} className="py-2 px-6">
                    <span className="font-mono text-[10px] text-white">SUPPORTING SERVICES [OPTIONAL]</span>
                  </td>
                </tr>
                {interfaceDecisions.filter(d => d.packageType === 'supporting-service').map((decision, idx) => {
                  const isActive = activeDecisions.has(decision.id);
                  const prereq = checkPrerequisites(decision);
                  return <DataRow key={decision.id} index={idx + 4} decision={decision} isActive={isActive} onToggle={() => handleToggle(decision.id)} showPrerequisite={isActive && prereq.show} prerequisiteMessage={prereq.message} expanded={expandedRows.has(decision.id)} onExpandToggle={() => toggleExpand(decision.id)} />;
                })}
              </tbody>
            </table>
          </div>

          {/* Section 03 */}
          <div>
            <div className="px-6 py-3 border-b border-[#1F1E24] flex items-center justify-between" style={{ backgroundColor: '#1F1E24' }}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-white">SECTION 03 :: WEBSITE REDESIGN & DEVELOPMENT</span>
                <span className="font-mono text-[10px] text-white">[OPTIONAL]</span>
              </div>
              <span className="font-mono text-[10px] text-white">{formatCurrency(calculations.section3Total)}</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1F1E24] text-left">
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">ID</th>
                  <th className="py-2 px-4 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">SERVICE</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24]">TYPE</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24] text-center">PAGES</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal border-r border-[#1F1E24] text-right">COST</th>
                  <th className="py-2 px-3 font-mono text-[10px] text-[#1F1E24] font-normal text-center">TIER</th>
                </tr>
              </thead>
              <tbody>
                {websiteServices.map((service, idx) => {
                  const pages = websitePages[service.id as keyof WebsitePages];
                  const price = service.id === 'visual-design' ? calculateVisualDesignPrice(pages) : calculateDevelopmentPrice(pages);
                  return <WebsiteServiceRow key={service.id} index={idx + 1} service={service} pages={pages} onPagesChange={(p: number) => updateWebsitePages(service.id as keyof WebsitePages, p)} isActive={pages > 0} price={price} />;
                })}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-[#1F1E24] bg-[#fafafa]">
              <div className="font-mono text-[10px] text-[#1F1E24] space-y-1">
                <p>VISUAL DESIGN: T1 £700/pg | T2 £560/pg | T3 £370/pg | T4 £230/pg | T5 £185/pg</p>
                <p>DEVELOPMENT: T1 £800/pg | T2 £640/pg | T3 £430/pg | T4 £270/pg | T5 £215/pg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 flex-shrink-0">
          <div className="sticky top-0">
            <div className="px-4 py-3 border-b border-[#1F1E24]">
              <span className="font-mono text-[10px] text-[#1F1E24]">INVESTMENT SUMMARY</span>
            </div>
            <div className="p-4 border-b border-[#1F1E24]">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#1F1E24]">BRAND</span>
                  <span className="font-mono text-sm text-[#1F1E24]">{formatCurrency(calculations.section1Total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#1F1E24]">INTERFACE</span>
                  <span className="font-mono text-sm text-[#1F1E24]">{formatCurrency(calculations.section2Total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#1F1E24]">WEBSITE</span>
                  <span className="font-mono text-sm text-[#1F1E24]">{formatCurrency(calculations.section3Total)}</span>
                </div>
                <div className="h-px bg-[#1F1E24] my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#1F1E24]">TOTAL</span>
                  <span className="font-mono text-xl text-[#1F1E24]">{formatCurrency(calculations.combinedTotal)}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-b border-[#1F1E24]">
              <span className="font-mono text-[10px] text-[#1F1E24]">PROJECTED ROI</span>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#1F1E24]">TIME_EFFICIENCY</span>
                  <span className="font-mono text-sm text-[#1F1E24]">{calculations.timeEfficiency}%</span>
                </div>
                <div className="h-1 bg-[#e5e5e5]">
                  <div className="h-full bg-[#1F1E24]" style={{ width: `${calculations.timeEfficiency}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#1F1E24]">BRAND_VALUE</span>
                  <span className="font-mono text-sm text-[#1F1E24]">{formatCurrency(calculations.brandValue)}</span>
                </div>
                <div className="h-1 bg-[#e5e5e5]">
                  <div className="h-full bg-[#1F1E24]" style={{ width: `${Math.min(calculations.brandValue / 2500, 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-[#1F1E24]">CONVERSION_LIFT</span>
                  <span className="font-mono text-sm text-[#1F1E24]">{calculations.conversionLift}%</span>
                </div>
                <div className="h-1 bg-[#e5e5e5]">
                  <div className="h-full bg-[#1F1E24]" style={{ width: `${(calculations.conversionLift / 45) * 100}%` }}></div>
                </div>
              </div>
            </div>
            {calculations.combinedTotal === 0 && (
              <div className="px-4 py-3 border-t border-[#1F1E24]">
                <p className="font-mono text-[10px] text-[#1F1E24] leading-relaxed">SELECT ITEMS TO CALCULATE INVESTMENT AND PROJECTED RETURNS.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
