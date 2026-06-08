"use client";

import { useState } from "react";

const tabs = ["面向 Agent", "面向开发者", "README"] as const;

const tabContent = {
  "面向 Agent":
    "请访问 https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit\n并按说明为我安装 alibabacloud agent toolkit skills。",
  "面向开发者":
    "npx @anthropic-ai/claude-code install alibabacloud-agent-toolkit",
  README:
    "# Alibaba Cloud Agent Toolkit\n\nMCP servers, skills, and plugins for building AI agents on Alibaba Cloud.",
};

const concepts = [
  {
    title: "MCP Core",
    desc: "基于 Model Context Protocol 的标准协议层，让 Agent 通过统一接口访问阿里云全系服务。",
  },
  {
    title: "Agent Toolkits",
    desc: "预构建的场景化工具集合，涵盖 OpenAPI、基础设施编排、脚本执行等核心能力。",
  },
  {
    title: "Plugins",
    desc: "可扩展的插件体系，支持社区贡献与自定义扩展，按需组合你的专属能力栈。",
  },
];

const products = [
  {
    icon: "C",
    title: "alibabacloud-core",
    desc: "OpenAPI SDK 代码生成、CLI 命令构建、文档检索、API 定义查询",
    status: "active" as const,
  },
  {
    icon: "S",
    title: "alibabacloud-spec-ops",
    desc: "Spec 驱动的基础设施管理：规划 → Terraform → 验证 → 执行",
    status: "active" as const,
  },
  {
    icon: "R",
    title: "run_script",
    desc: "远程脚本执行能力，支持自动化运维场景",
    status: "coming" as const,
  },
  {
    icon: "H",
    title: "run_hcl",
    desc: "HCL 即时执行与验证，快速测试基础设施代码",
    status: "coming" as const,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("面向 Agent");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tabContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-orb"
          style={{
            top: "-200px",
            right: "-100px",
            background: "rgba(255,106,0,0.07)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-orb-delay-1"
          style={{
            top: "500px",
            left: "-200px",
            background: "rgba(255,160,80,0.05)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-orb-delay-2"
          style={{
            bottom: "-100px",
            right: "20%",
            background: "rgba(255,120,20,0.04)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Nav */}
        <nav className="glass sticky top-4 mx-6 mt-4 px-8 py-4 rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.03)] z-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6A00] to-[#FF9233] rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-[0_2px_8px_rgba(255,106,0,0.3)]">
              A
            </div>
            <span className="font-semibold text-[15px]">Agent Toolkit</span>
          </div>
          <div className="flex items-center gap-7">
            <a href="#products" className="text-sm text-gray-500 hover:text-[#FF6A00] transition-colors">
              产品
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#FF6A00] transition-colors">
              文档
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#FF6A00] transition-colors">
              快速开始
            </a>
            <a
              href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gradient-to-br from-[#FF6A00] to-[#FF8830] text-white rounded-lg text-[13px] font-medium shadow-[0_2px_12px_rgba(255,106,0,0.25)] hover:shadow-[0_4px_20px_rgba(255,106,0,0.35)] hover:-translate-y-[1px] transition-all"
            >
              GitHub →
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="text-center pt-28 pb-20 px-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(255,106,0,0.05)] backdrop-blur-[10px] border border-[rgba(255,106,0,0.12)] rounded-full text-[13px] text-[#FF6A00] font-medium mb-8">
            <span className="w-[7px] h-[7px] bg-[#FF6A00] rounded-full animate-pulse-dot" />
            Alibaba Cloud Open Platform
          </div>

          <h1 className="text-[50px] font-bold leading-[1.25] tracking-tight mb-5">
            为 AI Agent 构建
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] via-[#FF9640] to-[#FFB060] bg-clip-text text-transparent">
              云端超能力
            </span>
            <span className="inline-block w-[3px] h-[40px] bg-gradient-to-b from-[#FF6A00] to-[#FF9640] ml-1 align-middle rounded-sm animate-cursor" />
          </h1>

          <p className="text-[17px] text-gray-400 max-w-[480px] mx-auto mb-14 leading-relaxed">
            通过 MCP Server 将阿里云 200+ 云服务无缝接入 AI Agent，自然语言驱动云端操作。
          </p>

          {/* Install Card */}
          <div className="glass-strong max-w-[620px] mx-auto border border-white/90 rounded-[22px] p-7 shadow-[0_20px_60px_rgba(255,106,0,0.05),0_8px_24px_rgba(0,0,0,0.04)]">
            <div className="flex bg-black/[0.03] rounded-xl p-1 mb-5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2.5 px-4 text-[13px] rounded-[9px] font-medium transition-all duration-250 cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-[#FF6A00] shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative bg-black/[0.02] border border-black/[0.05] rounded-[14px] p-5 font-mono text-[13px] text-gray-600 leading-loose text-left">
              <button
                onClick={handleCopy}
                className="absolute top-3.5 right-3.5 px-3.5 py-1.5 text-[11px] text-[#FF6A00] border border-[rgba(255,106,0,0.15)] rounded-[7px] bg-[rgba(255,106,0,0.04)] hover:bg-[rgba(255,106,0,0.08)] transition-all cursor-pointer font-sans"
              >
                {copied ? "已复制 ✓" : "复制"}
              </button>
              <pre className="whitespace-pre-wrap pr-16">{tabContent[activeTab]}</pre>
            </div>
          </div>
        </section>

        {/* Concepts */}
        <section className="px-10 py-24">
          <div className="text-center mb-14">
            <p className="text-[13px] text-[#FF6A00] font-semibold mb-3 tracking-wide">
              核心架构
            </p>
            <h2 className="text-[36px] font-bold tracking-tight">
              MCP-Core · Toolkits · Plugins
            </h2>
            <p className="text-[15px] text-gray-400 mt-3">
              三层解耦架构，灵活组合，按需接入云端能力
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 max-w-[1000px] mx-auto">
            {concepts.map((c) => (
              <div
                key={c.title}
                className="group glass border border-black/[0.04] rounded-[20px] p-9 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(255,106,0,0.07)] hover:border-[rgba(255,106,0,0.15)] relative overflow-hidden"
              >
                <div className="absolute inset-0 rounded-[20px] p-[1px] bg-gradient-to-br from-[rgba(255,106,0,0.2)] via-transparent to-[rgba(255,160,80,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                <h3 className="text-[18px] font-semibold text-gray-800 mb-2.5">
                  {c.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="px-10 pb-24">
          <div className="text-center mb-14">
            <p className="text-[13px] text-[#FF6A00] font-semibold mb-3 tracking-wide">
              产品与工具
            </p>
            <h2 className="text-[36px] font-bold tracking-tight">
              开箱即用的云端集成
            </h2>
            <p className="text-[15px] text-gray-400 mt-3">
              每个插件聚焦一类场景，安装即用
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-[860px] mx-auto">
            {products.map((p) => (
              <div
                key={p.title}
                className="glass border border-black/[0.04] rounded-[18px] p-7 flex gap-5 items-start transition-all duration-350 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,106,0,0.06)] hover:border-[rgba(255,106,0,0.1)]"
              >
                <div
                  className={`w-[42px] h-[42px] rounded-[11px] flex-shrink-0 flex items-center justify-center text-[15px] font-bold ${
                    p.status === "active"
                      ? "bg-gradient-to-br from-[#FF6A00] to-[#FF9640] text-white shadow-[0_4px_14px_rgba(255,106,0,0.25)]"
                      : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400"
                  }`}
                >
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-800 mb-1.5">
                    {p.title}
                  </h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</p>
                  <p
                    className={`text-[12px] mt-2.5 font-medium ${
                      p.status === "active" ? "text-[#FF6A00]" : "text-gray-300"
                    }`}
                  >
                    {p.status === "active" ? "● 已可用" : "◎ 即将推出"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-14 border-t border-black/[0.04] text-[13px] text-gray-400">
          <div className="flex justify-center gap-8 mb-4">
            <a
              href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit"
              className="hover:text-[#FF6A00] transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-[#FF6A00] transition-colors">
              文档
            </a>
            <a href="#" className="hover:text-[#FF6A00] transition-colors">
              快速开始
            </a>
            <a href="#" className="hover:text-[#FF6A00] transition-colors">
              社区
            </a>
          </div>
          <p className="text-gray-300">© 2024 Alibaba Cloud Open Platform</p>
        </footer>
      </div>
    </div>
  );
}
