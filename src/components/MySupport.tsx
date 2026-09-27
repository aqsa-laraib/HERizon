import React from 'react';
import { useApp } from '../context/AppContext';

export default function MySupport() {
  const { supportCase } = useApp();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">My Support</h2>
        <p className="text-[13px] text-gray-400">
          {supportCase ? `${supportCase.id} · Student Wellbeing Support` : 'No active cases yet — submit an issue via Resolve an Issue.'}
        </p>
      </div>

      {supportCase && (
        <div>
          <div className="mb-5 flex flex-wrap gap-3.5">
            <StatusChip label="Overall" value={supportCase.overall} />
            {supportCase.departments.map((d) => (
              <StatusChip key={d.key} label={d.label} value={d.status} />
            ))}
          </div>
          <div className="mb-6 text-[11px] text-gray-400">Local demo timeline · No university department has been contacted</div>

          <div className="border-l-2 border-line pl-5">
            {supportCase.timeline.map((e, i) => (
              <div key={i} className="relative mb-5">
                <div className="absolute -left-[26px] top-0.5 h-2 w-2 rounded-full bg-brandblue" />
                <div className="text-[11px] text-gray-400">{e.time}</div>
                <div className="mt-0.5 text-sm">{e.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[150px] rounded-md border border-line bg-charcoal px-4 py-3">
      <div className="text-[10px] uppercase text-gray-400">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

