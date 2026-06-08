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
    desc: "基于 Model Context Protocol 的标准协议层，让 Agent 通过统一接口访问阿里云全系服务。",
    stats: [
      { value: "200+", label: "云服务 API" },
      { value: "9", label: "MCP Tools" },
    ],
  },
  {
    id: "toolkits",
    title: "Agent Toolkits",
    tag: "Scenarios",
    desc: "预构建的场景化工具集合，涵盖 OpenAPI、基础设施编排、脚本执行等核心能力。",
    stats: [
      { value: "5", label: "工具模块" },
      { value: "4", label: "执行阶段" },
    ],
  },
  {
    id: "plugins",
    title: "Plugins",
    tag: "Extensible",
    desc: "可扩展的插件体系，支持社区贡献与自定义扩展，按需组合你的专属能力栈。",
    stats: [
      { value: "4", label: "官方插件" },
      { value: "3", label: "Agent 平台" },
    ],
  },
];

function ConceptShowcase() {
  const [active, setActive] = useState("mcp");

  return (
    <section className="px-10 py-24 max-w-[1200px] mx-auto">
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
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-[16px] font-semibold transition-colors ${active === c.id ? "text-gray-900" : "text-gray-500"}`}>
                  {c.title}
                </h3>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border transition-all ${
                  active === c.id
                    ? "bg-[rgba(255,106,0,0.08)] text-[#FF6A00] border-[rgba(255,106,0,0.12)]"
                    : "bg-gray-50 text-gray-400 border-gray-100"
                }`}>{c.tag}</span>
              </div>
              <p className={`text-[13px] leading-relaxed transition-colors ${active === c.id ? "text-gray-500" : "text-gray-400"}`}>
                {c.desc}
              </p>
              {active === c.id && (
                <div className="flex gap-5 mt-4 pt-4 border-t border-black/[0.04]">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-[20px] font-bold text-gray-800">{s.value}</div>
                      <div className="text-[11px] text-gray-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right — dynamic demo panel */}
        <div className="flex-1 rounded-2xl border border-black/[0.04] bg-white/60 backdrop-blur-xl overflow-hidden relative min-h-[380px]">
          {/* MCP Core demo */}
          <div className={`absolute inset-0 p-8 transition-all duration-500 ${active === "mcp" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="text-[11px] text-gray-400 mb-4 font-mono">MCP Server · Live Demo</div>
            <div className="space-y-3">
              {["ListProducts", "SearchApis", "GetApiDefinition", "GenerateCLICommand", "CallCLI"].map((tool, i) => (
                <div key={tool} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                  <div className="flex-1 h-10 rounded-lg bg-gradient-to-r from-[rgba(255,106,0,0.04)] to-transparent border border-black/[0.03] flex items-center px-4">
                    <span className="font-mono text-[12px] text-gray-600">{tool}</span>
                    <span className="ml-auto text-[10px] text-gray-300">tool/{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-8 left-8 right-8 h-12 rounded-lg bg-black/[0.03] border border-black/[0.04] flex items-center px-4 font-mono text-[12px] text-gray-400">
              <span className="text-[#FF6A00] mr-2">→</span>
              Agent 请求: &quot;帮我查询 ECS 的 API 列表&quot;
              <span className="ml-1 w-[2px] h-4 bg-[#FF6A00] animate-cursor" />
            </div>
          </div>

          {/* Toolkits demo */}
          <div className={`absolute inset-0 p-8 transition-all duration-500 ${active === "toolkits" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="text-[11px] text-gray-400 mb-4 font-mono">Spec-Ops Pipeline · Workflow</div>
            <div className="flex items-center justify-between mb-8">
              {["Plan", "Codegen", "Validate", "Execute"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-[12px] font-semibold border transition-all duration-500"
                      style={{
                        background: `rgba(255,106,0,${0.05 + i * 0.05})`,
                        borderColor: `rgba(255,106,0,${0.1 + i * 0.1})`,
                        color: i === 3 ? "#FF6A00" : "#888",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[11px] text-gray-500 mt-2">{step}</span>
                  </div>
                  {i < 3 && (
                    <div className="w-12 h-[2px] mx-2 bg-gradient-to-r from-[rgba(255,106,0,0.2)] to-[rgba(255,106,0,0.05)]" />
                  )}
                </div>
              ))}
            </div>
            <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-4 font-mono text-[11px] leading-relaxed">
              <div className="text-gray-400 mb-1"># Terraform generated output</div>
              <div className="text-gray-600">resource <span className="text-[#FF6A00]">&quot;alicloud_instance&quot;</span> &quot;web&quot; {"{"}</div>
              <div className="text-gray-600 pl-4">instance_type = &quot;ecs.c7.large&quot;</div>
              <div className="text-gray-600 pl-4">image_id = &quot;ubuntu_22_04_x64&quot;</div>
              <div className="text-gray-600">{"}"}</div>
            </div>
          </div>

          {/* Plugins demo */}
          <div className={`absolute inset-0 p-8 transition-all duration-500 ${active === "plugins" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="text-[11px] text-gray-400 mb-4 font-mono">Plugin Ecosystem · Supported Platforms</div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { name: "Claude Code", color: true },
                { name: "Codex", color: false },
                { name: "QoderWork", color: false },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`rounded-xl p-4 border text-center transition-all ${
                    p.color
                      ? "bg-[rgba(255,106,0,0.04)] border-[rgba(255,106,0,0.12)]"
                      : "bg-white/50 border-black/[0.04]"
                  }`}
                >
                  <div className={`text-[13px] font-medium ${p.color ? "text-[#FF6A00]" : "text-gray-600"}`}>{p.name}</div>
                  <div className="text-[10px] text-gray-400 mt-1">Agent Platform</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["alibabacloud-core", "alibabacloud-spec-ops", "run_script", "run_hcl"].map((plugin, i) => (
                <div key={plugin} className="flex items-center gap-3 h-9 px-4 rounded-lg bg-black/[0.02] border border-black/[0.03]">
                  <div className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-[#FF6A00]" : "bg-gray-300"}`} />
                  <span className="font-mono text-[12px] text-gray-600">{plugin}</span>
                  <span className={`ml-auto text-[10px] ${i < 2 ? "text-[#FF6A00]" : "text-gray-300"}`}>
                    {i < 2 ? "active" : "coming"}
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
              <svg width="24" height="24" viewBox="0 0 1024 1024" fill="none">
                <path d="M103.3 512c0-119.6 79-224.9 193.5-258.4l30-8.8-8.7-30C308 181 325 145 356.4 124.2c31.5-20.8 70.2-22 103-3.3l17.3 9.9 12.2-15.7c50.2-64.7 126-101.8 208-101.8 145.4 0 263.8 118.3 263.8 263.8v21.4l21.3 1.3c108.3 6.5 193.6 97.1 193.6 206.2 0 114-92.7 206.7-206.7 206.7H329.5C205.1 712.7 103.3 619.5 103.3 512z" fill="#FF6A00"/>
              </svg>
              <span className="font-semibold text-[14px] text-gray-800 tracking-tight">
                Alibaba Cloud <span className="text-gray-400 font-normal">/ Agent Toolkit</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <a href="#products" className="px-3.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">
                产品
              </a>
              <a href="#" className="px-3.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">
                文档
              </a>
              <a href="#" className="px-3.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">
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
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(255,106,0,0.05)] backdrop-blur-[10px] border border-[rgba(255,106,0,0.12)] rounded-full text-[13px] text-[#FF6A00] font-medium mb-8 animate-fade-in-up">
            <span className="w-[7px] h-[7px] bg-[#FF6A00] rounded-full animate-pulse-dot" />
            Alibaba Cloud Open Platform
          </div>

          <h1 className="text-[52px] font-bold leading-[1.2] tracking-tight mb-5 animate-fade-in-up animation-delay-100">
            为 AI Agent 构建
            <br />
            <TypeWriter
              text="云端超能力"
              className="bg-gradient-to-r from-[#FF6A00] via-[#FF9640] to-[#FFB060] bg-clip-text text-transparent"
            />
          </h1>

          <p className="text-[17px] text-gray-400 max-w-[480px] mx-auto mb-14 leading-relaxed animate-fade-in-up animation-delay-200">
            通过 MCP Server 将阿里云 200+ 云服务无缝接入 AI Agent，自然语言驱动云端操作。
          </p>

          {/* Install Card */}
          <ShineCard className="max-w-[620px] mx-auto rounded-[22px] p-7 animate-fade-in-up animation-delay-300">
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
          </ShineCard>
        </section>

        {/* Concepts — Interactive Showcase */}
        <ConceptShowcase />

        {/* Products — Timeline style */}
        <section id="products" className="px-10 pb-24 max-w-[1200px] mx-auto">
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

          <div className="max-w-[900px] mx-auto relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(255,106,0,0.15)] to-transparent -translate-x-1/2" />

            {products.map((p, i) => (
              <div
                key={p.title}
                className={`relative flex items-center gap-8 mb-8 last:mb-0 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Card */}
                <div className={`flex-1 group shine-card rounded-2xl p-6 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <h4 className="text-[16px] font-semibold text-gray-800">{p.title}</h4>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      p.status === "active"
                        ? "bg-[rgba(255,106,0,0.08)] text-[#FF6A00] border border-[rgba(255,106,0,0.12)]"
                        : "bg-gray-50 text-gray-400 border border-gray-100"
                    }`}>
                      {p.status === "active" ? "已可用" : "即将推出"}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</p>
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full border-[3px] ${
                    p.status === "active"
                      ? "border-[#FF6A00] bg-white shadow-[0_0_12px_rgba(255,106,0,0.3)]"
                      : "border-gray-300 bg-white"
                  }`} />
                </div>

                {/* Opposite side — mini code/visual */}
                <div className={`flex-1 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                  {p.title === "alibabacloud-core" && (
                    <div className="inline-block bg-black/[0.02] border border-black/[0.04] rounded-xl px-4 py-3 font-mono text-[11px] text-gray-500 text-left">
                      <div><span className="text-[#FF6A00]">$</span> aliyun ecs DescribeInstances</div>
                      <div className="text-gray-300 mt-1">→ 12 instances found</div>
                    </div>
                  )}
                  {p.title === "alibabacloud-spec-ops" && (
                    <div className="inline-flex gap-2 items-center">
                      {["Plan", "Code", "Check", "Run"].map((s, si) => (
                        <div key={s} className="flex items-center gap-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-medium border ${
                            si === 3 ? "bg-[rgba(255,106,0,0.06)] border-[rgba(255,106,0,0.15)] text-[#FF6A00]" : "bg-gray-50 border-gray-100 text-gray-400"
                          }`}>{si + 1}</div>
                          {si < 3 && <div className="w-3 h-[1px] bg-gray-200" />}
                        </div>
                      ))}
                    </div>
                  )}
                  {p.title === "run_script" && (
                    <div className="inline-block bg-black/[0.02] border border-black/[0.04] rounded-xl px-4 py-3 font-mono text-[11px] text-gray-400 text-left">
                      <div><span className="text-gray-300">$</span> run deploy.sh --env prod</div>
                      <div className="text-gray-300 mt-1">⏳ coming soon</div>
                    </div>
                  )}
                  {p.title === "run_hcl" && (
                    <div className="inline-block bg-black/[0.02] border border-black/[0.04] rounded-xl px-4 py-3 font-mono text-[11px] text-gray-400 text-left">
                      <div><span className="text-gray-300">$</span> validate main.tf</div>
                      <div className="text-gray-300 mt-1">⏳ coming soon</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-14 border-t border-black/[0.04] text-[13px] text-gray-400 max-w-[1200px] mx-auto">
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
