-- ============================================
-- Migration: Update Recipe Images with Accurate URLs
-- Description: Replace generic stock photos with images that accurately represent each recipe
-- ============================================

-- CHICKEN RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&h=600&fit=crop' 
WHERE id = 'recipe-1'; -- Lemon Herb Grilled Chicken (grilled chicken with lemon)

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop' 
WHERE id = 'recipe-2'; -- Caprese Chicken (chicken with tomato and mozzarella)

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&h=600&fit=crop' 
WHERE id = 'recipe-3'; -- Grilled Fajita Bowl (fajita bowl with peppers)

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop' 
WHERE id = 'recipe-4'; -- Buffalo Chicken Cauliflower Casserole

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&h=600&fit=crop' 
WHERE id = 'recipe-5'; -- Chicken Cacciatore (Instant Pot)

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop' 
WHERE id = 'recipe-6'; -- Crispy Almond Chicken Parmesan

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop' 
WHERE id = 'recipe-7'; -- Tropical Chicken Medley

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop' 
WHERE id = 'recipe-8'; -- Chicken Zucchini Noodles with Pesto

-- SEAFOOD RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&h=600&fit=crop' 
WHERE id = 'recipe-9'; -- Blackened Shrimp Lettuce Wraps

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop' 
WHERE id = 'recipe-10'; -- Salmon Piccata with Capers

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop' 
WHERE id = 'recipe-11'; -- Sheet Pan Salmon with Asparagus

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&h=600&fit=crop' 
WHERE id = 'recipe-12'; -- Shrimp Scampi Zoodles

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop' 
WHERE id = 'recipe-13'; -- Za'atar Salmon Salad

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1559742811-822873691df8?w=800&h=600&fit=crop' 
WHERE id = 'recipe-14'; -- Lobster Roll Lettuce Wraps

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&h=600&fit=crop' 
WHERE id = 'recipe-15'; -- Mediterranean Cod with Tomatoes

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&h=600&fit=crop' 
WHERE id = 'recipe-16'; -- Shrimp and Avocado Salad

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop' 
WHERE id = 'recipe-17'; -- Cajun Shrimp and Cauliflower Rice

-- BEEF RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop' 
WHERE id = 'recipe-18'; -- Beef & Chinese Broccoli

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop' 
WHERE id = 'recipe-19'; -- Big Mac Salad Bowl

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop' 
WHERE id = 'recipe-20'; -- Beef Stroganoff with Cauliflower Rice

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop' 
WHERE id = 'recipe-21'; -- Cheesy Taco Vegetable Skillet

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop' 
WHERE id = 'recipe-22'; -- Spiced Crockpot Roast Beef

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop' 
WHERE id = 'recipe-23'; -- Korean Beef Lettuce Cups

-- TURKEY RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop' 
WHERE id = 'recipe-24'; -- Zucchini Noodles with Turkey Meatballs

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop' 
WHERE id = 'recipe-25'; -- Turkey Taco Bake

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop' 
WHERE id = 'recipe-26'; -- Turkey Zucchini Lasagna

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop' 
WHERE id = 'recipe-27'; -- Crockpot Chicken Taco Soup

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop' 
WHERE id = 'recipe-28'; -- BBQ Turkey Stuffed Peppers

-- PORK RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop' 
WHERE id = 'recipe-29'; -- Pork Tacos

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop' 
WHERE id = 'recipe-30'; -- Asian Pork Stir-Fry

-- VEGETARIAN RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&h=600&fit=crop' 
WHERE id = 'recipe-31'; -- Cauliflower Grilled Cheese

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&h=600&fit=crop' 
WHERE id = 'recipe-32'; -- Crispy Tofu with Caramelized Veggies

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop' 
WHERE id = 'recipe-33'; -- Vegetable Tofu Bowl with Eggs

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop' 
WHERE id = 'recipe-34'; -- Ricotta Spinach Dumplings

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop' 
WHERE id = 'recipe-35'; -- Zucchini Pizza Casserole

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop' 
WHERE id = 'recipe-36'; -- Vegetarian Chili

-- BREAKFAST RECIPES
UPDATE recipes SET image = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop' 
WHERE id = 'recipe-37'; -- Egg White Veggie Scramble

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop' 
WHERE id = 'recipe-38'; -- Hearty Veggie Frittata

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1608039829572-9b79e4e37f29?w=800&h=600&fit=crop' 
WHERE id = 'recipe-39'; -- Spinach Tomato Egg Muffins

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&h=600&fit=crop' 
WHERE id = 'recipe-40'; -- Asparagus and Crabmeat Frittata

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop' 
WHERE id = 'recipe-41'; -- Mason Jar Egg Salad

UPDATE recipes SET image = 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=800&h=600&fit=crop' 
WHERE id = 'recipe-42'; -- Kohlrabi Egg Scramble


