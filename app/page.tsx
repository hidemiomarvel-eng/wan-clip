import Link from "next/link";
import { Heart, PawPrint, Plus, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-wan-ivory text-wan-navy">
      <section className="border-b border-wan-orange-light bg-wan-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-wan-orange">
              WanClip
            </p>
            <h1 className="mt-4 max-w-none text-4xl font-bold leading-tight tracking-tight text-wan-navy sm:text-5xl lg:text-6xl">
              <span className="block sm:whitespace-nowrap">
                愛犬と行ける場所を、
              </span>
              <span className="block text-wan-orange sm:whitespace-nowrap">
                もっと見つけやすく。
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
              犬と一緒に楽しめるカフェ、レストラン、宿泊施設、観光スポット、ドッグランなどを探したり、見つけた場所を登録したりできるサービスです。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/spots"
                className="inline-flex items-center justify-center rounded-full bg-wan-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-wan-orange focus:ring-offset-2"
              >
                <Search aria-hidden="true" className="mr-2 h-4 w-4" />
                スポットを探す
              </Link>
              <Link
                href="/spots/new"
                className="inline-flex items-center justify-center rounded-full border border-wan-orange bg-white px-6 py-3 text-sm font-semibold text-wan-orange transition-colors hover:bg-wan-orange-light focus:outline-none focus:ring-2 focus:ring-wan-orange focus:ring-offset-2"
              >
                <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                スポットを登録する
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-wan-green bg-white p-6 shadow-sm sm:p-8">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-wan-green" />
            <div className="relative">
              <PawPrint
                aria-hidden="true"
                className="h-12 w-12 text-wan-orange"
              />
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-wan-orange">
                Dog-friendly days
              </p>
              <p className="mt-3 text-2xl font-bold leading-relaxed text-wan-navy">
                次のお出かけ先を、
                <br />
                愛犬と一緒に見つけよう。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wan-orange">
            WanClipでできること
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-wan-navy sm:text-4xl">
            お出かけ先探しを、もっと気軽に
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "スポットを探す",
              description:
                "キーワードや条件から、犬連れで利用できるスポットを探せます。",
            },
            {
              icon: Heart,
              title: "行きたいを保存",
              description:
                "気になるスポットを行きたいに登録して、あとから確認できます。",
            },
            {
              icon: Plus,
              title: "スポットを登録",
              description:
                "見つけた犬連れOKのスポットを登録して、情報を残せます。",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-wan-orange-light font-semibold text-wan-orange">
                <feature.icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-wan-navy">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
