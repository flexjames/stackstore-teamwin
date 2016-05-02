
var categories = require('./categories'),
  Product = require('mongoose').model('Product');

function seed(cat){
    var root = '/images/products/lightsabers/';
    var data = [
     {
       name: 'Standard Single-Blade',
       description: 'The lightsaber, sometimes referred to as a laser sword, was a weapon used by the Jedi and the Sith. Lightsabers consisted of a plasma blade, powered by a kyber crystal and usually emitted from a metallic hilt. It was a weapon that required skill and training, and was greatly enhanced when used in conjunction with the Force. Though also used by the Sith, the lightsaber was synonymous with the Jedi, with some in the galaxy believing only Jedi used lightsabers. \n Available colors: blue, green, purple, red, white',
       price: 199,
       quantity: 10,
       category: [cat.jedi, cat.sith, cat.lightsabers],
       imageUrl: [root + 'single_blade.png']
     },
     {
       name: 'Double-bladed',
       description: 'The double-bladed lightsaber,also known as the saberstaff, was a lightsaber variant that featured a blade emitted from both ends.',
       price: 399,
       quantity: 7,
       category: [cat.sith, cat.lightsabers],
       imageUrl: [root + 'double_blade.jpg']
     },
     {
       name: 'Lightsaber Pike',
       description: 'The lightsaber pike was a lightsaber variant similar to the double-bladed lightsaber, featuring two rare yellow plasma blades on each side of the staff, that was used by the Jedi Temple Guard.',
       price: 499,
       quantity: 10,
       category: [cat.jedi, cat.lightsabers],
       imageUrl: [root + 'pike.jpg']
     },
     {
       name: 'Blaster-Hybrid',
       description: 'Ezras lightsaber was the personal, prototype lightsaber of Ezra Bridger, a Padawan and rebel who lived in the years prior to the Battle of Yavin. Bridger spent several weeks building his lightsaber after receiving a kyber crystal in the Jedi Temple on Lothal.',
       price: 299,
       quantity: 7,
       category: [cat.jedi, cat.blasters, cat.lightsabers],
       imageUrl: [root + 'hybrid.jpg']
     },
     {
       name: 'Crossguard',
       description: 'The crossguard lightsaber was an ancient lightsaber design that dated back to the Great Scourge of Malachor. It typically emitted three blades, a primary blade and two raw power vents known as quillons. ',
       price: 399,
       quantity: 5,
       category: [cat.sith, cat.lightsabers],
       imageUrl: [root + 'cross_guard.png']
     },
     {
       name: 'Darksaber',
       description: 'This ancient lightsaber had a unique black blade that was flattened and came to a point like a traditional sword, rather than the rounded beam of more standard lightsabers. ',
       price: 399,
       quantity: 10,
       category: [cat.sith, cat.jedi, cat.lightsabers],
       imageUrl: [root + 'darksaber.jpg']
     },
     {
       name: 'Shoto',
       description: 'Essentially, a shoto was a short lightsaber. Featuring a shortened blade length and diminuative handle, it was basically a miniaturized lightsaber. Shoto’s were usually used as the secondary weapon in dual-blade combat, as their smaller blade length resulted in a less intensive gyroscopic effect, making the weapon easier to handle.  ',
       price: 499,
       quantity: 9,
       category: [cat.sith, cat.jedi, cat.lightsabers],
       imageUrl: [root + 'shoto.jpg']
     },
     {
       name: 'Lightclub',
       description: 'Essentially the opposite of the shoto, lightclubs were massively oversized lightsabers that projected overlong blades. They were almost universally wielded by individuals of overlarge stature to accommodate their size.  ',
       price: 699,
       quantity: 5,
       category: [cat.sith, cat.jedi, cat.lightsabers],
       imageUrl: [root + 'lightclub.jpg']
     },
     {
       name: 'Guard Shoto',
       description: 'A variation on the standard short shoto lightsabers, guard shotos featured an elongated hilt with a secondary handle built angling 90 degrees out from the main hilt. They were built to be carried by the second handle, with the blade parallel to the forearm, allowing the weapon to be easily used for blocks.  ',
       price: 599,
       quantity: 8,
       category: [cat.jedi, cat.lightsabers],
       imageUrl: [root + 'guard_shoto.jpg']
     }
   ];
   console.log('seeding lightsabers...');
   return Product.insertMany(data);

}

module.exports = seed;
