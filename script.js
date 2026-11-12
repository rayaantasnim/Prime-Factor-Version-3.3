      document.addEventListener("DOMContentLoaded", () => {
        // 1. GSAP ScrollTrigger Animations
        if (
          typeof gsap !== "undefined" &&
          typeof ScrollTrigger !== "undefined"
        ) {
          gsap.registerPlugin(ScrollTrigger);
          gsap.utils.toArray(".reveal-section").forEach((section) => {
            gsap.from(section, {
              y: 28,
              opacity: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            });
          });
        }

        // 2. Live 3-Day Launch Countdown Ticker (Target: Nov 15, 2026 at 12:00:00 UTC)
        const targetTimestamp = Date.UTC(2026, 10, 15, 12, 0, 0); // Month is 0-indexed: 10 = November
        const elDays = document.getElementById("cd-days");
        const elHours = document.getElementById("cd-hours");
        const elMinutes = document.getElementById("cd-minutes");
        const elSeconds = document.getElementById("cd-seconds");

        function updateCountdown() {
          const now = Date.now();
          const diff = Math.max(0, targetTimestamp - now);

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          elDays.textContent = String(days).padStart(2, "0");
          elHours.textContent = String(hours).padStart(2, "0");
          elMinutes.textContent = String(minutes).padStart(2, "0");
          elSeconds.textContent = String(seconds).padStart(2, "0");
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // 3. Slide-Over Navigation Drawer
        const navDrawer = document.getElementById("nav-drawer");
        const navBackdrop = document.getElementById("nav-drawer-backdrop");
        const openNavBtn = document.getElementById("open-nav-btn");
        const closeNavBtn = document.getElementById("close-nav-btn");
        const navLinks = document.querySelectorAll(".nav-link");

        function openNavDrawer() {
          navBackdrop.classList.remove("hidden");
          requestAnimationFrame(() => {
            navBackdrop.classList.remove("opacity-0");
            navDrawer.classList.remove("translate-x-full");
          });
        }

        function closeNavDrawer() {
          navBackdrop.classList.add("opacity-0");
          navDrawer.classList.add("translate-x-full");
          setTimeout(() => {
            navBackdrop.classList.add("hidden");
          }, 300);
        }

        openNavBtn.addEventListener("click", openNavDrawer);
        closeNavBtn.addEventListener("click", closeNavDrawer);
        navBackdrop.addEventListener("click", closeNavDrawer);
        navLinks.forEach((link) =>
          link.addEventListener("click", closeNavDrawer),
        );

        // 4. Interactive LIFO Cloud Migration Audit Stack Drawer
        const initialLifoLogs = [
          {
            id: "TRACE-06 [TOP]",
            title: "Firestore Security Rules Verified",
            status: "PASSED",
            color: "cyberMint",
            detail:
              "UID isolation rule (request.auth.uid == userId) enforced on /competitors/{uid}.",
          },
          {
            id: "TRACE-05",
            title: "Google OAuth 2.0 Handshake Active",
            status: "ONLINE",
            color: "cyberCyan",
            detail:
              "Federated sign-in token verified across desktop & mobile arena clients.",
          },
          {
            id: "TRACE-04",
            title: "Season 2 ELO Baseline Locked",
            status: "500 ELO",
            color: "accentGold",
            detail:
              "All new cloud profiles initialized at Tier 11: Composite Apprentice.",
          },
          {
            id: "TRACE-03",
            title: "Zero-Guest Ranked Guardrail",
            status: "ENFORCED",
            color: "cyberPurple",
            detail:
              "Unauthenticated sessions routed to unranked Sandbox Practice mode.",
          },
          {
            id: "TRACE-02",
            title: "LocalStorage Legacy Engine Deprecated",
            status: "PURGED",
            color: "cyberCrimson",
            detail:
              "Client-side rating storage removed to eliminate DevTools tampering.",
          },
          {
            id: "TRACE-01 [BASE]",
            title: "V3.3 Cloud Genesis Manifest Staged",
            status: "READY",
            color: "cyberCyan",
            detail:
              "Global cutover scheduled for November 15, 2026 at 12:00 UTC.",
          },
        ];

        let lifoStack = [...initialLifoLogs];
        const lifoDrawer = document.getElementById("lifo-drawer");
        const lifoContainer = document.getElementById("lifo-scroll-container");
        const lifoBadge = document.getElementById("lifo-badge-count");
        const openLifoBtn = document.getElementById("open-lifo-btn");
        const triumphOpenLifoBtn = document.getElementById("triumph-open-lifo");
        const closeLifoBtn = document.getElementById("close-lifo-btn");
        const popLifoBtn = document.getElementById("pop-lifo-btn");
        const resetLifoBtn = document.getElementById("reset-lifo-btn");

        function renderLifoStack() {
          lifoBadge.textContent = lifoStack.length;
          if (lifoStack.length === 0) {
            lifoContainer.innerHTML = `
                        <div class="w-full py-8 text-center font-mono text-sm text-slate-400 border border-dashed border-slate-700 rounded-2xl">
                            LIFO Stack Empty — All audit frames popped. Click "Restore Stack" to reload V3.3 deployment trace logs.
                        </div>
                    `;
            return;
          }

          lifoContainer.innerHTML = lifoStack
            .map(
              (item, idx) => `
                    <div class="min-w-[290px] max-w-[310px] flex-shrink-0 p-4 rounded-2xl bg-slateDark/95 border border-${item.color}/40 hover:border-${item.color} transition-all flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-2">
                                <span class="font-mono text-[11px] text-slate-400">${idx === 0 ? "▼ TOP OF STACK // " + item.id : item.id}</span>
                                <span class="px-2 py-0.5 rounded bg-${item.color}/15 text-${item.color} border border-${item.color}/40 font-mono text-[10px] font-bold">
                                    ${item.status}
                                </span>
                            </div>
                            <h4 class="font-display font-bold text-lg text-white leading-snug">${item.title}</h4>
                            <p class="text-xs text-slate-300 mt-2 leading-relaxed">${item.detail}</p>
                        </div>
                        <div class="mt-3 pt-2 border-t border-slate-800 font-mono text-[10px] text-slate-500">
                            Stack Index: [${lifoStack.length - 1 - idx}]
                        </div>
                    </div>
                `,
            )
            .join("");
        }

        renderLifoStack();

        // Mouse-wheel horizontal scroll conversion inside LIFO container
        lifoContainer.addEventListener(
          "wheel",
          (e) => {
            if (e.deltaY !== 0) {
              e.preventDefault();
              lifoContainer.scrollLeft += e.deltaY;
            }
          },
          { passive: false },
        );

        openLifoBtn.addEventListener("click", () => {
          lifoDrawer.classList.remove("translate-y-full");
        });

        if (triumphOpenLifoBtn) {
          triumphOpenLifoBtn.addEventListener("click", () => {
            lifoDrawer.classList.remove("translate-y-full");
          });
        }

        closeLifoBtn.addEventListener("click", () => {
          lifoDrawer.classList.add("translate-y-full");
        });

        popLifoBtn.addEventListener("click", () => {
          if (lifoStack.length > 0) {
            lifoStack.shift(); // Pop top of LIFO stack
            renderLifoStack();
          }
        });

        resetLifoBtn.addEventListener("click", () => {
          lifoStack = [...initialLifoLogs];
          renderLifoStack();
        });

        // 5. Interactive 5-Second Hero Experience Simulation
        const runPreviewBtn = document.getElementById("run-preview-btn");
        const simTimer = document.getElementById("sim-timer");
        const simTarget = document.getElementById("sim-target-number");
        const simPills = document.getElementById("sim-factor-pills");
        const simElo = document.getElementById("sim-elo-val");
        const simStatus = document.getElementById("sim-status-text");
        const simLog1 = document.getElementById("sim-log-1");
        const simLog2 = document.getElementById("sim-log-2");
        const simLog3 = document.getElementById("sim-log-3");
        let simRunning = false;

        runPreviewBtn.addEventListener("click", () => {
          if (simRunning) return;
          simRunning = true;

          // Reset state
          simElo.textContent = "500";
          simStatus.textContent =
            "Running 5-second live factorization sequence...";
          simStatus.className = "font-mono text-xs text-cyberCyan";
          simTarget.innerHTML =
            'FACTORIZE: <span class="text-cyberCyan">26,351</span>';
          simPills.innerHTML = `<span class="px-3 py-1 rounded-lg bg-slateMid/60 border border-slate-700 font-mono text-sm text-slate-400">Scanning prime divisors...</span>`;
          simLog1.className = "text-cyberMint";
          simLog2.className = "text-slate-500";
          simLog3.className = "text-slate-500";

          let remaining = 5.0;
          const interval = setInterval(() => {
            remaining = Math.max(0, remaining - 0.1);
            simTimer.textContent = remaining.toFixed(2) + "s";

            if (remaining <= 3.4 && remaining > 1.8) {
              simPills.innerHTML = `
                            <span class="px-3 py-1 rounded-lg bg-cyberCyan/20 border border-cyberCyan text-cyberCyan font-mono text-sm font-bold">13</span>
                            <span class="font-mono text-slate-500">×</span>
                            <span class="px-3 py-1 rounded-lg bg-slateMid/60 border border-slate-700 font-mono text-sm text-slate-400">?</span>
                        `;
            }

            if (remaining <= 1.8) {
              clearInterval(interval);
              simTimer.textContent = "3.20s (SOLVED)";
              simTarget.innerHTML =
                '26,351 = <span class="text-cyberMint">13 × 2,027</span>';
              simPills.innerHTML = `
                            <span class="px-3 py-1 rounded-lg bg-cyberMint/20 border border-cyberMint text-cyberMint font-mono text-sm font-bold">13 (PRIME)</span>
                            <span class="font-mono text-white">×</span>
                            <span class="px-3 py-1 rounded-lg bg-cyberMint/20 border border-cyberMint text-cyberMint font-mono text-sm font-bold">2027 (PRIME)</span>
                        `;
              simLog2.className = "text-cyberMint";
              simLog3.className = "text-cyberCyan font-semibold";
              simElo.textContent = "518 (+18)";
              simStatus.textContent = "Committed to Cloud Firestore in 42ms.";
              simStatus.className = "font-mono text-xs text-cyberMint";
              simRunning = false;
            }
          }, 100);
        });
      });
