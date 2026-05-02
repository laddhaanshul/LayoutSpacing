import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
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

/* ───────────────────────────── helpers ───────────────────────────── */

const SectionTitle = ({ children }: { children: string }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const SubTitle = ({ children }: { children: string }) => (
  <Text style={styles.subTitle}>{children}</Text>
);

const Desc = ({ children }: { children: string }) => (
  <Text style={styles.sectionDesc}>{children}</Text>
);

const CodeLine = ({ children }: { children: string }) => (
  <Text style={styles.codeLine}>{children}</Text>
);

const MonoText = ({ children }: { children: string }) => (
  <Text style={styles.monoText}>{children}</Text>
);

const colors = {
  blue: '#42A5F5',
  green: '#66BB6A',
  orange: '#FFA726',
  purple: '#AB47BC',
  red: '#EF5350',
  teal: '#26A69A',
  pink: '#EC407A',
  bg: '#F5F5F5',
  card: '#FFFFFF',
};

/* ═══════════════════════════════════════════════════════════════
   1. SPACING SYSTEM — Tokens
   ═══════════════════════════════════════════════════════════════ */

function SpacingTokensSection() {
  return (
    <View>
      <SectionTitle>Spacing Tokens</SectionTitle>
      <Desc>DEFAULT_SPACING_SCALE — 8pt grid based spacing tokens.</Desc>

      <Stack gap={1}>
        {Object.entries(DEFAULT_SPACING_SCALE)
          .slice(0, 10)
          .map(([key, value]) => (
            <Box
              key={key}
              px={3}
              py={2}
              bg="#E3F2FD"
              borderRadius={4}
            >
              <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
                token {key} = {String(value)}px
              </Text>
            </Box>
          ))}
      </Stack>

      <SubTitle>DEFAULT_SPACING_CONFIG</SubTitle>
      <Box px={3} py={2} bg="#FFF8E1" borderRadius={6}>
        <MonoText>baseUnit: {DEFAULT_SPACING_CONFIG.baseUnit}</MonoText>
        <MonoText>useRem: {String(DEFAULT_SPACING_CONFIG.useRem)}</MonoText>
        <MonoText>rootFontSize: {DEFAULT_SPACING_CONFIG.rootFontSize}</MonoText>
      </Box>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. SPACING SYSTEM — Hooks
   ═══════════════════════════════════════════════════════════════ */

function SpacingHooksSection() {
  const spacing = useSpacing();
  const theme = useSpacingTheme();
  const config = useSpacingConfig();
  const hasProvider = useHasSpacingProvider();

  return (
    <View>
      <SectionTitle>Spacing Hooks</SectionTitle>

      <SubTitle>useSpacing()</SubTitle>
      <Box px={3} py={3} bg="#E8F5E9" borderRadius={8}>
        <CodeLine>spacing.value(4) = {spacing.value(4)}</CodeLine>
        <CodeLine>spacing.value(0.5) = {spacing.value(0.5)}</CodeLine>
        <CodeLine>spacing.value(8) = {spacing.value(8)}</CodeLine>
        <CodeLine>spacing.margin('all', 2) = {JSON.stringify(spacing.margin('all', 2))}</CodeLine>
        <CodeLine>spacing.padding('x', 3) = {JSON.stringify(spacing.padding('x', 3))}</CodeLine>
        <CodeLine>spacing.gap(2) = {JSON.stringify(spacing.gap(2))}</CodeLine>
        <CodeLine>spacing.scale().keys = [{Object.keys(spacing.scale()).slice(0, 6).join(', ')}...]</CodeLine>
      </Box>

      <SubTitle>useSpacingTheme() / useSpacingConfig() / useHasSpacingProvider()</SubTitle>
      <Box px={3} py={3} bg="#F1F8E9" borderRadius={8}>
        <CodeLine>hasSpacingProvider = {String(hasProvider)}</CodeLine>
        <CodeLine>config.baseUnit = {config.baseUnit}</CodeLine>
        <CodeLine>config.useRem = {String(config.useRem)}</CodeLine>
        <CodeLine>theme.cssVars count = {Object.keys(theme.cssVars).length}</CodeLine>
        <CodeLine>theme.scale count = {Object.keys(theme.scale).length}</CodeLine>
      </Box>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. SPACING SYSTEM — Utilities
   ═══════════════════════════════════════════════════════════════ */

function SpacingUtilsSection() {
  const cssVars = generateCSSVars({ baseUnit: 8 });
  const customScale = generateScale({ baseUnit: 8 });
  const customTheme = createSpacingTheme({ baseUnit: 8, useRem: false });
  const resolvedToken = resolveSpacingToken(4);
  const appliedStyles = applySpacingStyles({}, 'padding', 4, 'x');
  const merged = mergeSpacingStyles({ padding: '8px' }, { margin: '16px' });
  const styleStr = spacingStyleString('margin', 4, 'y');
  const clamped = clampSpacing(8, 2, 10);
  const toCSS = toCSSValue(4, { baseUnit: 8, useRem: true, rootFontSize: 16 });

  return (
    <View>
      <SectionTitle>Spacing Utilities</SectionTitle>

      <Box px={3} py={3} bg="#FFF8E1" borderRadius={8}>
        <CodeLine>toCSSValue(4, useRem) = {toCSS}</CodeLine>
        <CodeLine>resolveSpacingToken(4) = {String(resolvedToken)}</CodeLine>
        <CodeLine>applySpacingStyles(padding, 4, 'x') = {JSON.stringify(appliedStyles)}</CodeLine>
        <CodeLine>mergeSpacingStyles(...) = {JSON.stringify(merged)}</CodeLine>
        <CodeLine>spacingStyleString(margin, 4, 'y') = "{styleStr}"</CodeLine>
        <CodeLine>clampSpacing(8, 2, 10) = {clamped}</CodeLine>
        <CodeLine>generateScale() keys = [{Object.keys(customScale).slice(0, 5).join(', ')}...]</CodeLine>
        <CodeLine>createSpacingTheme() vars = {Object.keys(customTheme.cssVars).length} vars</CodeLine>
      </Box>

      <SubTitle>generateCSSVars() (Web CSS vars)</SubTitle>
      <Box px={3} py={2} bg="#FFF3E0" borderRadius={6}>
        {Object.entries(cssVars)
          .slice(0, 5)
          .map(([k, v]) => (
            <CodeLine key={k}>{k}: {v}</CodeLine>
          ))}
        <CodeLine>... ({Object.keys(cssVars).length} total)</CodeLine>
      </Box>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. LAYOUT PRIMITIVES — Box, Flex, Stack + Utils
   ═══════════════════════════════════════════════════════════════ */

function BoxSection() {
  const computed = resolveSpacingStyles({ m: 2, px: 4, py: 2 });
  const baseComputed = resolveBaseStyles({ w: 200, bg: '#E3F2FD', borderRadius: 8 });
  const mergedStyle = mergeStyles({ ...baseComputed, ...computed }, { borderWidth: 2 } as any);

  return (
    <View>
      <SectionTitle>Box Component</SectionTitle>

      <Flex gap={2} wrap>
        <Box p={4} bg={colors.green} borderRadius={8}>
          <Text style={{ color: '#fff' }}>p=4</Text>
        </Box>
        <Box m={2} p={2} bg={colors.orange} borderRadius={8}>
          <Text>m=2 p=2</Text>
        </Box>
        <Box px={6} py={3} bg={colors.red} borderRadius={8}>
          <Text style={{ color: '#fff' }}>px=6 py=3</Text>
        </Box>
        <Box mt={2} mb={1} ml={4} p={2} bg={colors.teal} borderRadius={8}>
          <Text style={{ color: '#fff' }}>mt=2 mb=1 ml=4</Text>
        </Box>
        <Box mx={3} my={2} p={2} bg={colors.purple} borderRadius={8}>
          <Text style={{ color: '#fff' }}>mx=3 my=2</Text>
        </Box>
        <Box as={View} p={3} bg={colors.blue} borderRadius={8}>
          <Text style={{ color: '#fff' }}>as=View</Text>
        </Box>
      </Flex>

      <SubTitle>Layout Primitive Utils</SubTitle>
      <Box px={3} py={2} bg="#F5F5F5" borderRadius={6}>
        <CodeLine>resolveSpacingStyles(m:2, px:4, py:2) =</CodeLine>
        <CodeLine>  {JSON.stringify(computed)}</CodeLine>
        <CodeLine>resolveBaseStyles(w:200, bg:'#E3F2FD') =</CodeLine>
        <CodeLine>  {JSON.stringify(baseComputed)}</CodeLine>
        <CodeLine>mergeStyles(computed, user) =</CodeLine>
        <CodeLine>  {JSON.stringify(mergedStyle)}</CodeLine>
      </Box>
    </View>
  );
}

function FlexSection() {
  return (
    <View>
      <SectionTitle>Flex Component</SectionTitle>

      <Stack gap={3}>
        <View>
          <SubTitle>Row with align & justify</SubTitle>
          <Flex direction="row" gap={2} align="center" justify="space-between" p={3} bg="#F3E5F5" borderRadius={8}>
            <Box p={2} bg={colors.purple} borderRadius={4}>
              <Text style={{ color: '#fff' }}>A</Text>
            </Box>
            <Box p={2} bg={colors.purple} borderRadius={4}>
              <Text style={{ color: '#fff' }}>B</Text>
            </Box>
            <Box p={2} bg={colors.purple} borderRadius={4}>
              <Text style={{ color: '#fff' }}>C</Text>
            </Box>
          </Flex>
        </View>

        <View>
          <SubTitle>Column</SubTitle>
          <Flex direction="column" gap={2} p={3} bg="#E0F2F1" borderRadius={8}>
            <Box p={2} bg={colors.teal} borderRadius={4}>
              <Text style={{ color: '#fff' }}>Row 1</Text>
            </Box>
            <Box p={2} bg={colors.teal} borderRadius={4}>
              <Text style={{ color: '#fff' }}>Row 2</Text>
            </Box>
          </Flex>
        </View>

        <View>
          <SubTitle>Wrap</SubTitle>
          <Flex direction="row" gap={2} wrap p={3} bg="#FFF8E1" borderRadius={8}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i} p={2} bg={colors.orange} borderRadius={4}>
                <Text>{i}</Text>
              </Box>
            ))}
          </Flex>
        </View>

        <View>
          <SubTitle>grow / shrink</SubTitle>
          <Flex direction="row" gap={2} p={3} bg="#E8EAF6" borderRadius={8}>
            <Box p={2} bg="#7986CB" borderRadius={4} grow={1}>
              <Text style={{ color: '#fff' }}>grow=1</Text>
            </Box>
            <Box p={2} bg="#5C6BC0" borderRadius={4} grow={2}>
              <Text style={{ color: '#fff' }}>grow=2</Text>
            </Box>
            <Box p={2} bg="#3F51B5" borderRadius={4} shrink={0} style={{ width: 80 }}>
              <Text style={{ color: '#fff' }}>fixed</Text>
            </Box>
          </Flex>
        </View>

        <View>
          <SubTitle>columnGap / rowGap</SubTitle>
          <Flex direction="row" wrap columnGap={4} rowGap={1} p={3} bg="#FCE4EC" borderRadius={8}>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} p={2} bg={colors.pink} borderRadius={4} style={{ width: '42%' }}>
                <Text style={{ color: '#fff' }}>Item {i}</Text>
              </Box>
            ))}
          </Flex>
        </View>

        <View>
          <SubTitle>alignSelf</SubTitle>
          <Flex as={View} direction="row" gap={2} p={3} bg="#E1F5FE" borderRadius={8}>
            <Box p={2} bg="#4FC3F7" borderRadius={4}>
              <Text>Top</Text>
            </Box>
            <Box p={2} bg="#4FC3F7" borderRadius={4} alignSelf="flex-end">
              <Text>End</Text>
            </Box>
            <Box p={2} bg="#4FC3F7" borderRadius={4}>
              <Text>Top</Text>
            </Box>
          </Flex>
        </View>
      </Stack>
    </View>
  );
}

function StackSection() {
  return (
    <View>
      <SectionTitle>Stack Component</SectionTitle>

      <Flex gap={4}>
        <View style={{ flex: 1 }}>
          <SubTitle>Vertical</SubTitle>
          <Stack gap={2} p={3} bg="#ECEFF1" borderRadius={8}>
            <Box p={2} bg="#78909C" borderRadius={4}>
              <Text style={{ color: '#fff' }}>First</Text>
            </Box>
            <Box p={2} bg="#78909C" borderRadius={4}>
              <Text style={{ color: '#fff' }}>Second</Text>
            </Box>
            <Box p={2} bg="#78909C" borderRadius={4}>
              <Text style={{ color: '#fff' }}>Third</Text>
            </Box>
          </Stack>
        </View>

        <View style={{ flex: 1 }}>
          <SubTitle>Horizontal</SubTitle>
          <Stack gap={2} direction="horizontal" p={3} bg="#E8EAF6" borderRadius={8}>
            <Box p={3} bg="#5C6BC0" borderRadius={4}>
              <Text style={{ color: '#fff' }}>A</Text>
            </Box>
            <Box p={3} bg="#5C6BC0" borderRadius={4}>
              <Text style={{ color: '#fff' }}>B</Text>
            </Box>
          </Stack>
        </View>
      </Flex>

      <View style={{ marginTop: 12 }}>
        <SubTitle>Reverse</SubTitle>
        <Stack gap={2} reverse p={3} bg="#FFF3E0" borderRadius={8}>
          <Box p={2} bg="#FFB74D" borderRadius={4}>
            <Text>1st (reversed)</Text>
          </Box>
          <Box p={2} bg="#FFA726" borderRadius={4}>
            <Text>2nd (reversed)</Text>
          </Box>
          <Box p={2} bg="#FF9800" borderRadius={4}>
            <Text>3rd (reversed)</Text>
          </Box>
        </Stack>
      </View>

      <View style={{ marginTop: 12 }}>
        <SubTitle>Wrap + justify</SubTitle>
        <Stack gap={2} direction="horizontal" wrap justify="center" p={3} bg="#F3E5F5" borderRadius={8}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Box key={i} p={2} bg="#BA68C8" borderRadius={4}>
              <Text style={{ color: '#fff' }}>Wrap {i}</Text>
            </Box>
          ))}
        </Stack>
      </View>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. RESPONSIVE HOOKS & TOKENS
   ═══════════════════════════════════════════════════════════════ */

function ResponsiveHooksSection() {
  const {
    breakpoint,
    isAbove,
    isBelow,
    is: isExact,
    width,
    height,
    activeBreakpoints,
  } = useBreakpoint();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const columns = useResponsiveValue({ xs: 1, sm: 2, md: 3 });
  const orient = useOrientation();
  const respCtx = useResponsiveContext();
  const hasRespProvider = useHasResponsiveProvider();

  return (
    <View>
      <SectionTitle>Responsive Hooks</SectionTitle>

      <Stack gap={2}>
        <Box p={3} bg="#E3F2FD" borderRadius={4}>
          <Text>Breakpoint: {breakpoint}</Text>
        </Box>
        <Box p={3} bg={isMobile ? '#FFF3E0' : '#E8F5E9'} borderRadius={4}>
          <Text>{isMobile ? 'Mobile' : 'Desktop'}</Text>
        </Box>
        <Box p={3} bg="#FCE4EC" borderRadius={4}>
          <Text>
            Window: {width} x {height}
          </Text>
        </Box>
        <Box p={3} bg="#F3E5F5" borderRadius={4}>
          <Text>Orientation: {orient}</Text>
        </Box>
        <Box p={3} bg="#E0F2F1" borderRadius={4}>
          <Text>Active: [{activeBreakpoints.join(', ')}]</Text>
        </Box>
      </Stack>

      <Box mt={3} px={3} py={2} bg="#F5F5F5" borderRadius={6}>
        <CodeLine>isAbove('md'): {isAbove('md') ? 'Yes' : 'No'}</CodeLine>
        <CodeLine>isBelow('lg'): {isBelow('lg') ? 'Yes' : 'No'}</CodeLine>
        <CodeLine>is('md'): {isExact('md') ? 'Yes' : 'No'}</CodeLine>
        <CodeLine>isTablet (576-991): {isTablet ? 'Yes' : 'No'}</CodeLine>
        <CodeLine>isLandscape: {isLandscape ? 'Yes' : 'No'}</CodeLine>
      </Box>

      <SubTitle>useResponsiveValue()</SubTitle>
      <Text>columns = {'{ xs: 1, sm: 2, md: 3 }'} = {columns}</Text>
      <Flex gap={2} wrap mt={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Box
            key={i}
            p={3}
            bg={colors.blue}
            borderRadius={4}
            style={{
              flex: `1 1 ${100 / (columns || 1)}%`,
              maxWidth: `${100 / (columns || 1)}%`,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>Item {i + 1}</Text>
          </Box>
        ))}
      </Flex>

      <SubTitle>useResponsiveContext() / useHasResponsiveProvider()</SubTitle>
      <Box px={3} py={2} bg="#E8EAF6" borderRadius={6}>
        <CodeLine>hasResponsiveProvider = {String(hasRespProvider)}</CodeLine>
        <CodeLine>ctx.currentBreakpoint = {respCtx.currentBreakpoint}</CodeLine>
        <CodeLine>ctx.windowWidth = {respCtx.windowWidth}</CodeLine>
        <CodeLine>ctx.windowHeight = {respCtx.windowHeight}</CodeLine>
        <CodeLine>ctx.orientation = {respCtx.orientation}</CodeLine>
      </Box>
    </View>
  );
}

function ResponsiveTokensSection() {
  const bpFor800 = getBreakpointForWidth(800);
  const bpFor320 = getBreakpointForWidth(320);
  const mq1 = buildMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const mq2 = buildMediaQuery({ maxWidth: 767, orientation: 'portrait' });
  const mq3 = buildMediaQuery({ minWidth: 1200 });

  return (
    <View>
      <SectionTitle>Responsive Tokens & Utilities</SectionTitle>

      <SubTitle>DEFAULT_BREAKPOINTS</SubTitle>
      <Box px={3} py={2} bg="#F5F5F5" borderRadius={6}>
        {Object.entries(DEFAULT_BREAKPOINTS).map(([k, v]) => (
          <CodeLine key={k}>  {k}: {v}px</CodeLine>
        ))}
      </Box>

      <SubTitle>BREAKPOINT_ORDER</SubTitle>
      <Box px={3} py={2} bg="#F5F5F5" borderRadius={6}>
        <CodeLine>[{BREAKPOINT_ORDER.join(', ')}]</CodeLine>
      </Box>

      <SubTitle>getBreakpointForWidth()</SubTitle>
      <Box px={3} py={2} bg="#E3F2FD" borderRadius={6}>
        <CodeLine>getBreakpointForWidth(800) = "{bpFor800}"</CodeLine>
        <CodeLine>getBreakpointForWidth(320) = "{bpFor320}"</CodeLine>
      </Box>

      <SubTitle>buildMediaQuery() (Web CSS strings)</SubTitle>
      <Box px={3} py={2} bg="#FFF3E0" borderRadius={6}>
        <CodeLine>{"{min:768, max:1024} = "}{mq1}</CodeLine>
        <CodeLine>{"{max:767, portrait} = "}{mq2}</CodeLine>
        <CodeLine>{"{min:1200} = "}{mq3}</CodeLine>
      </Box>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. ASPECT RATIO — Component, Hooks & Utilities
   ═══════════════════════════════════════════════════════════════ */

function AspectRatioSection() {
  // useAspectRatio hook
  const { width: arW1, height: arH1 } = useAspectRatio(16 / 9, { width: 300 });
  const { width: arW2, height: arH2 } = useAspectRatio('4:3', { height: 225 });
  const { width: arW3, height: arH3 } = useAspectRatio(ASPECT_RATIOS.golden, { width: 200 });

  return (
    <View>
      <SectionTitle>Aspect Ratio</SectionTitle>

      <SubTitle>useAspectRatio() Hook</SubTitle>
      <Box px={3} py={3} bg="#E3F2FD" borderRadius={8}>
        <CodeLine>useAspectRatio(16/9, {`{width: 300}`}) =</CodeLine>
        <CodeLine>  width: {arW1}, height: {arH1}</CodeLine>
        <CodeLine>useAspectRatio('4:3', {`{height: 225}`}) =</CodeLine>
        <CodeLine>  width: {arW2}, height: {arH2}</CodeLine>
        <CodeLine>useAspectRatio(golden, {`{width: 200}`}) =</CodeLine>
        <CodeLine>  width: {arW3}, height: {arH3}</CodeLine>
      </Box>

      <SubTitle>ASPECT_RATIOS Presets (using RN View)</SubTitle>
      <Flex gap={4} wrap>
        {/* Square */}
        <View>
          <Text style={styles.subTitle}>Square (1:1)</Text>
          <View
            style={{
              width: 100,
              aspectRatio: ASPECT_RATIOS.square,
              backgroundColor: colors.red,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>1:1</Text>
          </View>
        </View>

        {/* Video 16:9 */}
        <View>
          <Text style={styles.subTitle}>Video (16:9)</Text>
          <View
            style={{
              width: 140,
              aspectRatio: ASPECT_RATIOS.video,
              backgroundColor: colors.blue,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>16:9</Text>
          </View>
        </View>

        {/* Standard 4:3 */}
        <View>
          <Text style={styles.subTitle}>Standard (4:3)</Text>
          <View
            style={{
              width: 110,
              aspectRatio: ASPECT_RATIOS.standard,
              backgroundColor: colors.green,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>4:3</Text>
          </View>
        </View>

        {/* Cinematic 21:9 */}
        <View>
          <Text style={styles.subTitle}>Cinematic (21:9)</Text>
          <View
            style={{
              width: 160,
              aspectRatio: ASPECT_RATIOS.cinematic,
              backgroundColor: colors.purple,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>21:9</Text>
          </View>
        </View>

        {/* Portrait 3:4 */}
        <View>
          <Text style={styles.subTitle}>Portrait (3:4)</Text>
          <View
            style={{
              width: 90,
              aspectRatio: ASPECT_RATIOS.portrait,
              backgroundColor: colors.orange,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>3:4</Text>
          </View>
        </View>

        {/* Golden */}
        <View>
          <Text style={styles.subTitle}>Golden (1.618)</Text>
          <View
            style={{
              width: 100,
              aspectRatio: ASPECT_RATIOS.golden,
              backgroundColor: colors.teal,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gold</Text>
          </View>
        </View>
      </Flex>
    </View>
  );
}

function AspectRatioUtilsSection() {
  const parsed1 = parseAspectRatio('16:9');
  const parsed2 = parseAspectRatio('4/3');
  const parsed3 = parseAspectRatio(1.618);
  const parsed4 = parseAspectRatio('21:9');
  const h = calculateHeight(800, 16 / 9);
  const w = calculateWidth(450, 16 / 9);

  return (
    <View>
      <SectionTitle>Aspect Ratio Utilities</SectionTitle>

      <SubTitle>ASPECT_RATIOS Presets</SubTitle>
      <Box px={3} py={2} bg="#F3E5F5" borderRadius={6}>
        <CodeLine>square = {ASPECT_RATIOS.square}</CodeLine>
        <CodeLine>video = {ASPECT_RATIOS.video}</CodeLine>
        <CodeLine>standard = {ASPECT_RATIOS.standard}</CodeLine>
        <CodeLine>cinematic = {ASPECT_RATIOS.cinematic}</CodeLine>
        <CodeLine>portrait = {ASPECT_RATIOS.portrait}</CodeLine>
        <CodeLine>golden = {ASPECT_RATIOS.golden}</CodeLine>
      </Box>

      <SubTitle>parseAspectRatio()</SubTitle>
      <Box px={3} py={2} bg="#E8EAF6" borderRadius={6}>
        <CodeLine>parseAspectRatio('16:9') = {parsed1}</CodeLine>
        <CodeLine>parseAspectRatio('4/3') = {parsed2}</CodeLine>
        <CodeLine>parseAspectRatio(1.618) = {parsed3}</CodeLine>
        <CodeLine>parseAspectRatio('21:9') = {parsed4}</CodeLine>
      </Box>

      <SubTitle>calculateHeight / calculateWidth</SubTitle>
      <Box px={3} py={2} bg="#E3F2FD" borderRadius={6}>
        <CodeLine>calculateHeight(800, 16/9) = {h}</CodeLine>
        <CodeLine>calculateWidth(450, 16/9) = {w}</CodeLine>
      </Box>

      <SubTitle>AspectRatio component (Web-only, CSS-based)</SubTitle>
      <Box px={3} py={2} bg="#FFF3E0" borderRadius={6}>
        <Text style={{ fontSize: 12, color: '#888' }}>
          &lt;AspectRatio&gt; component uses CSS aspect-ratio and is Web-only.
          On React Native, use the useAspectRatio() hook or the native aspectRatio style prop
          as demonstrated above.
        </Text>
      </Box>

      <SubTitle>useContainerAspectRatio() (Web-only, ResizeObserver)</SubTitle>
      <Box px={3} py={2} bg="#FFF8E1" borderRadius={6}>
        <Text style={{ fontSize: 12, color: '#888' }}>
          useContainerAspectRatio() uses ResizeObserver and HTMLElement - Web-only.
          Use useAspectRatio() for React Native.
        </Text>
      </Box>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. STANDALONE PROVIDERS + CONTEXT OBJECTS
   ═══════════════════════════════════════════════════════════════ */

function StandaloneProvidersSection() {
  const spacing = useSpacing();
  const hasSpacing = useHasSpacingProvider();
  const hasResp = useHasResponsiveProvider();

  return (
    <View>
      <SectionTitle>Standalone Providers</SectionTitle>
      <Desc>Using SpacingProvider(baseUnit=4) + ResponsiveProvider separately.</Desc>

      <Box px={3} py={3} bg="#E0F2F1" borderRadius={8}>
        <CodeLine>useSpacing().value(4) with baseUnit=4 = {spacing.value(4)}</CodeLine>
        <CodeLine>useSpacing().value(8) with baseUnit=4 = {spacing.value(8)}</CodeLine>
        <CodeLine>useSpacing().margin('all', 4) = {JSON.stringify(spacing.margin('all', 4))}</CodeLine>
      </Box>

      <Box mt={2} px={3} py={3} bg="#E8EAF6" borderRadius={8}>
        <CodeLine>hasSpacingProvider = {String(hasSpacing)}</CodeLine>
        <CodeLine>hasResponsiveProvider = {String(hasResp)}</CodeLine>
      </Box>
    </View>
  );
}

function ContextObjectsSection() {
  return (
    <View>
      <SectionTitle>Context Objects</SectionTitle>
      <Box px={3} py={3} bg="#ECEFF1" borderRadius={8}>
        <CodeLine>SpacingContext available: {SpacingContext ? 'Yes' : 'No'}</CodeLine>
        <CodeLine>ResponsiveContext available: {ResponsiveContext ? 'Yes' : 'No'}</CodeLine>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
          Use with React.createContext() for advanced custom provider patterns.
        </Text>
      </Box>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <Box p={5} bg={colors.card} borderRadius={12} style={styles.shadow as any}>
    {children}
  </Box>
);

export default function App() {
  return (
    <LayoutSpacingProvider spacing={{ baseUnit: 8 }} responsive={{}}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {/* Header */}
            <Box mb={6}>
              <Text style={styles.appTitle}>
                @laddhaanshul/layout-spacing
              </Text>
              <Text style={styles.appSubtitle}>
                Complete API demo — all exported items demonstrated
              </Text>
            </Box>

            {/* 1. Spacing System */}
            <Stack gap={6}>
              <SectionCard title="1a. Spacing Tokens">
                <SpacingTokensSection />
              </SectionCard>

              <SectionCard title="1b. Spacing Hooks">
                <SpacingHooksSection />
              </SectionCard>

              <SectionCard title="1c. Spacing Utilities">
                <SpacingUtilsSection />
              </SectionCard>

              {/* 2. Layout Primitives */}
              <SectionCard title="2a. Box Component">
                <BoxSection />
              </SectionCard>

              <SectionCard title="2b. Flex Component">
                <FlexSection />
              </SectionCard>

              <SectionCard title="2c. Stack Component">
                <StackSection />
              </SectionCard>

              {/* 3. Responsive */}
              <SectionCard title="3a. Responsive Hooks">
                <ResponsiveHooksSection />
              </SectionCard>

              <SectionCard title="3b. Responsive Tokens & Utilities">
                <ResponsiveTokensSection />
              </SectionCard>

              {/* 4. Aspect Ratio */}
              <SectionCard title="4a. Aspect Ratio">
                <AspectRatioSection />
              </SectionCard>

              <SectionCard title="4b. Aspect Ratio Utilities">
                <AspectRatioUtilsSection />
              </SectionCard>

              {/* 5. Standalone Providers */}
              <SectionCard title="5. Standalone Providers">
                <ResponsiveProvider
                  breakpoints={{ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1440 }}
                >
                  <SpacingProvider config={{ baseUnit: 4, useRem: false }}>
                    <StandaloneProvidersSection />
                  </SpacingProvider>
                </ResponsiveProvider>
              </SectionCard>

              {/* 6. Context Objects */}
              <SectionCard title="6. Context Objects">
                <ContextObjectsSection />
              </SectionCard>
            </Stack>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LayoutSpacingProvider>
  );
}

/* ───────────────────── Styles ───────────────────── */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 8,
  },
  codeLine: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  monoText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    android: {
      elevation: 3,
    },
  }),
});
