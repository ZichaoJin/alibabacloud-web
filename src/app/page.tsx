"use client";

import { useState, useEffect } from "react";

const tabs = ["面向 Agent", "面向开发者", "README"] as const;

const tabContent = {
  "面向 Agent":
    "请访问 https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit\n并按说明为我安装 alibabacloud agent toolkit skills。",
  "面向开发者":
    "npx @anthropic-ai/claude-code install alibabacloud-agent-toolkit",
  README:
    "# Alibaba Cloud Agent Toolkit\n\nMCP servers, skills, and plugins for building AI agents on Alibaba Cloud.",
};

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


function ShineCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`shine-card ${className}`}>
      {children}
    </div>
  );
}

const conceptData = [
  {
    id: "mcp",
    title: "MCP Core",
    tag: "Protocol",
    desc: "统一协议层，Agent 通过标准接口访问阿里云全系服务",
    stats: [
      { value: "200+", label: "API" },
      { value: "9", label: "Tools" },
    ],
  },
  {
    id: "toolkits",
    title: "Agent Toolkits",
    tag: "Scenarios",
    desc: "预构建工具集，涵盖 OpenAPI、IaC、脚本执行",
    stats: [
      { value: "5", label: "模块" },
      { value: "4", label: "阶段" },
    ],
  },
  {
    id: "plugins",
    title: "Plugins",
    tag: "Extensible",
    desc: "可扩展插件体系，按需组合，社区贡献",
    stats: [
      { value: "4", label: "插件" },
      { value: "3", label: "平台" },
    ],
  },
];

function ConceptShowcase() {
  const [active, setActive] = useState("mcp");

  return (
    <section className="px-10 py-24 max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
        <p className="text-[14px] text-[#FF6A00] font-semibold mb-3 tracking-wide">
          核心架构
        </p>
        <h2 className="text-[40px] font-bold tracking-tight">
          MCP-Core · Toolkits · Plugins
        </h2>
        <p className="text-[16px] text-gray-400 mt-3">
          三层解耦，灵活组合，按需接入
        </p>
      </div>

      <div className="flex gap-6 max-w-[1060px] mx-auto items-stretch">
        {/* Left — card list */}
        <div className="flex flex-col gap-3 w-[320px] flex-shrink-0">
          {conceptData.map((c) => (
            <div
              key={c.id}
              onMouseEnter={() => setActive(c.id)}
              className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 border ${
                active === c.id
                  ? "bg-white border-[rgba(255,106,0,0.15)] shadow-[0_8px_32px_rgba(255,106,0,0.06)] scale-[1.02]"
                  : "bg-white/50 border-transparent hover:bg-white/80"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <h3 className={`text-[18px] font-semibold transition-colors ${active === c.id ? "text-gray-900" : "text-gray-500"}`}>
                  {c.title}
                </h3>
                <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border transition-all ${
                  active === c.id
                    ? "bg-[rgba(255,106,0,0.08)] text-[#FF6A00] border-[rgba(255,106,0,0.12)]"
                    : "bg-gray-50 text-gray-400 border-gray-100"
                }`}>{c.tag}</span>
              </div>
              <p className={`text-[14px] leading-relaxed transition-colors ${active === c.id ? "text-gray-500" : "text-gray-400"}`}>
                {c.desc}
              </p>
              {active === c.id && (
                <div className="flex gap-6 mt-4 pt-4 border-t border-black/[0.04]">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-[24px] font-bold text-gray-800">{s.value}</div>
                      <div className="text-[12px] text-gray-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right — dynamic demo panel */}
        <div className="flex-1 rounded-2xl border border-black/[0.04] bg-white/60 backdrop-blur-xl overflow-hidden relative min-h-[380px]">
          {/* MCP Core demo — animated streaming calls */}
          <div className={`absolute inset-0 p-8 transition-all duration-500 ${active === "mcp" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
              <span className="text-[12px] text-gray-400 font-mono">MCP Server Running</span>
            </div>

            {/* Animated tool calls */}
            <div className="space-y-2.5">
              {["ListProducts", "SearchApis", "GetApiDefinition", "GenerateCLICommand", "CallCLI"].map((tool, i) => (
                <div
                  key={tool}
                  className="flex items-center gap-3 tool-row"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgba(255,106,0,0.08)] to-[rgba(255,106,0,0.02)] border border-[rgba(255,106,0,0.1)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse-dot" style={{ animationDelay: `${i * 0.4}s` }} />
                  </div>
                  <div className="flex-1 h-11 rounded-lg border border-black/[0.04] flex items-center px-4 relative overflow-hidden">
                    <div className="shimmer-bar absolute inset-0" style={{ animationDelay: `${i * 0.3}s` }} />
                    <span className="font-mono text-[13px] text-gray-700 relative z-10">{tool}</span>
                    <span className="ml-auto text-[11px] text-[#FF6A00] relative z-10 font-medium">200ms</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar with typing */}
            <div className="absolute bottom-7 left-8 right-8 h-12 rounded-xl bg-gradient-to-r from-[rgba(255,106,0,0.03)] to-transparent border border-[rgba(255,106,0,0.1)] flex items-center px-5">
              <span className="text-[#FF6A00] mr-3 text-[14px]">›</span>
              <span className="font-mono text-[13px] text-gray-500">帮我查询 ECS 的 API 列表</span>
              <span className="ml-1 w-[2px] h-5 bg-[#FF6A00] animate-cursor rounded-full" />
            </div>
          </div>

          {/* Toolkits demo — animated pipeline */}
          <div className={`absolute inset-0 p-8 transition-all duration-500 ${active === "toolkits" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
              <span className="text-[12px] text-gray-400 font-mono">Spec-Ops Pipeline</span>
            </div>

            {/* Pipeline — horizontal flow */}
            <div className="relative flex items-center justify-between mb-8 px-2">
              {/* Connection line behind */}
              <div className="absolute top-[28px] left-[40px] right-[40px] h-[2px] bg-gray-100 rounded-full">
                <div className="h-full bg-gradient-to-r from-[#FF6A00] via-[#FFB060] to-[rgba(255,106,0,0.2)] rounded-full pipeline-progress" />
              </div>

              {["Plan", "Codegen", "Validate", "Execute"].map((step, i) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm pipeline-node"
                    style={{
                      background: i === 3 ? "linear-gradient(135deg, #FF6A00, #FF9640)" : "white",
                      border: i === 3 ? "none" : "2px solid rgba(255,106,0,0.15)",
                      color: i === 3 ? "white" : "#FF6A00",
                      animationDelay: `${i * 0.5}s`,
                      boxShadow: i === 3 ? "0 4px 20px rgba(255,106,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      {i === 0 && <><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4m-10-10h4m12 0h4"/></>}
                      {i === 1 && <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></>}
                      {i === 2 && <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>}
                      {i === 3 && <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>}
                    </svg>
                  </div>
                  <span className={`text-[12px] mt-3 font-medium ${i === 3 ? "text-[#FF6A00]" : "text-gray-500"}`}>{step}</span>
                </div>
              ))}
            </div>

            {/* Code output with line animation */}
            <div className="bg-[#1a1a2e] rounded-xl p-5 font-mono text-[12px] leading-[1.8]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <span className="ml-2 text-[10px] text-gray-500">output.tf</span>
              </div>
              <div className="text-gray-500">resource</div>
              <div><span className="text-[#FFB060]">&quot;alicloud_instance&quot;</span> <span className="text-gray-400">&quot;web&quot;</span> {"{"}</div>
              <div className="pl-4 text-gray-300">instance_type = <span className="text-green-400">&quot;ecs.c7.large&quot;</span></div>
              <div className="pl-4 text-gray-300">image_id = <span className="text-green-400">&quot;ubuntu_22_04&quot;</span></div>
              <div className="text-gray-500">{"}"}</div>
            </div>
          </div>

          {/* Plugins demo — animated ecosystem */}
          <div className={`absolute inset-0 p-8 transition-all duration-500 ${active === "plugins" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
              <span className="text-[12px] text-gray-400 font-mono">Plugin Ecosystem</span>
            </div>

            {/* Platform cards with hover glow */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { name: "Claude Code", active: true },
                { name: "Codex", active: true },
                { name: "QoderWork", active: true },
              ].map((p, i) => (
                <div
                  key={p.name}
                  className="platform-card rounded-xl p-4 border text-center relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="platform-glow absolute inset-0" style={{ animationDelay: `${i * 1.5}s` }} />
                  <div className="text-[14px] font-semibold text-gray-700 relative z-10">{p.name}</div>
                  <div className="text-[11px] text-gray-400 mt-1 relative z-10">Supported</div>
                </div>
              ))}
            </div>

            {/* Plugin list with status indicators */}
            <div className="space-y-2.5">
              {[
                { name: "alibabacloud-core", status: "active", version: "v1.2" },
                { name: "alibabacloud-spec-ops", status: "active", version: "v1.0" },
                { name: "run_script", status: "coming", version: "—" },
                { name: "run_hcl", status: "coming", version: "—" },
              ].map((plugin, i) => (
                <div
                  key={plugin.name}
                  className="flex items-center gap-3 h-11 px-4 rounded-xl border border-black/[0.04] plugin-row"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${plugin.status === "active" ? "bg-[#FF6A00] shadow-[0_0_8px_rgba(255,106,0,0.4)]" : "bg-gray-200"}`} />
                  <span className="font-mono text-[13px] text-gray-700">{plugin.name}</span>
                  <span className="ml-auto text-[11px] text-gray-400">{plugin.version}</span>
                  <span className={`text-[11px] font-medium ${plugin.status === "active" ? "text-[#FF6A00]" : "text-gray-300"}`}>
                    {plugin.status === "active" ? "● live" : "○ soon"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypeWriter({ text, className = "" }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span className={`inline-block w-[3px] h-[40px] bg-gradient-to-b from-[#FF6A00] to-[#FF9640] ml-1 align-middle rounded-sm ${done ? "animate-cursor" : ""}`} />
    </span>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("面向 Agent");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tabContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">

      {/* Animated grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div
          className="absolute w-[800px] h-[800px] rounded-full animate-orb"
          style={{ top: "-300px", right: "-200px", background: "radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 60%)" }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-orb-delay-1"
          style={{ top: "600px", left: "-200px", background: "radial-gradient(circle, rgba(255,140,60,0.06) 0%, transparent 60%)" }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-orb-delay-2"
          style={{ bottom: "-100px", right: "15%", background: "radial-gradient(circle, rgba(255,100,0,0.05) 0%, transparent 60%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 px-10 py-3.5 border-b border-black/[0.04] z-50 bg-white/70 backdrop-blur-xl">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png" alt="Alibaba Cloud" className="h-5 object-contain" />
              <span className="text-gray-300 mx-1">|</span>
              <span className="font-medium text-[14px] text-gray-600 tracking-tight">Agent Toolkit</span>
            </div>
            <div className="flex items-center gap-1">
              <a href="#products" className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">
                产品
              </a>
              <a href="#" className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">
                文档
              </a>
              <a href="#" className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">
                快速开始
              </a>
              <div className="w-px h-4 bg-gray-200 mx-2" />
              <a
                href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-full transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="text-center pt-32 pb-24 px-10 max-w-[1200px] mx-auto">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[rgba(255,106,0,0.06)] to-[rgba(255,160,80,0.03)] backdrop-blur-[10px] border border-[rgba(255,106,0,0.1)] rounded-full text-[14px] font-medium mb-8 animate-fade-in-up">
            <span className="w-[6px] h-[6px] rounded-full bg-[#FF6A00] animate-pulse-dot" />
            <span className="text-gray-500">支持</span>
            <span className="text-gray-800">Claude Code</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800">Codex</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800">QoderWork</span>
          </div>

          <h1 className="text-[56px] font-bold leading-[1.15] tracking-tight mb-6 animate-fade-in-up animation-delay-100">
            为 AI Agent 构建
            <br />
            <TypeWriter
              text="云端超能力"
              className="bg-gradient-to-r from-[#FF6A00] via-[#FF9640] to-[#FFB060] bg-clip-text text-transparent"
            />
          </h1>

          <p className="text-[18px] text-gray-400 max-w-[500px] mx-auto mb-14 leading-relaxed animate-fade-in-up animation-delay-200">
            MCP Server 无缝接入阿里云 200+ 服务，自然语言驱动云端操作
          </p>

          {/* Install Card */}
          <ShineCard className="max-w-[640px] mx-auto rounded-[24px] p-8 animate-fade-in-up animation-delay-300">
            {/* Tabs */}
            <div className="relative flex bg-black/[0.03] rounded-xl p-1 mb-6">
              <div
                className="absolute top-1 bottom-1 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,106,0,0.06)] transition-all duration-300 ease-out"
                style={{
                  width: `${100 / tabs.length}%`,
                  left: `${(tabs.indexOf(activeTab) * 100) / tabs.length}%`,
                }}
              />
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-3 px-4 text-[14px] rounded-[10px] font-medium cursor-pointer relative z-10 transition-colors duration-200 ${
                    activeTab === tab ? "text-[#FF6A00]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content block */}
            <div className="relative bg-black/[0.02] border border-black/[0.05] rounded-[16px] p-6 text-left">
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 px-3.5 py-1.5 text-[12px] text-[#FF6A00] border border-[rgba(255,106,0,0.15)] rounded-lg bg-[rgba(255,106,0,0.04)] hover:bg-[rgba(255,106,0,0.08)] transition-all cursor-pointer font-sans"
              >
                {copied ? "已复制 ✓" : "复制"}
              </button>
              <pre className="whitespace-pre-wrap pr-16 font-mono text-[14px] text-gray-600 leading-[1.8]">{tabContent[activeTab]}</pre>
            </div>
          </ShineCard>
        </section>

        {/* Concepts — Interactive Showcase */}
        <ConceptShowcase />

        {/* Products — Timeline style */}
        <section id="products" className="px-10 pb-24 max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[14px] text-[#FF6A00] font-semibold mb-3 tracking-wide">
              产品与工具
            </p>
            <h2 className="text-[40px] font-bold tracking-tight">
              开箱即用的云端集成
            </h2>
          </div>

          <div className="max-w-[900px] mx-auto relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(255,106,0,0.15)] to-transparent -translate-x-1/2" />

            {products.map((p, i) => (
              <div
                key={p.title}
                className={`group relative flex items-center gap-8 mb-8 last:mb-0 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Card */}
                <div className={`flex-1 shine-card rounded-2xl p-6 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <h4 className="text-[17px] font-semibold text-gray-800">{p.title}</h4>
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                      p.status === "active"
                        ? "bg-[rgba(255,106,0,0.08)] text-[#FF6A00] border border-[rgba(255,106,0,0.12)]"
                        : "bg-gray-50 text-gray-400 border border-gray-100"
                    }`}>
                      {p.status === "active" ? "已可用" : "即将推出"}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full border-[3px] transition-all duration-300 ${
                    p.status === "active"
                      ? "border-[#FF6A00] bg-white group-hover:shadow-[0_0_16px_rgba(255,106,0,0.4)]"
                      : "border-gray-300 bg-white"
                  }`} />
                </div>

                {/* Opposite side — only visible on hover */}
                <div className={`flex-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                  {p.title === "alibabacloud-core" && (
                    <div className="inline-block bg-black/[0.02] border border-black/[0.04] rounded-xl px-5 py-3.5 font-mono text-[12px] text-gray-500 text-left">
                      <div><span className="text-[#FF6A00]">$</span> aliyun ecs DescribeInstances</div>
                      <div className="text-gray-400 mt-1.5">→ 12 instances found</div>
                    </div>
                  )}
                  {p.title === "alibabacloud-spec-ops" && (
                    <div className="inline-flex gap-2 items-center">
                      {["Plan", "Code", "Check", "Run"].map((s, si) => (
                        <div key={s} className="flex items-center gap-1.5">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-semibold border ${
                            si === 3 ? "bg-[rgba(255,106,0,0.06)] border-[rgba(255,106,0,0.2)] text-[#FF6A00]" : "bg-white border-gray-100 text-gray-400"
                          }`}>{si + 1}</div>
                          {si < 3 && <div className="w-4 h-[2px] bg-gradient-to-r from-[rgba(255,106,0,0.2)] to-gray-100 rounded-full" />}
                        </div>
                      ))}
                    </div>
                  )}
                  {p.title === "run_script" && (
                    <div className="inline-block bg-black/[0.02] border border-black/[0.04] rounded-xl px-5 py-3.5 font-mono text-[12px] text-gray-400 text-left">
                      <div><span className="text-gray-300">$</span> run deploy.sh --env prod</div>
                      <div className="text-gray-300 mt-1.5">⏳ coming soon</div>
                    </div>
                  )}
                  {p.title === "run_hcl" && (
                    <div className="inline-block bg-black/[0.02] border border-black/[0.04] rounded-xl px-5 py-3.5 font-mono text-[12px] text-gray-400 text-left">
                      <div><span className="text-gray-300">$</span> validate main.tf</div>
                      <div className="text-gray-300 mt-1.5">⏳ coming soon</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/[0.04] max-w-[1200px] mx-auto pt-16 pb-10 px-10">
          <div className="flex justify-between items-start mb-12">
            {/* Left — brand + slogan */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src="https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png" alt="Alibaba Cloud" className="h-4 object-contain" />
                <span className="text-gray-300 mx-1">/</span>
                <span className="font-semibold text-[15px] text-gray-800">Agent Toolkit</span>
              </div>
              <p className="text-[14px] text-gray-400 max-w-[300px] leading-relaxed">
                让 AI Agent 拥有云端能力，用自然语言操控云基础设施。
              </p>
            </div>

            {/* Right — links */}
            <div className="flex gap-16">
              <div>
                <h5 className="text-[13px] font-semibold text-gray-800 mb-3">资源</h5>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-[13px] text-gray-400 hover:text-[#FF6A00] transition-colors">文档</a>
                  <a href="#" className="text-[13px] text-gray-400 hover:text-[#FF6A00] transition-colors">快速开始</a>
                  <a href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit" className="text-[13px] text-gray-400 hover:text-[#FF6A00] transition-colors">GitHub</a>
                </div>
              </div>
              <div>
                <h5 className="text-[13px] font-semibold text-gray-800 mb-3">支持平台</h5>
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] text-gray-400">Claude Code</span>
                  <span className="text-[13px] text-gray-400">Codex</span>
                  <span className="text-[13px] text-gray-400">QoderWork</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
            <p className="text-[12px] text-gray-300">© 2024 Alibaba Cloud Open Platform</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#FF6A00] transition-colors">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
