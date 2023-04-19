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
      ('ShamWow', '11.99', 'It''s like a chamois, towel, and sponge, all in one! Soaks up to 10x it''s weight in any liquid! The ShamWow towel is durable and long-lasting, ready for any job! Great for cleaning up spills, washing windows, polishing surfaces, washing your car, and even drying the dog!', 'https://m.media-amazon.com/images/I/61D6bnE5JaL._AC_UF1000,1000_QL80_.jpg', 'cleaning'),
      ('OxiClean', '9.99', 'OxiClean™, the #1 stain fighter brand, helps you fight tough stains on your laundry and around your home with versatile stain removers and boosters.', 'https://m.media-amazon.com/images/I/81Arwp1Z8KL.jpg', 'cleaning'),
      ('Shake Weight', '24.99', 'Originally marketed to females as the cure for flabby arms, the Shake Weight is essentially a lightweight 2.5-pound dumbbell with springs on either end that is designed to be held with one or both hands and shaken back and forth vigorously in a limited range of movement.', 'https://ik.imagekit.io/02fmeo4exvw/certifiednews/Dec_2011/ShakeWeight_main.jpg', 'fitness'),
      ('Slap Chop', '19.99', 'The Slap Chop is a manual chopper machine that works when you slap the plunger part. Every slap triggers the 3 blades below to chop and cut the food. The more you slap the Slap Chop, the finer the food gets. Chop up potatoes for home fries, or add mushrooms and green peppers for a tasty side to your eggs.', 'https://i.ebayimg.com/images/g/MlYAAOSwk4RcIC4E/s-l500.jpg', 'cooking'),
      ('Flex Seal', '29.99', 'Flex Seal is a liquid rubber sealant coating that''s perfect for almost any DIY project inside or outside your house. Flex Seal can be used on almost every surface: wood, metal, tile, concrete, masonry, fabric, glass, plastic, aluminum, porcelain, drywall, rubber, cement, and vinyl.', 'https://cdn.shopify.com/s/files/1/0282/4414/8333/products/LFSMAXBLK02_Front.png?v=1675303110', 'home'),
      ('Kaboom', '14.99', 'Kaboom Shower, Tub & Tile Cleaner with OxiClean breaks through soap scum and hard water buildup with no hard scrubbing. Powers away soap scum; calcium & lime; hard water stains; grease & grime.', 'https://m.media-amazon.com/images/I/819di5GcxCL.jpg', 'cleaning'),
      ('Snuggie', '27.99', 'This wearable blanket is perfect to keep you comfy whether you are studying for a big exam, gaming, reading a book, or just watching TV relaxing on the couch.', 'https://i5.walmartimages.com/asr/4c177286-2c9e-4ff6-893e-24363bd1483a.c49e317f3cafcf6656eb76a1297adbc4.jpeg', 'clothing'),
      ('Moon Shoes', '39.99', 'BOUNCE YOUR WAY TO FUN! and Space Walk here on earth! Run, jump, jump-rope, play extreme hopscotch, bounce around town, or pretend to be an astronaut! Fun indoors or out!', 'https://m.media-amazon.com/images/I/81-QTao4WDL._AC_UF1000,1000_QL80_.jpg', 'shoes')
