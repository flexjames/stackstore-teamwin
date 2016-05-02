var categories = require('./categories'),
  Product = require('mongoose').model('Product');

function seed(cat){
    var root = '/images/products/blasters/';
    var data = [
      {
        name: 'Standard Blaster',
        description: 'Operating under the same principles as laser weaponry, blasters converted energy-rich gas to a glowing particle beam that could melt through targets. They came in a variety of sizes and shapes, including blaster pistols, heavy blaster pistols, and blaster rifles. Blaster artillery could also be mounted on droids[3] and vehicles.  They could deliver variable levels of damage intensity, from stun to kill settings. ',
        price: 99,
        quantity: 20,
        category: [cat.blasters],
        imageUrl: [root + 'pistol.jpg' ]
      },
      {
        name: 'Blaster Rifle',
        description: 'Blaster rifles were weapons more powerful and larger than other types of blasters, such as blaster pistols. It was used in various factions.[1] Stormtroopers of the Imperial Army were armed with E-11 blaster rifles.',
        price: 225,
        quantity: 15,
        category: [cat.blasters],
        imageUrl: [root + 'blaster_rifle.jpg']
      },
      {
        name: 'D-17 Blaster Pistol',
        description:'The DH-17 blaster pistol was commonly used by soldiers of the Rebel Alliance for conflicts aboard starships, and sometimes the officers of the Galactic Empire carried it instead of the standard E-11 blaster rifles.',
        price: 125,
        quantity: 10,
        category: [cat.blasters],
        imageUrl: [root + 'dh-17.jpg']
      },
      {
        name: 'A280C Blaster Rifle',
        description:'A280C is a sturdy and powerful blaster rifle that has a high rate of fire and excellent firepower. Modified from the A280 rifle, it was the favored weapon of Alliance commandos.',
        price: 250,
        quantity: 10,
        category: [cat.blasters],
        imageUrl: [root + 'A280C_Rifle.jpg']
      },
      {
        name: 'CA-87 Blaster',
        description:'The CA-87 is a retro-fitted Jawa blaster that is extremely deadly at short range, but near useless at medium and long range.',
        price: 175,
        quantity: 6,
        category: [cat.blasters],
        imageUrl: [root + 'CA-87_Blaster.jpg']
      },
      {
        name: 'DL-44 Blaster',
        description:'The DL-44 is one of the most powerful blaster pistols in the galaxy. It delivers massive damage at close range, but overheats quickly.',
        price: 185,
        quantity: 3,
        category: [cat.blasters],
        imageUrl: [root + 'DL-44_Blaster.png']
      },
      {
        name: 'DLT-19 Blaster Rifle',
        description:'The DLT-19 is a heavy blaster with an excellent rate of fire that deals heavy damage at long range, capable of pinning down troops and taking out large groups of enemies.',
        price: 265,
        quantity: 7,
        category: [cat.blasters],
        imageUrl: [root + 'DLT-19_Rifle.jpg']
      },
      {
        name: 'EE-3 Blaster',
        description:'The EE-3 is an optically fitted Blaster Rifle capable of 3-round burst fire at long ranges.',
        price: 165,
        quantity: 6,
        category: [cat.blasters],
        imageUrl: [root + 'EE-3_Blaster.png']
      },
      {
        name: 'RT-97C Blaster Rifle',
        description:'The RT-97C is a versatile heavy blaster, fitted with optics to allow use at long range.',
        price: 225,
        quantity: 4,
        category: [cat.blasters],
        imageUrl: [root + 'RT-97C_Rifle.jpg']
      },
       {
        name: 'SE-14C Blaster',
        description:'The SE-14C is a blaster pistol that fires 5-round bursts, making it ideal for close-quarter combat.',
        price: 245,
        quantity: 8,
        category: [cat.blasters],
        imageUrl: [root + 'SE-14C_Blaster.png']
      }
    ];
    console.log('seeding blasters...');
    return Product.insertMany(data);
}

module.exports = seed;
