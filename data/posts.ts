import type { Post } from './types'

export const POSTS: Post[] = [
  {
    id: 1,
    slug: 'top-10-moisturizers-oily-skin',
    category: 'Skincare',
    title: 'Top 10 Moisturizers for Oily Skin Under ₹500',
    excerpt:
      'Think moisturizer is your enemy? Think again. These lightweight, non-comedogenic picks will change your oily skin game forever.',
    readTime: '6 min',
    date: 'Apr 28, 2026',
    featured: true,
    color: '#e8d8e8',
    tags: ['oily skin', 'moisturizer', 'budget'],
    relatedProducts: ['p1', 'p3', 'p4'],
    body: [
      {
        heading: 'Why Most People Get This Wrong',
        content:
          "If you've been told to skip moisturizer because your skin is oily — that's the worst advice in skincare history. Oily skin is often dehydrated skin, desperately compensating by producing more sebum. The fix? A lightweight, non-comedogenic moisturizer that hydrates without clogging pores.",
      },
      {
        heading: 'What to Look For on the Label',
        content:
          "Look for: hyaluronic acid (draws moisture without grease), niacinamide (controls oil + brightens), gel or water-based formulas, and the words 'non-comedogenic' and 'oil-free'. Avoid: heavy butters, coconut oil, or anything that sits like a film on your skin.",
      },
      {
        heading: 'My Honest Verdict',
        content:
          'I tested these over three months across different Indian seasons — peak summer heat, monsoon humidity, and dry winter air. These picks are ranked by: effectiveness, price, texture, and how well they layer under sunscreen and makeup.',
      },
      {
        heading: 'The Bottom Line',
        content:
          "The best moisturizer is one you'll actually use every day. Start with a gel formula under ₹400, add SPF on top, and your skin will be transformed within 3–4 weeks. Consistency beats expensive ingredients every time.",
      },
    ],
  },
  {
    id: 2,
    slug: 'niacinamide-vs-vitamin-c',
    category: 'Skincare',
    title: 'Niacinamide vs Vitamin C: Which Does Your Skin Actually Need?',
    excerpt:
      "The ultimate guide to two of skincare's most overhyped ingredients — and why the answer might surprise you.",
    readTime: '8 min',
    date: 'Apr 22, 2026',
    featured: true,
    color: '#d5e8f0',
    tags: ['niacinamide', 'vitamin c', 'serums'],
    relatedProducts: ['p1', 'p9'],
    body: [
      {
        heading: 'The Instagram Ingredient War',
        content:
          "Walk into any skincare aisle and you'll see niacinamide and Vitamin C competing for shelf space. Both promise brighter, clearer, more even-toned skin. But they work very differently — and for most people, one is significantly more important than the other.",
      },
      {
        heading: 'Niacinamide: The Steady Workhorse',
        content:
          'Niacinamide (Vitamin B3) is one of the most versatile skincare ingredients. It regulates sebum, fades hyperpigmentation, strengthens the skin barrier, and calms inflammation — all without irritation. It works at any percentage from 2% to 10% and pairs well with almost everything.',
      },
      {
        heading: 'Vitamin C: The Brightening Star',
        content:
          'L-ascorbic acid (the active form of Vitamin C) is a powerful antioxidant that neutralises free radicals and actively brightens skin. But it\'s also unstable, irritating at high percentages, and tricky to formulate. Many affordable "Vitamin C" products use derivatives that are gentler but less proven.',
      },
      {
        heading: 'My Verdict',
        content:
          'Start with niacinamide — it does more, costs less, and is harder to mess up. Once your skin barrier is healthy and you want to tackle pigmentation more aggressively, layer in a stable Vitamin C serum in the morning. Never use high-percentage versions of both at the same time.',
      },
    ],
  },
  {
    id: 3,
    slug: '5-minute-morning-skincare',
    category: 'Skincare',
    title: '5-Minute Morning Skincare Routine for Busy Girls',
    excerpt:
      'No 12-step routines. Just five targeted steps that give you glowing skin before your chai gets cold.',
    readTime: '4 min',
    date: 'Apr 15, 2026',
    featured: false,
    color: '#f8ecd0',
    tags: ['morning routine', 'quick', 'glow'],
    relatedProducts: ['p2', 'p3', 'p7'],
    body: [
      {
        heading: 'The 5-Step Rule',
        content:
          'Your morning routine only needs to do three things: cleanse, protect, and hydrate. Everything else is optional. Here\'s my stripped-back routine that takes under 5 minutes and leaves skin genuinely glowing.',
      },
      {
        heading: 'Step 1: Gentle Cleanser (60 seconds)',
        content:
          'Skip the morning cleanse if your skin is dry or normal — just rinse with cold water. For oily skin, use a gentle gel or foam cleanser. Massage for 45 seconds, rinse thoroughly.',
      },
      {
        heading: 'Step 2: Niacinamide Serum (30 seconds)',
        content:
          '2–3 drops of a niacinamide serum while skin is still slightly damp. Pat in, don\'t rub. This single step handles oil control, pore size, and uneven tone.',
      },
      {
        heading: 'Step 3: Moisturiser + SPF (90 seconds)',
        content:
          'Use a moisturiser with SPF 30+ or layer a gel moisturiser then a chemical sunscreen. This is non-negotiable — the biggest cause of premature ageing and hyperpigmentation in India is unprotected sun exposure.',
      },
    ],
  },
  {
    id: 4,
    slug: 'best-drugstore-foundations-india',
    category: 'Makeup',
    title: 'Best Drugstore Foundations in India for Every Skin Type',
    excerpt:
      'Full coverage, sweat-proof, under ₹800 — yes, they exist. My honest ranking after testing 12 foundations.',
    readTime: '7 min',
    date: 'Apr 10, 2026',
    featured: true,
    color: '#f0dcd0',
    tags: ['foundation', 'drugstore', 'makeup'],
    relatedProducts: ['p5', 'p6', 'p8'],
    body: [
      {
        heading: 'The Foundation Problem in India',
        content:
          "Most foundation reviews online are written for pale skin tones and cool climates. Indian skin tones and Indian weather (read: extreme heat and humidity) require completely different formulas. Here's what actually works.",
      },
      {
        heading: 'What I Tested',
        content:
          'I tested 12 drugstore foundations over 8 weeks — in temperatures ranging from 28°C to 42°C, with and without primer, in AC and non-AC environments. I photographed my skin at 2-hour intervals to track longevity.',
      },
      {
        heading: 'The Winner: Maybelline Fit Me Matte+Poreless',
        content:
          'At ₹399, the Fit Me Matte+Poreless is genuinely the best drugstore foundation available in India. It controls oil for 6+ hours, doesn\'t oxidise, and the shade range includes deep Indian tones that many brands ignore.',
      },
      {
        heading: 'Application Tips',
        content:
          'Always apply with a damp beauty sponge in a stippling motion — never rub. Set with a translucent powder on the T-zone. Avoid cream-to-powder formulas in Indian humidity — they cake badly by noon.',
      },
    ],
  },
  {
    id: 5,
    slug: 'diy-face-masks-acne',
    category: 'DIY',
    title: '3 DIY Face Masks That Actually Calm Angry Acne Breakouts',
    excerpt:
      'Kitchen ingredients that dermatologists actually approve of — cheap, effective, and gentle for sensitive skin.',
    readTime: '5 min',
    date: 'Apr 5, 2026',
    featured: false,
    color: '#d5e8d5',
    tags: ['DIY', 'acne', 'face mask'],
    relatedProducts: ['p11'],
    body: [
      {
        heading: 'The DIY Warning',
        content:
          'Most DIY skincare advice online is garbage — and some of it is actively harmful (lemon juice, baking soda, toothpaste). The three masks below use ingredients with actual evidence behind them, at concentrations that won\'t strip your skin barrier.',
      },
      {
        heading: 'Mask 1: Multani Mitti + Rose Water',
        content:
          'Fuller\'s earth (multani mitti) absorbs excess sebum and reduces inflammation. Mix 2 tbsp with enough rose water to form a paste. Apply to breakout-prone areas for 10 minutes, rinse with cold water. Use max twice a week — overuse dries skin out.',
      },
      {
        heading: 'Mask 2: Raw Honey + Cinnamon',
        content:
          'Raw honey has genuine antimicrobial properties. A small amount of cinnamon adds a mild exfoliant and anti-inflammatory effect. Mix 1 tsp honey with a pinch of cinnamon. Leave 10 minutes. Do not use if you have a cinnamon allergy.',
      },
      {
        heading: 'Mask 3: Oat + Curd',
        content:
          'Ground oats are a clinically-supported skin soother — the FDA recognises colloidal oatmeal as a skin protectant. Curd adds lactic acid for gentle exfoliation. Mix equal parts, apply 15 minutes, rinse gently. Great for post-breakout redness.',
      },
    ],
  },
  {
    id: 6,
    slug: 'gut-skin-connection',
    category: 'Wellness',
    title: 'The Gut-Skin Connection: Why Your Diet Is Breaking You Out',
    excerpt:
      "Your skin is a window into your gut health. Here's what research actually says — and what to eat instead.",
    readTime: '9 min',
    date: 'Mar 30, 2026',
    featured: false,
    color: '#e8e0d0',
    tags: ['wellness', 'gut health', 'diet'],
    relatedProducts: ['p10'],
    body: [
      {
        heading: 'The Gut-Skin Axis',
        content:
          'Research published in the last decade has firmly established the gut-skin axis — a two-way communication channel between your digestive system and your skin. When your gut microbiome is disrupted, inflammation increases throughout the body, and the skin is often the first place it shows up.',
      },
      {
        heading: 'Foods That Trigger Breakouts (For Most People)',
        content:
          'High-glycaemic foods (maida, white rice, sugar) spike insulin, which triggers androgen production and increases sebum. Dairy — particularly skimmed milk — has been consistently linked to acne in clinical studies, possibly due to IGF-1 and whey protein content.',
      },
      {
        heading: 'Foods That Help',
        content:
          'Fermented foods (dahi, kanji, idli) support microbiome diversity. Omega-3 rich foods (flaxseed, walnuts, fatty fish) reduce systemic inflammation. Green leafy vegetables provide folate and antioxidants that support skin cell turnover.',
      },
      {
        heading: 'The Practical Approach',
        content:
          'You don\'t need to eliminate everything. Try removing one potential trigger for 4 weeks and photograph your skin weekly. This elimination-and-reintroduction method is the most reliable way to identify your personal dietary triggers.',
      },
    ],
  },
  {
    id: 7,
    slug: 'sunscreen-review-india-2026',
    category: 'Reviews',
    title: 'I Tested 8 Indian Sunscreens So You Don\'t Have To',
    excerpt:
      "White cast, greasy finish, or actual SPF? The truth about India's most popular sunscreens right now.",
    readTime: '10 min',
    date: 'Mar 25, 2026',
    featured: false,
    color: '#f0f0d8',
    tags: ['sunscreen', 'SPF', 'review'],
    relatedProducts: ['p7', 'p3'],
    body: [
      {
        heading: 'Why Indian Sunscreen Reviews Matter',
        content:
          'Most SPF testing is done in labs at 25°C. Indian summers regularly hit 40°C+ with 70–90% humidity. A sunscreen that works beautifully in a Korean spring might turn into a white, greasy mess in a Delhi summer. This review tests for Indian conditions specifically.',
      },
      {
        heading: 'My Testing Criteria',
        content:
          'I scored each sunscreen on: white cast (on medium-deep Indian skin tone), finish after 2 hours of sweat/humidity, ease of application under makeup, and value for money. I applied on the back of my hand and wore each product for a full day.',
      },
      {
        heading: 'The Clear Winner',
        content:
          'Lotus Herbals Safe Sun UV Screen Gel SPF 50 PA+++ remains the best budget sunscreen in India. Completely no white cast, lightweight gel that disappears into skin, holds up in 40°C heat, and at ₹299 it\'s cheaper than most competitors.',
      },
      {
        heading: 'The Disappointing Ones',
        content:
          'Three premium-priced sunscreens in this test performed worse than the ₹299 Lotus — heavy texture, white cast on deep skin tones, or pilling under makeup. Expensive does not mean effective, especially in Indian conditions.',
      },
    ],
  },
  {
    id: 8,
    slug: 'self-care-sunday-routine',
    category: 'Lifestyle',
    title: 'My Self-Care Sunday: A Real, No-Filter Look at My Weekly Reset',
    excerpt:
      'No curated shelfies. Just an honest breakdown of how I spend Sundays recharging my skin, mind, and energy.',
    readTime: '5 min',
    date: 'Mar 20, 2026',
    featured: false,
    color: '#f0e8d8',
    tags: ['self care', 'lifestyle', 'routine'],
    relatedProducts: ['p12', 'p10'],
    body: [
      {
        heading: '8 AM: Start with water, not your phone',
        content:
          'I keep a large glass of water on my bedside table. Before I look at my phone, I drink the whole glass. It sounds small but after 3 years of doing this, it\'s the single habit I\'d keep if I had to drop everything else.',
      },
      {
        heading: '9 AM: The long cleanse',
        content:
          'Sunday is the one day I do a double cleanse even in the morning — oil cleanser first to remove the previous night\'s products, then a gentle foam wash. Followed by a sheet mask while I make chai.',
      },
      {
        heading: '11 AM: Scalp and hair treatment',
        content:
          'Warm coconut oil with a few drops of rosemary essential oil, massaged into my scalp for 10 minutes. Leave for an hour minimum. This is the best thing I\'ve done for hair growth — consistent Sunday oil treatments for 8 months.',
      },
      {
        heading: 'Evening: Wind-down routine',
        content:
          'No screens after 9 PM on Sundays. The Soundarya cream goes on after toner, serum, and a face massage with gua sha. I\'ve been doing a 5-minute gua sha routine for 6 months and the jaw definition improvement is very real.',
      },
    ],
  },
  {
    id: 9,
    slug: 'everyday-10-minute-makeup-routine',
    category: 'Makeup',
    title: 'My Everyday 10-Minute Makeup Routine (With Budget Products)',
    excerpt:
      'The exact products and order I use every single morning for fresh, put-together skin — nothing over ₹600.',
    readTime: '6 min',
    date: 'Mar 15, 2026',
    featured: true,
    color: '#e8d8f0',
    tags: ['everyday makeup', 'routine', 'budget'],
    relatedProducts: ['p5', 'p6', 'p8'],
    body: [
      {
        heading: 'The 10-Minute Rule',
        content:
          'If a makeup routine takes more than 10 minutes on a regular workday, you won\'t stick to it. This is my actual daily routine — not a "simplified" version I made up for this post. I\'ve been doing it for 14 months.',
      },
      {
        heading: 'Step 1: Skin prep (2 minutes)',
        content:
          'Moisturiser + SPF already applied from skincare. Wait 2 minutes for it to fully absorb before applying anything else. This prevents pilling — the number one cause of patchy foundation.',
      },
      {
        heading: 'Step 2: Primer + Foundation (4 minutes)',
        content:
          'Lakme Blur Primer on T-zone only, blend out. Then Maybelline Fit Me with a damp beauty blender — 3 dots on each cheek, forehead, and chin. Stipple, don\'t rub. Build coverage only where needed.',
      },
      {
        heading: 'Step 3: Brows, Lip Liner, Mascara (4 minutes)',
        content:
          'Fill brows with a micro-pencil — this takes 60 seconds once you\'ve practiced. Sugar lip liner slightly overdrawn, top with a clear gloss. Two coats of mascara, wiggling at the root. Done. The whole thing is under ₹1,500 total.',
      },
    ],
  },
  {
    id: 10,
    slug: 'how-i-got-rid-of-hormonal-acne',
    category: 'Skincare',
    title: 'How I Finally Got Rid of Hormonal Acne (After 4 Years)',
    excerpt:
      "It wasn't a fancy serum. It was a combination of small, consistent changes that I wish someone had told me sooner.",
    readTime: '11 min',
    date: 'Mar 8, 2026',
    featured: false,
    color: '#f8ecd0',
    tags: ['acne', 'hormonal', 'skincare journey'],
    relatedProducts: ['p1', 'p2', 'p4'],
    body: [
      {
        heading: 'Four Years of Trial and Error',
        content:
          'I tried everything: benzoyl peroxide, salicylic acid, chemical peels, an ayurvedic cleanse, cutting dairy, cutting sugar, meditation. Some things helped a little. Nothing worked completely — until I stopped treating my skin as the problem and started treating my body as the system.',
      },
      {
        heading: 'The Hormonal Acne Pattern',
        content:
          'Hormonal acne is characterised by deep, cystic breakouts along the jawline, chin, and lower cheeks. It flares predictably around your cycle, doesn\'t respond well to topical treatments alone, and is often accompanied by other hormonal symptoms.',
      },
      {
        heading: 'What Actually Worked',
        content:
          'Three things in combination: (1) spearmint tea twice daily — clinical evidence shows it reduces androgens in women with PCOS. (2) Niacinamide serum consistently for 6+ weeks. (3) Removing whey protein supplements from my diet. The combination of all three cleared 80% of my acne within 10 weeks.',
      },
      {
        heading: 'The Honest Caveat',
        content:
          'I am not a dermatologist. If your acne is severe, please see one — some hormonal acne requires medication like spironolactone or oral contraceptives to manage effectively. Topical products alone often aren\'t enough, and there\'s no shame in getting medical help.',
      },
    ],
  },
]
