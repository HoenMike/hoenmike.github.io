/* HoenMike portfolio — original public editorial allowlist preserved. No external data fetching. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const SETTINGS_KEY = "hoenmike-portfolio-preferences-v1";
const themes = ["dark", "light"];
const safeRead = () => { try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); } catch { return {}; } };
const settings = safeRead();
let lang = settings.lang === "en" ? "en" : "vi";
let theme = themes.includes(settings.theme) ? settings.theme : "dark";
let filter = "all";
let openId = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const save = () => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({lang,theme})); } catch { /* storage optional */ } };

const copy = {
  vi: {
    navWork:"Dự án",navJourney:"Hành trình",navAbout:"Giới thiệu",
    heroRole:"DEVELOPER / CREATIVE BUILDER",heroHello:"Hey, mình là",
    heroStatement:"Mình biến ý tưởng thành những sản phẩm số thật sự hoạt động.",
    heroDescription:"Từ ứng dụng web, AI companion đến game và các thử nghiệm nhỏ. Mình thích xây những thứ hữu ích, dễ dùng và có một chút cá tính.",
    exploreWork:"Khám phá dự án",heroFoot:"Code. Thử nghiệm. Cải thiện. Lặp lại.",
    workspaceEyebrow:"TRÊN BÀN LÀM VIỆC",workspaceLive:"Đang phát triển",
    workspaceTitle:"Đang xây dựng.",workspaceDescription:"Một vài ý tưởng vẫn đang được hoàn thiện.",
    workspaceGarden:"Web game thư giãn",workspaceAsumi:"AI companion trên Discord",workspaceMiraei:"Second brain cá nhân",
    stackTitle:"Công nghệ mình làm việc cùng",
    workEyebrow:"DỰ ÁN",workTitle:"Selected",workTitleAccent:"work.",
    workDescription:"Những ứng dụng, game và thử nghiệm mình đã làm. Chạm vào một card để xem thêm ngay tại đây.",
    projectCount:"dự án",filterAll:"Tất cả",filterGames:"Games",filterApps:"Apps & Tools",
    projectsHint:"Một số dự án được giữ riêng tư. Mình chỉ giới thiệu phần có thể chia sẻ công khai.",
    journeyEyebrow:"HÀNH TRÌNH",journeyTitle:"Learning by",journeyAccent:"building.",
    journeyDescription:"Từ những dòng code đầu tiên đến sản phẩm hoàn chỉnh hơn. Một quá trình thử, sai, học và tiến bộ.",
    experienceEyebrow:"BÀI HỌC QUA DỰ ÁN",experienceTitle:"Học bằng cách làm.",
    experienceIntro:"Không chỉ code chạy được, mà còn là thiết kế, trải nghiệm và cách một sản phẩm trưởng thành.",
    experienceChill:"Thử nghiệm multiplayer thời gian thực",experienceZinit:"Đồ án tốt nghiệp · ứng dụng Flutter",
    experienceDino:"Một trong những game đầu tiên bằng Java",
    outroEyebrow:"TIẾP THEO LÀ GÌ?",outroTitle:"There's always something new to build.",
    outroDescription:"Cảm ơn đã ghé thăm. Mình vẫn đang khám phá những ý tưởng mới và tiếp tục học mỗi ngày.",
    findGithub:"Gặp mình trên GitHub",footerMade:"Built with curiosity, not a template.",backToTop:"Về đầu trang ↑",
    details:"Tổng quan",stack:"Công nghệ",notes:"Ghi chú",demo:"Xem demo",source:"Mã nguồn",
    expand:"Mở rộng",collapse:"Thu gọn",themeDark:"Dark",themeLight:"Light",themeAria:"Đổi giao diện",
    skipToProjects:"Bỏ qua đến phần dự án",emptyTitle:"Chưa có dự án trong danh mục này",emptyDescription:"Bạn có thể khám phá tất cả dự án thay thế.",viewAllProjects:"Xem tất cả dự án",
    purpose:"Ý tưởng",focus:"Điểm tập trung",copyLink:"Sao chép liên kết",linkCopied:"Đã sao chép",copyFallback:"Không thể sao chép tự động. Hãy sao chép liên kết bên dưới.",projectsShown:"Đang hiển thị {count} dự án",openedProject:"Đã mở chi tiết {name}",closedProject:"Đã đóng chi tiết {name}"
  },
  en: {
    navWork:"Projects",navJourney:"Journey",navAbout:"About",
    heroRole:"DEVELOPER / CREATIVE BUILDER",heroHello:"Hey, I'm",
    heroStatement:"I turn ideas into digital products that actually work.",
    heroDescription:"From web applications and AI companions to games and playful experiments. I enjoy building things that are useful, approachable, and a little different.",
    exploreWork:"Explore my work",heroFoot:"Build. Experiment. Improve. Repeat.",
    workspaceEyebrow:"ON MY DESK",workspaceLive:"In progress",
    workspaceTitle:"Currently building.",workspaceDescription:"A few ideas taking shape right now.",
    workspaceGarden:"Cozy browser game",workspaceAsumi:"Discord AI companion",workspaceMiraei:"Personal second brain",
    stackTitle:"Technologies I work with",
    workEyebrow:"PROJECTS",workTitle:"Selected",workTitleAccent:"work.",
    workDescription:"Web apps, games and experiments I've built. Open any card to learn more without leaving the page.",
    projectCount:"projects",filterAll:"All",filterGames:"Games",filterApps:"Apps & Tools",
    projectsHint:"Some projects are private. Only public-safe information is displayed here.",
    journeyEyebrow:"THE JOURNEY",journeyTitle:"Learning by",journeyAccent:"building.",
    journeyDescription:"From the first lines of code to more complete products. A process of experimenting, learning and improving.",
    experienceEyebrow:"LESSONS FROM BUILDING",experienceTitle:"Learning by doing.",
    experienceIntro:"Beyond working code: design, experience, and seeing a product come together.",
    experienceChill:"Real-time multiplayer experiment",experienceZinit:"Graduation thesis · Flutter application",
    experienceDino:"An early Java game project",
    outroEyebrow:"WHAT'S NEXT?",outroTitle:"There's always something new to build.",
    outroDescription:"Thanks for visiting. I'm still exploring new ideas and learning along the way.",
    findGithub:"Find me on GitHub",footerMade:"Built with curiosity, not a template.",backToTop:"Back to top ↑",
    details:"Overview",stack:"Built with",notes:"Notes",demo:"Live demo",source:"Source code",
    expand:"Expand",collapse:"Collapse",themeDark:"Dark",themeLight:"Light",themeAria:"Change theme",
    skipToProjects:"Skip to projects",emptyTitle:"No projects in this category yet",emptyDescription:"Explore the full collection instead.",viewAllProjects:"View all projects",
    purpose:"The idea",focus:"Design focus",copyLink:"Copy project link",linkCopied:"Link copied",copyFallback:"Automatic copy isn't available. Select and copy the link below.",projectsShown:"Showing {count} projects",openedProject:"Opened {name} details",closedProject:"Closed {name} details"
  }
};

const projects = [
  {
    id:"garden",focus:{vi:"Tạo một nhịp chơi dễ hiểu: trồng, chăm sóc, thu hoạch và dần mở rộng khu vườn mà không gây áp lực.",en:"A clear, low-pressure loop: grow, care, harvest and gradually expand the garden."},size:"wide",kind:"game",year:"2026",title:"Living Garden",visibility:"private",
    category:{vi:"GAME DEVELOPMENT / FEATURED",en:"GAME DEVELOPMENT / FEATURED"},
    tagline:{vi:"Một khu vườn nhỏ, một thế giới riêng.",en:"A little garden. A world of its own."},
    description:{vi:"Một web game làm vườn nhẹ nhàng với thời gian thực, khám phá và xây dựng thế giới theo nhịp riêng. Mình muốn tạo một nơi người chơi không cần vội vã để thấy vui.",en:"A cozy, real-time browser game about growing, exploring and building at your own pace. An experiment in making progress feel peaceful instead of pressured."},
    tech:["TypeScript","Phaser","Web Game","i18n"],
    note:{vi:"Đang tiếp tục thử nghiệm và phát triển gameplay.",en:"An evolving personal game project."}
  },
  {
    id:"asumi",focus:{vi:"Giữ những tiện ích cộng đồng nhất quán trong một bot thay vì nhiều lệnh rời rạc.",en:"Keep community tools coherent inside one companion instead of a collection of disconnected commands."},size:"medium",kind:"ai",year:"2026",title:"Asumi",visibility:"public",
    category:{vi:"AI / DISCORD BOT",en:"AI / DISCORD BOT"},
    tagline:{vi:"Một người bạn AI trong Discord.",en:"A friendly little AI for Discord."},
    description:{vi:"Bot Discord đa tính năng, từ hội thoại và tìm kiếm đến Tarot, theo dõi sự kiện và các tiện ích cho cộng đồng nhỏ. Mình tập trung vào sự hữu ích và trải nghiệm tự nhiên.",en:"A multi-purpose Discord companion, combining conversations, search, tarot, updates and small community tools in one friendly experience."},
    tech:["Python","Discord API","AI","Automation"],
    source:"https://github.com/HoenMike/DiscordMikeBot",
    note:{vi:"Mã nguồn công khai; nhiều tính năng được bổ sung dần qua các phiên bản.",en:"Public source; continuously evolving through small releases."}
  },
  {
    id:"miraei",focus:{vi:"Tập trung vào việc ghi lại ý tưởng nhanh và tìm lại đúng ngữ cảnh khi cần.",en:"Make ideas quick to capture and easy to revisit in their original context."},size:"medium",kind:"ai",year:"2026",title:"Miraei",visibility:"private",
    category:{vi:"AI / SECOND BRAIN",en:"AI / SECOND BRAIN"},
    tagline:{vi:"Để ý tưởng không bị thất lạc.",en:"A second brain for everyday ideas."},
    description:{vi:"Một trợ lý Telegram giúp ghi nhớ, tổ chức ý tưởng, tìm kiếm thông tin và nhắc việc. Được xây để việc lưu trữ và quay lại với ý tưởng trở nên tự nhiên hơn.",en:"A Telegram-based assistant to capture ideas, remember context, search information and manage reminders — a small experiment in making everyday knowledge easier to revisit."},
    tech:["TypeScript","Telegram","Cloudflare Workers","AI"],
    note:{vi:"Bot cá nhân; mã nguồn và dữ liệu được giữ riêng tư.",en:"Personal assistant; source code and personal data remain private."}
  },
  {
    id:"sc",focus:{vi:"Phát triển sản phẩm độc lập; các chi tiết cụ thể được giữ riêng tư.",en:"Building an independent product; specific details remain private."},size:"wide",kind:"app",year:"2025 — now",title:"Project SC",visibility:"private",
    category:{vi:"PRIVATE VENTURE",en:"PRIVATE VENTURE"},
    tagline:{vi:"Một dự án độc lập đang lớn dần.",en:"An independent project taking shape."},
    description:{vi:"Một dự án phần mềm độc lập mà mình đang tham gia phát triển. Hiện tại mình chỉ chia sẻ tên gọi và giới thiệu ở mức tổng quan.",en:"An independent software project I'm helping build. For now, I'm keeping the introduction intentionally brief."},
    tech:["Independent project","Private"],
    note:{vi:"Không công bố mã nguồn, kiến trúc, tính năng nội bộ hay dữ liệu dự án.",en:"Source code, internals, features and project data are not public."}
  },
  {
    id:"clock",focus:{vi:"Làm một giao diện đọc giờ dễ nhìn trên nhiều kích cỡ và tư thế màn hình.",en:"Keep a word-based time display legible across devices and orientations."},size:"standard",kind:"app",year:"2026",title:"Word Clock",visibility:"private",
    category:{vi:"CREATIVE CODING / PWA",en:"CREATIVE CODING / PWA"},
    tagline:{vi:"Đọc giờ bằng những con chữ.",en:"Time, written in words."},
    description:{vi:"Đồng hồ chữ tiếng Việt dành cho web, tablet và màn hình hiển thị. Có nhiều giao diện, chế độ toàn màn hình và khả năng cài đặt như một PWA.",en:"A word-based Vietnamese clock built for browsers, tablets and ambient displays, featuring multiple themes, fullscreen mode and offline PWA support."},
    tech:["TypeScript","Vite","PWA","Responsive UI"],
    demo:"https://yet-another-vietnamese-word-clock.pages.dev/",
    note:{vi:"Ý tưởng và bảng chữ lấy cảm hứng từ dự án mã nguồn mở tridzfr/vietnamese-word-clock.",en:"Inspired by and adapted from the open-source tridzfr/vietnamese-word-clock project."}
  },
  {
    id:"alpha",focus:{vi:"Ưu tiên luồng nhập liệu rõ ràng và thông tin vận hành dễ kiểm tra.",en:"Focus on clear data entry and operational information that is easy to verify."},size:"standard",kind:"app",year:"2026",title:"AlphaCMS 2",visibility:"private",
    category:{vi:"FULL-STACK WEB APP",en:"FULL-STACK WEB APP"},
    tagline:{vi:"Biến nghiệp vụ thường ngày thành đơn giản.",en:"Less admin. More clarity."},
    description:{vi:"Ứng dụng quản lý lịch lớp và tính lương cho môi trường giáo dục, được phát triển tiếp từ một công cụ quản lý trước đó. Tập trung vào luồng công việc, tính chính xác và trải nghiệm sử dụng.",en:"A classroom scheduling and payroll management application, rebuilt from an earlier tool with clearer workflows and reliable reporting in mind."},
    tech:["React","TypeScript","Firebase","Full-stack"],
    note:{vi:"Ứng dụng có dữ liệu nghiệp vụ; không công khai repo hoặc ảnh chụp thông tin thật.",en:"Private business application; no live records or source code shared."}
  },
  {
    id:"zinit",focus:{vi:"Tổ chức task, thói quen và thời gian trong một trải nghiệm di động nhất quán.",en:"Bring tasks, habits and time planning into one coherent mobile experience."},size:"standard",kind:"app",year:"2025",title:"Zinit",visibility:"private",
    category:{vi:"GRADUATION THESIS / MOBILE",en:"GRADUATION THESIS / MOBILE"},
    tagline:{vi:"Tập trung hơn, từng chút một.",en:"Make space for what matters."},
    description:{vi:"Đồ án tốt nghiệp: ứng dụng quản lý công việc và năng suất với tasks, thói quen, quản lý thời gian và các ý tưởng hỗ trợ tập trung.",en:"My graduation thesis: a productivity app exploring tasks, habits, time-blocking and better ways to stay focused."},
    tech:["Flutter","Dart","Firebase","Mobile"],
    note:{vi:"Một dấu mốc quan trọng trong hành trình học và làm sản phẩm.",en:"An important milestone in learning to ship complete applications."}
  },
  {
    id:"elo",focus:{vi:"Biến việc nhập kết quả và theo dõi điểm số thành thao tác nhanh trên điện thoại.",en:"Make match entry and rating tracking fast on a phone."},size:"standard",kind:"app",year:"2025",title:"ELO Badminton",visibility:"private",
    category:{vi:"SPORTS / WEB APP",en:"SPORTS / WEB APP"},
    tagline:{vi:"Thêm chút cạnh tranh cho những trận cầu.",en:"A little friendly competition."},
    description:{vi:"Bảng xếp hạng cầu lông cho nhóm nhỏ, theo dõi trận đơn/đôi, điểm ELO và thống kê. Thiết kế dạng PWA để dùng nhanh trên điện thoại.",en:"A badminton ranking PWA for small groups, with singles and doubles matches, ELO ratings and playful stats."},
    tech:["Next.js","TypeScript","Firebase","PWA"],
    note:{vi:"Một tiện ích xuất phát từ nhu cầu rất đời thường.",en:"A practical tool born from a small everyday need."}
  },
  {
    id:"dino",focus:{vi:"Rèn luyện lập trình hướng đối tượng thông qua một game đơn giản có thể chơi được.",en:"Explore object-oriented programming through a small playable game."},size:"standard",kind:"game",year:"2023",title:"Chrome Dino",visibility:"public",
    category:{vi:"EARLY GAME / JAVA",en:"EARLY GAME / JAVA"},
    tagline:{vi:"Hồi đó mình bắt đầu bằng một chú khủng long.",en:"It started with a tiny dinosaur."},
    description:{vi:"Một trong những project game đầu tiên, làm lại Chrome Dino bằng Java cho môn Lập trình hướng đối tượng. Nhỏ thôi, nhưng là một cột mốc đáng nhớ.",en:"One of my earliest game projects: a Java recreation of Chrome Dino for an object-oriented programming class. Small, but a milestone worth keeping."},
    tech:["Java","OOP","Game Programming"],
    source:"https://github.com/HoenMike/ChromeDino",
    note:{vi:"Dự án học tập năm 2023, giữ lại như một phần hành trình.",en:"A 2023 school project, kept as part of the journey."}
  },
  {
    id:"tak",focus:{vi:"Thử nghiệm đồng bộ lượt đi và trạng thái phòng chơi giữa nhiều người.",en:"Explore real-time turn and room-state synchronization for multiplayer play."},size:"standard",kind:"game",year:"2025",title:"Tak The Game",visibility:"private",
    category:{vi:"EXPERIMENT / MULTIPLAYER",en:"EXPERIMENT / MULTIPLAYER"},
    tagline:{vi:"Một bàn cờ, hai người chơi.",en:"One board. Two players."},
    description:{vi:"Một thử nghiệm làm web game bàn cờ nhiều người chơi, có phòng chơi và đồng bộ lượt đi theo thời gian thực. Gameplay còn ở giai đoạn prototype.",en:"A small multiplayer board game prototype with game rooms and real-time turns. Not all game rules are implemented yet."},
    tech:["React","TypeScript","Node.js","Socket.IO"],
    note:{vi:"Prototype chưa hoàn thiện — chia sẻ như một thử nghiệm kỹ thuật.",en:"An incomplete prototype, showcased as a technical experiment."}
  }
];
const timeline = [
  {year:"2023",title:{vi:"Chơi mà học",en:"Learning by playing"},body:{vi:"Những dòng Java đầu tiên, game Chrome Dino và niềm vui khi tự làm được thứ gì đó chạy thật.",en:"First Java projects, a Chrome Dino clone, and the excitement of making something actually run."},tags:["Java","OOP","Games"]},
  {year:"2024",title:{vi:"Thử mọi thứ có thể",en:"Exploring everything"},body:{vi:"Từ ứng dụng web đến phần cứng và các bài toán lập trình. Giai đoạn thử nhiều để tìm thứ mình thích làm.",en:"From web applications to hardware experiments and programming challenges — a year of trying things to find what I loved."},tags:["Web","Embedded","Experiments"]},
  {year:"2025",title:{vi:"Làm sản phẩm thực sự",en:"Building with purpose"},body:{vi:"Bắt đầu nghĩ nhiều hơn về người dùng, luồng sử dụng và trải nghiệm sản phẩm. Zinit trở thành đồ án tốt nghiệp.",en:"Started thinking beyond just code: users, workflows and making complete products. Zinit became my graduation thesis."},tags:["Zinit","Flutter","Web Apps"]},
  {year:"2026",title:{vi:"Thử những ý tưởng lớn hơn",en:"Thinking bigger"},body:{vi:"Khám phá AI companion, game web, ứng dụng hữu ích và thử nghiệm multiplayer với ChillTown.",en:"Exploring AI companions, cozy browser games, practical apps and multiplayer experiments like ChillTown."},tags:["Asumi","Miraei","Living Garden"]},
  {year:"NOW",title:{vi:"Vẫn tiếp tục xây dựng",en:"Still building"},body:{vi:"Mỗi dự án là một lần thử cái mới. Mình vẫn đang học, cải thiện và biến ý tưởng thành trải nghiệm.",en:"Every project is a chance to learn something new, improve, and turn curiosity into experiences people can use."},tags:["Curiosity","Keep shipping"]}
];

/* Small product-related vector marks, not fake screenshots or internal project details. */
const symbols = {
  garden:'<rect x="8" y="8" width="18" height="18" rx="4"/><rect x="34" y="8" width="18" height="18" rx="4"/><rect x="8" y="34" width="18" height="18" rx="4"/><rect x="34" y="34" width="18" height="18" rx="4"/><path d="M43 44V18m0 14-6-6m6-2 6-6"/>',
  asumi:'<path d="M10 13h44v29H31L20 52v-10H10z"/><path d="M20 25h23m-23 9h15"/>',
  miraei:'<circle cx="13" cy="32" r="6"/><circle cx="49" cy="15" r="6"/><circle cx="49" cy="49" r="6"/><path d="M19 32h11l13-17M30 32l13 17"/>',
  sc:'<rect x="12" y="12" width="40" height="40" rx="12"/><circle cx="32" cy="32" r="10"/><path d="M32 7v5m0 40v5M7 32h5m40 0h5"/>',
  clock:'<circle cx="32" cy="32" r="22"/><path d="M32 17v15l11 7"/>',
  alpha:'<rect x="9" y="31" width="9" height="23" rx="2"/><rect x="27" y="19" width="9" height="35" rx="2"/><rect x="45" y="10" width="9" height="44" rx="2"/>',
  zinit:'<path d="M11 13h42v39H11zM20 25l4 4 7-8m7 5h9M20 41l4 4 7-8m7 5h9"/>',
  elo:'<path d="M32 7l6 16 17 1-13 11 4 17-14-9-14 9 4-17L9 24l17-1z"/>',
  dino:'<path d="M16 43V24h10V13h22v10h7v11H42v10h-9v9h-8v-9zm0-6H8m30-15h2"/>',
  tak:'<path d="M22 10v44M42 10v44M10 22h44M10 42h44"/><circle cx="17" cy="16" r="4"/><circle cx="47" cy="48" r="4"/><path d="m27 27 10 10m0-10L27 37"/>'
};
/* Decorative concept art, not product screenshots or representations of private data. */
const projectScenes = {
  garden:'<div class="visual-garden" aria-hidden="true"><i></i><i class="growing"></i><i></i><i class="growing"></i><i class="sprout"></i><i class="growing"></i><i></i><i class="growing"></i><i></i></div>',
  asumi:'<div class="visual-chat" aria-hidden="true"><span class="visual-chat__line"></span><span class="visual-chat__bubble"><i></i><i></i><i></i></span><span class="visual-chat__line visual-chat__line--short"></span></div>',
  miraei:'<div class="visual-ideas" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>'
};
const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const localized = (value) => typeof value === "string" ? value : (value?.[lang] || "");
const trustedExternal = (url) => typeof url === "string" && /^https:\/\//.test(url);
const grid = $("#project-grid");

function renderOne(project) {
  const c = copy[lang], id = esc(project.id);
  const number = String(projects.indexOf(project)+1).padStart(2,"0");
  const source = project.visibility === "public" && trustedExternal(project.source)
    ? '<a class="detail-link" href="'+esc(project.source)+'" target="_blank" rel="noopener noreferrer">'+esc(c.source)+' ↗</a>' : "";
  const demo = trustedExternal(project.demo)
    ? '<a class="detail-link detail-link--primary" href="'+esc(project.demo)+'" target="_blank" rel="noopener noreferrer">'+esc(c.demo)+' ↗</a>' : "";
  const icon = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+symbols[project.id]+'</svg>';
  const artwork = projectScenes[project.id] || icon;
  const sceneClass = projectScenes[project.id] ? " tile__visual--scene" : "";
  return '<article class="tile tile--'+esc(project.size)+' tile--'+id+'" data-id="'+id+'" data-kind="'+esc(project.kind)+'">'+
    '<button type="button" class="tile__trigger" aria-expanded="false" aria-controls="detail-'+id+'" aria-label="'+esc(c.expand+" "+project.title)+'">'+
      '<div class="tile__visual'+sceneClass+'" aria-hidden="true">'+artwork+'</div>'+
      '<div class="tile__top"><span class="tile__number">'+number+' / 10</span><span class="tile__year">'+esc(project.year)+'</span><span class="tile__arrow" aria-hidden="true">↗</span></div>'+
      '<div class="tile__content"><p class="tile__category">'+esc(localized(project.category))+'</p><h3 class="tile__title">'+esc(project.title)+'</h3><p class="tile__subtitle">'+esc(localized(project.tagline))+'</p>'+
      '<div class="tile__tech" aria-hidden="true">'+project.tech.slice(0,2).map(tag => '<span>'+esc(tag)+'</span>').join("")+'</div></div>'+
    '</button>'+
    '<div class="tile__detail" id="detail-'+id+'" role="region" aria-label="'+esc(project.title+" "+c.details)+'" hidden>'+
      '<div class="detail-heading"><div><span class="detail-label">'+esc(c.details)+'</span><h4>'+esc(localized(project.tagline))+'</h4></div>'+
      '<button type="button" class="detail-copy-link" data-copy-project="'+id+'">'+esc(c.copyLink)+' ↗</button></div>'+
      '<div class="tile__detail-grid"><div><span class="detail-label">'+esc(c.purpose)+'</span><p class="detail-copy">'+esc(localized(project.description))+'</p></div>'+
      '<div><span class="detail-label">'+esc(c.focus)+'</span><p class="detail-copy">'+esc(localized(project.focus))+'</p></div>'+
      '<div><span class="detail-label">'+esc(c.stack)+'</span><div class="detail-tags">'+project.tech.map(tag => '<span class="detail-tag">'+esc(tag)+'</span>').join("")+'</div></div></div>'+
      '<div class="detail-outro"><span class="detail-label">'+esc(c.notes)+'</span><p class="detail-note">'+esc(localized(project.note))+'</p></div>'+
      '<div class="copy-fallback" hidden><label for="copy-link-'+id+'">'+esc(c.copyFallback)+'</label><input id="copy-link-'+id+'" type="text" readonly></div>'+
      (demo||source?'<div class="detail-footer">'+demo+source+'</div>':"")+
    '</div></article>';
}
function syncTiles() {
  $$("[data-id]",grid).forEach(tile => {
    const expanded=tile.dataset.id===openId;
    tile.classList.toggle("is-expanded",expanded);
    const button=$(".tile__trigger",tile);
    button.setAttribute("aria-expanded",String(expanded));
    button.setAttribute("aria-label",(expanded?copy[lang].collapse:copy[lang].expand)+" "+$(".tile__title",tile).textContent);
    $(".tile__detail",tile).hidden=!expanded;
  });
}
function updateLayout(mutate) {
  if(document.startViewTransition && !reduceMotion.matches && window.innerWidth>900) {
    const transition=document.startViewTransition(mutate);
    return transition.finished.catch(()=>{});
  }
  mutate();
  return Promise.resolve();
}
function renderProjects() {
  const shown=projects.filter(project=>filter==="all"||project.kind===filter);
  grid.innerHTML=shown.map(renderOne).join("");
  $("#project-count").textContent=String(shown.length).padStart(2,"0");
  $("#project-empty").hidden=shown.length!==0;
  $("#project-status").textContent=copy[lang].projectsShown.replace("{count}",String(shown.length));
  syncTiles();
}
function renderTimeline() {
  $("#timeline").innerHTML=timeline.map(item =>
    '<div class="timeline-item"><div class="timeline-item__year">'+esc(item.year)+'</div>'+
    '<h3>'+esc(localized(item.title))+'</h3><p>'+esc(localized(item.body))+'</p>'+
    '<div class="timeline-item__tags">'+item.tags.map(t => '<span>'+esc(t)+'</span>').join("")+'</div></div>'
  ).join("");
}
function translate() {
  document.documentElement.lang=lang;
  $$("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(Object.prototype.hasOwnProperty.call(copy[lang],key))el.textContent=copy[lang][key];
  });
  $("#lang-switch").textContent=lang==="vi"?"EN":"VI";
  $("#lang-switch").setAttribute("aria-label",lang==="vi"?"Switch to English":"Chuyển sang Tiếng Việt");
  $("#filter-bar").setAttribute("aria-label",lang==="vi"?"Lọc dự án":"Filter projects");
  $("#project-status").textContent=copy[lang].projectsShown.replace("{count}",String(projects.filter(project=>filter==="all"||project.kind===filter).length));
}
function applyTheme() {
  document.documentElement.dataset.theme=theme;
  const meta=$('meta[name="theme-color"]');
  if(meta)meta.content=theme==="light"?"#f1f6fa":"#08111d";
  $(".theme-switch__label").textContent=theme==="light"?copy[lang].themeLight:copy[lang].themeDark;
  $("#theme-switch").setAttribute("aria-label",copy[lang].themeAria);
}
function updateFilters() {
  $$(".filter").forEach(button=>{
    const active=button.dataset.filter===filter;
    button.classList.toggle("is-active",active);
    button.setAttribute("aria-pressed",String(active));
  });
}
const getProjectFromUrl = () => {
  const match = /^#project-([a-z0-9-]+)$/.exec(window.location.hash);
  return match && projects.some(project=>project.id===match[1]) ? match[1] : null;
};
const projectUrl = id => id ? "#project-"+id : "#work";
function updateProjectUrl(id) {
  const target=projectUrl(id);
  if(window.location.hash!==target)window.history.pushState({projectId:id},"",target);
}
function announce(message) {
  $("#project-status").textContent=message;
}
function focusProject(id,scroll=true) {
  const tile=$('[data-id="'+id+'"]',grid);
  if(!tile)return;
  if(scroll)tile.scrollIntoView({behavior:reduceMotion.matches?"instant":"smooth",block:"nearest"});
  $(".tile__trigger",tile)?.focus({preventScroll:true});
}
function openProject(id) {
  if(!projects.some(project=>project.id===id))return;
  updateLayout(()=>{
    filter="all";openId=id;updateFilters();renderProjects();
  }).then(()=>{
    updateProjectUrl(id);
    focusProject(id);
    announce(copy[lang].openedProject.replace("{name}",projects.find(p=>p.id===id).title));
  });
}
function applyUrlState() {
  const id=getProjectFromUrl();
  updateLayout(()=>{
    if(id && filter!=="all"){filter="all";updateFilters();renderProjects();}
    openId=id;syncTiles();
  });
}
function activateFilter(next) {
  if(filter===next)return;
  updateLayout(()=>{
    filter=next;openId=null;updateFilters();renderProjects();
  }).then(()=>updateProjectUrl(null));
}
async function copyProjectLink(id,button) {
  const url=new URL(projectUrl(id),window.location.href).href;
  try {
    if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(url);
    button.textContent=copy[lang].linkCopied+" ✓";
    announce(copy[lang].linkCopied);
  } catch {
    const fallback=$(".copy-fallback",button.closest(".tile__detail"));
    const input=$("input",fallback);
    input.value=url;
    fallback.hidden=false;
    input.focus();
    input.select();
    announce(copy[lang].copyFallback);
  }
}
$("#lang-switch").addEventListener("click",()=>{
  const focusedId=document.activeElement?.closest?.("[data-id]")?.dataset.id;
  lang=lang==="vi"?"en":"vi";
  save();translate();applyTheme();renderProjects();renderTimeline();
  if(focusedId) $('[data-id="'+focusedId+'"] .tile__trigger',grid)?.focus({preventScroll:true});
});
$("#theme-switch").addEventListener("click",()=>{
  theme=themes[(themes.indexOf(theme)+1)%themes.length];
  save();applyTheme();
});
$$(".filter").forEach(button=>button.addEventListener("click",()=>activateFilter(button.dataset.filter)));
$("#reset-filter").addEventListener("click",()=>activateFilter("all"));
grid.addEventListener("click",event=>{
  const copyButton=event.target.closest("[data-copy-project]");
  if(copyButton && grid.contains(copyButton)){copyProjectLink(copyButton.dataset.copyProject,copyButton);return;}
  const button=event.target.closest(".tile__trigger");
  if(!button||!grid.contains(button))return;
  const id=button.closest(".tile").dataset.id;
  const next=openId===id?null:id;
  updateLayout(()=>{openId=next;syncTiles();}).then(()=>{
    updateProjectUrl(next);
    if(next)focusProject(id,false);
    announce((next?copy[lang].openedProject:copy[lang].closedProject).replace("{name}",projects.find(p=>p.id===id).title));
  });
});
$$("[data-open-project]").forEach(button=>button.addEventListener("click",()=>openProject(button.dataset.openProject)));
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&openId){
    const closing=openId;
    updateLayout(()=>{openId=null;syncTiles();}).then(()=>{
      updateProjectUrl(null);
      focusProject(closing,false);
      announce(copy[lang].closedProject.replace("{name}",projects.find(p=>p.id===closing).title));
    });
  }
});
translate();
applyTheme();
openId=getProjectFromUrl();
renderProjects();
renderTimeline();
window.addEventListener("popstate",applyUrlState);
window.addEventListener("hashchange",applyUrlState);
if(openId)requestAnimationFrame(()=>{const tile=$('[data-id="'+openId+'"]',grid);tile?.scrollIntoView({block:"nearest"});});

/* All sections stay visible immediately. No scroll-hidden content. */
/* Low-impact local spotlight: no pointer tracking or 3D tilt on mobile. */
if(window.matchMedia("(hover: hover) and (pointer: fine)").matches&&!reduceMotion.matches){
  grid.addEventListener("pointermove",event=>{
    const tile=event.target.closest(".tile");
    if(!tile)return;
    const rect=tile.getBoundingClientRect();
    tile.style.setProperty("--spot-x",((event.clientX-rect.left)/rect.width*100).toFixed(1)+"%");
    tile.style.setProperty("--spot-y",((event.clientY-rect.top)/rect.height*100).toFixed(1)+"%");
  },{passive:true});
}
