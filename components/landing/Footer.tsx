"use client";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Enterprise", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Guides", "API Status", "Roadmap"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security"],
    },
  ];

  return (
    <footer className="bg-[#09090B] border-t border-white/5 pt-[80px] pb-[40px]">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[48px] mb-[80px]">
          
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-[24px]">
              <div className="w-8 h-8 rounded-lg bg-[#111114] border border-white/10 flex items-center justify-center text-[18px] font-bold text-[#FAFAFA]">
                K
              </div>
              <span className="font-bold text-[16px] tracking-tight text-[#FAFAFA]">
                Kaizen AI
              </span>
            </div>
            <p className="text-[14px] text-[#71717A] leading-relaxed mb-[24px]">
              AI-powered multi-agent skill assessment platform. Inspired by the Japanese philosophy of continuous improvement.
            </p>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#71717A] hover:text-[#FAFAFA] transition-colors">
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>

          {footerLinks.map((group, i) => (
            <div key={i} className="flex flex-col gap-[16px]">
              <h5 className="text-[14px] font-semibold text-[#FAFAFA]">{group.title}</h5>
              <div className="flex flex-col gap-[12px]">
                {group.links.map((link, j) => (
                  <a key={j} href="#" className="text-[14px] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-[32px] border-t border-white/5 text-[14px] text-[#71717A]">
          <p>© {new Date().getFullYear()} Kaizen AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-[24px] mt-[16px] md:mt-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
