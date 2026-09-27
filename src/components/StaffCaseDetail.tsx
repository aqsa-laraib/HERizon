import React from 'react';
import { useApp } from '../context/AppContext';
import { DeptStatus } from '../types';

export default function StaffCaseDetail() {
  const { supportCase, updateDeptStatus } = useApp();

  if (!supportCase) {
    return <div className="text-sm text-gray-400">No case selected. Go to Cases and create one first via Resolve an Issue.</div>;
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold">{supportCase.id} — Student Wellbeing Case</h2>
        <p className="text-[13px] text-gray-400">{supportCase.overall} · {supportCase.priority} Priority</p>
      </div>

      <div className="mb-6 max-w-xl rounded border-l-2 border-brandblue bg-panel p-3.5 text-[13px] text-gray-400">
        Student request: {supportCase.summary}
      </div>

      {supportCase.departments.map((d) => (
        <div key={d.key} className="mb-3 rounded-md border border-line bg-panel p-4">
          <h4 className="mb-2 text-sm font-semibold uppercase">{d.label} · Assigned: {d.assignee}</h4>
          <div className="mb-2 flex justify-between text-xs text-gray-400">
            <span>Task: {d.task}</span>
            <span>{d.status}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['Pending', 'In Progress', 'Completed'] as DeptStatus[]).map((s) => (
              <button
                key={s}
                className={`rounded border px-2.5 py-1.5 text-[11px] ${d.status === s ? 'border-brandblue text-white' : 'border-line text-gray-400 hover:text-white'}`}
                onClick={() => updateDeptStatus(d.key, s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

