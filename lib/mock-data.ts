import type { Folder, LinkItem } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "reading", name: "읽을거리", count: 1 },
  { id: "inspiration", name: "영감", count: 1 },
];

export const links: LinkItem[] = [
  { id: "1", title: "Next.js 공식 문서", url: "https://nextjs.org/docs", description: "App Router, 서버 컴포넌트, 캐싱까지 Next.js의 모든 것.", folderId: "dev", createdAt: "2026-11-08" },
  { id: "2", title: "Tailwind CSS", url: "https://tailwindcss.com", description: "유틸리티 퍼스트 CSS 프레임워크.", folderId: "dev", createdAt: "2026-11-07" },
  { id: "3", title: "React 문서", url: "https://react.dev", description: "React 19의 새로운 기능과 가이드.", folderId: "dev", createdAt: "2026-11-06" },
  { id: "4", title: "Figma", url: "https://figma.com", description: "협업 기반 인터페이스 디자인 도구.", folderId: "design", createdAt: "2026-11-05" },
  { id: "5", title: "Refactoring UI", url: "https://refactoringui.com", description: "개발자를 위한 실전 UI 디자인 팁.", folderId: "design", createdAt: "2026-11-04" },
  { id: "6", title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "웹 기술 레퍼런스의 표준.", folderId: "dev", createdAt: "2026-11-03" },
  { id: "7", title: "Hacker News", url: "https://news.ycombinator.com", description: "개발자들의 뉴스 커뮤니티.", folderId: "reading", createdAt: "2026-11-02" },
  { id: "8", title: "Awwwards", url: "https://awwwards.com", description: "최고의 웹 디자인 사례 모음.", folderId: "inspiration", createdAt: "2026-11-01" },
];
