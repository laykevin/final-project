-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT into "products"
  ("productName", "price", "description", "image", "category")
    VALUES
      -- ('ShamWow', '11.99', 'It''s like a chamois, towel, and sponge, all in one! Soaks up to 10x it''s weight in any liquid! The ShamWow towel is durable and long-lasting, ready for any job! Great for cleaning up spills, washing windows, polishing surfaces, washing your car, and even drying the dog!', 'https://m.media-amazon.com/images/I/61D6bnE5JaL._AC_UF1000,1000_QL80_.jpg', 'cleaning'),
      -- ('OxiClean', '9.99', 'OxiClean™, the #1 stain fighter brand, helps you fight tough stains on your laundry and around your home with versatile stain removers and boosters.', 'https://m.media-amazon.com/images/I/81Arwp1Z8KL.jpg', 'cleaning'),
      -- ('Shake Weight', '24.99', 'Originally marketed to females as the cure for flabby arms, the Shake Weight is essentially a lightweight 2.5-pound dumbbell with springs on either end that is designed to be held with one or both hands and shaken back and forth vigorously in a limited range of movement.', 'https://ik.imagekit.io/02fmeo4exvw/certifiednews/Dec_2011/ShakeWeight_main.jpg', 'fitness'),
      -- ('Slap Chop', '19.99', 'The Slap Chop is a manual chopper machine that works when you slap the plunger part. Every slap triggers the 3 blades below to chop and cut the food. The more you slap the Slap Chop, the finer the food gets. Chop up potatoes for home fries, or add mushrooms and green peppers for a tasty side to your eggs.', 'https://i.ebayimg.com/images/g/MlYAAOSwk4RcIC4E/s-l500.jpg', 'cooking'),
      -- ('Flex Seal', '29.99', 'Flex Seal is a liquid rubber sealant coating that''s perfect for almost any DIY project inside or outside your house. Flex Seal can be used on almost every surface: wood, metal, tile, concrete, masonry, fabric, glass, plastic, aluminum, porcelain, drywall, rubber, cement, and vinyl.', 'https://cdn.shopify.com/s/files/1/0282/4414/8333/products/LFSMAXBLK02_Front.png?v=1675303110', 'home'),
      -- ('Kaboom', '14.99', 'Kaboom Shower, Tub & Tile Cleaner with OxiClean breaks through soap scum and hard water buildup with no hard scrubbing. Powers away soap scum; calcium & lime; hard water stains; grease & grime.', 'https://m.media-amazon.com/images/I/819di5GcxCL.jpg', 'cleaning'),
      -- ('Snuggie', '27.99', 'This wearable blanket is perfect to keep you comfy whether you are studying for a big exam, gaming, reading a book, or just watching TV relaxing on the couch.', 'https://i5.walmartimages.com/asr/4c177286-2c9e-4ff6-893e-24363bd1483a.c49e317f3cafcf6656eb76a1297adbc4.jpeg', 'clothing'),
      -- ('Moon Shoes', '39.99', 'BOUNCE YOUR WAY TO FUN! and Space Walk here on earth! Run, jump, jump-rope, play extreme hopscotch, bounce around town, or pretend to be an astronaut! Fun indoors or out!', 'https://m.media-amazon.com/images/I/81-QTao4WDL._AC_UF1000,1000_QL80_.jpg', 'shoes')
         ('Banana', '499', 'This item will cause any karts that come in contact with it to spin out.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail01.png', 'trap'),
         ('Blooper', '999', 'Spurts large ink blots on the screens of racers ahead of the user. Causes CPU racers to swerve, except in Battle Mode.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail13.png', 'debuff'),
         ('Bob-omb', '1499', 'Explodes after a brief pause or when another Kart comes near it. Any Kart in the blast radius will be knocked over or spun around.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail08.png', 'trap'),
         ('Boo', '1499', 'An Item that can steal another racer''s Item and make the user invisible.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail23.png', 'debuff'),
         ('Boomerang Flower', '1999', 'Shoots three Boomerangs to attack other racers.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail17.png', 'projectile'),
         ('Bullet Bill', '4999', 'Briefly transforms the user into a Bullet Bill that soar through the air along the track, knocking over Karts along the way.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail12.png', 'transform'),
         ('Bowser Shell', '3499', 'It strikes unlucky racers on the way.', 'https://www.models-resource.com/resources/big_icons/37/36244.png?updated=1592093403', 'projectile'),
         ('Chain Chomp', '4999', 'Pulls driver(s) through a track with a fast auto-pilot, and also a vicious obstacle that leaps and hops at opponents.', 'https://upload.wikimedia.org/wikipedia/en/8/82/Chain_Chomp.png', 'transform'),
         ('Coin', '499', 'Pick coins up to increase your kart''s speed. Not having coins could result in consequences.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail21.png', 'speed'),
         ('Crazy 8', '6999', 'They consist of a Green Shell, a Red Shell, a Banana, a Bob-omb, a Blooper, a Star, a Mushroom, and a Coin.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail20.png', 'projectile trap debuff transform speed'),
         ('Fake Item Box', '499', 'A red item box with an upside down question mark inside.', 'https://mario.wiki.gallery/images/6/61/MKW_Fake_Item_Box_Artwork.png', 'trap'),
         ('Feather', '1499', 'A Feather lets a player jump over obstacles and Items.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail22.png', 'speed'),
         ('Fireball', '999', 'A Fireball is laid on the course and moves around.', 'https://mario.wiki.gallery/images/thumb/9/93/Fireball_Artwork_-_Super_Mario_3D_World.png/1200px-Fireball_Artwork_-_Super_Mario_3D_World.png', 'trap'),
         ('Fire Flower', '1499', 'Allows you to throw fireballs that cause other Karts to spin out of control on impact.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail16.png', 'transform projectile'),
         ('Giant Banana', '1999', 'A grumpy banana that is triple size of a normal banana.', 'https://mario.wiki.gallery/images/thumb/8/8c/MKT_Icon_Giant_Banana.png/1200px-MKT_Icon_Giant_Banana.png', 'trap'),
         ('Golden Mushroom', '4999', 'Allows you to use Mushroom boosts as many times as you want for 10 seconds.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail11.png', 'speed'),
         ('Green Shell', '499', 'When thrown, this shell travels in a straight line and knocks over the first Kart it hits.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail03.png', 'projectile'),
         ('Heart', '3499', 'Can block and then throw or redirect an Item from another enemy racer.', '/heart.png', 'transform defense'),
         ('Lightning', '4999', 'Makes everyone but the user drop their items, also making them smaller, slower, and high-pitched in voice.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail14.png', 'debuff'),
         ('Lucky 7', '6999', 'Equips the players with a lineup of seven Items rotating around their Kart.', 'https://mario.wiki.gallery/images/a/ad/MK7_Lucky7.png', 'projectile trap debuff transform speed'),
         ('Mega Mushroom', '1999', 'A large yellowish-orange mushroom with red spores that enlarges the user and allows them to flatten any racer in their path.', 'https://mario.wiki.gallery/images/thumb/e/e0/Mega_Mushroom_-_MTUS.png/1200px-Mega_Mushroom_-_MTUS.png', 'transform'),
         ('Triple Bananas', '1299', 'Causes any karts that touch it to spin out.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail02.png', 'trap'),
         ('Mushroom', '999', 'A handy item for catching up, taking a shortcut, or dodging the infamous Spiny Shell.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail09.png', 'speed'),
         ('Potted Piranha Plant', '2499', 'Eats Items of opponents, and also chomps other racers and gives a speed boost in Mario Kart 8.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail18.png', 'transform'),
         ('POW Block', '1499', 'Sends everyone ahead of the user into an explosive spin that makes them drop their items.', 'https://www.models-resource.com/resources/big_icons/25/24437.png?updated=1526838169', 'debuff'),
         ('Red Shell', '999', 'These automatically lock onto and chase after the next Kart in front of the player. When hit, the Kart rolls over.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail05.png', 'projectile'),
         ('Spiny Shell', '4999', 'This shell chases after the lead kart and blows up when it reaches its target. Any kart in the blast radius will be knocked over. Those that enter the explosion a bit later will be spun around.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail07.png', 'projectile'),
         ('Super Horn', '4999', 'It can be used to block incoming projectiles or to destroy other items, to blast opponents away, and even to destroy the Spiny Shell, which could not be directly blocked by an item in any previous game.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail19.png', 'debuff defense'),
         ('Super Leaf', '999', 'A leaf that gives the player a tail.', 'https://mario.wiki.gallery/images/thumb/c/cd/Super_Leaf_Artwork_-_Super_Mario_3D_World.png/1200px-Super_Leaf_Artwork_-_Super_Mario_3D_World.png', 'defense'),
         ('Starman', '4999', 'These stars make the user invincible for a limited amount of time.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail15.png', 'transform speed defense'),
         ('Thunder Cloud', '1499', 'A bluish-gray Lakitu''s Cloud with a Lightning bolt that gives the holder a constant boost, then shrinks the player after ten seconds.', 'https://www.models-resource.com/resources/big_icons/25/24432.png?updated=1515236061', 'debuff'),
         ('Triple Green Shells', '1299', 'When thrown, these shells travels in a straight line and knocks over the first Kart it hits.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail04.png', 'projectile'),
         ('Triple Mushrooms', '2499', 'Provides a short speed boost.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail10.png', 'speed'),
         ('Triple Red Shells', '2499', 'These automatically lock onto and chase after the next Kart in front of you. When hit, the Kart rolls over.', 'https://www.nintendo.com/my/switch/aabp/assets/images/item/img_detail06.png', 'projectile'),
         ('Yoshi Egg', '1999', 'A homing egg that when hit, 3 random items will come out of the egg.', 'https://mario.wiki.gallery/images/thumb/4/42/NSMBU_Green_Yoshi_Egg_Artwork.png/1200px-NSMBU_Green_Yoshi_Egg_Artwork.png', 'projectile'),
         ('Birdo Egg', '1999', 'A homing egg that when hit, 3 random items will come out of the egg.', 'https://i.pinimg.com/originals/bd/1a/b5/bd1ab5280c953d38fe60ebf790b420f0.png', 'projectile')
