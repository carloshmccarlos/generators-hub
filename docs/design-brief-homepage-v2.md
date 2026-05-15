# Design Brief: Homepage Redesign - Vibrant & Playful

## 1. Feature Summary
Generator Hub 主页全新设计，活力创意风格。面向内容创作者和开发者，提供 TikTok 评论生成器和数学序列生成器。目标：让用户感到轻松愉悦，同时保持专业性。

## 2. Primary User Action
快速发现并访问所需工具。视觉优先级：Live Tools > Coming Soon。

## 3. Design Direction
**Vibrant & Playful** - 活力创意风格

- **情绪**：友好、有趣、充满活力
- **参考**：Figma 首屏、Linear 首页、Vercel 仪表盘
- **字体**：选择独特但不过于花哨的字体配对
- **色彩**：主色使用品牌暖色调 + 活力点缀色
- **布局**：Hero 大标题 + 卡片网格，视觉节奏明快

## 4. Layout Strategy
**Hero Section**：
- 超大标题，醒目视觉
- 简短描述文案
- 装饰性图形元素（可选）

**Live Tools 卡片网格**：
- 2 列网格（桌面）/ 1 列（移动）
- 每张卡片：工具图标 + 名称 + 描述 + CTA
- 悬停：微妙动画 + 边框高亮

**Coming Soon**：
- 视觉上明显区分（更低调）
- 单一占位卡片

## 5. Key States
- **Default**: 2 张工具卡片可见
- **Hover**: 卡片上移 + 阴影 + 边框颜色变化
- **Empty**: 优雅空状态

## 6. Interaction Model
- 点击卡片 → 导航到工具页
- 悬停反馈：transform, shadow, border
- 页面加载：交错动画

## 7. Content Requirements
- Hero 标题/描述
- Live Tools 卡片内容（已有）
- Coming Soon 卡片内容（已有）

## 8. Recommended References
- spatial-design.md
- motion-design.md
- color-and-contrast.md

---

**Confirmed**: Ready for implementation