const ME = {
  name: "Christian Vince.",
  handle: "CVincente19",
  initials: "CV",
};

const CREATORS = {
  mira: { id: "mira", name: "Mira Chen", handle: "mira", avatar: "assets/avatars/a-mira.jpg", followers: "1.24M", followersN: 1240000, verified: true, bio: "Flags, maps, and why cities work." },
  jax: { id: "jax", name: "Jax Calder", handle: "jaxcalder", avatar: "assets/avatars/a-jax.jpg", followers: "890K", followersN: 890000, verified: true, bio: "Builds, breakdowns, and bad ideas that work." },
  lena: { id: "lena", name: "Lena Voss", handle: "lenavoss", avatar: "assets/avatars/a-lena.jpg", followers: "2.14M", followersN: 2140000, verified: true, bio: "Science, cities, late-night hangs." },
  kai: { id: "kai", name: "Kai Okonkwo", handle: "kaiok", avatar: "assets/avatars/a-kai.jpg", followers: "3.41M", followersN: 3410000, verified: true, bio: "Food and the long way around." },
  nova: { id: "nova", name: "Nova Hale", handle: "novahale", avatar: "assets/avatars/a-nova.jpg", followers: "672K", followersN: 672000, verified: false, bio: "Nights, neon, no commentary." },
  theo: { id: "theo", name: "Theo Raines", handle: "theoraines", avatar: "assets/avatars/a-theo.jpg", followers: "1.82M", followersN: 1820000, verified: true, bio: "Outdoors until the battery dies." },
  rio: { id: "rio", name: "Rio Park", handle: "riopark", avatar: "assets/avatars/a-rio.jpg", followers: "2.63M", followersN: 2630000, verified: true, bio: "Songs from one sample." },
  anya: { id: "anya", name: "Anya Reyes", handle: "anyareyes", avatar: "assets/avatars/a-anya.jpg", followers: "944K", followersN: 944000, verified: false, bio: "Stories that shouldn't work." },
  cole: { id: "cole", name: "Cole Brennan", handle: "colebrennan", avatar: "assets/avatars/a-cole.jpg", followers: "418K", followersN: 418000, verified: false, bio: "Skate, street, last possession." },
  sage: { id: "sage", name: "Sage Winters", handle: "sagewinters", avatar: "assets/avatars/a-sage.jpg", followers: "1.11M", followersN: 1110000, verified: true, bio: "Books, boards, quiet explanations." },
  yuki: { id: "yuki", name: "Yuki Mori", handle: "yukimori", avatar: "assets/avatars/a-yuki.jpg", followers: "786K", followersN: 786000, verified: false, bio: "Kitchen, no shortcuts." },
  omar: { id: "omar", name: "Omar Haddad", handle: "omarh", avatar: "assets/avatars/a-omar.jpg", followers: "2.02M", followersN: 2020000, verified: true, bio: "Hardware, orbit, night shifts." },
};

const VIDEOS = [
  { id: "v1", title: "Can I name every flag in 8 minutes?", creator: "mira", thumb: "assets/thumbs/v-talking-head.jpg", src: "assets/videos/v-talking-head.mp4", duration: "0:06", seconds: 6, views: "391K", viewsN: 391000, age: "11 hours ago", description: "Going continent by continent with no pauses and no second chances. Corrections in the replies.\n\nChapters\n0:00 Rules\n0:22 Europe\n2:40 Asia\n5:01 Africa\n6:44 The rest" },
  { id: "v2", title: "I showed my friends the wildest gadgets of 2026", creator: "jax", thumb: "assets/thumbs/v-reaction.jpg", src: null, duration: "12:08", seconds: 728, views: "184K", viewsN: 184000, age: "9 hours ago", description: "Three people, one table, zero chill. Nothing here is sponsored." },
  { id: "v3", title: "Why every city should look like this", creator: "lena", thumb: "assets/thumbs/v-shocked.jpg", src: "assets/videos/v-shocked.mp4", duration: "0:06", seconds: 6, views: "2.7M", viewsN: 2700000, age: "2 months ago", description: "Density, trams, and the boring rules that make a street feel alive." },
  { id: "v4", title: "Tokyo after midnight (no commentary)", creator: "nova", thumb: "assets/thumbs/v-city-night.jpg", src: "assets/videos/v-city-night.mp4", duration: "0:06", seconds: 6, views: "1.1M", viewsN: 1100000, age: "3 hours ago", description: "Walked until the trains started again. Shot on a pocket camera, no music bed." },
  { id: "v5", title: "This EV towed a cabin through a blizzard", creator: "jax", thumb: "assets/thumbs/v-ev-snow.jpg", src: null, duration: "14:55", seconds: 895, views: "3.5K", viewsN: 3500, age: "3 hours ago", description: "Range numbers after the storm, not the brochure." },
  { id: "v6", title: "One riff. Six layers. No computer.", creator: "rio", thumb: "assets/thumbs/v-guitar.jpg", src: null, duration: "6:22", seconds: 382, views: "476K", viewsN: 476000, age: "7 months ago", description: "Pedals only. The loop ends when the cable does." },
  { id: "v7", title: "Street food until 4am in Osaka", creator: "kai", thumb: "assets/thumbs/v-osaka-food.jpg", src: null, duration: "22:17", seconds: 1337, views: "890K", viewsN: 890000, age: "1 day ago", description: "Yakitori, takoyaki, and the stall that wouldn't take a card." },
  { id: "v8", title: "Reverse-sear is a scam (kind of)", creator: "yuki", thumb: "assets/thumbs/v-steak.jpg", src: "assets/videos/v-steak.mp4", duration: "0:06", seconds: 6, views: "612K", viewsN: 612000, age: "4 days ago", description: "When it helps, when it doesn't, and the pan method I actually use." },
  { id: "v9", title: "I let a robot dog run night security", creator: "omar", thumb: "assets/thumbs/v-robot-dog.jpg", src: null, duration: "16:05", seconds: 965, views: "1.6M", viewsN: 1600000, age: "5 days ago", description: "One warehouse. Seven nights. A lot of false positives." },
  { id: "v10", title: "11 months in this van", creator: "theo", thumb: "assets/thumbs/v-vanlife.jpg", src: null, duration: "24:18", seconds: 1458, views: "219K", viewsN: 219000, age: "1 hour ago", description: "What broke, what I'd skip, and the two things I'd buy again." },
  { id: "v11", title: "Impedance matching, finally explained", creator: "sage", thumb: "assets/thumbs/v-electronics.jpg", src: null, duration: "13:09", seconds: 789, views: "467K", viewsN: 467000, age: "2 years ago", description: "Cables, meters, and why 50 ohms keeps showing up." },
  { id: "v12", title: "Front row at a warehouse show", creator: "rio", thumb: "assets/thumbs/v-concert.jpg", src: null, duration: "8:47", seconds: 527, views: "88K", viewsN: 88000, age: "6 hours ago", description: "No setlist. Phone in a jacket. The drop at 4:12." },
  { id: "v13", title: "Last possession. No timeout.", creator: "cole", thumb: "assets/thumbs/v-basketball.jpg", src: null, duration: "9:33", seconds: 573, views: "2.1M", viewsN: 2100000, age: "3 weeks ago", description: "Gym tape from a game that shouldn't have been that close." },
  { id: "v14", title: "Monaco in the rain from the grandstand", creator: "nova", thumb: "assets/thumbs/v-f1-rain.jpg", src: null, duration: "7:51", seconds: 471, views: "540K", viewsN: 540000, age: "1 month ago", description: "Spray, barriers, and the one lap the crowd stood for." },
  { id: "v15", title: "Earth, in silence", creator: "omar", thumb: "assets/thumbs/v-earth-orbit.jpg", src: null, duration: "10:00", seconds: 600, views: "980K", viewsN: 980000, age: "2 weeks ago", description: "Ten minutes of night-side city lights. No score." },
  { id: "v16", title: "Everyone sounds like ChatGPT now", creator: "anya", thumb: "assets/thumbs/v-selfie.jpg", src: null, duration: "5:44", seconds: 344, views: "1.1M", viewsN: 1100000, age: "3 hours ago", description: "A short rant about cadence, hedges, and the death of a specific kind of sentence." },
  { id: "v17", title: "I filmed a whole commute in one take", creator: "cole", thumb: "assets/thumbs/v-car.jpg", src: null, duration: "15:12", seconds: 912, views: "73K", viewsN: 73000, age: "8 hours ago", description: "Golden hour, no cuts, radio off." },
];

const STREAMS = [
  { id: "s1", title: "Late night hang — ask me anything", creator: "lena", thumb: "assets/streams/s-justchat.jpg", src: "assets/videos/s-justchat.mp4", category: "Just Chatting", viewers: 18400, tags: ["english", "ama", "night"], startedMin: 142 },
  { id: "s2", title: "Ranked grind until diamond", creator: "jax", thumb: "assets/streams/s-fps.jpg", src: "assets/videos/s-fps.mp4", category: "Tactical Ops", viewers: 36900, tags: ["fps", "ranked", "drops"], startedMin: 211 },
  { id: "s3", title: "First look: Ember Hollow", creator: "rio", thumb: "assets/streams/s-indie.jpg", src: null, category: "Ember Hollow", viewers: 9200, tags: ["indie", "firstplay"], startedMin: 48 },
  { id: "s4", title: "IRL: lost in Shibuya rain", creator: "nova", thumb: "assets/streams/s-tokyo.jpg", src: "assets/videos/s-tokyo.mp4", category: "IRL", viewers: 22100, tags: ["irl", "tokyo", "night"], startedMin: 96 },
  { id: "s5", title: "Viewers vs me — 3–1 so far", creator: "sage", thumb: "assets/streams/s-chess.jpg", src: null, category: "Chess", viewers: 7800, tags: ["chess", "english"], startedMin: 63 },
  { id: "s6", title: "Making a song from one sample", creator: "rio", thumb: "assets/streams/s-music.jpg", src: null, category: "Music", viewers: 11300, tags: ["music", "liveprod"], startedMin: 77 },
  { id: "s7", title: "Tonkotsu from scratch, hour 9", creator: "yuki", thumb: "assets/streams/s-ramen.jpg", src: null, category: "Cooking", viewers: 15600, tags: ["cooking", "ramen"], startedMin: 540 },
  { id: "s8", title: "Coastal time trial, no cuts", creator: "cole", thumb: "assets/streams/s-racing.jpg", src: null, category: "Racing", viewers: 6400, tags: ["racing", "sim"], startedMin: 29 },
];

const CATEGORIES = [
  { id: "just-chatting", name: "Just Chatting", art: "assets/categories/c-justchat.jpg", viewers: 412000, tags: ["IRL"] },
  { id: "tactical-ops", name: "Tactical Ops", art: "assets/categories/c-fps.jpg", viewers: 288000, tags: ["FPS", "Shooter"] },
  { id: "racing", name: "Racing", art: "assets/categories/c-racing.jpg", viewers: 94000, tags: ["Driving"] },
  { id: "cooking", name: "Cooking", art: "assets/categories/c-cooking.jpg", viewers: 61000, tags: ["IRL"] },
  { id: "music", name: "Music", art: "assets/categories/c-music.jpg", viewers: 132000, tags: ["Creative"] },
  { id: "irl", name: "IRL", art: "assets/categories/c-irl.jpg", viewers: 176000, tags: ["IRL"] },
  { id: "ember-hollow", name: "Ember Hollow", art: "assets/categories/c-indie.jpg", viewers: 38000, tags: ["Indie"] },
  { id: "chess", name: "Chess", art: "assets/categories/c-strategy.jpg", viewers: 54000, tags: ["Strategy"] },
];

const VINES = [
  { id: "n1", title: "Good boy physics", creator: "theo", thumb: "assets/vines/n-dog.jpg", src: "assets/videos/n-dog.mp4", loops: "2.4M", seconds: 6, likes: 184000, replies: 2100, reposts: 22100, views: "2.4M", viewsN: 2400000, age: "6h" },
  { id: "n2", title: "First try (it wasn't)", creator: "cole", thumb: "assets/vines/n-skate.jpg", src: null, loops: "881K", seconds: 6, likes: 42000, replies: 640, reposts: 3900, views: "881K", viewsN: 881000, age: "1d" },
  { id: "n3", title: "Heart in 4 seconds", creator: "yuki", thumb: "assets/vines/n-latte.jpg", src: null, loops: "1.1M", seconds: 6, likes: 91000, replies: 880, reposts: 7400, views: "1.1M", viewsN: 1100000, age: "3h" },
  { id: "n4", title: "He knows what he did", creator: "anya", thumb: "assets/vines/n-cat.jpg", src: null, loops: "3.2M", seconds: 6, likes: 410000, replies: 5400, reposts: 88000, views: "3.2M", viewsN: 3200000, age: "12h" },
  { id: "n5", title: "Kitchen, 2am", creator: "lena", thumb: "assets/vines/n-dance.jpg", src: null, loops: "640K", seconds: 6, likes: 28000, replies: 410, reposts: 1900, views: "640K", viewsN: 640000, age: "5h" },
  { id: "n6", title: "Pick a card", creator: "jax", thumb: "assets/vines/n-magic.jpg", src: null, loops: "990K", seconds: 6, likes: 61000, replies: 990, reposts: 4400, views: "990K", viewsN: 990000, age: "8h" },
  { id: "n7", title: "Don't look down", creator: "nova", thumb: "assets/vines/n-parkour.jpg", src: null, loops: "1.8M", seconds: 6, likes: 122000, replies: 1600, reposts: 15000, views: "1.8M", viewsN: 1800000, age: "2d" },
  { id: "n8", title: "Over the river", creator: "rio", thumb: "assets/vines/n-fireworks.jpg", src: null, loops: "720K", seconds: 6, likes: 33000, replies: 270, reposts: 2100, views: "720K", viewsN: 720000, age: "4h" },
];

const SPACES = [
  { id: "sp1", title: "Tech after dark", host: "omar", speakers: ["mira", "jax", "sage"], listeners: 12840, live: true, color: "#1d9bf0", topic: "Hardware" },
  { id: "sp2", title: "Pitch decks, gently roasted", host: "anya", speakers: ["lena", "rio"], listeners: 4210, live: true, color: "#7856ff", topic: "Startups" },
  { id: "sp3", title: "Last chapter club", host: "sage", speakers: ["theo", "mira"], listeners: 1980, live: true, color: "#00ba7c", topic: "Books" },
  { id: "sp4", title: "Late night comedy greenroom", host: "lena", speakers: ["cole", "anya", "kai"], listeners: 8670, live: true, color: "#f91880", topic: "Comedy" },
  { id: "sp5", title: "F1 radio, no pictures", host: "nova", speakers: ["cole", "omar"], listeners: 5540, live: true, color: "#ff7a00", topic: "Sports" },
  { id: "sp6", title: "Kitchen questions", host: "yuki", speakers: ["kai"], listeners: 0, live: false, scheduled: "Tomorrow, 6:00 PM", color: "#e7e9ea", topic: "Food" },
  { id: "sp7", title: "Night shift hang", host: "kai", speakers: ["yuki", "cole"], listeners: 3120, live: true, color: "#1d9bf0", topic: "IRL" },
  { id: "sp8", title: "Chart review", host: "theo", speakers: ["sage", "mira"], listeners: 2740, live: true, color: "#00ba7c", topic: "Markets" },
];

const NOTES = {
  v1: "The 8:14 clock is a personal best on this account, not a verified record. Faster uncut runs are already posted.",
  v5: "Towing numbers in this video are from one storm, one route, and one charge level — not a lab rating.",
  v16: "This is commentary about writing cadence, not a claim about any specific model version or company.",
};

const COMMENTS = {
  v1: [
    { user: "jax", text: "France was a half-second late and you still counted it. Respect.", age: "2h", likes: 412, replies: 6, reposts: 2, views: "8.1K" },
    { user: "lena", text: "The Africa run is the real test and you knew it.", age: "1h", likes: 188, replies: 3, reposts: 1, views: "3.4K" },
    { user: "sage", text: "Would watch a cities-only version of this.", age: "48m", likes: 76, replies: 1, reposts: 0, views: "1.2K" },
  ],
  v3: [
    { user: "mira", text: "The tram section should be a class.", age: "3d", likes: 2204, replies: 40, reposts: 180, views: "61K" },
    { user: "omar", text: "This is the rare urbanism video that doesn't lecture.", age: "2d", likes: 801, replies: 12, reposts: 44, views: "19K" },
  ],
  v4: [
    { user: "kai", text: "That alley at 6:12 is the whole night.", age: "1h", likes: 540, replies: 9, reposts: 22, views: "11K" },
    { user: "rio", text: "No music was the right call.", age: "40m", likes: 233, replies: 4, reposts: 8, views: "4.6K" },
  ],
  n1: [
    { user: "lena", text: "Physics is undefeated.", age: "3h", likes: 890, replies: 14, reposts: 40, views: "22K" },
    { user: "kai", text: "I felt this in my knees.", age: "1h", likes: 120, replies: 2, reposts: 3, views: "2.1K" },
  ],
};

const FEED_SEED = [
  { id: "p1", type: "text", user: "omar", age: "21m", text: "My beef is with drunk and distracted drivers. Any autonomous car on the road that is safer than a human is a win.", quote: { user: "jax", age: "1h", text: "The beef between Waymo and Cybercab needs to stop.\n\nBoth are utterly amazing.\n\nWe are less than 3 years away from road deaths in America being a rounding error." }, replies: 5, reposts: 1, likes: 33, views: "2.6K" },
  { id: "p2", type: "video", user: "lena", age: "51m", text: "Erin has gone 100% FSD in her cybertruck.\nHere is everything she thinks that you need to know. She did a fair job.\nI sent her a message that she just needs to hit the accelerator at stop signs to keep moving.", video: "v3", replies: 84, reposts: 22, likes: 410, views: "48K" },
  { id: "p3", type: "text", user: "mira", age: "2h", text: "Flag quiz went up. If you beat 8:14 I will record a harder cut.", replies: 19, reposts: 6, likes: 120, views: "9.1K" },
  { id: "p4", type: "live", user: "jax", age: "now", text: "Live: ranked until diamond or until the account is in timeout.", stream: "s2", replies: 44, reposts: 18, likes: 290, views: "36K" },
  { id: "p5", type: "text", user: "kai", age: "3h", text: "Osaka rule: if the stall has a line at 1am, you wait. If it has a line at 3am, you wait longer.", replies: 11, reposts: 4, likes: 96, views: "7.4K" },
];

const NEWS = [
  { title: "Unboxed manufacturing clip hits 40M views overnight", users: ["omar", "mira"], meta: "Trending now · News · 254 posts" },
  { title: "Long waits, launch-week buzz, same three-hour photos", users: ["jax", "lena"], meta: "Trending now · News · 116 posts" },
  { title: "Who actually funds the next wave of robotics labs", users: ["sage", "omar"], meta: "Trending now · News" },
];

const TRENDS = [
  { context: "Entertainment · Trending", name: "WarehouseShow", posts: "18.2K posts" },
  { context: "Trending in United States", name: "#NightShift", posts: "9,441 posts" },
  { context: "Sports · Trending", name: "LastPossession", posts: "27.6K posts" },
];

CREATORS.me = {
  id: "me",
  name: ME.name,
  handle: ME.handle,
  avatar: null,
  initials: ME.initials,
  verified: true,
  bio: "Building the media layer.",
  followers: "12",
  followersN: 12,
};

const CHAT_POOL = [
  "Audio is clean tonight.",
  "Clip that last minute.",
  "Just got here — what did I miss?",
  "This is the run.",
  "Camera is insane.",
  "How is this free.",
  "Take a sip.",
  "That was clean.",
  "Queue the overlay.",
  "I'm learning so much.",
  "Back from the raid.",
  "One more game.",
  "Drop the POI.",
  "Chat is actually being normal.",
  "Let's go.",
  "This holds up.",
  "Don't end the stream.",
  "Need a recap in the replies.",
  "Grok should recap this live.",
  "Sending this to the group chat.",
];
