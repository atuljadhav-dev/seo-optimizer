import React, { useState, type FormEvent } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface KeywordData {
  phrase: string;
  volume: number;
  difficulty: number; 
  density: string;
}

export const Keywords: React.FC = () => {
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<KeywordData[]>([]);

  const handleAnalyze = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate standard NLP text density extraction pipeline
    setTimeout(() => {
      const phrases = keywordInput.split(',').map(k => k.trim()).filter(Boolean);
      const simulatedData: KeywordData[] = phrases.map(phrase => ({
        phrase,
        volume: Math.floor(Math.random() * (12000 - 800 + 1)) + 800,
        difficulty: Math.floor(Math.random() * (88 - 20 + 1)) + 20,
        density: (Math.random() * (4.2 - 1.1) + 1.1).toFixed(1) + '%',
      }));

      setKeywords(simulatedData);
      setLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keyword Performance metrics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Analyze target phrases to optimize density ratios and match true search intent.
          </p>
        </div>

        {/* Input Configuration Panel */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Target Keywords
              </label>
              <input
                type="text"
                required
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Enter search keywords separated by commas (e.g., mern stack developer, nextjs seo, react forms)"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors"
            >
              {loading ? 'Processing Phrases...' : 'Analyze Metrics'}
            </button>
          </form>
        </div>

        {/* Analytical Table Layout Grid */}
        {keywords.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Keyword Phrase</th>
                    <th className="px-6 py-4">Monthly Search Volume</th>
                    <th className="px-6 py-4">Difficulty Level</th>
                    <th className="px-6 py-4">Ideal Content Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {keywords.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.phrase}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.volume.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-600 dark:text-slate-300">{item.difficulty}%</span>
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700">
                            <div 
                              className={`h-full rounded-full ${item.difficulty > 65 ? 'bg-red-500' : item.difficulty > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${item.difficulty}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-cyan-600 dark:text-cyan-400">{item.density}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Keywords;