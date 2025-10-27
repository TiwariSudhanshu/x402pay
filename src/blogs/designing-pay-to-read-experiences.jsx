export default function DesigningPayToReadExperiences() {
  return (
    <article className="mx-auto max-w-5xl pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-b-3xl">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" 
          alt="Designing Pay-to-Read Experiences"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-700/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="mb-3 flex items-center gap-3 text-sm text-white/90">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">7 min read</span>
            <span>•</span>
            <span>0.0025 ETH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Designing Pay-to-Read Experiences
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            UX patterns for paid content on the web3 web.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-12">
        <div className="space-y-12">
          {/* Intro */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple-500">
            <p className="text-xl text-gray-700 leading-relaxed">
              Paid content experiences should be fast and transparent. Learn patterns for previews, 
              meta-transactions, and bundling payments for multiple articles.
            </p>
          </div>

          {/* Pattern 1 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-bold shadow-lg">1</span>
              Progressive Preview
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The progressive preview pattern allows users to see enough content to make an informed 
                purchase decision without giving away the entire article.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="font-semibold text-purple-900 mb-1">First Paragraph Free</div>
                  <div className="text-sm text-gray-600">Show intro, then blur the rest</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <div className="font-semibold text-pink-900 mb-1">Time-based Preview</div>
                  <div className="text-sm text-gray-600">Free for 30 seconds</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <div className="font-semibold text-indigo-900 mb-1">Summary Access</div>
                  <div className="text-sm text-gray-600">Show key takeaways</div>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                  <div className="font-semibold text-violet-900 mb-1">Visual Fade</div>
                  <div className="text-sm text-gray-600">Gradually fade text</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" 
              alt="UX Design"
              className="h-80 w-full object-cover"
            />
          </div>

          {/* Pattern 2 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xl font-bold shadow-lg">2</span>
              Meta-transactions
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl mb-4">💳</div>
                <h3 className="font-bold text-blue-900 mb-2">No ETH Needed</h3>
                <p className="text-sm text-gray-600">Users pay in USDC or DAI directly</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="h-12 w-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-2xl mb-4">⚡</div>
                <h3 className="font-bold text-cyan-900 mb-2">Instant TX</h3>
                <p className="text-sm text-gray-600">No wallet confirmations needed</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-2xl mb-4">🎯</div>
                <h3 className="font-bold text-indigo-900 mb-2">Better UX</h3>
                <p className="text-sm text-gray-600">Seamless onboarding for newcomers</p>
              </div>
            </div>
          </div>

          {/* Pattern 3 */}
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 md:p-10 border border-green-200">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-teal-500 text-white text-xl font-bold shadow-lg">3</span>
              Content Bundling
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-green-200">
                <div className="text-3xl mb-2">📅</div>
                <h4 className="font-bold text-gray-900 mb-2">Day Passes</h4>
                <p className="text-sm text-gray-600">Pay once for 24 hour unlimited access</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-emerald-200">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-bold text-gray-900 mb-2">Topic Collections</h4>
                <p className="text-sm text-gray-600">Bundle related articles at discount</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-teal-200">
                <div className="text-3xl mb-2">👤</div>
                <h4 className="font-bold text-gray-900 mb-2">Author Subscriptions</h4>
                <p className="text-sm text-gray-600">Follow creators with recurring payments</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-cyan-200">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-bold text-gray-900 mb-2">Credit Packs</h4>
                <p className="text-sm text-gray-600">Pre-purchase credits at bulk rates</p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-[2px]">
            <div className="bg-white rounded-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">
                🎯 Best Practices
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div className="text-gray-700">Show prices in both crypto and fiat</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div className="text-gray-700">Provide clear error messages</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div className="text-gray-700">Implement loading states</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div className="text-gray-700">Offer multiple payment options</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div className="text-gray-700">Cache content after purchase</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div className="text-gray-700">Build guided wallet flows</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4">
                🚀 Start Building Today
              </h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl">
                The best pay-to-read experiences feel almost invisible. Readers should focus on 
                content, not cryptocurrency. Implement these patterns to create seamless Web3 experiences.
              </p>
              <div className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold">
                Learn More →
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
