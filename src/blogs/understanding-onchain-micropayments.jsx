export default function UnderstandingOnchainMicropayments() {
  return (
    <article className="mx-auto max-w-5xl pb-16">
      {/* Hero Section with Image */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-b-3xl">
        <img 
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop" 
          alt="Understanding On-chain Micropayments"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="mb-3 flex items-center gap-3 text-sm text-white/90">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">5 min read</span>
            <span>•</span>
            <span>0.001 ETH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Understanding On-chain Micropayments
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            A comprehensive guide to micropayments for content creators in the Web3 era.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-12 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
              Micropayments let creators monetize tiny interactions. This article walks through 
              payment channels, gas optimizations, and UX considerations for frictionless ETH payments.
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold">1</span>
              What Are On-chain Micropayments?
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <p className="text-lg text-gray-700 leading-relaxed">
                On-chain micropayments are small financial transactions conducted directly on blockchain 
                networks. Unlike traditional payment systems that impose high minimum transaction amounts 
                due to processing fees, blockchain technology enables payments as small as fractions of 
                a cent to be economically viable.
              </p>
            </div>
          </div>

          {/* Image Break */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop" 
              alt="Blockchain Payment Channels"
              className="h-80 w-full object-cover"
            />
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white text-lg font-bold">2</span>
              Payment Channels: The Foundation
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="h-2 w-16 bg-purple-500 rounded-full mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Payment channels are off-chain solutions that allow multiple transactions to occur between 
                  parties without recording each one on the blockchain. Only the opening and closing states 
                  are recorded on-chain, dramatically reducing gas costs and increasing transaction speed.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="h-2 w-16 bg-purple-500 rounded-full mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  For content creators, this means readers can make multiple small payments for articles, 
                  videos, or other content without incurring high fees for each transaction. The accumulated 
                  value is settled on-chain only when the channel closes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">3</span>
              Gas Optimizations
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Gas fees can make or break the micropayment experience. Here are key optimization strategies:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500 hover:scale-105 transition-transform">
                <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2 text-lg">
                  ✓ Batch Transactions
                </h3>
                <p className="text-sm text-gray-700">Group multiple micropayments together to split gas costs across many transactions.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500 hover:scale-105 transition-transform">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-lg">
                  ✓ Layer 2 Solutions
                </h3>
                <p className="text-sm text-gray-700">Utilize L2 networks like Arbitrum, Optimism, or Polygon for significantly lower fees.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500 hover:scale-105 transition-transform">
                <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2 text-lg">
                  ✓ Meta-transactions
                </h3>
                <p className="text-sm text-gray-700">Allow users to pay in tokens while a relayer covers the gas costs in ETH.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-500 hover:scale-105 transition-transform">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2 text-lg">
                  ✓ Smart Contract Optimization
                </h3>
                <p className="text-sm text-gray-700">Write efficient Solidity code that minimizes computational overhead.</p>
              </div>
            </div>
          </div>

          {/* Visual Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="text-gray-400">💎</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Section 4 - UX */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white text-lg font-bold">4</span>
              UX Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">One-click Payments</h4>
                <p className="text-sm text-gray-600">Pre-authorized spending limits allow instant content access without wallet confirmation for each purchase.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Clear Pricing Display</h4>
                <p className="text-sm text-gray-600">Show prices in both crypto and fiat currencies to help users understand value.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Instant Feedback</h4>
                <p className="text-sm text-gray-600">Provide immediate confirmation when a payment is processed, even if blockchain confirmation takes longer.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Progressive Enhancement</h4>
                <p className="text-sm text-gray-600">Allow users to preview content before payment while clearly indicating what's locked.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Getting Started
              </h3>
              <p className="text-lg text-white/90 max-w-3xl mb-6">
                Ready to implement micropayments for your content? Start by exploring Layer 2 
                solutions, setting up a wallet integration, and testing with small amounts.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold">10-50x</div>
                  <div className="text-sm text-white/80">Lower Fees on L2</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold">$0.001</div>
                  <div className="text-sm text-white/80">Typical L2 Cost</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold">&lt;1s</div>
                  <div className="text-sm text-white/80">Transaction Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
