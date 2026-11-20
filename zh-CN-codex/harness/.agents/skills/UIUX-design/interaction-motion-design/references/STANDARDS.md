# 动画标准参考

这是动画审查背后的精确数值、曲线和规则。提出问题时引用这些值，不要估算。内容提炼自 Emil Kowalski 的设计工程理念（[animations.dev](https://animations.dev/)）。

## 是否应该有动画？（频率表）

| 频率 | 决策 |
| --- | --- |
| 每天 100 次以上（键盘快捷键、命令面板开关） | 永远不加动画。 |
| 每天数十次（悬停效果、列表导航） | 删除或大幅减弱 |
| 偶尔出现（模态框、抽屉、提示消息） | 标准动画 |
| 罕见／首次出现（引导、反馈、庆祝） | 可以增加愉悦感 |

**绝不要为键盘触发的操作添加动画**——这类操作每天会重复数百次；动画会让它们显得缓慢、脱节。（Raycast 没有开关动画——对于每天使用数百次的东西来说是正确的。）

运动的合理目的：空间一致性、状态指示、解释、反馈、防止突兀变化。对于经常出现的元素来说，“看起来很酷”不是合理目的。

## 缓动

决策顺序：

- 进入或退出 → **`ease-out`**（开始快，感觉响应迅速）
- 在屏幕上移动／形变 → **`ease-in-out`**
- 悬停／颜色变化 → **`ease`**
- 持续运动（跑马灯、进度） → **`linear`**
- 默认 → **`ease-out`**

**UI 中绝不要使用 `ease-in`。** 它开始缓慢，会延迟用户看得最仔细的时刻。200ms 的 `ease-out` *感觉*比 200ms 的 `ease-in` 更快。

内置 CSS 缓动太弱。应使用更强的自定义曲线：

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* 用于 UI 的强 ease-out */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* 用于屏幕内运动的强 ease-in-out */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* 类似 iOS 的抽屉曲线（Ionic） */
```

可在 [easing.dev](https://easing.dev/) 或 [easings.co](https://easings.co/) 查找曲线——不要从零手写。

## 时长

| 元素 | 时长 |
| --- | --- |
| 按钮按压反馈 | 100–160ms |
| 工具提示、小型浮层 | 125–200ms |
| 下拉菜单、选择器 | 150–250ms |
| 模态框、抽屉 | 200–500ms |
| 营销／解释性动画 | 可以更长 |

**规则：UI 动画保持在 300ms 以下。** 180ms 的下拉菜单比 400ms 的更有响应感。加载指示器转得更快，会让加载感觉更快（实际时间相同）。第一个工具提示之后的后续提示即时出现（跳过延迟 + 动画），会让工具栏感觉更快。

## 物理感

- **绝不使用 `scale(0)`。** 从 `scale(0.9–0.97)` + `opacity: 0` 开始。现实世界中没有任何东西会从虚无中出现。
- **感知原点的浮层。** 从触发控件缩放，而不是从中心缩放：
  ```css
  .popover { transform-origin: var(--radix-popover-content-transform-origin); } /* Radix */
  .popover { transform-origin: var(--transform-origin); }                       /* Base UI */
  ```
  **模态框例外**——它们居中出现在视口中，应保留 `transform-origin: center`。
- **按钮按压反馈。** 在 `:active` 上使用 `transform: scale(0.97)` 和 `transition: transform 160ms ease-out`。幅度要细微（0.95–0.98）。适用于任何可按压元素。

## 弹簧

弹簧模拟物理，因此感觉自然；没有固定时长，而是根据参数停稳。适用场景：带惯性的拖动、“有生命”的元素（Dynamic Island）、可中断的手势、装饰性鼠标跟随。

```js
// Apple 风格（更容易理解）——推荐
{ type: "spring", duration: 0.5, bounce: 0.2 }

// 传统物理参数（控制更精细）
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

把回弹控制在轻微程度（0.1–0.3）；大多数 UI 中应避免回弹，把它留给拖拽关闭和活泼的交互。弹簧被中断时会保留速度（关键帧会从零重新开始），因此很适合用户可能在运动途中反向的手势。

鼠标交互：使用 `useSpring` 插值，而不是把值直接绑定到鼠标位置（直接绑定会显得人工，没有惯性）。只有运动是装饰性时才这样做。

## 可中断性

CSS **过渡**可以在动画途中被中断并重新设定目标；**关键帧**会从零重新开始。对于任何可能快速触发的内容（添加提示消息、切换），过渡更平滑。

```css
/* 可中断——适合动态 UI */
.toast { transition: transform 400ms ease; }

/* 不可中断——动态 UI 应避免 */
@keyframes slideIn { from { transform: translateY(100%); } to { transform: translateY(0); } }
```

使用 `@starting-style` 实现无需 JS 的入场：

```css
.toast {
  opacity: 1; transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```

旧版回退：`useEffect(() => setMounted(true), [])` + `data-mounted` 属性。

## 非对称时序

用户做决定时慢，系统响应时快。

```css
.overlay { transition: clip-path 200ms ease-out; }            /* 释放：快速 */
.button:active .overlay { transition: clip-path 2s linear; }  /* 按压：缓慢、有意识 */
```

## 性能

- **只动画 `transform` 和 `opacity`**——它们会跳过布局／绘制，在 GPU 上运行。`padding`／`margin`／`height`／`width`／`top`／`left` 会触发全部三个渲染阶段。
- **不要通过父元素上的 CSS 变量驱动子元素变换**——这会重新计算所有子元素的样式。应在元素上直接设置 `transform`。
  ```js
  element.style.setProperty('--swipe-amount', ${d}px); // 错误：所有子元素重算
  element.style.transform = `translateY(${d}px)`;        // 正确：只影响这个元素
  ```
- **Framer Motion 的简写属性不会硬件加速。** `x`／`y`／`scale` 通过 rAF 在主线程运行，负载时会掉帧。使用完整 transform 字符串：
  ```jsx
  <motion.div animate={{ x: 100 }} />                          // 负载时掉帧
  <motion.div animate={{ transform: "translateX(100px)" }} />  // 硬件加速
  ```
- **负载下 CSS 动画优于 JS**——它们在主线程之外运行；浏览器加载／执行脚本／绘制时，基于 rAF 的动画会卡顿。预定运动用 CSS，动态／可中断运动用 JS。
- **WAAPI** 提供 JS 控制力和 CSS 性能（硬件加速、可中断、无需库）：
  ```js
  element.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
    { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' });
  ```

## Transform 与 clip-path

- **`translate` 百分比**相对于元素自身尺寸——`translateY(100%)` 会按元素高度移动，不受尺寸影响（Sonner／Vaul 就是这样定位提示消息／抽屉的）。优先使用百分比，而不是硬编码 px。
- **`scale()` 也会缩放子元素**（字体、图标、内容）——这对按压反馈是特性。
- **3D**：`rotateX/Y` + `transform-style: preserve-3d`，无需 JS 即可实现纵深／环绕／翻转。
- **`clip-path: inset(t r b l)`** 是强大的动画工具：每个值都会从对应边向内“吃掉”区域。用途：滚动揭示（`inset(0 0 100% 0)` → `inset(0 0 0 0)`）、长按删除覆盖层、无缝标签页颜色过渡（复制活动副本并裁剪）、对比滑块。

## 手势与拖动

- **惯性关闭**：不要要求必须越过距离阈值——计算速度（`Math.abs(distance)/elapsedMs`）；如果大于约 0.11 就关闭。快速甩动应该足够。
- **边界阻尼**：拖过自然边缘时，越继续拖，移动越少（现实事物会先减速再停止）。
- **指针捕获**：拖动一开始就捕获，这样指针离开边界后拖动仍能继续。
- **多点触摸保护**：拖动开始后忽略额外触摸点（`if (isDragging) return`）——防止跳变。
- **摩擦替代硬停**——允许过度拖动，并逐步增加阻力，而不是撞上隐形墙。

## 掩盖不完美的交叉淡化

当交叉淡化即使调整缓动／时长仍显示两个重叠状态时，在过渡期间加入细微的 `filter: blur(2px)`，把它们融合成一次感知上的变化。模糊保持在 20px 以下（重度模糊开销很大，尤其在 Safari 中）。

## 错开

让一组元素错开入场；项目之间间隔 30–80ms。延迟更长会显得缓慢。错开是装饰性的——播放期间绝不能阻塞交互。

```css
.item { opacity: 0; transform: translateY(8px); animation: fadeIn 300ms ease-out forwards; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
@keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
```

## 无障碍

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; } /* 保留透明度／颜色，去掉基于 transform 的运动 */
}
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); } /* 限制悬停运动——触摸点按会触发假悬停 */
}
```

```jsx
const reduce = useReducedMotion();
const closedX = reduce ? 0 : '-100%';
```

减少动态效果意味着更少、更温和的动画，而不是完全没有——保留有助于理解的过渡，移除移动／位置变化。

## 调试（审查中感觉不确定时推荐）

- **慢放**：把时长提高到 2–5 倍，或使用 DevTools 动画检查器。检查颜色是否干净地交叉淡化、缓动是否不会突然停止、`transform-origin` 是否正确、协调属性是否保持同步。
- **逐帧播放**：Chrome DevTools 的 Animations 面板能揭示协调属性之间的时序漂移。
- **真实设备**用于手势（抽屉、滑动）——连接手机，通过 IP 访问开发服务器，使用 Safari 远程开发者工具。
- **第二天用新鲜眼光复查**——开发期间看不见的瑕疵之后会显现。

## 一致性

让运动匹配组件个性：活泼的组件可以更有弹性；专业仪表盘应当干脆、快速。Sonner 感觉正确，部分原因是缓动、时长、设计甚至名称都和谐一致——略慢，使用 `ease` 而非 `ease-out`，显得优雅。列表进入／退出时的不透明度 + 高度需要反复试验；没有公式——调整到感觉正确即可。
