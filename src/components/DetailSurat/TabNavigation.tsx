type ActiveTab = 'ayat' | 'tafsir';

type TabNavigationProps = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="mt-6 flex gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-1">
      <button
        type="button"
        onClick={() => setActiveTab('ayat')}
        className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
          activeTab === 'ayat' ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-700 hover:bg-white/60'
        }`}
      >
        Ayat
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('tafsir')}
        className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
          activeTab === 'tafsir' ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-700 hover:bg-white/60'
        }`}
      >
        Tafsir
      </button>
    </div>
  );
}
