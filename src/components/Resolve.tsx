import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Resolve() {
  const { issueText, setIssueText, analyzing, analyzed, detectedAreas, analyzeIssue, createCase, supportCase, setView } = useApp();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Resolve an Issue — StudentWell</h2>
        <p className="text-[13px] text-gray-400">You don't need to know who can help. Just tell us what you're dealing with.</p>
      </div>

      <div className="card max-w-xl">
        <textarea
          aria-label="Describe your concern" maxLength={5000} className="input min-h-[110px] resize-y"
          value={issueText}
          onChange={(e) => setIssueText(e.target.value)}
        />
        <button className="btn-primary mt-1 w-auto px-6" onClick={analyzeIssue} disabled={analyzing || !issueText.trim()}>
          {analyzing ? 'Analyzing…' : 'Submit'}
        </button>

        <AnimatePresence>
          {analyzing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-sm text-softblue">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-line border-t-brandblue" />
              Understanding your request…
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {analyzed && !supportCase && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              <div className="text-[11px] uppercase tracking-wide text-gray-400">Suggested support areas</div>
              <div className="my-2.5 flex flex-wrap gap-2">
                {detectedAreas.map((a) => (
                  <span key={a} className="rounded-full border border-brandblue px-3 py-1 text-xs text-softblue">{a}</span>
                ))}
              </div>
              <div className="my-3.5 rounded border-l-2 border-brandblue bg-panel p-3 text-[13px] text-gray-400">
                {issueText}
              </div>
              <div className="mb-3 text-sm">
                Priority: <span className="rounded-full border border-warn/40 bg-warn/10 px-2.5 py-0.5 text-xs text-warn">Medium</span>
              </div>
              <p className="mb-3.5 text-[13px] text-gray-400">
                We identified several areas where you may need support. This demo organizes them into a local case; no university team is contacted.
              </p>
              <button className="btn-primary w-auto px-6" onClick={createCase}>Create Support Case</button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {supportCase && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-7">
              <div className="flex flex-col items-center gap-2.5">
                <Node label="Student Request" />
                <Line />
                <Node label={`Central Case ${supportCase.id}`} highlight />
                <Line />
                <div className="flex gap-10">
                  {supportCase.departments.map((d) => (
                    <div key={d.key} className="flex flex-col items-center gap-1.5">
                      <Node label={d.label} small />
                      <div className="text-[10px] text-gray-400">{d.status}</div>
                    </div>
                  ))}
                </div>
                <Line />
                <Node label="Unified Student Status" />
              </div>
              <div className="mt-4 text-center">
                <button className="text-[13px] font-semibold text-softblue" onClick={() => setView('mysupport')}>View in My Support →</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Node({ label, highlight, small }: { label: string; highlight?: boolean; small?: boolean }) {
  return (
    <div className={`rounded-md border ${highlight ? 'border-softblue' : 'border-brandblue'} bg-[#111a2c] px-4 py-2 ${small ? 'text-xs' : 'text-sm'}`}>
      {label}
    </div>
  );
}
function Line() {
  return <div className="h-6 w-0.5 bg-line" />;
}

