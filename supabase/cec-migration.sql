-- ============================================================
-- CEC (Creating Empowered Clients) Integration Migration
-- 17 templates across 9 triggers, talking points, meeting
-- invites, and 23 program-day resources.
--
-- Run this in the Supabase SQL editor.
-- It is idempotent: deletes old rows in each table first.
-- ============================================================

BEGIN;

-- ===========================================
-- 1. TOUCHPOINT TRIGGERS  (9 day-based + existing attention triggers stay)
-- ===========================================
-- Remove old day-based/milestone triggers (keep attention-based ones)
DELETE FROM touchpoint_talking_points
WHERE trigger_id IN (
  SELECT id FROM touchpoint_triggers WHERE phase IN ('critical','week_1','milestone','week_2','week_3','week_4','ongoing')
);
DELETE FROM touchpoint_meeting_invites
WHERE trigger_id IN (
  SELECT id FROM touchpoint_triggers WHERE phase IN ('critical','week_1','milestone','week_2','week_3','week_4','ongoing')
);
DELETE FROM touchpoint_templates
WHERE trigger_id IN (
  SELECT id FROM touchpoint_triggers WHERE phase IN ('critical','week_1','milestone','week_2','week_3','week_4','ongoing')
);
DELETE FROM touchpoint_triggers
WHERE phase IN ('critical','week_1','milestone','week_2','week_3','week_4','ongoing');

-- Insert CEC triggers
INSERT INTO touchpoint_triggers (id, trigger_key, trigger_label, phase, action_type, emoji, day_start, day_end, sort_order, is_active) VALUES
  (gen_random_uuid(), 'cec_critical',      'Critical Phase (Days 1-3)',       'critical',  'text', '🔥', 1,  3,  10, true),
  (gen_random_uuid(), 'cec_week1',         'Week 1 (Days 4-6)',              'week_1',    'text', '💪', 4,  6,  20, true),
  (gen_random_uuid(), 'cec_week1_complete','Week 1 Complete! 🎉',            'milestone', 'call', '🎉', 7,  7,  30, true),
  (gen_random_uuid(), 'cec_week2',         'Week 2 Mid-Week Touchpoint',     'week_2',    'text', '💛', 8,  13, 40, true),
  (gen_random_uuid(), 'cec_two_weeks',     '2 Weeks! ⭐',                    'milestone', 'call', '⭐', 14, 14, 50, true),
  (gen_random_uuid(), 'cec_week3',         'Week 3 — Owning Results',        'week_3',    'text', '🌟', 15, 20, 60, true),
  (gen_random_uuid(), 'cec_21_days',       '21 Days — Habit Formed! 💎',     'milestone', 'call', '💎', 21, 21, 70, true),
  (gen_random_uuid(), 'cec_week4',         'Week 4 — R/Y/G Launch',          'week_4',    'text', '🚀', 22, 29, 80, true),
  (gen_random_uuid(), 'cec_one_month',     'ONE MONTH! 👑',                  'milestone', 'call', '👑', 30, 30, 90, true),
  (gen_random_uuid(), 'cec_ongoing',       'Ongoing R/Y/G Support',          'ongoing',   'text', '🔄', 31, NULL, 100, true);


-- ===========================================
-- 2. TOUCHPOINT TEMPLATES  (17 CEC text/script templates)
-- ===========================================

-- Critical Phase — Day 1 Foundation
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Day 1 — Foundation Day',
       E'🌅 DAY 1 — FOUNDATION DAY\nHELLO Day 1!! 🎉\nWelcome to your reset — and take a breath. This works when it''s simple. No perfection. No pressure. No overthinking. Just consistency.\n\nHere''s your only focus today: Your 5 Fat-Burn Anchors\n1️⃣ Choose 5 fuelings + keep backups nearby (purse, car, desk = success strategy 😅)\n2️⃣ Hydrate like it matters (64–100 oz water) + aim for 7 hours sleep\n3️⃣ Eat within 30 min of waking → then every 2–3 hours\n4️⃣ Follow the plan precisely — if it''s not in the guide, it''s not in your mouth\n5️⃣ Track it. Awareness creates results.\n\n🔥 Fat burn loves structure.\n🔥 Simplicity = consistency.\n🔥 Consistency = transformation.\n\nToday is about establishing rhythm, not chasing results.\n📸 Please weigh in today (smart scale data is gold), take pics + measurements. This is your baseline.\n\nText me what''s for dinner tonight 💚 We''re building momentum from Day 1.',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_critical';

-- Critical Phase — Day 2 Transition
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Day 2 — Transition Day',
       E'🌤 DAY 2 — TRANSITION DAY\nHELLO Day 2!! 🤍\nYour body is shifting gears — and that''s a good thing.\nYou''re moving from sugar-burning → fat-burning.\n\nIf you feel:\n• tired • foggy • a little hungry • headache-ish • low energy\nThat''s not failure — it''s metabolic adaptation.\n\nSupport tools:\n🥒 Dill pickle or celery\n🍵 Chicken broth\n💧 Sugar-free electrolytes (up to 3/day)\n🚰 Extra water\n\nWhen insulin drops, your body releases water + minerals — replacing them keeps fat burn smooth and comfortable. This phase passes quickly — and what follows is:\n⚡ energy 😴 better sleep 🔥 fat loss 🧠 mental clarity 🍽 less hunger\n\nSmall mindset task today: Create a non-food reward list for every 10 lbs lost (new clothes, massage, trip, gym shoes, facial, nails, etc.) Send it to me 💛\n\nSuccess is built with structure + support — and you''re not doing this alone.\n📸 Send me your Day 1 tracker when you can.',
       false, 2
FROM touchpoint_triggers WHERE trigger_key = 'cec_critical';

-- Critical Phase — Day 3 Ignition
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Day 3 — Ignition Day',
       E'🌱 DAY 3 — IGNITION DAY\nHELLO Day 3!! ✨\nYou''re approaching fat-burn ignition 🔥\nThis is where the magic starts happening internally — even if the scale hasn''t caught up yet.\n\nFocus today:\n• Weigh + measure your Lean & Green\n• Eat every 2–3 hours\n• Stay hydrated\n• Track everything\n• No improvising — structure creates results\n\nThis isn''t a diet — it''s metabolic retraining.\n\n📸 Snap your tracker + send it to me — I want to coach you, not just cheer you on 💪',
       false, 3
FROM touchpoint_triggers WHERE trigger_key = 'cec_critical';

-- Week 1 (Days 4-6) — Day 4 Fat Burn
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Day 4 — Fat Burn Day',
       E'🔥 DAY 4 — FAT BURN DAY\nHELLO Day 4!! 🔥\nYou should officially be entering fat-burning mode today.\nIf hunger pops up:\n🚰 Drink water ⏱ Wait 15 minutes\n\nMost of the time it passes — it''s habit hunger, not true hunger.\n\nWhat starts happening now:\n✔ More energy ✔ Better sleep ✔ Reduced cravings ✔ Clearer thinking ✔ Fat loss momentum ✔ Appetite regulation\n\nThis is where people start saying: "I don''t feel obsessed with food anymore."\nAnd that''s metabolic freedom.\n\n💬 Reflection question: Who in your life would benefit from feeling this way too?\n\n📸 Send me your updated tracker. Let''s lock in this fat-burn phase strong.',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_week1';

-- Week 1 Complete (Day 7/8) — Celebration Text
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Week 1 Celebration Text',
       E'🥳 DAY 8 — CELEBRATION + COMMUNITY POST COACHING\nHELLO Day 8!! 🎉\nYou did it — Week ONE complete. And that matters more than the scale number.\n\nFirst — send me:\n📊 Your Week 1 scale results\n📈 Your smart scale snapshot\n💬 What you''re already noticing\n\nNow let''s celebrate properly — and anchor this win 💛\n\n✨ Client Page Celebration Post\nHere''s a simple template:\n"Week 1 done 🎉 I started this for fat loss, but what I''m noticing already is:\n• (example: more energy)\n• (example: better sleep)\n• (example: less cravings)\n\nI didn''t think I could stick to something this structured — but I did. Grateful for coaching, support, and a plan that actually feels sustainable."\n\nWeek 1 = water weight + inflammation drop\nWeeks 2+ = true fat loss phase 🔥\n\nSo proud of you. We''re just getting started 💛',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_week1_complete';

-- Week 2 — Mid-Week Touchpoint
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Mid-Week Touchpoint',
       E'Choose at least 1:\n• Send a 30–60 second voice text check in\n• Share a simple Lean & Green idea\n• Send a reminder about client mindset calls\n• Quick Call to Celebrate something specific\n\n💡 Ideas:\n• Coffee with Clients or Let''s Talk reminder\n• Mindset video/podcast\n• Community win spotlight\n• Pounds Down Jar reminder\n• Simple Lean & Green recipes\n• Protein, hydration, or travel tips',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_week2';

-- 2 Weeks — Progress Check Text
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Day 14/15 Progress Check',
       E'Hey {firstName}! 💛 Two weeks in — I am so proud of you! Let''s connect this week for a quick progress check. I want to hear:\n• How you''re feeling overall\n• What''s working well\n• Any challenges I can help with\n\nWe''ll also make sure your premier order is dialed in for Month 2. Let me know what time works!',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_two_weeks';

-- Week 3 — Owning Results
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Week 3 — Owning Results',
       E'Hey {firstName}! 🌟 Week 3 — you''re OWNING this! By now your body is adapting and you should be noticing real changes. Keep trusting the process.\n\nReminder: check your premier order and update it if needed before it ships!\n👉 https://answers.optavia.com/help/s/article/Edit-Your-Premier-Items\n\nKeep crushing it 💪',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_week3';

-- Week 3 — Premier Order Reminder
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Premier Order Update Reminder',
       E'Quick reminder {firstName}! 📦\n\nYour premier order ships soon — make sure it has everything you want for the next month.\n\nHere''s how to update:\n👉 https://answers.optavia.com/help/s/article/Edit-Your-Premier-Items\n\nLet me know if you need help choosing new fuelings or want to try something different!',
       false, 2
FROM touchpoint_triggers WHERE trigger_key = 'cec_week3';

-- 21 Days — Graduation / R/Y/G Introduction
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Graduation — R/Y/G Introduction',
       E'Hey {firstName} 💛\nI am so proud of you…you have officially graduated to our next level of support! 🎉\n\nWe use a simple Red • Yellow • Green system\nThese are not labels, but signals to help us support you in the best way possible.\n\n👉 Starting now, when you check in on Monday mornings, please send:\n• Your smart scale full report (if you have one)\n• AND the color that best describes your week.\n\n🟢 Green — things are flowing\n🟡 Yellow — a small adjustment is needed\n🔴 Red — you need extra support\n\n🔥 Coach Office Hours are live, open-support Zoom calls.\n👉 If you''re Yellow or Red, we strongly encourage you to attend that week.\nEven Green clients are welcome!\n\n⬇️ Please watch this short video + save these graphics ⬇️',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_21_days';

-- 21 Days — After-Call follow-up
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Post-Graduation Resources',
       E'Great call today {firstName}! Here are the resources I mentioned:\n\n📹 How to Use Office Hours: https://youtu.be/phRN32R_pHc\n\n🟢🟡🔴 Remember:\nMonday = Renpho report + Your color\nIf Yellow/Red → attend Office Hours that week\n\nYou''ve built an incredible foundation over 21 days. Now we maintain and build on it! 💪',
       false, 2
FROM touchpoint_triggers WHERE trigger_key = 'cec_21_days';

-- Week 4 — R/Y/G Monday Check-in
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'R/Y/G Monday Check-in',
       E'Happy Monday! 💛\nAs you check in today, please send:\n• Your smart scale full report\n• Your color for the week 🟢🟡🔴\n\n🟢 Green — things are flowing\n🟡 Yellow — small adjustment needed\n🔴 Red — extra support needed\n\nUsing support early keeps things moving — we''ve got you! 💪✨',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_week4';

-- Week 4 — GREEN response
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       '🟢 GREEN Response',
       E'Love seeing GREEN 💚\nThat tells me things are flowing!!! Great job staying consistent. Keep doing what you''re doing and let''s keep the momentum going this week. I''ll be cheering you on!',
       false, 2
FROM touchpoint_triggers WHERE trigger_key = 'cec_week4';

-- Week 4 — YELLOW response
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       '🟡 YELLOW Response',
       E'Thanks for checking in and choosing YELLOW 💛\nThat''s a great signal to make a small tweak before frustration builds. Coach Office Hours will be the best next step for clarity this week. Bring your questions and we''ll get you dialed in. I''ve got you!',
       false, 3
FROM touchpoint_triggers WHERE trigger_key = 'cec_week4';

-- Week 4 — RED response
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       '🔴 RED Response',
       E'Thank you for being honest and choosing RED ❤️\nThis is just a signal… it tells us it''s time to lean into support. Please plan to attend Coach Office Hours this week. When is a good time for you and I to do a quick Systems Check call so we can reset and move forward together.',
       false, 4
FROM touchpoint_triggers WHERE trigger_key = 'cec_week4';

-- Week 4 — Coaching Invitation (gentle)
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Coaching Opportunity Invitation',
       E'Hey {firstName} 💛 Quick question — as you''ve been on this journey, has anyone reached out asking what you''re doing? People tend to notice the change before the scale catches up. 😊\n\nIf you''ve ever thought about helping others the way I''ve been helping you, I''d love to share how that works. No pressure at all — just planting a seed. 🌱',
       false, 5
FROM touchpoint_triggers WHERE trigger_key = 'cec_week4';

-- ONE MONTH — Celebration Text
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'One Month Celebration',
       E'🎉 ONE MONTH {firstName}!! 👑\n\nI am so incredibly proud of you. 30 days of commitment, consistency, and courage.\n\nLet''s celebrate:\n📊 Send me your Month 1 totals (weight, measurements, non-scale wins)\n💬 What''s the biggest thing that surprised you this month?\n\nYou''ve built a foundation that most people only talk about. Now Month 2 is about refinement and results.\n\nLet''s connect this week to set your next 30-day targets! 💪',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_one_month';

-- Ongoing — R/Y/G Monday
INSERT INTO touchpoint_templates (id, trigger_id, title, message, is_default, sort_order)
SELECT gen_random_uuid(),
       id,
       'Ongoing R/Y/G Monday',
       E'Happy Monday! 💛\nAs you check in today, please send:\n• Your smart scale full report\n• Your color for the week 🟢🟡🔴\n\n🟢 Green — things are flowing\n🟡 Yellow — small adjustment needed\n🔴 Red — extra support needed\n\nUsing support early keeps things moving — we''ve got you! 💪✨',
       true, 1
FROM touchpoint_triggers WHERE trigger_key = 'cec_ongoing';


-- ===========================================
-- 3. MEETING INVITES (for call-type triggers)
-- ===========================================

-- Week 1 Complete celebration call
INSERT INTO touchpoint_meeting_invites (id, trigger_id, subject, body)
SELECT gen_random_uuid(),
       id,
       '{firstName}''s Week 1 Celebration Call 🎉',
       E'Hi {firstName}!\n\nCongratulations on completing Week 1! I''d love to connect to:\n✅ Review your Week 1 results\n✅ Celebrate your wins\n✅ Plan for Week 2 success\n\nThis is a quick 15-20 minute call. Looking forward to hearing how you''re feeling!\n\n— {coachName}'
FROM touchpoint_triggers WHERE trigger_key = 'cec_week1_complete';

-- 2 Weeks progress check call
INSERT INTO touchpoint_meeting_invites (id, trigger_id, subject, body)
SELECT gen_random_uuid(),
       id,
       '{firstName}''s 2-Week Progress Check ⭐',
       E'Hi {firstName}!\n\nYou''re two weeks in — amazing! Let''s connect to:\n✅ Celebrate your progress\n✅ Troubleshoot any challenges\n✅ Confirm your premier order\n✅ Preview Week 3\n\nQuick 15-20 minute check-in. You''re doing great!\n\n— {coachName}'
FROM touchpoint_triggers WHERE trigger_key = 'cec_two_weeks';

-- 21 Days graduation call
INSERT INTO touchpoint_meeting_invites (id, trigger_id, subject, body)
SELECT gen_random_uuid(),
       id,
       '{firstName}''s 21-Day Graduation Call 💎',
       E'Hi {firstName}!\n\n21 days — you''ve officially formed a new habit! 🎉\n\nIn this call we''ll:\n✅ Celebrate 21 days of consistency\n✅ Introduce the R/Y/G support system\n✅ Walk through Coach Office Hours\n✅ Set up your Monday check-in routine\n\nThis is a big milestone — I''m so proud of you!\n\n— {coachName}'
FROM touchpoint_triggers WHERE trigger_key = 'cec_21_days';

-- ONE MONTH call
INSERT INTO touchpoint_meeting_invites (id, trigger_id, subject, body)
SELECT gen_random_uuid(),
       id,
       '{firstName}''s One Month Celebration 👑',
       E'Hi {firstName}!\n\nONE MONTH! This is huge! 🎉\n\nLet''s connect to:\n✅ Review your full Month 1 results\n✅ Celebrate your transformation\n✅ Confirm R/Y/G and Office Hours are working\n✅ Set Month 2 goals\n✅ Talk about what''s next\n\nSo proud of everything you''ve accomplished!\n\n— {coachName}'
FROM touchpoint_triggers WHERE trigger_key = 'cec_one_month';


-- ===========================================
-- 4. TALKING POINTS (for call-type triggers)
-- ===========================================

-- Days 1-4 Check-In Call Points (attached to critical phase)
INSERT INTO touchpoint_talking_points (id, trigger_id, point, sort_order)
SELECT gen_random_uuid(), id,
       unnest(ARRAY[
         'What time did you wake up?',
         'What time did you eat for the first time?',
         'Do you drink coffee? Do you put anything in your coffee?',
         'How many ounces of water have you had today?',
         'Did you set your timers / use the eat wise app? How far apart?',
         'Did you go past 3 hours at any time without eating? How many fuelings have you had?',
         'What did you have for your lean and green meal? How many ounces of protein?',
         'How many servings of vegetables? Did you measure/weigh them?',
         'What time are you planning to go to bed? When is your last fueling?',
         'Did you eat anything outside of the program today?',
         'Any extra activity in your day?',
         '⚠️ Do NOT provide answers — coach through discovery.'
       ]),
       generate_series(1, 12)
FROM touchpoint_triggers WHERE trigger_key = 'cec_critical';

-- Week 1 Complete — Day 8 Celebration Call Points
INSERT INTO touchpoint_talking_points (id, trigger_id, point, sort_order)
SELECT gen_random_uuid(), id,
       unnest(ARRAY[
         'Review Week 1 scale results + smart scale snapshot',
         'Discuss what they''re noticing (energy, sleep, hunger, mood, cravings)',
         'Help write Client Page Celebration Post',
         'Remind: Week 1 = water/inflammation drop; Weeks 2+ = true fat loss',
         'Schedule Week 3 Check-In Call',
         'Remind: send weight + L&G picture daily'
       ]),
       generate_series(1, 6)
FROM touchpoint_triggers WHERE trigger_key = 'cec_week1_complete';

-- 2 Weeks — Day 14/15 Progress Check Points
INSERT INTO touchpoint_talking_points (id, trigger_id, point, sort_order)
SELECT gen_random_uuid(), id,
       unnest(ARRAY[
         'Celebrate wins and progress — what non-scale victories have they noticed?',
         'Troubleshoot issues (hunger, energy, scale plateau, consistency)',
         'Check compliance (fuelings, hydration, timing, L&G portions)',
         'Confirm premier order is updated for Month 2',
         'Preview Week 3 expectations — what changes and what stays the same'
       ]),
       generate_series(1, 5)
FROM touchpoint_triggers WHERE trigger_key = 'cec_two_weeks';

-- 21 Days — Graduation Call Points
INSERT INTO touchpoint_talking_points (id, trigger_id, point, sort_order)
SELECT gen_random_uuid(), id,
       unnest(ARRAY[
         'Celebrate 21 days — habit formed! Acknowledge their commitment.',
         'Explain R/Y/G system: Green = flowing, Yellow = small adjustment, Red = needs support',
         'Walk through Office Hours schedule (e.g., Mon 10am, Tue 12:30pm, Wed 8pm EST)',
         'Explain Monday check-in format: Renpho report + Color for the week',
         'Invite to VIP call',
         'Help post Week 3 win on PERSONAL social media page',
         'Schedule Week 4 call',
         'AFTER CALL: Send R/Y/G text + Office Hours video + graphics'
       ]),
       generate_series(1, 8)
FROM touchpoint_triggers WHERE trigger_key = 'cec_21_days';

-- ONE MONTH — Day 30 Call Points
INSERT INTO touchpoint_talking_points (id, trigger_id, point, sort_order)
SELECT gen_random_uuid(), id,
       unnest(ARRAY[
         'Celebrate ONE MONTH! Review total results (weight, measurements, non-scale wins)',
         'Review total transformation: before/after photos, mindset shift, lifestyle changes',
         'Confirm R/Y/G system is working — are Monday check-ins happening consistently?',
         'Review Office Hours attendance — have they attended? What was helpful?',
         'Gently introduce coaching opportunity: "Has anyone asked what you''re doing?"',
         'Set Month 2 expectations: same structure, deeper results, more autonomy'
       ]),
       generate_series(1, 6)
FROM touchpoint_triggers WHERE trigger_key = 'cec_one_month';


-- ===========================================
-- 5. EXTERNAL RESOURCES (CEC program-day resources)
-- ===========================================
-- Clear existing CEC-tagged resources
DELETE FROM external_resources WHERE category = 'cec_resource';

-- Day 0-1 Resources
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Journey Kickoff Video', 'Watch this 20-minute video to understand YOUR path to fat burn.', 'https://vimeo.com/1158234614/d128997deb', 'Watch Video', 'cec_resource',
 '{"type":"video","tags":["cec","kickoff"],"show_in":["client_tracker"],"relevant_days":[0,1]}', 10, true, false, 'client_day_0_or_1', '🎬'),

(gen_random_uuid(), '5&1 Daily Tracker', 'Printable daily tracker for the 5 & 1 Plan.', 'SUPABASE_BUCKET/5-and-1-daily-tracker.png', 'View Tracker', 'cec_resource',
 '{"type":"graphic","tags":["cec","tracker"],"show_in":["client_tracker"],"relevant_days":[0,1]}', 20, true, false, 'client_day_0_or_1', '📋'),

(gen_random_uuid(), 'Lean and Green Video', 'Everything you need to know about the Lean & Green meal.', 'https://vimeo.com/414057972', 'Watch Video', 'cec_resource',
 '{"type":"video","tags":["cec","nutrition"],"show_in":["client_tracker"],"relevant_days":[0,1]}', 30, true, false, 'client_day_0_or_1', '🥗');

-- Day 1 Resources
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Day 1 Foundation Graphic', 'Send this motivational graphic on Day 1.', 'SUPABASE_BUCKET/day-1-foundation-day.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","daily"],"show_in":["client_tracker"],"relevant_days":[1]}', 40, true, false, 'client_day_1', '🖼'),

(gen_random_uuid(), 'What is Fat Burn Video', 'Help your client understand the science behind fat burn.', 'https://vimeo.com/1044531642/fde0ddc92e', 'Watch Video', 'cec_resource',
 '{"type":"video","tags":["cec","science"],"show_in":["client_tracker"],"relevant_days":[1]}', 50, true, false, 'client_day_1', '🔥');

-- Day 2
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Day 2 Transition Graphic', 'Send this graphic on Day 2 — Transition Day.', 'SUPABASE_BUCKET/day-2-transition-day.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","daily"],"show_in":["client_tracker"],"relevant_days":[2]}', 60, true, false, 'client_day_2', '🖼');

-- Day 3
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Day 3 Ignition Graphic', 'Send this graphic on Day 3 — Ignition Day.', 'SUPABASE_BUCKET/day-3-ignition-day.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","daily"],"show_in":["client_tracker"],"relevant_days":[3]}', 70, true, false, 'client_day_3', '🖼'),

(gen_random_uuid(), 'Chasing Goals Video', 'Shift your mindset — chase goals, not taste.', 'https://vimeo.com/723522647', 'Watch Video', 'cec_resource',
 '{"type":"video","tags":["cec","mindset"],"show_in":["client_tracker"],"relevant_days":[3]}', 80, true, false, 'client_day_3', '🎯');

-- Day 4
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Day 4 Fat Burn Graphic', 'Send this graphic on Day 4 — Fat Burn Day.', 'SUPABASE_BUCKET/day-4-fat-burn-day.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","daily"],"show_in":["client_tracker"],"relevant_days":[4]}', 90, true, false, 'client_day_4', '🖼'),

(gen_random_uuid(), 'How to Protect Your Fat Burn', 'Send AFTER the Day 4 check-in call.', 'https://vimeo.com/1163428641', 'Watch Video', 'cec_resource',
 '{"type":"video","tags":["cec","education"],"show_in":["client_tracker"],"relevant_days":[4]}', 100, true, false, 'client_day_4', '🛡');

-- Days 1-4 Shared Check-In Questions (shown as a resource)
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Days 1-4 Check-In Questions', 'Daily check-in questions to coach through discovery (do NOT provide answers).', '#checkin-questions', 'View Questions', 'cec_resource',
 '{"type":"guide","tags":["cec","checkin"],"show_in":["client_tracker"],"relevant_days":[1,2,3,4]}', 35, true, false, 'client_day_1_to_4', '📞');

-- Day 8 Celebration
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Day 8 Celebration Graphic', 'Week 1 Celebration + Community Post graphic.', 'SUPABASE_BUCKET/day-8-celebration-community.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","celebration"],"show_in":["client_tracker"],"relevant_days":[7,8]}', 110, true, false, 'client_day_8', '🥳');

-- Days 15-20 Premier Order
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Update Your Premier Order', 'Help your client update their premier order before it ships.', 'https://answers.optavia.com/help/s/article/Edit-Your-Premier-Items', 'View Guide', 'cec_resource',
 '{"type":"link","tags":["cec","order"],"show_in":["client_tracker"],"relevant_days":[15,16,17,18,19,20]}', 120, true, false, 'client_day_15_to_20', '📦');

-- Day 20-21 R/Y/G Resources
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Office Hours Video', 'How to Use Coach Office Hours — send after graduation call.', 'https://youtu.be/phRN32R_pHc', 'Watch Video', 'cec_resource',
 '{"type":"video","tags":["cec","office_hours"],"show_in":["client_tracker"],"relevant_days":[20,21]}', 130, true, false, 'client_day_21', '🎬'),

(gen_random_uuid(), 'Office Hours Graphic', 'Weekly Office Hours schedule graphic to save.', 'SUPABASE_BUCKET/office-hours-graphic.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","office_hours"],"show_in":["client_tracker"],"relevant_days":[20,21]}', 140, true, false, 'client_day_21', '🖼'),

(gen_random_uuid(), 'Client R/Y/G Support Graphic', 'Red/Yellow/Green system guide for client.', 'SUPABASE_BUCKET/client-ryg-support-graphic.png', 'View Graphic', 'cec_resource',
 '{"type":"graphic","tags":["cec","ryg"],"show_in":["client_tracker"],"relevant_days":[20,21,22]}', 150, true, false, 'client_day_21', '🚦');

-- Day 28+ Ongoing Support
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition, icon) VALUES
(gen_random_uuid(), 'Escalation Guide', 'When to escalate beyond R/Y/G — recognize when a client needs more.', '#escalation-guide', 'View Guide', 'cec_resource',
 '{"type":"guide","tags":["cec","escalation"],"show_in":["client_tracker"],"relevant_days":[28,29,30]}', 160, true, false, 'client_day_28_plus', '🆘'),

(gen_random_uuid(), 'Ongoing Support Model', 'Month 2+ support rhythm: Monday R/Y/G, Mid-Week Touchpoint, Office Hours.', '#ongoing-support', 'View Guide', 'cec_resource',
 '{"type":"guide","tags":["cec","ongoing"],"show_in":["client_tracker"],"relevant_days":[28,29,30]}', 170, true, false, 'client_day_28_plus', '🔄');

COMMIT;

-- ============================================================
-- DONE! Verify with:
--   SELECT trigger_key, trigger_label FROM touchpoint_triggers ORDER BY sort_order;
--   SELECT t.title, tr.trigger_key FROM touchpoint_templates t JOIN touchpoint_triggers tr ON t.trigger_id = tr.id ORDER BY tr.sort_order, t.sort_order;
--   SELECT COUNT(*) FROM external_resources WHERE category = 'cec_resource';
-- ============================================================
