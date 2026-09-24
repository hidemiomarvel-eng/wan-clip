export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
            Project scaffold
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            WanClip
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            犬と一緒に利用できるスポットを共有するための、今後の開発を進めるための初期土台です。
            V1では画面とデータ構造の整理を中心に進め、機能実装は段階的に追加していきます。
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">現在の状態</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                • Next.js + TypeScript + Tailwind CSS + App Router を初期化済み
              </li>
              <li>• DB・認証は未導入</li>
              <li>• V1の画面やモックデータは未実装</li>
              <li>• 仕様書を中心に設計を整理中</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">V1 の対象</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• スポット一覧</li>
              <li>• スポット詳細</li>
              <li>• スポット新規登録</li>
              <li>• スポット編集 / 削除</li>
              <li>• 検索と絞り込み</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
