# Greylan James — SITE.md

## Project Overview
Official artist website for Greylan James, a Knoxville-raised, Nashville-based country singer-songwriter signed to Big Machine Label Group. This is a rebuild of the existing WordPress site at greylanjames.com, rebranded around his current single "Small Town." The site is a fan hub: hear the music, watch the videos, find tour dates, read his story, and sign up for updates.

## Audience
Country music fans, concertgoers, and industry/press. Mobile first. Most traffic arrives from social posts and streaming links.

## Sitemap
- Home (/)
- Music (/music)
- Videos (/videos)
- Tour (/tour)
- About (/about)
- Sign Up (/sign-up)
There is no contact page. Management and booking contact lives in the footer.

## Brand Colors
- Light Gray #BABABA, primary page background, PMS Cool Gray 3 C
- Red #B20606, accent, sub-heads, links and hover, CTAs, PMS 485 C
- Black #16140D, headlines and body copy, dark sections, header and footer, PMS Neutral Black C
Gray is the default background. Black is text and dark UI. Red is used sparingly for emphasis and interaction. No other colors. No gradients.

## Typography
- Headlines and sub-heads: Knockout HTF67 Full Bantamweight, Regular. Self-hosted, font file is in the public fonts directory. Uppercase, tight, condensed. Used for hero, section titles, and large stacked navigation type.
- Body copy: Acumin Pro Condensed, Regular.
- Headline fallback stack: "Knockout HTF67 Full Bantamweight", "Arial Narrow", sans-serif.
- Body fallback stack: "Acumin Pro Condensed", "Arial Narrow", system-ui, sans-serif.
Headlines are uppercase and condensed. Body is sentence case.

## Logo
Logo files are in the public logos directory: horizontal black, horizontal white, stacked black, stacked white. Use white logos on black backgrounds and black logos on gray backgrounds. The header uses the horizontal logo. The footer uses the stacked logo.

## Tone of Voice
Plainspoken, grounded, country. Short declarative sentences. Confident but not boastful. Warm and human in body copy, punchy and bold in headlines. No corporate or marketing hype words. No clichés. No em dashes anywhere in site copy.

## Art Direction and Visual References
Gritty rural Americana. Overcast, film grain, lived in, documentary feel. Not glossy or glamorous. Anchored to three references:
1. Vintage athletic and wood-type signage, the heritage of the Knockout typeface. Bold condensed caps, scoreboard and ticket-stub energy. The Small Town cover art features a roadside scoreboard sign; lean into that.
2. Documentary Appalachian photography. Rural Tennessee, barns, back roads, natural overcast light, film grain.
3. Newsprint and classified-ad layout. Gray paper, heavy black headlines, a single red accent. Editorial and utilitarian.
Hard edges over rounded corners. Square buttons, never pills. Large condensed type used as a graphic element.

## Key Content

### Full Bio (About page)
From the moment his Papaw gifted him his first guitar at the age of five, one of Nashville's most exciting young breakout Country stars Greylan James knew he was meant to be a musician. The Knoxville-raised artist-on-the-rise has been manifesting his vision of Country music stardom since his earliest days: from those cleats and cowboy hats he wore to school to playing every sort of live show imaginable from tailgates to patios and dive bars to funerals around his hometown. Since moving to Music City eight years ago, Greylan has become a "celebrated songwriter" (Country Now) earning cuts from some of Country music's most notable artists including Kenny Chesney, Chris Young, Cole Swindell, Darius Rucker, Chris Janson, Bailey Zimmerman, Breland and more. The singer/songwriter recently earned his first No. 1 and ACM Award for Song Of The Year co-writing Jordan Davis' smash hit "Next Thing You Know." The song also earned Greylan his first CMA Award nomination for Song Of The Year. To date, Greylan's songbook has amassed more than 650 million streams. And while Greylan has undoubtedly been incredibly successful penning hits for others in the writer's room, he's ready to strike out on his own with the recent release of his anticipated debut single "Young Man." Co-written alongside esteemed Nashville songwriters Jacob Davis and Josh Miller, and dedicated to Greylan's late grandfather, the reflective song of notching wisdom from one's elders is his most personal song yet. After joining Old Dominion and Cole Swindell on the road in 2023, Greylan has supported Scotty McCreery's CAB IN A SOLO TOUR and Adam Doleac's WRONG SIDE OF A SUNRISE TOUR in 2024.

NOTE: This bio is from the "Young Man" release cycle. It does not mention the current single "Small Town" or current tours. It is flagged for a client update before launch.

### Short Bio (Home About section)
Knoxville-raised, Nashville-based singer-songwriter Greylan James has written hits for Kenny Chesney, Chris Young, Cole Swindell, Darius Rucker and more, and earned an ACM Award for co-writing Jordan Davis' No. 1 "Next Thing You Know." Now he is stepping out front with his own music.

### Streaming and Artist Links
- Spotify: https://open.spotify.com/artist/0obiwW8UEpyliJ4xhXqrra
- Apple Music: https://music.apple.com/us/artist/greylan-james/1607407826
- Amazon Music: https://music.amazon.com/artists/B004JXBNXW/greylan-james
- YouTube: https://www.youtube.com/greylanjames

### Social Links
- Instagram: https://www.instagram.com/greylanjames/
- Facebook: https://www.facebook.com/greylanjamesmusic/
- TikTok: https://www.tiktok.com/@greylanjames
- X (Twitter): https://twitter.com/greylanjames

### Tour
Tour dates are pulled live from the Bandsintown API, artist ID 2410772, app_id umg_bigmachinelabelgroup_greylanjames, and rendered natively in Next.js. Never hardcode tour dates.

### Sign Up Form
Fields: email, phone, zip, country. Submissions go to Laylo and Mailchimp. Integration wired later.

## Placeholders Pending from Client
- Small Town smart link, the streaming destination URL, for the hero CTA and Music page
- Acumin Pro Condensed web font files or Adobe Fonts project, or an approved substitute
- Updated bio that mentions Small Town and current tours
- Cover art for "I Hope She Hears These" and "Anything Cold (Shredded Version)"

## Design Anti-Patterns to Avoid
- No pill buttons and no gradient buttons. Use hard-edged square buttons.
- No icons inside colored circles.
- No three-column service or feature card grids.
- No centered hero with a feature grid below.
- No blue or teal palettes.
- No stock photography of smiling people.
- No rounded glossy UI. Keep it raw, editorial, and high contrast.
