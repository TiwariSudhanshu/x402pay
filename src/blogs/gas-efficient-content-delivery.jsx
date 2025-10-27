export default function GasEfficientContentDelivery() {
  return (
    <article className="mx-auto max-w-5xl pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-b-3xl">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" 
          alt="Gas-efficient Content Delivery"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-green-700/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="mb-3 flex items-center gap-3 text-sm text-white/90">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">6 min read</span>
            <span>•</span>
            <span>0.001 ETH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Gas-efficient Content Delivery
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Techniques to reduce on-chain costs for article purchases.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-12">
        <div className="space-y-12">
          {/* Intro */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-500">
            <p className="text-xl text-gray-700 leading-relaxed">
              From batching to L2s and paymaster approaches, this article explores how to keep costs 
              low while maintaining a seamless content flow for readers.
            </p>
          </div>

          {/* Problem Statement */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">The Gas Fee Problem</h3>
                <p className="text-gray-700">
                  When an article costs $0.01 worth of ETH but the transaction fee is $5, the model breaks down. 
                  This is the fundamental challenge that content platforms must solve.
                </p>
              </div>
            </div>
          </div>

          {/* Strategy 1 */}
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl font-bold shadow-lg">1</span>
              Layer 2 Scaling Solutions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="absolute top-0 right-0 h-20 w-20 bg-blue-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔵</span> Arbitrum
                </h3>
                <p className="text-gray-700 text-sm mb-3">Optimistic rollup with fees 10-50x lower than mainnet.</p>
                <div className="text-xs text-blue-700 font-semibold">Great for content platforms</div>
              </div>
              <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="absolute top-0 right-0 h-20 w-20 bg-purple-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🟣</span> Polygon
                </h3>
                <p className="text-gray-700 text-sm mb-3">Sidechain with extremely low fees (often under $0.01).</p>
                <div className="text-xs text-purple-700 font-semibold">Ideal for micropayments</div>
              </div>
              <div className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-all">
                <div className="absolute top-0 right-0 h-20 w-20 bg-red-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔴</span> Optimism
                </h3>
                <p className="text-gray-700 text-sm mb-3">Optimistic rollup with retroactive funding.</p>
                <div className="text-xs text-red-700 font-semibold">Great for creators</div>
              </div>
              <div className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-gray-200 hover:border-gray-400 transition-all">
                <div className="absolute top-0 right-0 h-20 w-20 bg-gray-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚪</span> zkSync
                </h3>
                <p className="text-gray-700 text-sm mb-3">ZK-rollup offering lower fees and faster finality.</p>
                <div className="text-xs text-gray-700 font-semibold">High-frequency payments</div>
              </div>
            </div>
          </div>

          {/* Cost Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span>💰</span> Real-world Gas Cost Comparison
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Network</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Typical Gas Cost</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">Ethereum Mainnet</td>
                    <td className="p-4 text-red-600 font-bold">$2-15</td>
                    <td className="p-4 text-gray-600">High-value content only</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">Arbitrum</td>
                    <td className="p-4 text-orange-600 font-bold">$0.10-0.50</td>
                    <td className="p-4 text-gray-600">General use</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">Polygon</td>
                    <td className="p-4 text-green-600 font-bold">$0.001-0.01</td>
                    <td className="p-4 text-gray-600">Micropayments</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">zkSync</td>
                    <td className="p-4 text-blue-600 font-bold">$0.05-0.20</td>
                    <td className="p-4 text-gray-600">Fast finality needed</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-green-50">
                    <td className="p-4 font-medium">Payment Channel</td>
                    <td className="p-4 text-green-600 font-bold">~$0.00*</td>
                    <td className="p-4 text-gray-600">Repeat customers (*amortized)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategy 2 */}
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-xl font-bold shadow-lg">2</span>
              Transaction Batching
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Combine multiple operations into a single transaction, splitting the base gas cost across many actions.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 border border-orange-200">
                <div className="text-2xl mb-2">🌲</div>
                <h4 className="font-bold mb-1">Merkle Trees</h4>
                <p className="text-sm text-gray-600">Batch proofs, submit one root hash</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 border border-orange-200">
                <div className="text-2xl mb-2">📞</div>
                <h4 className="font-bold mb-1">Multi-call</h4>
                <p className="text-sm text-gray-600">Process multiple purchases together</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 border border-orange-200">
                <div className="text-2xl mb-2">⏰</div>
                <h4 className="font-bold mb-1">Scheduled</h4>
                <p className="text-sm text-gray-600">Collect over time, batch every 5 min</p>
              </div>
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span>🗺️</span> Implementation Roadmap
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Deploy to L2</h4>
                    <p className="text-sm text-white/80">Quick implementation, massive cost reduction</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Optimize Smart Contracts</h4>
                    <p className="text-sm text-white/80">One-time effort, permanent benefit</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Implement Basic Batching</h4>
                    <p className="text-sm text-white/80">For bulk operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-bold mb-1">Explore Account Abstraction</h4>
                    <p className="text-sm text-white/80">For premium features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
