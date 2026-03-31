import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { Button } from "../../components/ui/Button";
import {
  Search,
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useTransactions } from "../../hooks/transactions/useTransactions";

const Transactions: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const { data: transactions, isLoading, isError, refetch } = useTransactions();

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold font-header tracking-tight text-white uppercase italic">
                Transaction History
              </h1>
              <p className="text-[#ffffff40] font-body text-sm max-w-xl">
                Track all licensing payments and blockchain transactions across
                the ProofChain network.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <Button
                variant="outline"
                className="!py-4 !px-10 !text-[11px] font-header tracking-widest italic !border-white/10 hover:!bg-white/5 relative z-10"
                clipped={true}
                rightIcon={<Download className="w-4 h-4 ml-3" />}
              >
                Export Data
              </Button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffffff20] group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by Wallet Address or TX ID..."
                className="w-full bg-[#161622]/40 border border-[#ffffff05] rounded-full py-5 pl-14 pr-8 text-sm font-body text-white placeholder-[#ffffff20] focus:outline-none focus:border-primary/30 focus:bg-[#161622]/60 transition-all shadow-inner"
              />
            </div>

            <button className="bg-[#161622]/40 border border-[#ffffff05] rounded-full px-10 py-5 flex items-center justify-between gap-6 min-w-[200px] hover:bg-[#161622]/60 transition-all cursor-pointer">
              <span className="text-sm font-body text-white">All Statuses</span>
              <ChevronDown className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Transaction Table */}
          <div className="bg-[#161622]/40 border border-[#ffffff05] rounded-[40px] overflow-hidden shadow-2xl relative mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none -z-10 animate-pulse"></div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.03]">
                    <th className="py-8 px-10 text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                      Buyer
                    </th>
                    <th className="py-8 px-6 text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                      Seller
                    </th>
                    <th className="py-8 px-6 text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                      Type
                    </th>
                    <th className="py-8 px-6 text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                      Amount
                    </th>
                    <th className="py-8 px-6 text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                      Date
                    </th>
                    <th className="py-8 px-10 text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <Loader2 className="w-10 h-10 text-primary animate-spin" />
                          <p className="text-[#ffffff20] font-header tracking-widest text-[10px] uppercase italic">
                            Fetching blockchain data...
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <p className="text-red-400 font-header tracking-widest text-[10px] uppercase italic mb-4">
                          Sync Error
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => refetch()}
                          clipped={false}
                        >
                          Retry Sync
                        </Button>
                      </td>
                    </tr>
                  ) : !transactions || transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase text-[10px]">
                          No transactions on record
                        </p>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx: any) => (
                      <tr
                        key={tx.id}
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-8 px-10 text-sm font-header font-bold text-white italic group-hover:text-primary transition-colors">
                          {tx.buyer || "Unknown"}
                        </td>
                        <td className="py-8 px-6 text-sm font-body text-[#ffffff60]">
                          {tx.seller || "Unknown"}
                        </td>
                        <td className="py-8 px-6 text-[10px] font-header font-bold text-primary uppercase tracking-widest italic">
                          {tx.type?.replace("_", " ") || "LICENSE"}
                        </td>
                        <td className="py-8 px-6 text-sm font-header font-bold text-white italic">
                          {tx.amount}{" "}
                          <span className="text-[10px] text-[#ffffff30] ml-1">
                            ETH
                          </span>
                        </td>
                        <td className="py-8 px-6 text-sm font-body text-[#ffffff40]">
                          {new Date(tx.createdAt || "").toLocaleString()}
                        </td>
                        <td className="py-8 px-10">
                          <div className="flex justify-center">
                            <div
                              className={`px-5 py-1.5 rounded-full text-[9px] font-header tracking-widest border flex items-center gap-2 ${
                                tx.status === "success"
                                  ? "text-[#00ff95] bg-[#00ff95]/10 border-[#00ff95]/20"
                                  : "text-[#ff4b4b] bg-[#ff4b4b]/10 border-[#ff4b4b]/20"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${tx.status === "success" ? "bg-[#00ff95]" : "bg-[#ff4b4b]"}`}
                              ></div>
                              {tx.status.toUpperCase()}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
              <span className="text-[10px] font-body text-[#ffffff20] tracking-wider uppercase">
                Showing 1 to 5 of{" "}
                <span className="text-white font-bold italic">
                  284 transactions
                </span>
              </span>

              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`w-10 h-10 rounded-xl font-header text-xs transition-all ${
                      activePage === page
                        ? "bg-primary text-white shadow-[0_0_15px_rgba(111,38,255,0.4)]"
                        : "bg-white/5 text-[#ffffff40] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
            <div className="bg-[#161622]/40 border border-[#ffffff05] rounded-[40px] p-10 relative overflow-hidden group shadow-xl">
              <div className="relative z-10 flex items-end justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                    Volume Overview
                  </span>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-4xl font-bold font-header text-white italic">
                      1,284.50
                    </h2>
                    <span className="text-sm font-header text-[#ffffff30] italic">
                      ETH
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-[#00ff95] text-[10px] font-header font-bold italic">
                    <TrendingUp className="w-4 h-4" />
                    +14.2%
                  </div>
                  <div className="w-32 h-12 relative opacity-50">
                    {/* Placeholder for SVG wave */}
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 40"
                      fill="none"
                    >
                      <path
                        d="M0 35 Q 25 25 50 30 T 100 0"
                        stroke="#00ff95"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#00ff95]/5 blur-[50px] rounded-full -z-10 group-hover:bg-[#00ff95]/10 transition-all duration-500"></div>
            </div>

            <div className="bg-[#161622]/40 border border-[#ffffff05] rounded-[40px] p-10 relative overflow-hidden group shadow-xl">
              <div className="relative z-10 flex items-end justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase font-bold">
                    Active Licenses
                  </span>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-4xl font-bold font-header text-white italic">
                      42
                    </h2>
                    <span className="text-sm font-header text-[#ffffff30] italic font-body lowercase tracking-tight">
                      Items
                    </span>
                  </div>
                </div>

                <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Download className="w-10 h-10 text-primary opacity-30" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -z-10 group-hover:bg-primary/10 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
