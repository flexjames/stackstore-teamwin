var categories = require('./categories'),
  Product = require('mongoose').model('Product');

function seed(cat){
    var data = [
      {
        name: 'Standard Blaster',
        description: 'Operating under the same principles as laser weaponry, blasters converted energy-rich gas to a glowing particle beam that could melt through targets. They came in a variety of sizes and shapes, including blaster pistols, heavy blaster pistols, and blaster rifles. Blaster artillery could also be mounted on droids[3] and vehicles.  They could deliver variable levels of damage intensity, from stun to kill settings. ',
        price: 99,
        quantity: 20,
        category: [cat.blasters]
      },
      {
        name: 'Blaster Rifle',
        description: 'Blaster rifles were weapons more powerful and larger than other types of blasters, such as blaster pistols. It was used in various factions.[1] Stormtroopers of the Imperial Army were armed with E-11 blaster rifles.',
        price: 225,
        quantity: 15,
        category: [cat.blasters]
      }

    ];
    console.log('seeding blasters...');
    return Product.insertMany(data);
}

module.exports = seed;
