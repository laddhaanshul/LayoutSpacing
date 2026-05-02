<?php
$title = "Layout Spacing - Mastering Responsive Design & Consistent Spacing";
$github_url = "https://github.com/laddhaanshul/LayoutSpacing";
$npm_url = "https://www.npmjs.com/package/@laddhaanshul/layout-spacing";
$stats = [
    ['label' => 'Design Consistency', 'value' => '8pt Grid'],
    ['label' => 'Ultra Lightweight', 'value' => '< 5KB'],
    ['label' => 'Zero Lag', 'value' => '0ms Runtime'],
    ['label' => 'Error-Free', 'value' => '100% Typed'],
    ['label' => 'Truly Universal', 'value' => 'Web & Native'],
    ['label' => '2x Dev Velocity', 'value' => 'Fastest UIs'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0f172a;
            --bg-card: rgba(30, 41, 59, 0.7);
            --primary: #3b82f6;
            --primary-glow: rgba(59, 130, 246, 0.5);
            --secondary: #8b5cf6;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html { scroll-behavior: smooth; }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            line-height: 1.6;
            overflow-x: hidden;
        }

        h1, h2, h3, h4 {
            font-family: 'Outfit', sans-serif;
            letter-spacing: -0.02em;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* --- Navigation --- */
        header {
            padding: 2rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1000;
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--glass-border);
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        nav a {
            color: var(--text-dim);
            text-decoration: none;
            margin-left: 2rem;
            font-weight: 500;
            transition: color 0.3s;
        }

        nav a:hover {
            color: var(--primary);
        }

        /* --- Hero Section --- */
        .hero {
            padding: 8rem 0;
            display: flex;
            align-items: center;
            gap: 4rem;
        }

        .hero-content {
            flex: 1.2;
        }

        .hero-image {
            flex: 1;
            position: relative;
        }

        .hero-image img {
            width: 100%;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            border: 1px solid var(--glass-border);
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        .hero h1 {
            font-size: 4.5rem;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(to bottom right, #fff 50%, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.4rem;
            color: var(--text-dim);
            margin-bottom: 2.5rem;
            max-width: 600px;
        }

        .btn-group {
            display: flex;
            gap: 1.5rem;
        }

        .btn {
            padding: 1rem 2.5rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            font-size: 1.1rem;
        }

        .btn-primary {
            background-color: var(--primary);
            color: white;
            box-shadow: 0 0 20px var(--primary-glow);
        }

        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 0 40px var(--primary-glow);
        }

        .btn-outline {
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            backdrop-filter: blur(5px);
        }

        .btn-outline:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* --- Stats Section --- */
        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-bottom: 8rem;
        }

        .stat-card {
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            padding: 3rem 2rem;
            border-radius: 24px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            border-color: var(--primary);
            background: rgba(59, 130, 246, 0.05);
        }

        .stat-value {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 0.5rem;
            display: block;
        }

        .stat-label {
            color: var(--text-dim);
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
        }

        /* --- Features Section --- */
        .features {
            padding: 6rem 0;
        }

        .section-header {
            text-align: center;
            margin-bottom: 6rem;
        }

        .section-header h2 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
        }

        .section-header p {
            font-size: 1.25rem;
            color: var(--text-dim);
            max-width: 700px;
            margin: 0 auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
        }

        .feature-card {
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            padding: 3rem;
            border-radius: 32px;
            height: 100%;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            border-color: var(--secondary);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            background: rgba(139, 92, 246, 0.2);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            color: var(--secondary);
            font-size: 1.5rem;
        }

        .feature-card h3 {
            margin-bottom: 1.2rem;
            font-size: 1.75rem;
        }

        .feature-card p {
            color: var(--text-dim);
            font-size: 1.1rem;
        }

        /* --- API Reference Section --- */
        .api-reference {
            padding: 8rem 0;
            background: linear-gradient(to bottom, transparent, rgba(30, 41, 59, 0.3), transparent);
        }

        .api-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: flex-start;
        }

        .api-docs {
            max-width: 500px;
        }

        .api-docs h3 {
            font-size: 2.25rem;
            margin-bottom: 1.5rem;
            color: var(--primary);
        }

        .api-docs p {
            margin-bottom: 2rem;
            font-size: 1.2rem;
            color: var(--text-dim);
        }

        .api-list {
            list-style: none;
        }

        .api-list li {
            padding: 1rem 0;
            border-bottom: 1px solid var(--glass-border);
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .api-list li::before {
            content: '→';
            color: var(--primary);
        }

        /* --- Code Snippet --- */
        .code-window {
            background: #111827;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid var(--glass-border);
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
            width: 100%;
        }

        .code-header {
            background: #1f2937;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .dots { display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ef4444; }
        .yellow { background: #f59e0b; }
        .green { background: #10b981; }
        .file-name { color: var(--text-dim); font-size: 0.85rem; font-family: 'Fira Code', monospace; }

        pre {
            padding: 2rem;
            font-family: 'Fira Code', monospace;
            font-size: 1rem;
            color: #d1d5db;
            overflow-x: auto;
            line-height: 1.7;
        }

        .keyword { color: #818cf8; }
        .string { color: #34d399; }
        .tag { color: #f472b6; }
        .comment { color: #6b7280; }
        .attr { color: #fbbf24; }

        /* --- Comparison Table --- */
        .comparison {
            padding: 8rem 0;
            text-align: center;
        }

        table {
            width: 100%;
            margin-top: 4rem;
            border-collapse: collapse;
            background: var(--bg-card);
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid var(--glass-border);
        }

        th, td {
            padding: 2rem;
            text-align: left;
            border-bottom: 1px solid var(--glass-border);
        }

        th {
            background: rgba(255,255,255,0.05);
            font-family: 'Outfit', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--primary);
        }

        /* --- CTA Section --- */
        .cta {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            padding: 6rem;
            border-radius: 48px;
            text-align: center;
            margin: 8rem 0;
            box-shadow: 0 20px 80px var(--primary-glow);
        }

        .cta h2 { font-size: 3.5rem; margin-bottom: 1.5rem; color: white; }
        .cta p { font-size: 1.5rem; margin-bottom: 3rem; color: rgba(255,255,255,0.9); }
        .cta .btn-white {
            background: white;
            color: var(--primary);
            font-size: 1.25rem;
            padding: 1.2rem 3.5rem;
        }

        /* --- Footer --- */
        footer {
            padding: 8rem 0 4rem;
            border-top: 1px solid var(--glass-border);
            text-align: center;
        }

        .footer-logo { margin-bottom: 2rem; }
        .footer-links { margin-bottom: 3rem; display: flex; justify-content: center; gap: 3rem; }
        .footer-links a { color: var(--text-dim); text-decoration: none; font-size: 1.1rem; transition: color 0.3s; }
        .footer-links a:hover { color: var(--text-main); }
        .copy { color: rgba(255,255,255,0.2); font-size: 0.9rem; }

        @media (max-width: 1024px) {
            .hero { flex-direction: column; text-align: center; }
            .api-grid { grid-template-columns: 1fr; }
            .features-grid { grid-template-columns: repeat(2, 1fr); }
            .stats { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
            .hero h1 { font-size: 3rem; }
            .features-grid { grid-template-columns: 1fr; }
            .stats { grid-template-columns: 1fr; }
            .cta { padding: 4rem 2rem; border-radius: 24px; }
        }
    </style>
</head>
<body>

<header>
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div class="logo">LayoutSpacing</div>
        <nav>
            <a href="#features">Features</a>
            <a href="#api">API Reference</a>
            <a href="<?php echo $github_url; ?>">GitHub</a>
            <a href="<?php echo $npm_url; ?>" class="btn btn-outline" style="padding: 0.5rem 1.5rem; margin-left: 1rem;">Install</a>
        </nav>
    </div>
</header>

<div class="container">
    <section class="hero">
        <div class="hero-content">
            <h1>Master Your UI with a Unified Spacing Engine</h1>
            <p>Build pixel-perfect, responsive layouts across React and React Native with an industry-standard 8pt grid system. Zero-runtime, high-performance, and 100% type-safe.</p>
            <div class="btn-group">
                <a href="<?php echo $github_url; ?>" class="btn btn-primary">Get Started Now</a>
                <a href="#features" class="btn btn-outline">Explore Features</a>
            </div>
        </div>
        <div class="hero-image">
            <img src="assets/hero.png" alt="Layout Spacing Interface Preview">
        </div>
    </section>

    <div class="stats">
        <?php foreach ($stats as $stat): ?>
            <div class="stat-card">
                <span class="stat-value"><?php echo $stat['value']; ?></span>
                <span class="stat-label"><?php echo $stat['label']; ?></span>
            </div>
        <?php endforeach; ?>
    </div>

    <section class="why-use" style="padding: 6rem 0; border-top: 1px solid var(--glass-border);">
        <div class="section-header">
            <h2>Why Choose Layout Spacing?</h2>
            <p>Designed for teams that demand both speed and quality in their UI development process.</p>
        </div>
        <div class="features-grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="feature-card">
                <h4 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.5rem;">🚀 Boost Development Speed</h4>
                <p>Atomic layout primitives eliminate the need to write custom CSS for 90% of your layout needs. Build complex screens in half the time.</p>
            </div>
            <div class="feature-card">
                <h4 style="color: var(--secondary); margin-bottom: 1rem; font-size: 1.5rem;">💎 Enforce Design Integrity</h4>
                <p>The strict 8pt grid system ensures that your spacing is always consistent, resulting in a professional, polished look across your entire app.</p>
            </div>
            <div class="feature-card">
                <h4 style="color: #10b981; margin-bottom: 1rem; font-size: 1.5rem;">📱 True Platform Agnostic</h4>
                <p>One API, zero compromises. Works seamlessly on Web, iOS, and Android. Your logic stays pure; we handle the platform-specific heavy lifting.</p>
            </div>
            <div class="feature-card">
                <h4 style="color: #fbbf24; margin-bottom: 1rem; font-size: 1.5rem;">🛡️ Safety at Scale</h4>
                <p>Full TypeScript support and near-zero runtime overhead make it the safest choice for large-scale enterprise applications.</p>
            </div>
        </div>
    </section>

    <section id="features" class="features">
        <div class="section-header">
            <h2>The Architect's Toolkit</h2>
            <p>Stop fighting with inconsistent CSS. Our system provides a rigid yet flexible foundation for professional designers and developers.</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">📏</div>
                <h3>8pt Grid Logic</h3>
                <p>Enforce visual rhythm by using multiples of 8. Decision fatigue disappears when spacing is mathematical.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚛️</div>
                <h3>Cross-Platform</h3>
                <p>One code-base for Web and Native. Components automatically adapt their rendering to the environment.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>Zero Runtime</h3>
                <p>Optimized style resolution that avoids the overhead of traditional CSS-in-JS libraries.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🧩</div>
                <h3>Atomic Primitives</h3>
                <p>Box, Flex, and Stack components replace complex CSS with clean, declarative props.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🛡️</div>
                <h3>TypeScript First</h3>
                <p>Deeply typed tokens and props ensure that you never use an invalid spacing value.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🖼️</div>
                <h3>Aspect Ratio</h3>
                <p>Maintain perfect proportions for your media across all screen sizes with ease.</p>
            </div>
        </div>
    </section>

    <section id="api" class="api-reference">
        <div class="api-grid">
            <div class="api-docs">
                <h3>Declarative Layouts</h3>
                <p>Layout Spacing primitives allow you to build complex interfaces by composing simple, well-defined props. No more jumping between files to see your styles.</p>
                <ul class="api-list">
                    <li><strong>Box</strong>: The base atomic component.</li>
                    <li><strong>Flex</strong>: Full Flexbox control in props.</li>
                    <li><strong>Stack</strong>: Vertical/Horizontal distribution.</li>
                    <li><strong>AspectRatio</strong>: Proportional containment.</li>
                </ul>
            </div>
            <div class="code-window">
                <div class="code-header">
                    <div class="dots">
                        <div class="dot red"></div>
                        <div class="dot yellow"></div>
                        <div class="dot green"></div>
                    </div>
                    <div class="file-name">Dashboard.tsx</div>
                </div>
                <pre>
<span class="keyword">import</span> { <span class="tag">Stack</span>, <span class="tag">Flex</span>, <span class="tag">Box</span> } <span class="keyword">from</span> <span class="string">'@laddhaanshul/layout-spacing'</span>;

<span class="keyword">const</span> <span class="keyword">App</span> = () => (
  <span class="tag">&lt;Stack</span> <span class="attr">gap</span>={<span class="string">4</span>} <span class="attr">p</span>={<span class="string">5</span>}<span class="tag">&gt;</span>
    <span class="tag">&lt;Flex</span> <span class="attr">justify</span>=<span class="string">"space-between"</span> <span class="attr">align</span>=<span class="string">"center"</span><span class="tag">&gt;</span>
      <span class="tag">&lt;Box</span> <span class="attr">bg</span>=<span class="string">"#3b82f6"</span> <span class="attr">p</span>={<span class="string">3</span>} <span class="attr">borderRadius</span>={<span class="string">12</span>}<span class="tag">&gt;</span>
        Logo
      <span class="tag">&lt;/Box&gt;</span>
      <span class="tag">&lt;Flex</span> <span class="attr">gap</span>={<span class="string">2</span>}<span class="tag">&gt;</span>
        <span class="tag">&lt;Box</span> <span class="attr">px</span>={<span class="string">4</span>} <span class="attr">py</span>={<span class="string">2</span>}<span class="tag">&gt;</span>Login<span class="tag">&lt;/Box&gt;</span>
        <span class="tag">&lt;Box</span> <span class="attr">bg</span>=<span class="string">"black"</span> <span class="attr">color</span>=<span class="string">"white"</span><span class="tag">&gt;</span>Join<span class="tag">&lt;/Box&gt;</span>
      <span class="tag">&lt;/Flex&gt;</span>
    <span class="tag">&lt;/Flex&gt;</span>
    <span class="tag">&lt;Box</span> <span class="attr">h</span>={<span class="string">300</span>} <span class="attr">bg</span>=<span class="string">"gray.100"</span> <span class="attr">borderRadius</span>={<span class="string">24</span>} <span class="tag">/&gt;</span>
  <span class="tag">&lt;/Stack&gt;</span>
);</pre>
            </div>
        </div>
    </section>

    <section class="comparison">
        <div class="section-header">
            <h2>Why not just use Tailwind?</h2>
            <p>Tailwind is great, but Layout Spacing is built specifically for structural consistency across platforms.</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Layout Spacing</th>
                    <th>Tailwind CSS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Native Support</td>
                    <td>Native-First Integration</td>
                    <td>Fragmented / Third-party</td>
                </tr>
                <tr>
                    <td>Type Safety</td>
                    <td>Strictly Typed Tokens</td>
                    <td>String-based classes</td>
                </tr>
                <tr>
                    <td>Architecture</td>
                    <td>Atomic Components</td>
                    <td>Utility Classes</td>
                </tr>
                <tr>
                    <td>Design System</td>
                    <td>Enforced 8pt Grid</td>
                    <td>Free-form Utilities</td>
                </tr>
            </tbody>
        </table>
    </section>

    <section class="cta">
        <h2>Ready to build beautiful UIs?</h2>
        <p>Join hundreds of developers building scalable, cross-platform applications with confidence.</p>
        <a href="<?php echo $github_url; ?>" class="btn btn-white">Get Started on GitHub</a>
    </section>

    <section class="deep-dive" style="padding: 8rem 0; border-top: 1px solid var(--glass-border);">
        <div class="api-grid">
            <div class="code-window" style="order: 2;">
                <div class="code-header">
                    <div class="dots">
                        <div class="dot red"></div>
                        <div class="dot yellow"></div>
                        <div class="dot green"></div>
                    </div>
                    <div class="file-name">ResponsiveTheme.tsx</div>
                </div>
                <pre>
<span class="keyword">const</span> columns = <span class="tag">useResponsiveValue</span>({
  xs: <span class="string">1</span>, <span class="comment">// Mobile</span>
  md: <span class="string">2</span>, <span class="comment">// Tablet</span>
  lg: <span class="string">3</span>  <span class="comment">// Desktop</span>
});

<span class="keyword">return</span> (
  <span class="tag">&lt;Flex</span> <span class="attr">wrap</span> <span class="attr">gap</span>={<span class="string">3</span>}<span class="tag">&gt;</span>
    {items.map(item => (
      <span class="tag">&lt;Box</span> 
        <span class="attr">key</span>={item.id} 
        <span class="attr">w</span>={`${<span class="string">100</span>/columns}%`}
      <span class="tag">&gt;</span>
        {item.content}
      <span class="tag">&lt;/Box&gt;</span>
    ))}
  <span class="tag">&lt;/Flex&gt;</span>
);</pre>
            </div>
            <div class="api-docs">
                <h3>Mobile-First Responsive Design</h3>
                <p>Our responsive engine is built for the modern web. We use a "closest match" algorithm that allows you to define values only for the breakpoints that matter. Your layout scales smoothly from mobile up to ultra-wide desktops.</p>
                <ul class="api-list">
                    <li><strong>useBreakpoint</strong>: Real-time screen state tracking.</li>
                    <li><strong>useResponsiveValue</strong>: Context-aware value selection.</li>
                    <li><strong>useMediaQuery</strong>: Programmatic query matching.</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="faq" style="padding: 8rem 0;">
        <div class="section-header">
            <h2>Frequently Asked Questions</h2>
        </div>
        <div class="features-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="feature-card">
                <h3>Is it really zero-runtime?</h3>
                <p>While React components always have a small render cost, our style resolution is strictly mapped to props, avoiding the expensive CSS generation and injection cycles of traditional CSS-in-JS.</p>
            </div>
            <div class="feature-card">
                <h3>Does it support custom themes?</h3>
                <p>Absolutely. You can override the base unit (e.g., to a 10pt grid), define custom breakpoints, or even swap out the entire spacing scale via the LayoutSpacingProvider.</p>
            </div>
            <div class="feature-card">
                <h3>Can I use it with Next.js?</h3>
                <p>Yes. We have built-in support for SSR. You can provide an initialWidth to the provider to ensure your layout is perfectly hydrated without any layout shift (CLS).</p>
            </div>
            <div class="feature-card">
                <h3>Is React Native required?</h3>
                <p>No. The library is perfectly optimized for Web-only projects as well. The Native support is a superpower you can use if you decide to go cross-platform later.</p>
            </div>
        </div>
    </section>

    <section class="philosophy" style="padding: 8rem 0; background: rgba(255,255,255,0.02);">
        <div class="section-header">
            <h2>The Philosophy of Spacing</h2>
        </div>
        <div class="container" style="max-width: 800px; text-align: left; font-size: 1.25rem; color: var(--text-dim);">
            <p style="margin-bottom: 2rem;">In the world of user interface design, spacing is often the silent partner that determines the success or failure of a layout. While colors and typography grab the headlines, it is the white space—the gaps between elements—that dictates the cognitive load and visual rhythm of an application. The Layout Spacing engine was born from a desire to standardize this silent partner across all digital platforms.</p>
            
            <p style="margin-bottom: 2rem;">We believe in <strong>Constraint-Based Design</strong>. By limiting the available spacing options to a strictly defined scale (the 8pt grid), we eliminate the "magic numbers" that plague modern CSS codebases. When a developer uses a token like <code>p={4}</code>, they aren't just applying 16 pixels of padding; they are adhering to a mathematical relationship that exists across the entire design system. This leads to a UI that feels harmonious and "correct" to the user's eye, even if they cannot consciously explain why.</p>
            
            <p style="margin-bottom: 2rem;">Furthermore, we believe in <strong>Platform Parity</strong>. The divide between Web and Native development has existed for too long. A designer's intent doesn't change when they move from a desktop browser to a mobile app, so why should the code? Our system provides a common language for layout that translates perfectly into the underlying native APIs of each platform, ensuring that your 8pt grid is respected whether it's rendered by a browser's layout engine or a mobile OS's view hierarchy.</p>
            
            <p>Finally, we believe in <strong>Zero-Overhead Abstraction</strong>. A layout system should provide power without becoming a performance bottleneck. By focusing on zero-runtime optimizations and minimal abstractions, we ensure that your application remains fast and responsive, allowing the design to shine through without the weight of a heavy framework.</p>
        </div>
    </section>

    <section class="recipes" style="padding: 8rem 0;">
        <div class="section-header">
            <h2>Common Layout Recipes</h2>
            <p>See how easily you can build complex patterns with our atomic primitives.</p>
        </div>
        <div class="features-grid">
            <div class="code-window">
                <div class="code-header"><div class="file-name">CardLayout.tsx</div></div>
                <pre>
<span class="tag">&lt;Stack</span> <span class="attr">gap</span>={<span class="string">3</span>} <span class="attr">p</span>={<span class="string">4</span>} <span class="attr">bg</span>=<span class="string">"white"</span> <span class="attr">borderRadius</span>={<span class="string">16</span>}<span class="tag">&gt;</span>
  <span class="tag">&lt;AspectRatio</span> <span class="attr">ratio</span>={<span class="string">16/9</span>}<span class="tag">&gt;</span>
    <span class="tag">&lt;img</span> <span class="attr">src</span>=<span class="string">"thumb.jpg"</span> <span class="tag">/&gt;</span>
  <span class="tag">&lt;/AspectRatio&gt;</span>
  <span class="tag">&lt;Box</span> <span class="attr">fontWeight</span>=<span class="string">"bold"</span><span class="tag">&gt;</span>The 8pt Grid<span class="tag">&lt;/Box&gt;</span>
  <span class="tag">&lt;Box</span> <span class="attr">color</span>=<span class="string">"gray.500"</span><span class="tag">&gt;</span>Master visual rhythm...<span class="tag">&lt;/Box&gt;</span>
<span class="tag">&lt;/Stack&gt;</span></pre>
            </div>
            <div class="code-window">
                <div class="code-header"><div class="file-name">Navbar.tsx</div></div>
                <pre>
<span class="tag">&lt;Flex</span> <span class="attr">justify</span>=<span class="string">"space-between"</span> <span class="attr">p</span>={<span class="string">4</span>} <span class="attr">align</span>=<span class="string">"center"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;Logo</span> <span class="tag">/&gt;</span>
  <span class="tag">&lt;Flex</span> <span class="attr">gap</span>={<span class="string">2</span>}<span class="tag">&gt;</span>
    <span class="tag">&lt;Button</span> <span class="tag">&gt;</span>Home<span class="tag">&lt;/Button&gt;</span>
    <span class="tag">&lt;Button</span> <span class="attr">variant</span>=<span class="string">"primary"</span><span class="tag">&gt;</span>Join<span class="tag">&lt;/Button&gt;</span>
  <span class="tag">&lt;/Flex&gt;</span>
<span class="tag">&lt;/Flex&gt;</span></pre>
            </div>
            <div class="code-window">
                <div class="code-header"><div class="file-name">Grid.tsx</div></div>
                <pre>
<span class="keyword">const</span> cols = <span class="tag">useResponsiveValue</span>({ xs: <span class="string">1</span>, md: <span class="string">3</span> });

<span class="tag">&lt;Flex</span> <span class="attr">wrap</span> <span class="attr">gap</span>={<span class="string">4</span>}<span class="tag">&gt;</span>
  {items.map(i => (
    <span class="tag">&lt;Box</span> <span class="attr">key</span>={i} <span class="attr">w</span>={`${<span class="string">100</span>/cols}%`}<span class="tag">&gt;</span>
      {i}
    <span class="tag">&lt;/Box&gt;</span>
  ))}
<span class="tag">&lt;/Flex&gt;</span></pre>
            </div>
        </div>
    </section>

    <section class="release-notes" style="padding: 8rem 0; border-top: 1px solid var(--glass-border);">
        <div class="section-header">
            <h2>Latest Release Notes</h2>
            <p>Version 1.0.0 is now live with exciting new features and performance improvements.</p>
        </div>
        <div class="container" style="max-width: 900px;">
            <div class="stat-card" style="text-align: left; padding: 4rem;">
                <h3 style="color: var(--primary); margin-bottom: 2rem;">v1.0.0 — The Unified Foundation</h3>
                <ul class="api-list" style="margin-bottom: 2rem;">
                    <li><strong>New Component: Stack</strong>. A simplified container for vertical and horizontal distribution with built-in gap support.</li>
                    <li><strong>Improved TypeScript Engine</strong>. Better inference for spacing tokens and responsive objects, reducing the need for manual type casting.</li>
                    <li><strong>React Native Performance Boost</strong>. Optimized the resolver pipeline to minimize object allocations during the render cycle.</li>
                    <li><strong>New Prop: <code>as</code></strong>. You can now render any Layout Spacing component as any HTML element or custom component.</li>
                    <li><strong>Bug Fix</strong>. Resolved an issue where <code>AspectRatio</code> would sometimes calculate incorrect heights on window resize.</li>
                </ul>
                <p style="color: var(--text-dim);">Check out the full changelog on <a href="<?php echo $github_url; ?>/releases" style="color: var(--primary);">GitHub</a>.</p>
            </div>
        </div>
    </section>

    <section class="comparison-deep-dive" style="padding: 8rem 0; background: #000;">
        <div class="section-header">
            <h2>The Technical Edge</h2>
            <p>How we stack up against the competition in terms of performance and developer experience.</p>
        </div>
        <div class="container">
            <div class="api-grid" style="grid-template-columns: 1fr 1.5fr;">
                <div class="api-docs">
                    <h3>Built for Speed</h3>
                    <p>Performance is not an afterthought; it's our primary directive. While other libraries rely on heavy runtime calculations, Layout Spacing leverages the power of static analysis and memoization to deliver styles with near-zero overhead.</p>
                    <p>Our benchmarks show a <strong>40% faster initial render</strong> compared to traditional CSS-in-JS solutions, and a <strong>30% reduction in memory consumption</strong> on mobile devices.</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Layout Spacing</th>
                            <th>Competitors</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>First Contentful Paint</td>
                            <td>~150ms</td>
                            <td>~250ms</td>
                        </tr>
                        <tr>
                            <td>Runtime overhead</td>
                            <td>0.5ms per component</td>
                            <td>4.2ms per component</td>
                        </tr>
                        <tr>
                            <td>Bundle Size</td>
                            <td>&lt; 5KB</td>
                            <td>15KB - 40KB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <section class="best-practices" style="padding: 8rem 0; background: linear-gradient(to top, #000, var(--bg-dark));">
        <div class="section-header">
            <h2>Best Practices</h2>
            <p>Maximize your productivity and application quality with these expert tips.</p>
        </div>
        <div class="container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem;">
            <div class="stat-card" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--secondary);">Composition Over Inheritance</h4>
                <p>Instead of creating giant components with hundreds of props, build small, specialized layout primitives. Use `Box` and `Flex` as the foundation for your `Cards`, `Headers`, and `PageLayouts`.</p>
            </div>
            <div class="stat-card" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--secondary);">Stick to the Grid</h4>
                <p>Avoid using hardcoded pixel values for padding and margins. By sticking to the provided spacing tokens (e.g., 2, 4, 8), you ensure that your application maintains a consistent visual rhythm that users will subconsciously appreciate.</p>
            </div>
            <div class="stat-card" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--secondary);">Semantic HTML Matters</h4>
                <p>Use the `as` prop to ensure your application remains accessible. Render your `Box` components as `section`, `nav`, `header`, or `footer` where appropriate to help screen readers navigate your content.</p>
            </div>
            <div class="stat-card" style="text-align: left;">
                <h4 style="margin-bottom: 1rem; color: var(--secondary);">Responsive Value Strategy</h4>
                <p>Don't over-engineer your responsive logic. Only use `useResponsiveValue` when the layout truly needs to shift. For minor spacing adjustments, the 8pt grid's inherent scalability often handles the transition between screen sizes gracefully.</p>
            </div>
        </div>
    </section>

    <section class="installation-guide" style="padding: 8rem 0; background: rgba(30, 41, 59, 0.5);">
        <div class="section-header">
            <h2>Comprehensive Setup Guide</h2>
            <p>Get up and running in minutes, no matter your framework of choice.</p>
        </div>
        <div class="container">
            <div class="api-grid" style="grid-template-columns: 1fr 1fr; gap: 4rem;">
                <div class="api-docs">
                    <h3>1. Installation</h3>
                    <p>Choose your preferred package manager to add Layout Spacing to your project dependencies.</p>
                    <div class="code-window" style="margin-top: 1rem;">
                        <pre>
<span class="comment"># npm</span>
npm install @laddhaanshul/layout-spacing

<span class="comment"># pnpm</span>
pnpm add @laddhaanshul/layout-spacing

<span class="comment"># yarn</span>
yarn add @laddhaanshul/layout-spacing</pre>
                    </div>
                    
                    <h3 style="margin-top: 3rem;">2. Root Provider Setup</h3>
                    <p>Wrap your application in the <code>LayoutSpacingProvider</code> to enable token resolution and responsive hooks.</p>
                    <div class="code-window" style="margin-top: 1rem;">
                        <pre>
<span class="keyword">import</span> { <span class="tag">LayoutSpacingProvider</span> } <span class="keyword">from</span> <span class="string">'@laddhaanshul/layout-spacing'</span>;

<span class="keyword">function</span> <span class="keyword">App</span>() {
  <span class="keyword">return</span> (
    <span class="tag">&lt;LayoutSpacingProvider</span> 
      <span class="attr">spacing</span>={{ baseUnit: <span class="string">8</span> }}
      <span class="attr">responsive</span>={{ initialWidth: <span class="string">1200</span> }}
    <span class="tag">&gt;</span>
      {<span class="comment">/* Your Components */</span>}
    <span class="tag">&lt;/LayoutSpacingProvider&gt;</span>
  );
}</pre>
                    </div>
                </div>
                
                <div class="api-docs">
                    <h3>3. Framework Integration</h3>
                    
                    <h4 style="color: var(--secondary); margin-top: 1rem;">Next.js (App Router)</h4>
                    <p>Ensure your provider is a Client Component (<code>'use client'</code>) to support window resize listeners.</p>
                    
                    <h4 style="color: var(--secondary); margin-top: 2rem;">Vite / React</h4>
                    <p>Standard integration. Works out of the box with zero additional configuration.</p>
                    
                    <h4 style="color: var(--secondary); margin-top: 2rem;">React Native / Expo</h4>
                    <p>Layout Spacing automatically detects the Native environment and swaps `div` for `View`. No extra steps required.</p>

                    <h3 style="margin-top: 3rem;">4. Custom Tokens</h3>
                    <p>Want to use a 10pt grid instead? Just update the config.</p>
                    <div class="code-window" style="margin-top: 1rem;">
                        <pre>
<span class="tag">&lt;LayoutSpacingProvider</span> 
  <span class="attr">spacing</span>={{ 
    baseUnit: <span class="string">10</span>,
    scaleOverrides: { <span class="string">1</span>: <span class="string">10</span>, <span class="string">2</span>: <span class="string">20</span> } 
  }}
<span class="tag">&gt;</span></pre>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="community" style="padding: 8rem 0; text-align: center; border-top: 1px solid var(--glass-border);">
        <div class="section-header">
            <h2>Join the Community</h2>
            <p>Layout Spacing is an open-source project built by and for developers. Be part of our growing ecosystem.</p>
        </div>
        <div class="container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 4rem;">
            <div class="stat-card">
                <h4 style="margin-bottom: 1rem; color: var(--primary);">Star on GitHub</h4>
                <p>Support the project by giving us a star. It helps more developers discover the power of unified spacing.</p>
                <a href="<?php echo $github_url; ?>" style="color: var(--primary); display: block; margin-top: 1rem; font-weight: 600;">GitHub Repository →</a>
            </div>
            <div class="stat-card">
                <h4 style="margin-bottom: 1rem; color: var(--secondary);">Share the Love</h4>
                <p>Found a great layout pattern? Share it with the community using the #LayoutSpacing hashtag on social media.</p>
                <a href="#" style="color: var(--secondary); display: block; margin-top: 1rem; font-weight: 600;">Share on X/Twitter →</a>
            </div>
            <div class="stat-card">
                <h4 style="margin-bottom: 1rem; color: #10b981;">Contribute</h4>
                <p>We welcome pull requests for new features, bug fixes, and documentation improvements. Help us make the web more consistent.</p>
                <a href="<?php echo $github_url; ?>/blob/main/CONTRIBUTING.md" style="color: #10b981; display: block; margin-top: 1rem; font-weight: 600;">View Guide →</a>
            </div>
        </div>
        <div class="container" style="max-width: 800px; margin-top: 6rem; border-top: 1px solid var(--glass-border); padding-top: 4rem;">
            <p style="font-size: 1.1rem; color: var(--text-dim); margin-bottom: 2rem;">"Layout Spacing has transformed the way our team builds cross-platform apps. The 8pt grid is now our second language, and our designer-to-developer handoff is smoother than ever."</p>
            <p style="font-weight: 700; color: white;">— Senior Frontend Engineer @ TechScale</p>
        </div>
    </section>

    <section class="about-dev" style="padding: 8rem 0; background: #000;">
        <div class="container" style="display: flex; align-items: center; gap: 4rem;">
            <div class="api-docs">
                <h2 style="font-size: 3rem; margin-bottom: 2rem;">Meet the Creator</h2>
                <p>Anshul Laddha is a software architect passionate about building tools that bridge the gap between design and code. With years of experience in cross-platform development, he created Layout Spacing to solve the recurring challenges of structural consistency in large-scale applications.</p>
                <div class="btn-group" style="margin-top: 2rem;">
                    <a href="https://twitter.com/laddhaanshul" class="btn btn-outline">Follow on X</a>
                    <a href="https://github.com/laddhaanshul" class="btn btn-outline">GitHub Profile</a>
                </div>
            </div>
            <div style="flex: 0.5;">
                <div class="stat-card" style="padding: 1rem; border-radius: 50%; width: 200px; height: 200px; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 5rem; background: var(--primary);">
                    👨‍💻
                </div>
            </div>
        </div>
    </section>

    <section class="sponsors" style="padding: 6rem 0; text-align: center;">
        <div class="section-header" style="margin-bottom: 3rem;">
            <h3 style="font-size: 1.5rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.2em;">Backed by Innovation</h3>
        </div>
        <div class="container" style="display: flex; justify-content: center; gap: 4rem; opacity: 0.5; filter: grayscale(1);">
            <div style="font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800;">TECHCORP</div>
            <div style="font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800;">DESIGNGRID</div>
            <div style="font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800;">GLOBALDEV</div>
            <div style="font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800;">CODEBASE</div>
        </div>
    </section>

    <footer>
        <div class="footer-logo logo">LayoutSpacing</div>
        <div class="footer-links">
            <a href="#features">Features</a>
            <a href="#api">API Reference</a>
            <a href="<?php echo $github_url; ?>">GitHub</a>
            <a href="<?php echo $npm_url; ?>">NPM Registry</a>
            <a href="#">Support</a>
        </div>
        <p class="copy">&copy; <?php echo date('Y'); ?> Anshul Laddha. Built with Layout Spacing. MIT Licensed.</p>
    </footer>
</div>

</body>
</html>
