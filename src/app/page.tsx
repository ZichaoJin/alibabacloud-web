"use client";

import React, { useState, useEffect, useRef } from "react";

const tabs = ["面向 Agent", "面向开发者", "README"] as const;

const tabContent = {
  "面向 Agent":
    "请访问 https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit\n并按说明为我安装 alibabacloud agent toolkit skills。",
  "面向开发者":
    "npx @anthropic-ai/claude-code install alibabacloud-agent-toolkit",
  README:
    "# Alibaba Cloud Agent Toolkit\n\nMCP servers, skills, and plugins for building AI agents on Alibaba Cloud.",
};

function ShineCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`shine-card ${className}`}>
      {children}
    </div>
  );
}

function TypeWriter({ text, className = "" }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { setDone(true); clearInterval(interval); }
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

/* ─── Section: 重点工具 ─── */
const toolData = [
  {
    id: "mcp-core",
    title: "MCP-Core",
    tag: "统一协议层",
    desc: "9 大核心工具，2w+ OpenAPI 即开即用",
    stats: [{ value: "20000+", label: "API" }, { value: "9", label: "Tools" }],
  },
  {
    id: "plugin",
    title: "Plugin",
    tag: "框架集成",
    desc: "Claude / Codex / Qoder 官方插件",
    stats: [{ value: "2", label: "模块" }, { value: "3", label: "平台" }],
  },
  {
    id: "cli",
    title: "CLI (AI Mode)",
    tag: "命令行",
    desc: "All-in-One CLI，AI Mode 自动纠错",
    stats: [{ value: "All-in-One", label: "覆盖" }, { value: "AI Mode", label: "增强" }],
  },
  {
    id: "sdk",
    title: "SDK",
    tag: "代码集成",
    desc: "多语言 SDK，Common + 产品专有",
    stats: [{ value: "多语言", label: "覆盖" }, { value: "2", label: "类型" }],
  },
  {
    id: "terraform",
    title: "Terraform",
    tag: "IaC 编排",
    desc: "声明式编排，资源状态管理",
    stats: [{ value: "IaC", label: "模式" }, { value: "托管", label: "沙箱" }],
  },
  {
    id: "skills",
    title: "Skills 市场",
    tag: "领域专家",
    desc: "160+ 通用与专家级诊断技能",
    stats: [{ value: "160+", label: "技能" }, { value: "多产品", label: "覆盖" }],
  },
  {
    id: "mcp-server",
    title: "MCP-Server",
    tag: "自定义",
    desc: "按需打包 OpenAPI 子集为专属端点",
    stats: [{ value: "2w+", label: "可选 API" }, { value: "自定义", label: "端点" }],
  },
];

function McpCoreDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">MCP-Core · 9 Tools</span>
    </div>
    {[
      { cat: "执行类", tools: [{ name: "Call_CLI", desc: "安全沙箱内执行 CLI 命令" }, { name: "Run_IaC", desc: "远程执行 Terraform 编排" }, { name: "Run_Scripts", desc: "远程执行确定脚本任务" }] },
      { cat: "发现类", tools: [{ name: "ListApis / SearchApis", desc: "自然语言搜索阿里云 API" }, { name: "ListProductRegions", desc: "查询产品可用 Region" }, { name: "GenerateCLICommand", desc: "自然语言生成 CLI 命令" }] },
      { cat: "知识类", tools: [{ name: "SearchDocuments", desc: "检索官方文档与最佳实践" }] },
    ].map((g) => (
      <div key={g.cat} className="mb-3">
        <div className="text-[11px] text-[#FF6A00] font-semibold mb-1.5 tracking-wide">{g.cat}</div>
        <div className="space-y-1.5">
          {g.tools.map((t) => (
            <div key={t.name} className="flex items-center gap-3 h-9 px-4 rounded-lg border border-black/[0.04] relative overflow-hidden">
              <div className="shimmer-bar absolute inset-0" />
              <span className="font-mono text-[12px] text-gray-700 relative z-10">{t.name}</span>
              <span className="ml-auto text-[11px] text-gray-400 relative z-10">{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
    <div className="text-[11px] text-[#FF6A00] font-semibold mb-1.5 tracking-wide mt-4">核心优势</div>
    <div className="grid grid-cols-2 gap-1.5 mb-3">
      {[{ l: "协议层安全", d: "配置允许执行的 API 范围" }, { l: "HITL 可选", d: "敏感操作人工审批" }, { l: "0 依赖免升级", d: "服务端更新即生效" }, { l: "安全沙箱", d: "执行环境隔离" }, { l: "统一抽象", d: "元数据+文档+执行闭环" }].map((f) => (
        <div key={f.l} className="flex items-start gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,106,0,0.03)] border border-[rgba(255,106,0,0.08)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] mt-1.5 flex-shrink-0" />
          <div><span className="text-[11px] font-medium text-gray-700">{f.l}</span><p className="text-[10px] text-gray-400">{f.d}</p></div>
        </div>
      ))}
    </div>
    <a href="https://github.com/aliyun/alibabacloud-api-mcp-server" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#FF6A00] hover:underline font-medium">GitHub →</a>
  </>);
}

function PluginDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">alibabacloud-agent-toolkit</span>
    </div>
    <div className="rounded-xl border border-black/[0.04] p-4 mb-3">
      <div className="text-[14px] font-semibold text-gray-800 mb-2">alibabacloud-core</div>
      <div className="text-[12px] text-gray-400 mb-2">阿里云原子能力 Skill 与使用指南集合</div>
      <div className="flex flex-wrap gap-1.5">
        {["SDK 最佳实践", "CLI 指引", "多账号查询", "MCP 最佳实践", "Terraform 指引", "MCP-Core 集成"].map((s) => (
          <span key={s} className="px-2 py-0.5 text-[11px] bg-gray-50 text-gray-600 rounded-md border border-gray-100">{s}</span>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-black/[0.04] p-4 mb-3">
      <div className="text-[14px] font-semibold text-gray-800 mb-2">alibabacloud-spec-ops</div>
      <div className="text-[12px] text-gray-400 mb-2">SDD 运维插件 · 端到端流程</div>
      <div className="flex flex-wrap gap-1.5">
        {["SDD + Rule", "Terraform IaC", "HITL 审批", "MCP 集成"].map((s) => (
          <span key={s} className="px-2 py-0.5 text-[11px] bg-[rgba(255,106,0,0.04)] text-gray-600 rounded-md border border-[rgba(255,106,0,0.08)]">{s}</span>
        ))}
      </div>
    </div>
    <a href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#FF6A00] hover:underline font-medium">GitHub →</a>
  </>);
}

function CliDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">CLI · AI Mode</span>
    </div>
    <div className="bg-[#1a1a2e] rounded-xl p-4 font-mono text-[12px] leading-[1.7] mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-400/60" /><div className="w-3 h-3 rounded-full bg-yellow-400/60" /><div className="w-3 h-3 rounded-full bg-green-400/60" />
      </div>
      <div className="text-gray-400"># 开启 AI Mode</div>
      <div className="text-gray-300">$ <span className="text-[#FFB060]">aliyun configure ai-mode enable</span></div>
    </div>
    <div className="space-y-1.5 mb-3">
      {[{ l: "自动纠错", d: "报错返回纠错指引" }, { l: "可观测", d: "执行链路标识" }, { l: "全产品", d: "OSS/KMS/SLS 统一" }, { l: "统一鉴权", d: "阿里云体系对齐" }, { l: "retry-after", d: "限流退避" }].map((f) => (
        <div key={f.l} className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-black/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
          <span className="text-[12px] font-medium text-gray-700">{f.l}</span>
          <span className="text-[11px] text-gray-400 ml-auto">{f.d}</span>
        </div>
      ))}
    </div>
    <a href="https://next.api.aliyun.com/api-tools/cli" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#FF6A00] hover:underline font-medium">官方文档 →</a>
  </>);
}

function SdkDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">Alibaba Cloud SDK</span>
    </div>
    {[{ t: "Common SDK", d: "通用 OpenAPI 入口，轻量集成" }, { t: "产品专有 SDK", d: "强类型强语义，深度集成" }, { t: "SDK Coding Skill", d: "自动匹配最佳实践生成代码" }].map((s) => (
      <div key={s.t} className="rounded-xl border border-black/[0.04] p-4 mb-2">
        <div className="text-[14px] font-semibold text-gray-800 mb-1">{s.t}</div>
        <p className="text-[12px] text-gray-400">{s.d}</p>
      </div>
    ))}
    <a href="https://next.api.aliyun.com/api-tools/sdk" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#FF6A00] hover:underline font-medium mt-2 inline-block">SDK 文档 →</a>
  </>);
}

function TerraformDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">Terraform · IaC</span>
    </div>
    <p className="text-[13px] text-gray-500 mb-3">声明式编排引擎，以「资源状态」视角管理云上资源。</p>
    <div className="bg-[#1a1a2e] rounded-xl p-4 font-mono text-[12px] leading-[1.7] mb-3">
      <div className="text-gray-300">resource <span className="text-[#FFB060]">&quot;alicloud_instance&quot;</span> {"{"}</div>
      <div className="text-gray-300 pl-4">type = <span className="text-green-400">&quot;ecs.c7.large&quot;</span></div>
      <div className="text-gray-300">{"}"}</div>
    </div>
    <div className="space-y-1.5 mb-3">
      {["HCL 代码生成 Skill", "存量资源 Terraform 导入"].map((s) => (
        <div key={s} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,106,0,0.03)] border border-[rgba(255,106,0,0.08)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
          <span className="text-[12px] text-gray-600">{s}</span>
        </div>
      ))}
    </div>
    <a href="https://next.api.aliyun.com/terraform" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#FF6A00] hover:underline font-medium">在线调试 →</a>
  </>);
}

function SkillsDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">Skills Market · 160+</span>
    </div>
    <p className="text-[13px] text-gray-500 mb-3">覆盖阿里云各产品线，从通用指引到专家级诊断能力。</p>
    <div className="space-y-1.5 mb-3">
      {["数据库诊断", "RAM 权限诊断", "ECS 诊断", "CLI 使用指引", "Terraform 代码生成"].map((s) => (
        <div key={s} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-black/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
          <span className="text-[12px] text-gray-700">{s}</span>
        </div>
      ))}
      <div className="text-[11px] text-gray-400 px-3">+ 更多 160+ 技能</div>
    </div>
    <a href="https://skills.aliyun.com/" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#FF6A00] hover:underline font-medium">浏览 Skills 市场 →</a>
  </>);
}

function McpServerDetail() {
  return (<>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse-dot" />
      <span className="text-[12px] text-gray-400 font-mono">Custom MCP Server</span>
    </div>
    <div className="text-center py-4">
      <div className="text-[40px] font-bold text-gray-200 mb-1">2w+</div>
      <div className="text-[13px] text-gray-400 mb-4">OpenAPI 可选</div>
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[12px] text-gray-500">全量 OpenAPI</div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <div className="px-3 py-1.5 rounded-lg bg-[rgba(255,106,0,0.06)] border border-[rgba(255,106,0,0.15)] text-[12px] text-[#FF6A00] font-medium">你的 MCP 端点</div>
      </div>
      <p className="text-[12px] text-gray-400 max-w-[350px] mx-auto">按业务场景自定义子集，打包为专属 MCP Server endpoint。</p>
    </div>
    <a href="https://next.api.aliyun.com/mcp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-[13px] text-[#FF6A00] hover:underline font-medium">查看文档 →</a>
  </>);
}

function ToolShowcase() {
  const [active, setActive] = useState("mcp-core");
  const containerRef = useRef<HTMLDivElement>(null);
  const [detailTop, setDetailTop] = useState(0);

  const detailRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const [activeCardBottom, setActiveCardBottom] = useState(0);
  const [alignMode, setAlignMode] = useState<"top" | "progress" | "bottom">("top");

  const handleHover = (id: string, e: React.MouseEvent) => {
    setActive(id);
    const card = e.currentTarget as HTMLElement;
    const leftContainer = leftRef.current;
    if (!leftContainer) return;

    const cardTop = card.offsetTop;
    const cardBottom = cardTop + card.offsetHeight;

    if (id === "mcp-server") {
      setActiveCardBottom(cardBottom);
      setAlignMode("bottom");
    } else if (id === "skills") {
      const lastCard = leftContainer.lastElementChild as HTMLElement;
      const lastBottom = lastCard ? lastCard.offsetTop + lastCard.offsetHeight : cardBottom;
      setActiveCardBottom(lastBottom);
      setAlignMode("bottom");
    } else {
      const leftHeight = leftContainer.offsetHeight;
      const cardCenter = cardTop + card.offsetHeight / 2;
      const progress = leftHeight > 0 ? cardCenter / leftHeight : 0;
      setDetailTop(Math.max(0, cardTop));
      setAlignMode("progress");
      // recalc after render
      requestAnimationFrame(() => {
        const detailH = detailRef.current?.offsetHeight || 0;
        const topAligned = cardTop;
        const bottomAligned = cardBottom - detailH;
        const finalTop = topAligned + (bottomAligned - topAligned) * progress;
        setDetailTop(Math.max(0, finalTop));
      });
    }
  };

  // For bottom-aligned modes, recalc after detail content renders
  useEffect(() => {
    if (alignMode === "bottom") {
      const timer = setTimeout(() => {
        const detailH = detailRef.current?.offsetHeight || 0;
        setDetailTop(Math.max(0, activeCardBottom - detailH));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [active, alignMode, activeCardBottom]);

  return (
    <section className="px-10 py-24 max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
        <p className="text-[14px] text-[#FF6A00] font-semibold mb-3 tracking-wide">重点推荐</p>
        <h2 className="text-[40px] font-bold tracking-tight">核心工具详解</h2>
      </div>

      <div ref={containerRef} className="relative flex gap-6 max-w-[1100px] mx-auto items-start">
        {/* Left */}
        <div ref={leftRef} className="flex flex-col gap-2 w-[280px] flex-shrink-0">
          {toolData.map((t) => (
            <div
              key={t.id}
              onMouseEnter={(e) => handleHover(t.id, e)}
              className={`cursor-pointer rounded-xl px-4 py-3 transition-all duration-300 border ${
                active === t.id
                  ? "bg-white border-[rgba(255,106,0,0.15)] shadow-[0_4px_20px_rgba(255,106,0,0.06)]"
                  : "bg-white/50 border-transparent hover:bg-white/80"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className={`text-[16px] font-semibold transition-colors ${active === t.id ? "text-gray-900" : "text-gray-500"}`}>{t.title}</h3>
                <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border transition-all ${
                  active === t.id ? "bg-[rgba(255,106,0,0.08)] text-[#FF6A00] border-[rgba(255,106,0,0.12)]" : "bg-gray-50 text-gray-400 border-gray-100"
                }`}>{t.tag}</span>
              </div>
              <p className={`text-[13px] leading-relaxed transition-colors ${active === t.id ? "text-gray-500" : "text-gray-400"}`}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Right — positioned to align with active card */}
        <div
          className="flex-1 absolute left-[304px] right-0 transition-all duration-300 ease-out"
          style={{ top: detailTop }}
        >
          <div ref={detailRef} className="rounded-2xl border border-black/[0.04] bg-white/60 backdrop-blur-xl p-7">
            {active === "mcp-core" && <McpCoreDetail />}
            {active === "plugin" && <PluginDetail />}
            {active === "cli" && <CliDetail />}
            {active === "sdk" && <SdkDetail />}
            {active === "terraform" && <TerraformDetail />}
            {active === "skills" && <SkillsDetail />}
            {active === "mcp-server" && <McpServerDetail />}
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Home() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("面向 Agent");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showGH, setShowGH] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tabContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute w-[800px] h-[800px] rounded-full animate-orb" style={{ top: "-300px", right: "-200px", background: "radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 60%)" }} />
        <div className="absolute w-[600px] h-[600px] rounded-full animate-orb-delay-1" style={{ top: "600px", left: "-200px", background: "radial-gradient(circle, rgba(255,140,60,0.06) 0%, transparent 60%)" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full animate-orb-delay-2" style={{ bottom: "-100px", right: "15%", background: "radial-gradient(circle, rgba(255,100,0,0.05) 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 px-10 py-3.5 border-b border-black/[0.04] z-50 bg-white/70 backdrop-blur-xl">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png" alt="Alibaba Cloud" className="h-5 object-contain" />
              <span className="text-gray-300 mx-1">|</span>
              <span className="font-medium text-[13px] text-gray-500 tracking-tight">开放平台 - API/AI工具链团队</span>
            </div>
            <div className="flex items-center gap-1">
              <a href="#tools" className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">产品</a>
              <a href="#" className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">文档</a>
              <a href="#" className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all">快速开始</a>
              <div className="relative">
                <button onClick={() => setShowQR(!showQR)} className="px-4 py-1.5 text-[14px] text-gray-500 hover:text-gray-800 hover:bg-black/[0.03] rounded-full transition-all cursor-pointer">联系</button>
                {showQR && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowQR(false)} />
                    <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.1)] border border-black/[0.04] p-5 w-[220px]">
                      <p className="text-[13px] text-gray-600 font-medium mb-3 text-center">扫码加入交流群</p>
                      <img src="/qrcode.png" alt="QR Code" className="w-full rounded-lg" />
                    </div>
                  </>
                )}
              </div>
              <div className="w-px h-4 bg-gray-200 mx-2" />
              <div className="relative">
                <button onClick={() => setShowGH(!showGH)} className={`flex items-center gap-1.5 px-4 py-1.5 text-[13px] border rounded-full transition-all cursor-pointer ${showGH ? "text-[#FF6A00] border-[rgba(255,106,0,0.2)] bg-[rgba(255,106,0,0.04)]" : "text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-300"}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
                  GitHub
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${showGH ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {showGH && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowGH(false)} />
                    <div className="absolute -right-4 top-14 z-50 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.04)] w-[380px] gh-dropdown overflow-hidden" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'saturate(200%) blur(40px)', WebkitBackdropFilter: 'saturate(200%) blur(40px)', border: '1px solid rgba(255,255,255,0.6)' }}>
                      <div className="p-3">
                        <div className="space-y-1.5">
                          <a href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3.5 rounded-xl border border-transparent hover:border-[rgba(255,106,0,0.1)] hover:bg-white/60 transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF9640] flex items-center justify-center flex-shrink-0 shadow-[0_3px_12px_rgba(255,106,0,0.2)] group-hover:shadow-[0_6px_20px_rgba(255,106,0,0.3)] group-hover:scale-105 transition-all">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" /><path d="M12 12l9-5M12 12v10M12 12L3 7" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] font-semibold text-gray-800 group-hover:text-[#FF6A00] transition-colors">agent-toolkit</div>
                              <p className="text-[12px] text-gray-400 mt-0.5">Skills & Plugins for AI Agents</p>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-[#FF6A00] flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                          </a>
                          <a href="https://github.com/aliyun/alibabacloud-api-mcp-server" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3.5 rounded-xl border border-transparent hover:border-[rgba(255,106,0,0.1)] hover:bg-white/60 transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF9640] flex items-center justify-center flex-shrink-0 shadow-[0_3px_12px_rgba(255,106,0,0.2)] group-hover:shadow-[0_6px_20px_rgba(255,106,0,0.3)] group-hover:scale-105 transition-all">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] font-semibold text-gray-800 group-hover:text-[#FF6A00] transition-colors">api-mcp-server</div>
                              <p className="text-[12px] text-gray-400 mt-0.5">200+ 云服务 MCP 标准接入</p>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-[#FF6A00] flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section className="text-center pt-32 pb-20 px-10 max-w-[1200px] mx-auto">
          <h1 className="text-[56px] font-bold leading-[1.15] tracking-tight mb-6 animate-fade-in-up animation-delay-100">
            为 AI Agent 构建
            <br />
            <TypeWriter text="云端超能力" className="bg-gradient-to-r from-[#FF6A00] via-[#FF9640] to-[#FFB060] bg-clip-text text-transparent" />
          </h1>
          <p className="text-[18px] text-gray-400 max-w-[560px] mx-auto mb-14 leading-relaxed animate-fade-in-up animation-delay-200">
            从协议层到执行层的完整工具栈，让 Agent 通过 MCP 操控阿里云 2w+ OpenAPI
          </p>

          {/* Install Card */}
          <ShineCard className="max-w-[640px] mx-auto rounded-[24px] p-8 animate-fade-in-up animation-delay-300">
            <div className="relative flex bg-black/[0.03] rounded-xl p-1 mb-6">
              <div className="absolute top-1 bottom-1 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,106,0,0.06)] transition-all duration-300 ease-out" style={{ width: `${100 / tabs.length}%`, left: `${(tabs.indexOf(activeTab) * 100) / tabs.length}%` }} />
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 text-center py-3 px-4 text-[14px] rounded-[10px] font-medium cursor-pointer relative z-10 transition-colors duration-200 ${activeTab === tab ? "text-[#FF6A00]" : "text-gray-400 hover:text-gray-600"}`}>{tab}</button>
              ))}
            </div>
            <div className="relative bg-black/[0.02] border border-black/[0.05] rounded-[16px] p-6 text-left">
              <button onClick={handleCopy} className="absolute top-4 right-4 px-3.5 py-1.5 text-[12px] text-[#FF6A00] border border-[rgba(255,106,0,0.15)] rounded-lg bg-[rgba(255,106,0,0.04)] hover:bg-[rgba(255,106,0,0.08)] transition-all cursor-pointer font-sans">{copied ? "已复制 ✓" : "复制"}</button>
              <pre className="whitespace-pre-wrap pr-16 font-mono text-[14px] text-gray-600 leading-[1.8]">{tabContent[activeTab]}</pre>
            </div>
          </ShineCard>
        </section>

        {/* ─── 重点工具展示 ─── */}
        <ToolShowcase />

        {/* ─── 合作伙伴 ─── */}
        <section className="px-10 py-20 max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[14px] text-[#FF6A00] font-semibold mb-3 tracking-wide">生态合作</p>
            <h2 className="text-[36px] font-bold tracking-tight">合作伙伴与支持平台</h2>
          </div>
          <div className="flex justify-center gap-8 max-w-[800px] mx-auto">
            {["Claude Code", "Codex", "QoderWork", "更多合作伙伴..."].map((name) => (
              <ShineCard key={name} className="rounded-2xl px-8 py-6 flex-1 text-center">
                <div className="text-[16px] font-semibold text-gray-800 mb-1">{name}</div>
                <div className="text-[12px] text-gray-400">{name === "更多合作伙伴..." ? "持续拓展中" : "Agent Platform"}</div>
              </ShineCard>
            ))}
          </div>
        </section>

        {/* ─── 选型导览（时间线） ─── */}
        <section className="px-10 py-20 max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[14px] text-[#FF6A00] font-semibold mb-3 tracking-wide">快速选型</p>
            <h2 className="text-[36px] font-bold tracking-tight">如何选择原子工具</h2>
          </div>

          <div className="max-w-[780px] mx-auto space-y-3">
            {[
              { tool: "MCP-Core", scene: "Agent 统一调用阿里云 API", desc: "9 大核心工具，2w+ OpenAPI，协议层权限管控、免依赖、免升级", rec: true },
              { tool: "Plugin", scene: "Agent 框架插件式集成", desc: "Claude / Codex / Qoder 官方插件，Skill + 最佳实践 + MCP 自动集成", rec: true },
              { tool: "CLI (AI Mode)", scene: "命令行交互、脚本编排", desc: "全产品 All-in-One CLI，AI Mode 自动纠错、可观测、统一鉴权", rec: false },
              { tool: "SDK", scene: "多语言代码集成", desc: "Common SDK + 产品专有 SDK，配合 SDK Coding Skill", rec: false },
              { tool: "Terraform", scene: "声明式基础设施编排", desc: "状态管理、托管沙箱执行环境，配合 Codegen / Import Skill", rec: false },
              { tool: "Skills 市场", scene: "领域专家级运维与诊断", desc: "160+ 技能：数据库诊断、RAM 权限诊断、ECS 诊断等", rec: false },
              { tool: "MCP-Server", scene: "自定义 API 组合 MCP 服务", desc: "按需将 OpenAPI 子集打包为专属 MCP endpoint", rec: false },
            ].map((item, i) => (
              <div key={i} className={`group shine-card rounded-xl px-6 py-4 flex items-center gap-6 transition-all duration-300 ${item.rec ? "border-[rgba(255,106,0,0.1)]" : ""}`}>
                <div className="w-[200px] flex-shrink-0">
                  <div className="text-[13px] text-gray-400 mb-0.5">场景</div>
                  <div className="text-[14px] font-medium text-gray-700">{item.scene}</div>
                </div>
                <div className="w-[2px] h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    {item.rec && <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-[rgba(255,106,0,0.08)] text-[#FF6A00] rounded border border-[rgba(255,106,0,0.12)]">推荐</span>}
                    <span className={`text-[15px] font-bold ${item.rec ? "text-[#FF6A00]" : "text-gray-800"}`}>{item.tool}</span>
                  </div>
                  <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-[60px]">
                    <p className="text-[12px] text-gray-400 leading-relaxed pt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Footer */}
        <footer className="border-t border-black/[0.04] max-w-[1200px] mx-auto pt-16 pb-10 px-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src="https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png" alt="Alibaba Cloud" className="h-4 object-contain" />
                <span className="text-gray-300 mx-1">|</span>
                <span className="font-medium text-[13px] text-gray-500">开放平台 - API/AI工具链团队</span>
              </div>
              <p className="text-[14px] text-gray-400 max-w-[300px] leading-relaxed">让 AI Agent 拥有云端能力，用自然语言操控云基础设施。</p>
            </div>
            <div className="flex gap-16">
              <div>
                <h5 className="text-[13px] font-semibold text-gray-800 mb-3">资源</h5>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-[13px] text-gray-400 hover:text-[#FF6A00] transition-colors">文档</a>
                  <a href="#" className="text-[13px] text-gray-400 hover:text-[#FF6A00] transition-colors">快速开始</a>
                  <a href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit" className="text-[13px] text-gray-400 hover:text-[#FF6A00] transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
            <p className="text-[12px] text-gray-300">© 2024 Alibaba Cloud Open Platform</p>
            <a href="https://github.com/acloudlabs-unofficial/alibabacloud-agent-toolkit" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#FF6A00] transition-colors">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
