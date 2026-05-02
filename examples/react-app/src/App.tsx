import React, { useRef } from 'react';
import {
  // ── Providers ──
  LayoutSpacingProvider,
  SpacingProvider,
  ResponsiveProvider,
  SpacingContext,
  ResponsiveContext,

  // ── Layout Primitives ──
  Box,
  Flex,
  Stack,

  // ── Spacing System Hooks ──
  useSpacing,
  useSpacingTheme,
  useSpacingConfig,
  useHasSpacingProvider,

  // ── Spacing System Tokens/Utils ──
  DEFAULT_SPACING_SCALE,
  DEFAULT_SPACING_CONFIG,
  generateScale,
  toCSSValue,
  generateCSSVars,
  createSpacingTheme,
  resolveSpacingToken,
  applySpacingStyles,
  mergeSpacingStyles,
  spacingStyleString,
  clampSpacing,

  // ── Layout Primitive Utils ──
  resolveSpacingStyles,
  resolveBaseStyles,
  mergeStyles,

  // ── Responsive Hooks ──
  useBreakpoint,
  useMediaQuery,
  useResponsiveValue,
  useOrientation,
  useResponsiveContext,
  useHasResponsiveProvider,

  // ── Responsive Tokens/Utils ──
  DEFAULT_BREAKPOINTS,
  BREAKPOINT_ORDER,
  getBreakpointForWidth,
  buildMediaQuery,

  // ── Aspect Ratio ──
  AspectRatio,
  useAspectRatio,
  useContainerAspectRatio,
  ASPECT_RATIOS,
  parseAspectRatio,
  calculateHeight,
  calculateWidth,
} from '@laddhaanshul/layout-spacing';

/* ═══════════════════════════════════════════════════════════════
   SECTION 1: Spacing System — Tokens & Hooks
   ═══════════════════════════════════════════════════════════════ */

function SpacingTokensDemo() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Spacing Tokens (DEFAULT_SPACING_SCALE)</h3>
      <p>All values from the 8pt grid scale:</p>
      <Flex gap={1} wrap>
        {Object.entries(DEFAULT_SPACING_SCALE).map(([key, value]) => (
          <Box
            key={key}
            px={2}
            py={1}
            bg="#e3f2fd"
            borderRadius={4}
            style={{ fontFamily: 'monospace', fontSize: 12 }}
          >
            {key} = {value}px
          </Box>
        ))}
      </Flex>
    </div>
  );
}

function SpacingHooksDemo() {
  const spacing = useSpacing();
  const theme = useSpacingTheme();
  const config = useSpacingConfig();
  const hasProvider = useHasSpacingProvider();

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>useSpacing() Hook</h3>
      <Box p={3} bg="#f1f8e9" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>spacing.value(4) = {spacing.value(4)}</p>
        <p>spacing.value(0.5) = {spacing.value(0.5)}</p>
        <p>spacing.value(8) = {spacing.value(8)}</p>
        <p>spacing.margin(&apos;all&apos;, 2) = {JSON.stringify(spacing.margin('all', 2))}</p>
        <p>spacing.padding(&apos;x&apos;, 3) = {JSON.stringify(spacing.padding('x', 3))}</p>
        <p>spacing.gap(2) = {JSON.stringify(spacing.gap(2))}</p>
        <p>spacing.scale().keys = [{Object.keys(spacing.scale()).slice(0, 6).join(', ')}...]</p>
      </Box>

      <h3>useSpacingTheme() / useSpacingConfig() / useHasSpacingProvider()</h3>
      <Box p={3} bg="#e8f5e9" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>hasSpacingProvider = {String(hasProvider)}</p>
        <p>config.baseUnit = {config.baseUnit}</p>
        <p>config.useRem = {String(config.useRem)}</p>
        <p>theme.cssVars count = {Object.keys(theme.cssVars).length}</p>
        <p>theme.scale count = {Object.keys(theme.scale).length}</p>
      </Box>
    </div>
  );
}

function SpacingUtilsDemo() {
  const cssVars = generateCSSVars({ baseUnit: 8 });
  const customScale = generateScale({ baseUnit: 8 });
  const customTheme = createSpacingTheme({ baseUnit: 8, useRem: false });
  const resolvedToken = resolveSpacingToken(4);
  const appliedStyles = applySpacingStyles({}, 'padding', 4, 'x');
  const merged = mergeSpacingStyles({ padding: '8px' }, { margin: '16px' });
  const styleStr = spacingStyleString('margin', 4, 'y');
  const clamped = clampSpacing(8, 2, 10);
  const toCSS = toCSSValue(4, { baseUnit: 8, useRem: true });

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Spacing Utility Functions</h3>
      <Box p={3} bg="#fff8e1" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>toCSSValue(4, useRem) = {toCSS}</p>
        <p>resolveSpacingToken(4) = {resolvedToken}px</p>
        <p>applySpacingStyles(&#123;&#125;, &apos;padding&apos;, 4, &apos;x&apos;) = {JSON.stringify(appliedStyles)}</p>
        <p>mergeSpacingStyles(&#123;padding: 8px&#125;, &#123;margin: 16px&#125;) = {JSON.stringify(merged)}</p>
        <p>spacingStyleString(&apos;margin&apos;, 4, &apos;y&apos;) = &quot;{styleStr}&quot;</p>
        <p>clampSpacing(8, 2, 10) = {clamped}px</p>
        <p>generateScale() keys = [{Object.keys(customScale).slice(0, 6).join(', ')}...]</p>
        <p>createSpacingTheme() cssVars = [{Object.keys(customTheme.cssVars).slice(0, 4).join(', ')}...]</p>
      </Box>

      <h3>generateCSSVars()</h3>
      <Box p={3} bg="#fff3e0" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>
        {Object.entries(cssVars).slice(0, 6).map(([k, v]) => (
          <p key={k}>{k}: {v}</p>
        ))}
        <p>... ({Object.keys(cssVars).length} total vars)</p>
      </Box>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: Layout Primitives — Box, Flex, Stack + Utils
   ═══════════════════════════════════════════════════════════════ */

function BoxDemo() {
  // Demonstrating resolveSpacingStyles / resolveBaseStyles / mergeStyles
  const computed = resolveSpacingStyles({ m: 2, px: 4, py: 2 });
  const baseComputed = resolveBaseStyles({ w: 200, bg: '#e3f2fd', borderRadius: 8 });
  const merged = mergeStyles({ ...baseComputed, ...computed }, { border: '2px solid #90caf9' });

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Box Component</h3>
      <Flex gap={2} wrap>
        <Box p={4} bg="#e8f5e9" borderRadius={8}>
          <p>Box p=&#123;4&#125;</p>
        </Box>
        <Box m={2} p={2} bg="#fff3e0" borderRadius={8} style={{ border: '2px solid #ff9800' }}>
          <p>Box m=&#123;2&#125; p=&#123;2&#125;</p>
        </Box>
        <Box px={6} py={3} bg="#fce4ec" borderRadius={8}>
          <p>Box px=&#123;6&#125; py=&#123;3&#125;</p>
        </Box>
        <Box mt={2} mb={4} ml={1} mr={1} p={2} bg="#e1f5fe" borderRadius={8}>
          <p>Box mt=2 mb=4 ml=1 mr=1</p>
        </Box>
        <Box mx={3} my={2} p={2} bg="#f3e5f5" borderRadius={8}>
          <p>Box mx=&#123;3&#125; my=&#123;2&#125;</p>
        </Box>
        <Box as="section" p={3} bg="#e0f2f1" borderRadius={8}>
          <p>Box as=&quot;section&quot;</p>
        </Box>
        <Box as="article" p={3} bg="#eceff1" borderRadius={8}>
          <p>Box as=&quot;article&quot;</p>
        </Box>
      </Flex>

      <h3>Layout Primitive Utils</h3>
      <Box p={3} bg="#f5f5f5" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 12 }}>
        <p>resolveSpacingStyles(&#123;m:2, px:4, py:2&#125;) = {JSON.stringify(computed)}</p>
        <p>resolveBaseStyles(&#123;w:200, bg:&apos;#e3f2fd&apos;&#125;) = {JSON.stringify(baseComputed)}</p>
        <p>mergeStyles(computed, &#123;border:...&#125;) = {JSON.stringify(merged)}</p>
      </Box>
    </div>
  );
}

function FlexDemo() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Flex Component</h3>
      <Stack gap={3}>
        <div>
          <h4>Row with align &amp; justify</h4>
          <Flex direction="row" gap={2} align="center" justify="space-between" p={2} bg="#f3e5f5" borderRadius={8}>
            <Box p={2} bg="#ce93d8" borderRadius={4}>Item 1</Box>
            <Box p={2} bg="#ce93d8" borderRadius={4}>Item 2</Box>
            <Box p={2} bg="#ce93d8" borderRadius={4}>Item 3</Box>
          </Flex>
        </div>
        <div>
          <h4>Column</h4>
          <Flex direction="column" gap={2} p={2} bg="#e0f2f1" borderRadius={8}>
            <Box p={2} bg="#80cbc4" borderRadius={4}>Column Item 1</Box>
            <Box p={2} bg="#80cbc4" borderRadius={4}>Column Item 2</Box>
          </Flex>
        </div>
        <div>
          <h4>Wrap</h4>
          <Flex direction="row" gap={2} wrap p={2} bg="#fff8e1" borderRadius={8}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Box key={i} p={2} bg="#ffd54f" borderRadius={4} grow={false}>
                Item {i}
              </Box>
            ))}
          </Flex>
        </div>
        <div>
          <h4>Flex grow / shrink / basis</h4>
          <Flex direction="row" gap={2} p={2} bg="#e8eaf6" borderRadius={8}>
            <Box p={2} bg="#7986cb" borderRadius={4} grow={1}>grow=1</Box>
            <Box p={2} bg="#7986cb" borderRadius={4} grow={2}>grow=2</Box>
            <Box p={2} bg="#5c6bc0" borderRadius={4} shrink={0} style={{ width: 100 }}>shrink=0, w=100</Box>
          </Flex>
        </div>
        <div>
          <h4>columnGap / rowGap</h4>
          <Flex direction="row" wrap columnGap={4} rowGap={1} p={2} bg="#fce4ec" borderRadius={8}>
            {[1, 2, 3, 4].map(i => (
              <Box key={i} p={2} bg="#ef9a9a" borderRadius={4} style={{ width: '40%' }}>Item {i}</Box>
            ))}
          </Flex>
        </div>
        <div>
          <h4>Flex as=&quot;nav&quot; / alignSelf</h4>
          <Flex as="nav" direction="row" gap={2} p={2} bg="#e1f5fe" borderRadius={8}>
            <Box p={2} bg="#4fc3f7" borderRadius={4}>Nav Item 1</Box>
            <Box p={2} bg="#4fc3f7" borderRadius={4} alignSelf="flex-end">self-end</Box>
            <Box p={2} bg="#4fc3f7" borderRadius={4}>Nav Item 3</Box>
          </Flex>
        </div>
      </Stack>
    </div>
  );
}

function StackDemo() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Stack Component</h3>
      <Flex gap={4}>
        <div style={{ flex: 1 }}>
          <h4>Vertical</h4>
          <Stack gap={2} p={2} bg="#eceff1" borderRadius={8}>
            <Box p={2} bg="#90a4ae" borderRadius={4}>First</Box>
            <Box p={2} bg="#90a4ae" borderRadius={4}>Second</Box>
            <Box p={2} bg="#90a4ae" borderRadius={4}>Third</Box>
          </Stack>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Horizontal</h4>
          <Stack gap={2} direction="horizontal" p={2} bg="#e8eaf6" borderRadius={8}>
            <Box p={2} bg="#7986cb" borderRadius={4}>A</Box>
            <Box p={2} bg="#7986cb" borderRadius={4}>B</Box>
            <Box p={2} bg="#7986cb" borderRadius={4}>C</Box>
          </Stack>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Reverse</h4>
          <Stack gap={2} reverse p={2} bg="#fff3e0" borderRadius={8}>
            <Box p={2} bg="#ffb74d" borderRadius={4}>1st (reversed)</Box>
            <Box p={2} bg="#ffa726" borderRadius={4}>2nd (reversed)</Box>
            <Box p={2} bg="#ff9800" borderRadius={4}>3rd (reversed)</Box>
          </Stack>
        </div>
      </Flex>
      <div style={{ marginTop: 16 }}>
        <h4>Stack with wrap &amp; align/justify</h4>
        <Stack gap={2} direction="horizontal" wrap justify="center" p={2} bg="#f3e5f5" borderRadius={8}>
          {[1, 2, 3, 4, 5].map(i => (
            <Box key={i} p={2} bg="#ba68c8" borderRadius={4}>Wrap {i}</Box>
          ))}
        </Stack>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: Responsive Hooks & Tokens
   ═══════════════════════════════════════════════════════════════ */

function ResponsiveHooksDemo() {
  const { breakpoint, isAbove, isBelow, is: isExact, width, height, orientation, activeBreakpoints } = useBreakpoint();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const columns = useResponsiveValue({ xs: 1, sm: 2, md: 3, lg: 4 });
  const orient = useOrientation();
  const respCtx = useResponsiveContext();
  const hasRespProvider = useHasResponsiveProvider();

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>useBreakpoint()</h3>
      <Flex gap={2} wrap>
        <Box p={2} bg="#e3f2fd" borderRadius={4}>Breakpoint: <strong>{breakpoint}</strong></Box>
        <Box p={2} bg={isMobile ? '#fff3e0' : '#e8f5e9'} borderRadius={4}>
          {isMobile ? 'Mobile' : 'Desktop'}
        </Box>
        <Box p={2} bg="#fce4ec" borderRadius={4}>{width} x {height}px</Box>
        <Box p={2} bg="#f3e5f5" borderRadius={4}>Orientation: {orient}</Box>
        <Box p={2} bg="#e0f2f1" borderRadius={4}>Active: [{activeBreakpoints.join(', ')}]</Box>
      </Flex>
      <Box p={2} mt={2} bg="#f5f5f5" borderRadius={4} style={{ fontSize: 13 }}>
        <p>isAbove('md'): {isAbove('md') ? 'Yes' : 'No'}</p>
        <p>isBelow('lg'): {isBelow('lg') ? 'Yes' : 'No'}</p>
        <p>is('md'): {isExact('md') ? 'Yes' : 'No'}</p>
      </Box>

      <h3>useMediaQuery()</h3>
      <Flex gap={2} wrap mt={2}>
        <Box p={2} bg={isMobile ? '#ffcc80' : '#e0e0e0'} borderRadius={4}>maxWidth=767: {isMobile ? 'Yes' : 'No'}</Box>
        <Box p={2} bg={isTablet ? '#ffcc80' : '#e0e0e0'} borderRadius={4}>576-991: {isTablet ? 'Yes' : 'No'}</Box>
        <Box p={2} bg={isLandscape ? '#ffcc80' : '#e0e0e0'} borderRadius={4}>Landscape: {isLandscape ? 'Yes' : 'No'}</Box>
      </Flex>

      <h3>useResponsiveValue()</h3>
      <p>columns = useResponsiveValue(&#123; xs:1, sm:2, md:3, lg:4 &#125;) = {columns}</p>
      <Flex direction="row" gap={2} wrap>
        {Array.from({ length: 8 }).map((_, i) => (
          <Box
            key={i}
            p={3}
            bg="#bbdefb"
            borderRadius={4}
            style={{ flex: `1 1 ${100 / (columns || 1)}%`, maxWidth: `${100 / (columns || 1)}%`, textAlign: 'center' }}
          >
            Item {i + 1}
          </Box>
        ))}
      </Flex>

      <h3>useResponsiveContext() / useHasResponsiveProvider()</h3>
      <Box p={2} mt={2} bg="#e8eaf6" borderRadius={4} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>hasResponsiveProvider = {String(hasRespProvider)}</p>
        <p>ctx.currentBreakpoint = {respCtx.currentBreakpoint}</p>
        <p>ctx.windowWidth = {respCtx.windowWidth}</p>
        <p>ctx.windowHeight = {respCtx.windowHeight}</p>
        <p>ctx.orientation = {respCtx.orientation}</p>
      </Box>

      <h3>Responsive Grid (columns: {columns})</h3>
      <Flex direction="row" gap={2} wrap>
        {Array.from({ length: 8 }).map((_, i) => (
          <Box
            key={i}
            p={3}
            bg="#bbdefb"
            borderRadius={4}
            style={{ flex: `1 1 ${100 / (columns || 1)}%`, maxWidth: `${100 / (columns || 1)}%`, textAlign: 'center' }}
          >
            Item {i + 1}
          </Box>
        ))}
      </Flex>
    </div>
  );
}

function ResponsiveTokensDemo() {
  const bpForWidth = getBreakpointForWidth(800);
  const bpForWidthMobile = getBreakpointForWidth(320);
  const mq1 = buildMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const mq2 = buildMediaQuery({ maxWidth: 767, orientation: 'portrait' });
  const mq3 = buildMediaQuery({ minWidth: 1200 });

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Responsive Tokens &amp; Utilities</h3>
      <Box p={3} bg="#f5f5f5" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <h4>DEFAULT_BREAKPOINTS</h4>
        {Object.entries(DEFAULT_BREAKPOINTS).map(([k, v]) => (
          <p key={k}>  {k}: {v}px</p>
        ))}
        <h4>BREAKPOINT_ORDER</h4>
        <p>  [{BREAKPOINT_ORDER.join(', ')}]</p>
        <h4>getBreakpointForWidth()</h4>
        <p>  getBreakpointForWidth(800) = &quot;{bpForWidth}&quot;</p>
        <p>  getBreakpointForWidth(320) = &quot;{bpForWidthMobile}&quot;</p>
        <h4>buildMediaQuery()</h4>
        <p>  &#123;minWidth:768, maxWidth:1024&#125; = &quot;{mq1}&quot;</p>
        <p>  &#123;maxWidth:767, orientation:'portrait'&#125; = &quot;{mq2}&quot;</p>
        <p>  &#123;minWidth:1200&#125; = &quot;{mq3}&quot;</p>
      </Box>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4: Aspect Ratio — Component, Hooks & Utilities
   ═══════════════════════════════════════════════════════════════ */

function AspectRatioDemo() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>AspectRatio Component</h3>
      <Flex gap={4} wrap>
        <div>
          <p>Square (1:1)</p>
          <AspectRatio ratio={ASPECT_RATIOS.square} maxWidth={150}>
            <div style={{ backgroundColor: '#ef5350', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4, color: '#fff' }}>1:1</div>
          </AspectRatio>
        </div>
        <div>
          <p>Video (16:9)</p>
          <AspectRatio ratio={ASPECT_RATIOS.video} maxWidth={240}>
            <div style={{ backgroundColor: '#42a5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4, color: '#fff' }}>16:9</div>
          </AspectRatio>
        </div>
        <div>
          <p>Standard (4:3)</p>
          <AspectRatio ratio={ASPECT_RATIOS.standard} maxWidth={180}>
            <div style={{ backgroundColor: '#66bb6a', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4, color: '#fff' }}>4:3</div>
          </AspectRatio>
        </div>
        <div>
          <p>Cinematic (21:9)</p>
          <AspectRatio ratio={ASPECT_RATIOS.cinematic} maxWidth={280}>
            <div style={{ backgroundColor: '#ab47bc', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4, color: '#fff' }}>21:9</div>
          </AspectRatio>
        </div>
        <div>
          <p>Portrait (3:4)</p>
          <AspectRatio ratio={ASPECT_RATIOS.portrait} maxWidth={120}>
            <div style={{ backgroundColor: '#ffa726', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4 }}>3:4</div>
          </AspectRatio>
        </div>
        <div>
          <p>Golden (1.618)</p>
          <AspectRatio ratio={ASPECT_RATIOS.golden} maxWidth={160}>
            <div style={{ backgroundColor: '#26a69a', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4, color: '#fff' }}>1.618</div>
          </AspectRatio>
        </div>
        <div>
          <p>String ratio &quot;21:9&quot;</p>
          <AspectRatio ratio="21:9" maxWidth={260}>
            <div style={{ backgroundColor: '#ec407a', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 4, color: '#fff' }}>21:9</div>
          </AspectRatio>
        </div>
      </Flex>
    </div>
  );
}

function AspectRatioHooksDemo() {
  const { width: arW1, height: arH1 } = useAspectRatio(16 / 9, { width: 600 });
  const { width: arW2, height: arH2 } = useAspectRatio('4:3', { height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHeight = useContainerAspectRatio(containerRef, 16 / 9);

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>useAspectRatio() Hook</h3>
      <Box p={3} bg="#e3f2fd" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>useAspectRatio(16/9, &#123;width: 600&#125;) = &#123; width: {arW1}, height: {arH1} &#125;</p>
        <p>useAspectRatio(&apos;4:3&apos;, &#123;height: 300&#125;) = &#123; width: {arW2}, height: {arH2} &#125;</p>
      </Box>

      <h3>useContainerAspectRatio() Hook</h3>
      <p>Resizes based on container width. Try resizing the browser!</p>
      <div ref={containerRef} style={{ width: '100%', maxWidth: 500 }}>
        <div
          style={{
            width: '100%',
            height: containerHeight,
            backgroundColor: '#7e57c2',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          Container height: {Math.round(containerHeight)}px
        </div>
      </div>
    </div>
  );
}

function AspectRatioUtilsDemo() {
  const parsed1 = parseAspectRatio('16:9');
  const parsed2 = parseAspectRatio('4/3');
  const parsed3 = parseAspectRatio(1.618);
  const parsed4 = parseAspectRatio('21:9');
  const h = calculateHeight(800, 16 / 9);
  const w = calculateWidth(450, 16 / 9);

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Aspect Ratio Utilities</h3>
      <Box p={3} bg="#f3e5f5" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>ASPECT_RATIOS.square = {ASPECT_RATIOS.square}</p>
        <p>ASPECT_RATIOS.video = {ASPECT_RATIOS.video}</p>
        <p>ASPECT_RATIOS.standard = {ASPECT_RATIOS.standard}</p>
        <p>ASPECT_RATIOS.cinematic = {ASPECT_RATIOS.cinematic}</p>
        <p>ASPECT_RATIOS.portrait = {ASPECT_RATIOS.portrait}</p>
        <p>ASPECT_RATIOS.golden = {ASPECT_RATIOS.golden}</p>
        <p>parseAspectRatio('16:9') = {parsed1}</p>
        <p>parseAspectRatio('4/3') = {parsed2}</p>
        <p>parseAspectRatio(1.618) = {parsed3}</p>
        <p>parseAspectRatio('21:9') = {parsed4}</p>
        <p>calculateHeight(800, 16/9) = {h}px</p>
        <p>calculateWidth(450, 16/9) = {w}px</p>
      </Box>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5: Standalone Providers (SpacingProvider, ResponsiveProvider)
   ═══════════════════════════════════════════════════════════════ */

function StandaloneProvidersDemo() {
  const spacing = useSpacing();
  const hasSpacing = useHasSpacingProvider();
  const hasResp = useHasResponsiveProvider();

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Standalone SpacingProvider (custom baseUnit: 4)</h3>
      <Box p={3} bg="#e0f2f1" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>useSpacing().value(4) with baseUnit=4 = {spacing.value(4)}</p>
        <p>useSpacing().value(8) with baseUnit=4 = {spacing.value(8)}</p>
      </Box>
      <Box p={2} bg="#fff3e0" borderRadius={4} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>useSpacing().margin('all', 4) = {JSON.stringify(spacing.margin('all', 4))}</p>
      </Box>

      <Box mt={3} p={3} bg="#e8eaf6" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>hasSpacingProvider = {String(hasSpacing)}</p>
        <p>hasResponsiveProvider = {String(hasResp)}</p>
      </Box>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6: Context objects (SpacingContext, ResponsiveContext)
   ═══════════════════════════════════════════════════════════════ */

function ContextObjectsDemo() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Context Objects (SpacingContext, ResponsiveContext)</h3>
      <Box p={3} bg="#eceff1" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>SpacingContext is available: {SpacingContext ? 'Yes' : 'No'} (exported for advanced usage)</p>
        <p>ResponsiveContext is available: {ResponsiveContext ? 'Yes' : 'No'} (exported for advanced usage)</p>
        <p style={{ marginTop: 8, color: '#888' }}>Use useContext(SpacingContext) / useContext(ResponsiveContext) for custom provider patterns.</p>
      </Box>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7: DEFAULT_SPACING_CONFIG
   ═══════════════════════════════════════════════════════════════ */

function DefaultConfigDemo() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>DEFAULT_SPACING_CONFIG</h3>
      <Box p={3} bg="#fff8e1" borderRadius={8} style={{ fontFamily: 'monospace', fontSize: 13 }}>
        <p>baseUnit: {DEFAULT_SPACING_CONFIG.baseUnit}</p>
        <p>useRem: {String(DEFAULT_SPACING_CONFIG.useRem)}</p>
        <p>rootFontSize: {DEFAULT_SPACING_CONFIG.rootFontSize}</p>
      </Box>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */

const sectionCard = (title: string, children: React.ReactNode) => (
  <Box p={5} bg="white" borderRadius={12} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <h2 style={{ marginTop: 0 }}>{title}</h2>
    {children}
  </Box>
);

export default function App() {
  return (
    <LayoutSpacingProvider spacing={{ baseUnit: 8 }} responsive={{}}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
        <Box mb={6}>
          <h1 style={{ marginBottom: 4 }}>@laddhaanshul/layout-spacing</h1>
          <p style={{ color: '#666', marginBottom: 4 }}>
            Complete API demo — all exported items demonstrated
          </p>
          <p style={{ color: '#999', fontSize: 13 }}>
            Window: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'SSR'}
          </p>
        </Box>

        <Stack gap={6}>
          {/* 1. Spacing System */}
          {sectionCard('1. Spacing System — Tokens', <SpacingTokensDemo />)}
          {sectionCard('1. Spacing System — Hooks', <SpacingHooksDemo />)}
          {sectionCard('1. Spacing System — Utilities', <SpacingUtilsDemo />)}
          {sectionCard('1. Spacing System — Config', <DefaultConfigDemo />)}

          {/* 2. Layout Primitives */}
          {sectionCard('2. Layout Primitives — Box', <BoxDemo />)}
          {sectionCard('2. Layout Primitives — Flex', <FlexDemo />)}
          {sectionCard('2. Layout Primitives — Stack', <StackDemo />)}

          {/* 3. Responsive */}
          {sectionCard('3. Responsive — Hooks', <ResponsiveHooksDemo />)}
          {sectionCard('3. Responsive — Tokens & Utilities', <ResponsiveTokensDemo />)}

          {/* 4. Aspect Ratio */}
          {sectionCard('4. Aspect Ratio — Component', <AspectRatioDemo />)}
          {sectionCard('4. Aspect Ratio — Hooks', <AspectRatioHooksDemo />)}
          {sectionCard('4. Aspect Ratio — Utilities', <AspectRatioUtilsDemo />)}

          {/* 5. Providers */}
          {sectionCard('5. Standalone Providers', (
            <ResponsiveProvider breakpoints={{ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1440 }}>
              <SpacingProvider config={{ baseUnit: 4, useRem: false }}>
                <StandaloneProvidersDemo />
              </SpacingProvider>
            </ResponsiveProvider>
          ))}

          {/* 6. Context Objects */}
          {sectionCard('6. Context Objects', <ContextObjectsDemo />)}
        </Stack>
      </div>
    </LayoutSpacingProvider>
  );
}
