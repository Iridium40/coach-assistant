-- =====================================================
-- SEED DATA FOR COACH RESOURCE LIBRARY
-- Auto-generated from coach-resource-library.json
-- =====================================================

-- =====================================================
-- 1. INSERT CATEGORIES
-- =====================================================
INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('getting-started', 'Getting Started', 'Essential resources for new coaches just beginning their journey', 'rocket', '#4CAF50', 1);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('business-setup', 'Business Setup & Branding', 'Set up your business, website, payments, and brand compliance', 'briefcase', '#2196F3', 2);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('social-media', 'Social Media & Content', 'Create engaging content, reels, and build your online presence', 'share-2', '#E91E63', 3);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('prospecting', 'Prospecting & Conversations', 'Build your prospect list and start meaningful conversations', 'users', '#9C27B0', 4);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('health-assessment', 'Health Assessment & Closing', 'Conduct effective health assessments and handle objections', 'clipboard', '#FF9800', 5);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('client-onboarding', 'Client Onboarding', 'Set up new clients for success from day one', 'user-plus', '#00BCD4', 6);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('client-coaching', 'Daily Client Coaching', 'Daily texts, check-ins, and ongoing client support', 'message-circle', '#8BC34A', 7);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('client-troubleshooting', 'Client Troubleshooting', 'Help clients overcome plateaus and challenges', 'tool', '#F44336', 8);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('nutrition-guides', 'Nutrition & Meal Guides', 'Lean and green guides, condiments, dining out, and meal planning', 'book-open', '#4CAF50', 9);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('metabolic-education', 'Metabolic Health Education', 'Educational content about metabolic health and the science', 'heart', '#E91E63', 10);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('sponsoring', 'Sponsoring & Team Building', 'Sign new coaches and build your team', 'user-check', '#673AB7', 11);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('connect-numbers', 'OPTAVIA Connect & Numbers', 'Track FQV, run projections, and use OPTAVIA Connect', 'bar-chart-2', '#3F51B5', 12);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('leadership', 'Leadership & Team Development', 'Coach your coaches and develop leaders', 'award', '#009688', 13);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('rank-trackers', 'Rank Advancement Trackers', 'Daily trackers and tools for each rank level', 'trending-up', '#FF5722', 14);

INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('business-finance', 'Business & Finance', 'Taxes, compensation, and business systems', 'dollar-sign', '#607D8B', 15);

-- =====================================================
-- 2. INSERT TAGS
-- =====================================================
INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('video', 'Video', 'format', 1);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('document', 'Document', 'format', 2);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('pdf', 'PDF', 'format', 3);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('form', 'Form/Template', 'format', 4);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('canva', 'Canva', 'format', 5);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('link', 'External Link', 'format', 6);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('beginner', 'Beginner', 'level', 7);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('intermediate', 'Intermediate', 'level', 8);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('advanced', 'Advanced', 'level', 9);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('scripts', 'Scripts & Templates', 'content', 10);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('copy-paste', 'Copy & Paste Ready', 'content', 11);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('training-call', 'Training Call Recording', 'content', 12);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('quick-reference', 'Quick Reference', 'content', 13);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('checklist', 'Checklist', 'content', 14);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('tracker', 'Tracker', 'content', 15);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('client-facing', 'Share with Clients', 'audience', 16);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('coach-only', 'Coach Only', 'audience', 17);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('new-coach', 'New Coach', 'rank', 18);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('senior-coach', 'Senior Coach+', 'rank', 19);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('manager', 'Manager+', 'rank', 20);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('director', 'Director+', 'rank', 21);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('executive', 'Executive Director+', 'rank', 22);

INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('top-rank', 'Global/Presidential/IPD', 'rank', 23);

-- =====================================================
-- 3. INSERT RESOURCES
-- =====================================================
INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-001', 'New Coach Welcome Letter', 'Welcome letter template covering first steps, what to expect, and key resources for newly signed coaches', 'doc', 'https://docs.google.com/document/d/1arNc-lNb1zJ2WJ0VS87Dpfre973u-IboIYxQqNUr7Vs/edit?usp=sharing', 'getting-started', true, 1);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-002', 'New Coach Checklist', 'Step-by-step checklist for new coaches to complete setup and launch preparation', 'doc', 'https://docs.google.com/document/d/118onAvS-zWGDClUpkSOLEcXhRNnuaCir/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true', 'getting-started', true, 2);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-003', 'How to Purchase Your Coaching Kit', 'Video walkthrough showing how to purchase your OPTAVIA coaching kit', 'video', 'https://vimeo.com/548985412', 'getting-started', false, 3);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-004', 'OPTAVIA Vocabulary', 'Complete glossary of OPTAVIA terms: FQV, QP, FIBC, ranks, fuelings, lean and green, and business terminology', 'doc', 'https://docs.google.com/document/d/1jLPNcT5cROxHm8y_XWpCC4AQjnMo9bjwZs-Kz5UVXTY/edit?usp=sharing', 'getting-started', true, 4);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-005', 'OPTAVIA Compensation Plan', 'Official OPTAVIA compensation plan explaining income opportunities and rank requirements', 'pdf', 'https://optaviamedia.com/pdf/learn/OPTAVIA_LRN-Integrated-Compensation-Plan.pdf', 'business-finance', false, 5);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-006', 'OPTAVIA Coach Kit Purchase Link', 'Direct link to purchase the OPTAVIA coaching business kit', 'link', 'https://www.optavia.com/us/en/optavia-coach-business-kit/p/optavia-coach-business-kit-kt', 'getting-started', false, 6);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-007', 'Branding and Setting Up Your Business', 'Complete guide to branding your coaching business professionally', 'doc', 'https://docs.google.com/document/d/10aK_KwiHBXsVuUzRS2DjFmly0QH_VJ44ohSIMuxEJ3A/edit?usp=sharing', 'business-setup', false, 7);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-008', 'Setting Up Your Coaching Website', 'Video tutorial on setting up your coaching website and online presence', 'video', 'https://youtu.be/xtSR2nJJfAg?si=dHRxhzOE_b1wcIF5', 'business-setup', false, 8);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-009', 'Setting Up Your OPTAVIA Pay', 'Instructions for setting up OPTAVIA Pay to receive commission payments', 'doc', 'https://docs.google.com/document/d/1LuGK2ZNo8lFI51vesDKKHdUDCpgKhvtztv3-KS06KvE/edit?usp=sharing', 'business-setup', false, 9);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-010', 'How to Add a Disclaimer to Your Pictures', 'Video tutorial on adding required wellness disclaimers to transformation photos', 'video', 'https://www.youtube.com/watch?v=Z4ABPUk5JHs', 'business-setup', true, 10);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-011', 'How to Add a Wellness Credit', 'Tutorial on properly crediting OPTAVIA and wellness disclaimers in posts', 'video', 'https://vimeo.com/473831198', 'business-setup', false, 11);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-012', 'Adam Tarleton Tax Talk', 'Tax considerations and strategies for OPTAVIA coaches', 'doc', 'https://docs.google.com/document/d/1l7Q4nUmVZhjt5m0P4H9jaAjQ30LhpVP5SZ3yh9cn9PI/edit?usp=sharing', 'business-finance', true, 12);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-013', 'Real Talk - Finances', 'Honest discussion about the financial realities of building a coaching business', 'video', 'https://vimeo.com/830269095/516b60d6c1', 'business-finance', false, 13);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-014', 'How to Prepare for Your Social Media Launch', 'Guide to preparing social media profiles before your coaching launch - bio updates, content planning, strategy', 'doc', 'https://docs.google.com/document/d/1MmQrsmqenglJr_SenBcBH_qkc4k6mWe_/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true', 'social-media', true, 14);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-015', 'Week One Posting Guide', 'Daily posting guide for your first week as a coach with content ideas and timing', 'doc', 'https://docs.google.com/document/d/1DIV9pEZlmqzA8ZIAnCPExQ_KhOedjA38OauiOqtqL5c/edit?usp=sharing', 'social-media', false, 15);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-016', 'How to Work Your Launch Post', 'Best practices for your launch post - timing, engagement, common mistakes to avoid', 'doc', 'https://docs.google.com/document/d/11tutR54Y_rDUUWkQupfY8cHN9n_VH-fIQPwnTSnDLnU/edit?usp=sharing', 'social-media', true, 16);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-017', 'How to Create a Simple Reel', 'Step-by-step video on creating engaging Instagram/Facebook Reels', 'video', 'https://vimeo.com/1147526154', 'social-media', true, 17);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-018', 'Effective Hashtags', 'Hashtag strategy guide to maximize reach and engagement', 'doc', 'https://docs.google.com/document/d/11HxoyfVs5Ns6ysDWCzBj4R8hEERVb6MOBdama6zNYko/edit?usp=sharing', 'social-media', false, 18);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-019', 'How to Create a 100''s List - Dan Valentine', 'Video training on building your prospect list systematically', 'video', 'https://vimeo.com/810322204/8904d629b4', 'prospecting', true, 19);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-020', 'How to Create a 100''s List - Allie McCabe', 'Alternative approach to building your prospect list', 'video', 'https://vimeo.com/791536952/642c420335', 'prospecting', false, 20);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-021', 'How to Start Conversations', 'Video guide on initiating conversations with prospects naturally', 'video', 'https://youtu.be/-mt9RIrgzIY', 'prospecting', true, 21);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-022', 'How to Have Effective Conversations', 'Visual guide to having effective prospect conversations with frameworks', 'canva', 'https://www.canva.com/design/DAGwKmV4-qY/jcb8D4BueFoAYZsc8uERiQ/view', 'prospecting', false, 22);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-023', 'Interacting with the Likes', 'How to turn social media engagement into meaningful conversations', 'video', 'https://vimeo.com/810981023/dc92d43d3b', 'prospecting', false, 23);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-024', 'Weigh Day Post - Allie McCabe', 'How to create effective weekly weigh day content that attracts prospects', 'video', 'https://vimeo.com/814509040/e81b22cdbc', 'social-media', false, 24);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-025', 'How to Nail the Health Assessment', 'Step-by-step guide with scripts for opening, goals, weight history, motivation, and closing', 'doc', 'https://docs.google.com/document/d/1A8UIEidVXGrz8jeDsqKbrRVPbbpWc3b0/edit?usp=sharing', 'health-assessment', true, 25);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-026', 'Health Assessment Training Resources', 'Training on transitioning casual conversations into health assessments', 'doc', 'https://docs.google.com/document/d/13V_-yPDivM_4k8K34ly4qjxMopxb52_qEypK4NiBld4/edit?usp=sharing', 'health-assessment', false, 26);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-027', 'Sample Metabolic Health Assessment JotForm', 'Digital health assessment form template - CLONE BEFORE USING', 'form', 'https://form.jotform.com/260074236698060', 'health-assessment', true, 27);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-028', '10 Questions to Gauge Metabolic Health', 'Video covering 10 diagnostic questions to assess metabolic health', 'video', 'https://vimeo.com/1135751990/8205c4652d?fl=tl&fe=ec', 'health-assessment', false, 28);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-029', 'Metabolic Talking Points for Coaches', 'Key talking points for discussing metabolic health with prospects and clients', 'doc', 'https://docs.google.com/document/d/1GzyY4Je8wWtYxoY7DsuVlPTgCJWdEUzK8jp4UmS6MnQ/edit?usp=sharing', 'health-assessment', false, 29);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-030', 'Common Objections and How to Address Them', 'Comprehensive guide to handling objections: cost, time, spouse approval, skepticism', 'doc', 'https://docs.google.com/document/d/1TQPw-pKAllqEz7MZXa3XEsxjN5Jo1T5b/edit?usp=sharing', 'health-assessment', true, 30);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-031', 'Handling Cost Objections', 'Video training on overcoming price and cost concerns', 'video', 'https://vimeo.com/1087174282/597b964a37', 'health-assessment', true, 31);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-032', 'How to Use Klarna for Payment Plans', 'Guide for offering payment plan options to prospects concerned about cost', 'doc', 'https://docs.google.com/document/d/1o4eAoI6ljXyODnrHCOSIL34rx_7-LngJV1w5xq-nPtU/edit?usp=sharing', 'health-assessment', false, 32);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-033', 'Effective Follow Up After Health Assessment', 'Templates for follow-up messages - yes, maybe, and not-now responses', 'doc', 'https://docs.google.com/document/d/1D-DyRUeV5r4jipqnudUxweh3HGFh_hPD/edit?usp=sharing', 'health-assessment', true, 33);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-034', 'New Client Checklist', 'Complete checklist for setting up new clients for success', 'doc', 'https://docs.google.com/document/d/1c8WqcDJPVmSm6h9Ss2x3V02L0apIemDp/edit?usp=sharing', 'client-onboarding', true, 34);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-035', 'Welcome and 9 Tips Text', 'Copy-paste welcome message for new clients with 9 essential tips', 'doc', 'https://docs.google.com/document/d/1x9k469K6XvuQ8rcPdgR3z4i9iXKLxBvSIR_77UuDgpM/edit?usp=sharing', 'client-onboarding', true, 35);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-036', '5 Success Tips', 'Quick reference card with 5 essential tips for new clients', 'doc', 'https://docs.google.com/document/d/1nss0Lsj1L6jr0X8AEZHZ4cdLOt9vW_SZXokHHLy-r9M/edit?usp=sharing', 'client-onboarding', false, 36);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-037', 'Universal Metabolic Health Kickoff Video', 'Team Strong kickoff call video to share with new clients', 'video', 'https://vimeo.com/user118093373/teamstrongkickoff', 'client-onboarding', true, 37);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-038', 'Lean and Green Video', 'Visual guide to lean and green meals for new clients', 'video', 'https://vimeo.com/414057972', 'client-onboarding', true, 38);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-039', 'Schedule for New Client Communication', 'Recommended communication schedule - daily, weekly, and milestone touchpoints', 'doc', 'https://docs.google.com/document/d/1iYiwp4tMmlmqFDj8JoG8PNiFbF4ed6yRnMJnRMmzW1g/edit?usp=sharing', 'client-coaching', true, 39);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-040', 'New Client Videos Collection', 'Collection of video resources to share with new clients', 'doc', 'https://docs.google.com/document/d/1yfVgcKDiXCP6Og1hopzSBGvI8l0MlQpoGt0hnxjXf_U/edit?usp=sharing', 'client-onboarding', false, 40);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-041', 'Metabolic Reset Day Before Text', 'Copy-paste message to send the day before client starts', 'doc', 'https://docs.google.com/document/d/1V4vgLqx6-0uE9ZRfIp7024tTCB5NoqjHa0YAbV0_RlU/edit?usp=sharing', 'client-coaching', false, 41);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-042', 'Daily Texts Days 1-9', 'Copy-paste daily text templates for the first 9 days', 'doc', 'https://docs.google.com/document/d/1gtH2fYDKLA6f3sv6-yxFUM8b6rLBqp8jF5R7h4ec6i4/edit?usp=sharing', 'client-coaching', true, 42);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-043', 'Day 1-4 Check In Questions', 'Specific check-in questions for the first 4 critical days', 'doc', 'https://docs.google.com/document/d/1xZJ_afiL_W4YcinCkM6NbNWrH2GqZmRnS1XrB_BRLIM/edit?usp=sharing', 'client-coaching', false, 43);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-044', 'Daily Texts Days 10-31', 'Extended daily text templates for days 10-31', 'doc', 'https://docs.google.com/document/d/1G9YtI07xIvazS4KZcCkLlB4N_E1axueXVeV4R0Na4Yc/edit?usp=sharing', 'client-coaching', true, 44);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-045', 'Systems Check Questions', 'Diagnostic questions to identify why a client might not be seeing results', 'doc', 'https://docs.google.com/document/d/1xZJ_afiL_W4YcinCkM6NbNWrH2GqZmRnS1XrB_BRLIM/edit?usp=sharing', 'client-troubleshooting', false, 45);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-046', 'Detailed Systems Check - Not Losing Well', 'In-depth troubleshooting guide for clients not seeing results', 'doc', 'https://docs.google.com/document/d/1HLqL_l7IELKgjlx5d3SBuXi2xdyBSaawJ5JmcKDoGHM/edit?usp=sharing', 'client-troubleshooting', true, 46);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-047', 'VIP Call How To', 'Guide to conducting VIP calls - structure, talking points, celebration', 'doc', 'https://docs.google.com/document/d/1vtYewe5sbVziNTzz3Fk3l3DhRt1x0xTps_hxtYEQk7Q/edit?usp=sharing', 'client-coaching', true, 47);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-048', 'Condiment Guide', 'Official OPTAVIA condiment guidelines', 'pdf', 'http://optaviamedia.com/pdf/LEARN/OPTAVIA_CondimentSheet.pdf', 'nutrition-guides', false, 48);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-049', 'Lean and Green Guidelines', 'Complete official guide to lean and green meals', 'pdf', 'http://optaviamedia.com/pdf/learn/OPTAVIA-Lean-and-Green.pdf', 'nutrition-guides', true, 49);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-050', 'Vegetarian Lean/Green Options', 'Plant-based meal options for vegetarian clients', 'pdf', 'http://optaviamedia.com/pdf/LEARN/OPTAVIA-Vegetarian-Info-Sheet.pdf', 'nutrition-guides', false, 50);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-051', 'Vegetable Weight Conversions', 'Portion conversion charts for vegetables', 'pdf', 'http://optaviamedia.com/pdf/LEARN/OPTAVIA-Vegetarian_Conversion_Chart.pdf', 'nutrition-guides', false, 51);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-052', 'Optional Snack Guidelines', 'Official guide to approved optional snacks', 'link', 'https://answers.optavia.com/help/optimal-weight-5-1-plan-what-snacks-can-i-have', 'nutrition-guides', false, 52);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-053', 'Dining Out Guide', 'Official guide for eating at restaurants while on plan', 'pdf', 'http://optaviamedia.com/pdf/learn/50054-GUI_OPTAVIA-Dining-Out.pdf', 'nutrition-guides', true, 53);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-054', 'Product Claims Sheet (Allergy Info)', 'Allergen and ingredient information for OPTAVIA products', 'pdf', 'https://optaviamedia.com/pdf/product/OPTAVIA_DOC-Product-Claims-Sheet.pdf', 'nutrition-guides', false, 54);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-055', 'Eat This Every Day', 'Daily nutrition guidance for clients', 'doc', 'https://docs.google.com/document/d/1_4kgw8X0_bHp6mbGW5Xtwdg0_W7hVYBWwNgHNSM3xLk/edit?usp=sharing', 'nutrition-guides', false, 55);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-056', 'Dr. Mills Interview', 'Medical perspective on metabolic health', 'video', 'https://www.youtube.com/watch?v=QS_31YRMvJY', 'metabolic-education', false, 56);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-057', 'What is Metabolic Health', 'Educational video overview of metabolic health concepts', 'video', 'https://www.youtube.com/watch?v=WE2BDJGA9-4', 'metabolic-education', true, 57);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-058', 'What Excess Fat Does to Your Body', 'Educational video on the health impact of excess body fat', 'video', 'https://www.facebook.com/reel/754946984357178', 'metabolic-education', false, 58);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-059', 'Dr. A Explains Soy', 'Dr. A addresses common concerns about soy in OPTAVIA products', 'video', 'https://vimeo.com/781971387/51372cbd27', 'metabolic-education', false, 59);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-060', 'Why Magnesium and Electrolytes Matter', 'Education on the importance of supplementation during metabolic reset', 'doc', 'https://docs.google.com/document/d/1BuSh_8VJB2bQ2uCrk1-Lq1XSNRuJw8a_PU_Z16aWnII/edit?usp=sharing', 'metabolic-education', false, 60);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-061', 'Why the Metabolic Reset is Different', 'Explains what makes this program different from others', 'doc', 'https://docs.google.com/document/d/16XKOHVKrqrBNFeV5BGGl5Q1kZ6PHcBM8RisF80N-C7w/edit?usp=drivesdk', 'metabolic-education', false, 61);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-062', 'Digital Guides Collection', 'Collection of digital resources and guides', 'doc', 'https://docs.google.com/document/d/1TtZoQcKzTT77PZP0XNlMH-e8HiYzwKhS1UL8ZW5BcT8/edit?usp=sharing', 'nutrition-guides', false, 62);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-063', 'How to Update Your Premier Order', 'Instructions for clients to modify auto-ship orders', 'doc', 'https://docs.google.com/document/d/1D-ueL9kljNxEdqHFrvp9u-aze-z3-2glZaYN-936fCc/edit?usp=sharing', 'client-coaching', false, 63);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-064', 'Quick Links - All Resources', 'Master document with all client and coach support links', 'doc', 'https://docs.google.com/document/d/1rMvUSWUDvxEy7pTHKt5JmiLLtG6wrMaQpKVOgcCXmn0/edit?usp=sharing', 'getting-started', true, 64);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-065', 'All Recorded Training Calls', 'Library of all recorded training calls for coaches and clients', 'doc', 'https://docs.google.com/document/d/1ad-MdPRzyrKflK2Y_mHmTBjU0lCVJydJJRsufFIDVko/edit?usp=sharing', 'leadership', true, 65);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-066', 'Fast Track to Senior Coach', 'Visual roadmap for accelerating to Senior Coach rank', 'canva', 'https://www.canva.com/design/DAGRyr_F44Y/3_36EEwhi6JmMZfl1ZKAvw/edit', 'rank-trackers', true, 66);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-067', '30 Day Self-Evaluation', 'Self-assessment for new coaches at 30 days to evaluate progress', 'doc', 'https://docs.google.com/document/d/1nOC6erBMIws-SZzQ40TCz5DEvBQpmVLMUCI5V7E_8Ys/edit?usp=sharing', 'getting-started', false, 67);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-068', 'How to Support Your Partner', 'Balancing your coaching business with your relationship', 'video', 'https://vimeo.com/705369855', 'business-finance', false, 68);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-069', 'The Mindset Behind Effective Sponsorship', 'Psychology of sponsorship and team building', 'video', 'https://vimeo.com/665762974', 'sponsoring', true, 69);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-070', 'Sponsoring Coach Pro Tips', 'Expert tips for sponsoring new coaches', 'doc', 'https://docs.google.com/document/d/1FKzunmTLyZ_Zal4sG29O9nXk95pWStalxmIlIejfQh0/edit?usp=sharing', 'sponsoring', true, 70);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-071', 'Sponsoring Coach Action Steps', 'Step-by-step action plan for sponsoring', 'doc', 'https://docs.google.com/document/d/1FTi_PfLWuy_Q2ra9NS8XAf3nUNX5hMWxJ89ZUmO2rU4/edit?usp=sharing', 'sponsoring', false, 71);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-072', 'MedSpa Introduction', 'Introducing the coaching opportunity to medical providers', 'doc', 'https://docs.google.com/document/d/1Cyv1hiRq4aOGbMG_uC924nepwbm3soylfNMejEbNQGQ/edit?usp=sharing', 'sponsoring', false, 72);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-073', 'Business Proposal Template', 'Professional template for business opportunity proposals', 'canva', 'https://www.canva.com/design/DAG_hHaPY0o/UExZZaZMgUZtBwxvkbrckg/edit', 'sponsoring', false, 73);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-074', 'How to Check FQV in Connect', 'Video showing how to check Field Qualifying Volume', 'video', 'https://www.loom.com/share/799a4ae74a7645aabab8f3d67a4215cf', 'connect-numbers', true, 74);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-075', 'How to Run Projected Numbers', 'Projecting volume numbers for yourself and your team', 'video', 'https://www.loom.com/share/9da0ac3751e84db09ee375c9c039c527', 'connect-numbers', true, 75);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-076', 'How to End the Month Strategically', 'Strategic month-end planning for hitting rank qualifications', 'video', 'https://vimeo.com/1105267713/6d51506452?fl=tl&fe=ec', 'connect-numbers', true, 76);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-077', 'ED Daily Tracker', 'Daily activity tracker for Executive Directors', 'doc', 'https://docs.google.com/document/d/1kCzIHm7DV1WPSTsbTh-NZr4qXj278iZ52vOPs08PfbE/edit', 'rank-trackers', false, 77);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-078', 'FIBC Daily Tracker', 'Daily activity tracker for FIBC qualification', 'doc', 'https://docs.google.com/document/d/1WSH2shc6mhmoJubPEdNOwyRC2VPotHOnzvYEBSDx-bk/edit', 'rank-trackers', true, 78);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-079', 'Grow to FIBC Bubble Tracker', 'Visual tracker for FIBC progress', 'doc', 'https://docs.google.com/document/d/1xwxMPmRRdBLHsyNLz1rkgMRDK6f8-_gr/edit', 'rank-trackers', true, 79);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-080', '10X Kickoff Call - Kristen Glass', '10X methodology for rapid business growth', 'video', 'https://vimeo.com/manage/videos/1115495757/3e666d9fcd', 'leadership', true, 80);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-081', '10X Kickoff Call', 'Alternative 10X methodology training', 'video', 'https://vimeo.com/1114863189?fl=tl&fe=ec', 'leadership', false, 81);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-082', 'Global/Presidential Daily Tracker', 'Daily tracker for Global and Presidential Directors', 'doc', 'https://docs.google.com/document/d/1j9fcAHJ769BRyqaOhZ60HFzb7VhoB0gc3KL5pjyT1PQ/edit', 'rank-trackers', false, 82);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-083', 'IPD Bubble Tracker', 'Visual tracker for IPD qualification progress', 'doc', 'https://docs.google.com/document/d/1JRnQ_uavSfOVj3Mvwf7T2lCASmj8jnEb/edit', 'rank-trackers', true, 83);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-084', 'New Coach Foundations Guide', 'Academy Module 1 - foundational training', 'doc', '/academy/module-1', 'leadership', false, 84);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-085', 'Building Your Business Guide', 'Academy Module 2 - business building', 'doc', '/academy/module-2', 'leadership', false, 85);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-086', 'Leadership Development Guide', 'Academy Module 3 - leadership skills', 'doc', '/academy/module-3', 'leadership', true, 86);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-087', 'National Expansion Guide', 'Academy Module 4 - national expansion', 'doc', '/academy/module-4', 'leadership', false, 87);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-088', 'Executive Leadership Guide', 'Academy Module 5 - executive leadership', 'doc', '/academy/module-5', 'leadership', false, 88);

INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('res-089', 'Legacy Building Guide', 'Academy Module 6 - building lasting impact', 'doc', '/academy/module-6', 'leadership', false, 89);

-- =====================================================
-- 4. INSERT RESOURCE-TAG RELATIONSHIPS
-- =====================================================
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-001', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-001', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-001', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-001', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-002', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-002', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-002', 'checklist');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-002', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-003', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-003', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-003', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-004', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-004', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-004', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-004', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-005', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-005', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-005', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-005', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-006', 'link');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-006', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-006', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-007', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-007', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-007', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-008', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-008', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-008', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-009', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-009', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-009', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-010', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-010', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-010', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-011', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-011', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-011', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-012', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-012', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-012', 'coach-only');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-013', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-013', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-013', 'coach-only');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-013', 'training-call');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-014', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-014', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-014', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-015', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-015', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-015', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-015', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-016', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-016', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-016', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-017', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-017', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-017', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-018', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-018', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-018', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-018', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-019', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-019', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-019', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-019', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-020', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-020', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-020', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-020', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-021', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-021', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-021', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-022', 'canva');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-022', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-022', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-022', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-023', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-023', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-023', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-024', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-024', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-024', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-025', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-025', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-025', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-025', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-026', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-026', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-026', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-027', 'form');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-027', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-027', 'new-coach');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-027', 'copy-paste');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-028', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-028', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-028', 'new-coach');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-028', 'client-facing');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-029', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-029', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-029', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-029', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-030', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-030', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-030', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-030', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-031', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-031', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-031', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-031', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-032', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-032', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-032', 'new-coach');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-032', 'client-facing');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-033', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-033', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-033', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-033', 'copy-paste');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-033', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-034', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-034', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-034', 'checklist');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-034', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-035', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-035', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-035', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-035', 'copy-paste');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-035', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-035', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-036', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-036', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-036', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-036', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-036', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-037', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-037', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-037', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-037', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-038', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-038', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-038', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-038', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-039', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-039', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-039', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-039', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-040', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-040', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-040', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-040', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-041', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-041', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-041', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-041', 'copy-paste');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-041', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-041', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-042', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-042', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-042', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-042', 'copy-paste');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-042', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-042', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-043', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-043', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-043', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-043', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-044', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-044', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-044', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-044', 'copy-paste');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-044', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-044', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-045', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-045', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-045', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-046', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-046', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-046', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-047', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-047', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-047', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-047', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-048', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-048', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-048', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-048', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-048', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-049', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-049', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-049', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-049', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-049', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-050', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-050', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-050', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-050', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-050', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-051', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-051', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-051', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-051', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-051', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-052', 'link');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-052', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-052', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-052', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-052', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-053', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-053', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-053', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-053', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-053', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-054', 'pdf');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-054', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-054', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-054', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-054', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-055', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-055', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-055', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-055', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-055', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-056', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-056', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-056', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-056', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-057', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-057', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-057', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-057', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-058', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-058', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-058', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-058', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-059', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-059', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-059', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-059', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-060', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-060', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-060', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-060', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-061', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-061', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-061', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-061', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-062', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-062', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-062', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-062', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-062', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-063', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-063', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-063', 'client-facing');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-063', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-064', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-064', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-064', 'quick-reference');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-064', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-065', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-065', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-065', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-065', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-066', 'canva');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-066', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-066', 'tracker');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-066', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-067', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-067', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-067', 'checklist');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-067', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-068', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-068', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-068', 'coach-only');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-068', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-069', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-069', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-069', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-069', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-070', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-070', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-070', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-070', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-071', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-071', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-071', 'checklist');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-071', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-072', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-072', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-072', 'scripts');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-072', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-073', 'canva');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-073', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-073', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-074', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-074', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-074', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-075', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-075', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-075', 'manager');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-076', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-076', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-076', 'manager');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-077', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-077', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-077', 'tracker');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-077', 'executive');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-078', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-078', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-078', 'tracker');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-078', 'executive');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-079', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-079', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-079', 'tracker');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-079', 'executive');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-080', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-080', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-080', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-080', 'director');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-081', 'video');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-081', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-081', 'training-call');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-081', 'director');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-082', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-082', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-082', 'tracker');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-082', 'top-rank');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-083', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-083', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-083', 'tracker');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-083', 'top-rank');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-084', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-084', 'beginner');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-084', 'new-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-085', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-085', 'intermediate');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-085', 'senior-coach');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-086', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-086', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-086', 'executive');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-087', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-087', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-087', 'executive');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-088', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-088', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-088', 'top-rank');

INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-089', 'document');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-089', 'advanced');
INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('res-089', 'top-rank');

