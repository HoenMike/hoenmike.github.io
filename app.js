/* Interactive portfolio: data-driven bento, View Transitions, themes and i18n.
 * Project descriptions are an explicit PUBLIC allowlist. Never fetch private GitHub metadata. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const SETTINGS_KEY = "hoenmike-portfolio-preferences-v1";
const themes = ["dark", "light"];
const languageNames = { vi: "Tiếng Việt", en: "English" };
const safeRead = () => { try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); } catch { return {}; } };
const settings = safeRead();
let lang = settings.lang === "en" ? "en" : "vi";
let theme = themes.includes(settings.theme) ? settings.theme : "dark";
let filter = "all";
let openId = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const save = () => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ lang, theme })); } catch { /* storage optional */ } };

const copy = {
  vi: {
    navWork:"Projects",navJourney:"Journey",navAbout:"About",heroEyebrow:"Một góc nhỏ trên Internet",
    heroLine1:"Hey, mình là",heroSubtitle:"Mình thích biến những ý tưởng ngẫu hứng thành những thứ có thể dùng, chơi và khám phá.",
    heroAside:"Code một chút. Chơi một chút. Rồi lại làm ra thứ gì đó.",stripLead:"ĐANG MÊ MẨN",stripGames:"Những thế giới nhỏ",stripAI:"AI có cá tính",stripTools:"Công cụ hữu ích",stripIdeas:"Những ý tưởng hơi kỳ",workInstruction:"NHẤN VÀO CARD ĐỂ MỞ RA ↗",
    exploreWork:"Khám phá dự án",heroFoot:"Developer · Creative coder · Curious human",scroll:"Cuộn để khám phá ↓",
    workEyebrow:"THE PLAYGROUND",workTitle:"Mấy thứ",workTitleAccent:"mình làm.",workDescription:"Không chỉ là code. Đây là những thứ mình muốn tự tay biến thành sản phẩm — từ một game nhỏ đến công cụ dùng mỗi ngày.",
    projectCount:"dự án được chọn",filterAll:"Tất cả",filterGames:"Games",filterApps:"Apps & Tools",
    projectsHint:"Một số dự án là private — mình chỉ chia sẻ những gì có thể công khai.",
    journeyEyebrow:"HÀNH TRÌNH",journeyTitle:"Từ tò mò đến",journeyAccent:"tự tay xây dựng.",
    journeyDescription:"Không phải đường thẳng. Chỉ là một chuỗi những lần tò mò, thử, sai và làm tốt hơn.",
    experienceEyebrow:"BEHIND THE SCENES",experienceTitle:"Things I learned by building.",
    experienceIntro:"Từ bài tập đầu tiên đến sản phẩm phức tạp hơn — mỗi dự án là một bài học riêng.",
    experienceChill:"Thử nghiệm game multiplayer thời gian thực",experienceZinit:"Đồ án tốt nghiệp · Flutter application",
    experienceDino:"Một trong những game đầu tiên mình làm",experienceFooter:"Always a work in progress.",
    outroEyebrow:"THAT'S ALL FOR NOW",outroTitle:"The best ideas usually start with “what if?”",
    outroDescription:"Cảm ơn đã ghé qua góc nhỏ này. Có lẽ dự án tiếp theo đang bắt đầu ở đâu đó.",
    findGithub:"Gặp mình trên GitHub",footerMade:"Made with curiosity, not a template.",backToTop:"Lên đầu ↑",
    details:"Tổng quan",stack:"Công nghệ",notes:"Ghi chú",demo:"Xem demo",source:"Mã nguồn",expand:"Mở rộng",collapse:"Thu gọn",
    private:"Private project",public:"Open source",thesis:"Graduation thesis",built:"Dự án",current:"Đang phát triển",
    themeDark:"Dark",themeLight:"Light",themeAria:"Đổi giao diện màu",
  },
  en: {
    navWork:"Projects",navJourney:"Journey",navAbout:"About",heroEyebrow:"A little corner of the Internet",
    heroLine1:"Hey, I'm",heroSubtitle:"I like turning random ideas into things you can use, play with, and explore.",
    heroAside:"A little code. A little play. A lot of curiosity.",stripLead:"CURRENT OBSESSIONS",stripGames:"Little worlds",stripAI:"AI with personality",stripTools:"Useful tools",stripIdeas:"Slightly weird ideas",workInstruction:"TAP A CARD TO UNFOLD ↗",
    exploreWork:"Explore my work",heroFoot:"Developer · Creative coder · Curious human",scroll:"Scroll to explore ↓",
    workEyebrow:"THE PLAYGROUND",workTitle:"Things I've",workTitleAccent:"built.",workDescription:"Not just code. A collection of little worlds, AI companions, and tools I wanted to make real.",
    projectCount:"selected projects",filterAll:"All",filterGames:"Games",filterApps:"Apps & Tools",
    projectsHint:"Some projects are private — only approved, public-friendly details are shared here.",
    journeyEyebrow:"THE JOURNEY",journeyTitle:"Learning by",journeyAccent:"making things.",
    journeyDescription:"It's not a straight line. Just curiosity, experiments, mistakes, and learning to build better.",
    experienceEyebrow:"BEHIND THE SCENES",experienceTitle:"Things I learned by building.",
    experienceIntro:"From early school projects to more ambitious work — every build taught me something.",
    experienceChill:"Real-time multiplayer game experiment",experienceZinit:"Graduation thesis · Flutter application",
    experienceDino:"One of the first games I ever made",experienceFooter:"Always a work in progress.",
    outroEyebrow:"THAT'S ALL FOR NOW",outroTitle:"The best ideas usually start with “what if?”",
    outroDescription:"Thanks for dropping by. The next idea might be taking shape somewhere already.",
    findGithub:"Find me on GitHub",footerMade:"Made with curiosity, not a template.",backToTop:"Back to top ↑",
    details:"Overview",stack:"Built with",notes:"Good to know",demo:"Live demo",source:"Source code",expand:"Expand",collapse:"Collapse",
    private:"Private project",public:"Open source",thesis:"Graduation thesis",built:"Project",current:"Work in progress",
    themeDark:"Dark",themeLight:"Light",themeAria:"Change color theme",
  }
};

const projects = [
  {
    id:"garden",size:"wide",kind:"game",year:"2026",title:"Living Garden",visibility:"private",
    category:{vi:"GAME DEVELOPMENT / FEATURED",en:"GAME DEVELOPMENT / FEATURED"},
    tagline:{vi:"Một khu vườn nhỏ, một thế giới riêng.",en:"A little garden. A world of its own."},
    description:{vi:"Một web game làm vườn nhẹ nhàng với thời gian thực, khám phá và xây dựng thế giới theo nhịp riêng. Mình muốn tạo một nơi người chơi không cần vội vã để thấy vui.",en:"A cozy, real-time browser game about growing, exploring and building at your own pace. An experiment in making progress feel peaceful instead of pressured."},
    tech:["TypeScript","Phaser","Web Game","i18n"],
    note:{vi:"Đang tiếp tục thử nghiệm và phát triển gameplay.",en:"An evolving personal game project."}
  },
  {
    id:"asumi",size:"medium",kind:"ai",year:"2026",title:"Asumi",visibility:"public",
    category:{vi:"AI / DISCORD BOT",en:"AI / DISCORD BOT"},
    tagline:{vi:"Một người bạn AI trong Discord.",en:"A friendly little AI for Discord."},
    description:{vi:"Bot Discord đa tính năng, từ hội thoại và tìm kiếm đến Tarot, theo dõi sự kiện và các tiện ích cho cộng đồng nhỏ. Mình tập trung vào sự hữu ích và trải nghiệm tự nhiên.",en:"A multi-purpose Discord companion, combining conversations, search, tarot, updates and small community tools in one friendly experience."},
    tech:["Python","Discord API","AI","Automation"],
    source:"https://github.com/HoenMike/DiscordMikeBot",
    note:{vi:"Mã nguồn công khai; nhiều tính năng được bổ sung dần qua các phiên bản.",en:"Public source; continuously evolving through small releases."}
  },
  {
    id:"miraei",size:"wide",kind:"ai",year:"2026",title:"Miraei",visibility:"private",
    category:{vi:"AI / SECOND BRAIN",en:"AI / SECOND BRAIN"},
    tagline:{vi:"Để ý tưởng không bị thất lạc.",en:"A second brain for everyday ideas."},
    description:{vi:"Một trợ lý Telegram giúp ghi nhớ, tổ chức ý tưởng, tìm kiếm thông tin và nhắc việc. Được xây để việc lưu trữ và quay lại với ý tưởng trở nên tự nhiên hơn.",en:"A Telegram-based assistant to capture ideas, remember context, search information and manage reminders — a small experiment in making everyday knowledge easier to revisit."},
    tech:["TypeScript","Telegram","Cloudflare Workers","AI"],
    note:{vi:"Bot cá nhân; mã nguồn và dữ liệu được giữ riêng tư.",en:"Personal assistant; source code and personal data remain private."}
  },
  {
    id:"sc",size:"medium",kind:"app",year:"2025 — now",title:"Project SC",visibility:"private",
    category:{vi:"PRIVATE VENTURE",en:"PRIVATE VENTURE"},
    tagline:{vi:"Một dự án độc lập đang lớn dần.",en:"An independent project taking shape."},
    description:{vi:"Một dự án phần mềm độc lập mà mình đang tham gia phát triển. Hiện tại mình chỉ chia sẻ tên gọi và giới thiệu ở mức tổng quan.",en:"An independent software project I'm helping build. For now, I'm keeping the introduction intentionally brief."},
    tech:["Independent project","Private"],
    note:{vi:"Không công bố mã nguồn, kiến trúc, tính năng nội bộ hay dữ liệu dự án.",en:"Source code, internals, features and project data are not public."}
  },
  {
    id:"clock",size:"standard",kind:"app",year:"2026",title:"Word Clock",visibility:"private",
    category:{vi:"CREATIVE CODING / PWA",en:"CREATIVE CODING / PWA"},
    tagline:{vi:"Đọc giờ bằng những con chữ.",en:"Time, written in words."},
    description:{vi:"Đồng hồ chữ tiếng Việt dành cho web, tablet và màn hình hiển thị. Có nhiều giao diện, chế độ toàn màn hình và khả năng cài đặt như một PWA.",en:"A word-based Vietnamese clock built for browsers, tablets and ambient displays, featuring multiple themes, fullscreen mode and offline PWA support."},
    tech:["TypeScript","Vite","PWA","Responsive UI"],
    demo:"https://yet-another-vietnamese-word-clock.pages.dev/",
    note:{vi:"Ý tưởng và bảng chữ lấy cảm hứng từ dự án mã nguồn mở tridzfr/vietnamese-word-clock.",en:"Inspired by and adapted from the open-source tridzfr/vietnamese-word-clock project."}
  },
  {
    id:"alpha",size:"standard",kind:"app",year:"2026",title:"AlphaCMS 2",visibility:"private",
    category:{vi:"FULL-STACK WEB APP",en:"FULL-STACK WEB APP"},
    tagline:{vi:"Biến nghiệp vụ thường ngày thành đơn giản.",en:"Less admin. More clarity."},
    description:{vi:"Ứng dụng quản lý lịch lớp và tính lương cho môi trường giáo dục, được phát triển tiếp từ một công cụ quản lý trước đó. Tập trung vào luồng công việc, tính chính xác và trải nghiệm sử dụng.",en:"A classroom scheduling and payroll management application, rebuilt from an earlier tool with clearer workflows and reliable reporting in mind."},
    tech:["React","TypeScript","Firebase","Full-stack"],
    note:{vi:"Ứng dụng có dữ liệu nghiệp vụ; không công khai repo hoặc ảnh chụp thông tin thật.",en:"Private business application; no live records or source code shared."}
  },
  {
    id:"zinit",size:"standard",kind:"app",year:"2025",title:"Zinit",visibility:"private",
    category:{vi:"GRADUATION THESIS / MOBILE",en:"GRADUATION THESIS / MOBILE"},
    tagline:{vi:"Tập trung hơn, từng chút một.",en:"Make space for what matters."},
    description:{vi:"Đồ án tốt nghiệp: ứng dụng quản lý công việc và năng suất với tasks, thói quen, quản lý thời gian và các ý tưởng hỗ trợ tập trung.",en:"My graduation thesis: a productivity app exploring tasks, habits, time-blocking and better ways to stay focused."},
    tech:["Flutter","Dart","Firebase","Mobile"],
    note:{vi:"Một dấu mốc quan trọng trong hành trình học và làm sản phẩm.",en:"An important milestone in learning to ship complete applications."}
  },
  {
    id:"elo",size:"standard",kind:"app",year:"2025",title:"ELO Badminton",visibility:"private",
    category:{vi:"SPORTS / WEB APP",en:"SPORTS / WEB APP"},
    tagline:{vi:"Thêm chút cạnh tranh cho những trận cầu.",en:"A little friendly competition."},
    description:{vi:"Bảng xếp hạng cầu lông cho nhóm nhỏ, theo dõi trận đơn/đôi, điểm ELO và thống kê. Thiết kế dạng PWA để dùng nhanh trên điện thoại.",en:"A badminton ranking PWA for small groups, with singles and doubles matches, ELO ratings and playful stats."},
    tech:["Next.js","TypeScript","Firebase","PWA"],
    note:{vi:"Một tiện ích xuất phát từ nhu cầu rất đời thường.",en:"A practical tool born from a small everyday need."}
  },
  {
    id:"dino",size:"standard",kind:"game",year:"2023",title:"Chrome Dino",visibility:"public",
    category:{vi:"EARLY GAME / JAVA",en:"EARLY GAME / JAVA"},
    tagline:{vi:"Hồi đó mình bắt đầu bằng một chú khủng long.",en:"It started with a tiny dinosaur."},
    description:{vi:"Một trong những project game đầu tiên, làm lại Chrome Dino bằng Java cho môn Lập trình hướng đối tượng. Nhỏ thôi, nhưng là một cột mốc đáng nhớ.",en:"One of my earliest game projects: a Java recreation of Chrome Dino for an object-oriented programming class. Small, but a milestone worth keeping."},
    tech:["Java","OOP","Game Programming"],
    source:"https://github.com/HoenMike/ChromeDino",
    note:{vi:"Dự án học tập năm 2023, giữ lại như một phần hành trình.",en:"A 2023 school project, kept as part of the journey."}
  },
  {
    id:"tak",size:"standard",kind:"game",year:"2025",title:"Tak The Game",visibility:"private",
    category:{vi:"EXPERIMENT / MULTIPLAYER",en:"EXPERIMENT / MULTIPLAYER"},
    tagline:{vi:"Một bàn cờ, hai người chơi.",en:"One board. Two players."},
    description:{vi:"Một thử nghiệm làm web game bàn cờ nhiều người chơi, có phòng chơi và đồng bộ lượt đi theo thời gian thực. Gameplay còn ở giai đoạn prototype.",en:"A small multiplayer board game prototype with game rooms and real-time turns. Not all game rules are implemented yet."},
    tech:["React","TypeScript","Node.js","Socket.IO"],
    note:{vi:"Prototype chưa hoàn thiện — chia sẻ như một thử nghiệm kỹ thuật.",en:"An incomplete prototype, showcased as a technical experiment."}
  }
];

const visual = {
  garden:'<div class="garden-sun"></div><div class="garden-hill garden-hill--back"></div><div class="garden-hill"></div><div class="garden-bed"></div><span class="garden-sprout" style="--right:30%;--bottom:24%">🌱</span><span class="garden-sprout" style="--right:19%;--bottom:20%">🌿</span><span class="garden-sprout" style="--right:10%;--bottom:23%">🌱</span>',
  asumi:'<div class="asumi-orbit"></div><div class="asumi-orbit asumi-orbit--two"></div><div class="asumi-core">✳</div>',
  miraei:'<div class="miraei-moon"></div><span class="miraei-star" style="--right:14%;--top:13%">✦</span><span class="miraei-star" style="--right:55%;--top:24%">✧</span><span class="miraei-star" style="--right:40%;--top:56%">✧</span>',
  sc:'<div class="sc-emblem"><span class="sc-monogram">SC</span></div>',
  clock:'<div class="clock-board"><div><b>BÂY</b>GIỜLÀ</div><div>KHÔNGBẢY</div><div><b>MƯỜI</b>HAI</div><div>PHÚT<span>·</span><b>RƯỠI</b></div></div>',
  alpha:'<div class="alpha-window"><div class="alpha-dots"><i></i><i></i><i></i></div><div class="alpha-bars"><span style="--h:42%"></span><span style="--h:65%"></span><span style="--h:52%"></span><span style="--h:81%"></span><span style="--h:71%"></span><span style="--h:95%"></span></div></div>',
  zinit:'<div class="zinit-phone"><strong>Today.</strong><span class="zinit-task"></span><span class="zinit-task"></span><span class="zinit-task"></span></div>',
  elo:'<div class="elo-circle"></div><span class="elo-shuttle">🏸</span>',
  dino:'<span class="dino-land">🦖</span><div class="dino-ground"></div><span class="dino-cactus">♣</span>',
  tak:'<div class="tak-board"><span class="tak-cell">○</span><span class="tak-cell"></span><span class="tak-cell">●</span><span class="tak-cell">●</span><span class="tak-cell">○</span><span class="tak-cell"></span><span class="tak-cell"></span><span class="tak-cell">●</span><span class="tak-cell">○</span></div>'
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const localized = (entry) => typeof entry === "string" ? entry : (entry?.[lang] || "");
const trustedExternal = (url) => typeof url === "string" && url.startsWith("https://");
function renderOne(project, index) {
  const c = copy[lang];
  const year = esc(project.year);
  const id = esc(project.id);
  const source = project.visibility === "public" && trustedExternal(project.source)
    ? '<a class="detail-link" href="' + esc(project.source) + '" target="_blank" rel="noopener noreferrer">' + esc(c.source) + ' ↗</a>' : "";
  const demo = trustedExternal(project.demo)
    ? '<a class="detail-link detail-link--primary" href="' + esc(project.demo) + '" target="_blank" rel="noopener noreferrer">' + esc(c.demo) + ' ↗</a>' : "";
  const badges = project.tech.map((t) => '<span class="detail-tag">' + esc(t) + '</span>').join("");
  const number = String(projects.indexOf(project) + 1).padStart(2, "0");
  return '<article class="tile tile--' + esc(project.size) + ' tile--' + id + '" data-id="' + id + '" data-kind="' + esc(project.kind) + '">' +
    '<button class="tile__trigger" type="button" aria-expanded="false" aria-controls="detail-' + id + '" aria-label="' + esc(c.expand + " " + project.title) + '">' +
      '<div class="tile__visual" aria-hidden="true">' + visual[project.id] + '</div>' +
      '<div class="tile__top"><span class="tile__number">' + number + ' / ' + year + '</span><span class="tile__arrow" aria-hidden="true">↗</span></div>' +
      '<div class="tile__bottom"><p class="tile__category">' + esc(localized(project.category)) + '</p><h3 class="tile__title">' + esc(project.title) + '</h3><p class="tile__subtitle">' + esc(localized(project.tagline)) + '</p>' +
    (project.size !== "standard" ? '<div class="tile__mini-stack" aria-hidden="true">' + project.tech.slice(0, 2).map((t) => '<span>' + esc(t) + '</span>').join("") + '</div>' : "") + '</div>' +
    '</button>' +
    '<div class="tile__detail" id="detail-' + id + '" hidden role="region" aria-label="' + esc(project.title + " " + c.details) + '">' +
      '<div class="tile__detail-grid"><div><span class="detail-label">' + esc(c.details) + '</span><p class="detail-copy">' + esc(localized(project.description)) + '</p></div>' +
      '<div><span class="detail-label">' + esc(c.stack) + '</span><div class="detail-tags">' + badges + '</div></div>' +
      '<div><span class="detail-label">' + esc(c.notes) + '</span><p class="detail-note">' + esc(localized(project.note)) + '</p></div></div>' +
      (demo || source ? '<div class="detail-footer">' + demo + source + '</div>' : "") +
    '</div>' +
  '</article>';
}
function applyTranslations() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(copy[lang], key)) el.textContent = copy[lang][key];
  });
  $("#lang-switch").innerHTML = (lang === "vi" ? 'EN <span aria-hidden="true">↗</span>' : 'VI <span aria-hidden="true">↗</span>');
  $("#lang-switch").setAttribute("aria-label", lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt");
  $("#filter-bar").setAttribute("aria-label", lang === "vi" ? "Lọc dự án" : "Filter projects");
  applyTheme();
}
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = theme === "light" ? "#f4f4ee" : "#0d0f14";
  const label = theme === "light" ? copy[lang].themeLight : copy[lang].themeDark;
  $(".theme-switch__label").textContent = label;
  $("#theme-switch").setAttribute("aria-label", copy[lang].themeAria + ": " + label);
  $("#theme-switch").title = label;
}
function syncTiles() {
  $$("[data-id]", $("#project-grid")).forEach((el) => {
    const expanded = el.dataset.id === openId;
    el.classList.toggle("is-expanded", expanded);
    const button = $(".tile__trigger", el);
    button.setAttribute("aria-expanded", String(expanded));
    button.setAttribute("aria-label", (expanded ? copy[lang].collapse : copy[lang].expand) + " " + $(".tile__title", el).textContent);
    $(".tile__detail", el).hidden = !expanded;
  });
}
function updateLayout(mutate) {
  if (document.startViewTransition && !reduceMotion.matches && window.innerWidth > 620) {
    document.startViewTransition(mutate);
  } else mutate();
}
function renderProjects() {
  const selected = projects.filter((p) => filter === "all" || p.kind === filter);
  $("#project-grid").innerHTML = selected.map(renderOne).join("");
  $("#project-count").textContent = String(selected.length).padStart(2,"0");
  $("[data-count-for]").forEach((el) => { el.textContent = String(el.dataset.countFor === "all" ? projects.length : projects.filter((p) => p.kind === el.dataset.countFor).length).padStart(2, "0"); });
  syncTiles();
  $$(".tile__trigger", $("#project-grid")).forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.closest(".tile").dataset.id;
      updateLayout(() => { openId = openId === id ? null : id; syncTiles(); });
    });
  });
  $$(".tile", $("#project-grid")).forEach((tile) => {
    tile.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", Math.round(((event.clientX - rect.left) / rect.width) * 100) + "%");
      tile.style.setProperty("--my", Math.round(((event.clientY - rect.top) / rect.height) * 100) + "%");
    }, { passive:true });
  });
}
const timeline = [
  {year:"2023",title:{vi:"Chơi mà học",en:"Learning by playing"},body:{vi:"Những dòng Java đầu tiên, game Chrome Dino và niềm vui khi tự làm được thứ gì đó chạy thật.",en:"First Java projects, a Chrome Dino clone, and the excitement of making something actually run."},tags:["Java","OOP","Games"]},
  {year:"2024",title:{vi:"Thử mọi thứ có thể",en:"Exploring everything"},body:{vi:"Từ ứng dụng web đến phần cứng và các bài toán lập trình. Giai đoạn thử nhiều để tìm thứ mình thích làm.",en:"From web applications to hardware experiments and programming challenges — a year of trying things to find what I loved."},tags:["Web","Embedded","Experiments"]},
  {year:"2025",title:{vi:"Làm sản phẩm thực sự",en:"Building with purpose"},body:{vi:"Bắt đầu nghĩ nhiều hơn về người dùng, luồng sử dụng và trải nghiệm sản phẩm. Zinit trở thành đồ án tốt nghiệp.",en:"Started thinking beyond just code: users, workflows and making complete products. Zinit became my graduation thesis."},tags:["Zinit","Flutter","Web Apps"]},
  {year:"2026",title:{vi:"Thử những ý tưởng lớn hơn",en:"Thinking bigger"},body:{vi:"Khám phá AI companion, game web, ứng dụng hữu ích và thử nghiệm multiplayer với ChillTown.",en:"Exploring AI companions, cozy browser games, practical apps and multiplayer experiments like ChillTown."},tags:["Asumi","Miraei","Living Garden"]},
  {year:"NOW",title:{vi:"Vẫn tiếp tục xây dựng",en:"Still building"},body:{vi:"Mỗi dự án là một lần thử cái mới. Mình vẫn đang học, cải thiện và biến ý tưởng thành trải nghiệm.",en:"Every project is a chance to learn something new, improve, and turn curiosity into experiences people can use."},tags:["Curiosity","Keep shipping"]}
];
function renderTimeline() {
  $("#timeline").innerHTML = timeline.map((item) =>
    '<div class="timeline-item"><div class="timeline-item__year">' + esc(item.year) +
    '</div><h3>' + esc(localized(item.title)) + '</h3><p>' + esc(localized(item.body)) +
    '</p><div class="timeline-item__tags">' + item.tags.map((t) => '<span>' + esc(t) + '</span>').join("") +
    '</div></div>'
  ).join("");
}

$("#lang-switch").addEventListener("click", () => {
  lang = lang === "vi" ? "en" : "vi";
  save();
  applyTranslations();
  renderProjects();
  renderTimeline();
});
$("#theme-switch").addEventListener("click", () => {
  theme = themes[(themes.indexOf(theme) + 1) % themes.length];
  save();
  applyTheme();
});
$$(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const next = button.dataset.filter;
    if (next === filter) return;
    updateLayout(() => {
      filter = next;
      openId = null;
      $$(".filter").forEach((b) => {
        const active = b.dataset.filter === filter;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      renderProjects();
    });
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && openId !== null) {
    updateLayout(() => { openId = null; syncTiles(); });
  }
});
applyTranslations();
renderProjects();
renderTimeline();
