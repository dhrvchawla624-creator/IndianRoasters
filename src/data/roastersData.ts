import type { RoasterData, LocationData } from '../types/roasters';

export const ROASTERS_DATA: RoasterData[] = [
  {
    name: 'Blue Tokai Coffee Roasters',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://bluetokaicoffee.com',
    collections: ['https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans'],
    description: 'Pioneer of third-wave coffee culture in India',
    specialties: ['Single Origins', 'Filter Coffee', 'Espresso Blends'],
    established: '2013'
  },
  {
    name: 'Savourworks',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://www.savorworksroasters.com',
    collections: ['https://www.savorworksroasters.com/collections/coffee'],
    description: 'Artisanal coffee roasting with focus on sustainability',
    specialties: ['Micro Lots', 'Natural Process', 'Experimental Fermentation'],
    established: '2018'
  },
  {
    name: 'Quick Brown Fox',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://qbfcoffee.com',
    collections: ['https://qbfcoffee.com/collections/all-coffees'],
    description: 'Specialty coffee with unique packaging and branding',
    specialties: ['Light Roasts', 'Single Origins', 'Creative Blends'],
    established: '2019'
  },
  {
    name: 'GreySoul',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'https://greysoul.coffee',
    collections: ['https://greysoul.coffee/collections/coffee'],
    description: 'Modern approach to traditional South Indian coffee',
    specialties: ['Filter Coffee', 'Traditional Blends', 'Chicory Blends'],
    established: '2017'
  },
  {
    name: 'Home Blends',
    city: 'Noida',
    state: 'Uttar Pradesh',
    website: 'https://homeblendcoffee.com',
    collections: [
      'https://homeblendcoffee.com/collections/ground',
      'https://homeblendcoffee.com/collections/whole-bean-coffee',
      'https://homeblendcoffee.com/collections/international-specialty-coffee'
    ],
    description: 'Home-style coffee blending with international varieties',
    specialties: ['House Blends', 'International Coffees', 'Custom Grinding'],
    established: '2015'
  },
  {
    name: 'Kaapi Kottai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    website: 'https://kapikottai.coffee',
    collections: ['https://kapikottai.coffee/collections/all'],
    description: 'Traditional Tamil coffee culture meets modern roasting',
    specialties: ['Traditional Filter Coffee', 'South Indian Blends', 'Estate Coffees'],
    established: '2016'
  },
  {
    name: 'Tulum',
    city: 'Goa',
    state: 'Goa',
    website: 'https://www.tulum.coffee',
    collections: ['https://www.tulum.coffee/collections/roasted-coffees'],
    description: 'Coastal coffee culture with international influence',
    specialties: ['Beach Roasts', 'Tropical Blends', 'Cold Brew Concentrates'],
    established: '2020'
  },
  {
    name: 'Classic Coffees',
    city: 'Chikmagalur',
    state: 'Karnataka',
    website: 'https://www.classiccoffees.in',
    collections: [
      'https://www.classiccoffees.in/collections/roast-ground-custom-grind',
      'https://www.classiccoffees.in/collections/micro-lots'
    ],
    description: 'Estate-grown coffee from the heart of coffee country',
    specialties: ['Estate Coffees', 'Micro Lots', 'Traditional Processing'],
    established: '1990'
  },
  {
    name: 'Corridor Seven',
    city: 'Nagpur',
    state: 'Maharashtra',
    website: 'https://corridorseven.coffee',
    collections: ['https://corridorseven.coffee/collections/all'],
    description: 'Specialty coffee with focus on traceability and quality',
    specialties: ['Single Origins', 'Direct Trade', 'Seasonal Offerings'],
    established: '2019'
  },
  {
    name: 'Broot',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://brootcoffee.com',
    collections: ['https://brootcoffee.com/collections/all-coffees'],
    description: 'Urban coffee roastery with modern approach',
    specialties: ['Urban Blends', 'Espresso', 'Cold Brew'],
    established: '2018'
  },
  {
    name: 'Baarbara Coffee',
    city: 'Chikmagalur',
    state: 'Karnataka',
    website: 'https://www.baarbaracoffee.com',
    collections: [
      'https://www.baarbaracoffee.com/collections/premium-blends',
      'https://www.baarbaracoffee.com/collections/signature-collection',
      'https://www.baarbaracoffee.com/collections/specialty-coffee'
    ],
    description: 'Premium coffee with signature collection approach',
    specialties: ['Premium Blends', 'Signature Collection', 'Specialty Processing'],
    established: '2017'
  },
  {
    name: 'Fraction9',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://www.fraction9coffee.com',
    collections: ['https://www.fraction9coffee.com/collections/all'],
    description: 'Mathematical precision meets coffee artistry',
    specialties: ['Precision Roasting', 'Scientific Approach', 'Consistent Quality'],
    established: '2019'
  },
  {
    name: 'Bloom Coffee',
    city: 'Panchkula',
    state: 'Haryana',
    website: 'https://bloomcoffeeroasters.in',
    collections: ['https://bloomcoffeeroasters.in/collections/coffee'],
    description: 'Fresh roasting with focus on bloom and extraction',
    specialties: ['Fresh Roasts', 'Bloom Focus', 'Extraction Science'],
    established: '2018'
  },
  {
    name: "Devan's Coffee",
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://www.devans.in',
    collections: ['https://www.devans.in/collections/coffee'],
    description: 'Kerala spice-influenced coffee roasting',
    specialties: ['Spice Infusions', 'Kerala Blends', 'Monsoon Coffee'],
    established: '2005'
  },
  {
    name: 'Korebi Coffee',
    city: 'Ahmedabad',
    state: 'Gujarat',
    website: 'https://korebi.coffee',
    collections: ['https://korebi.coffee/collections/coffee'],
    description: 'Modern coffee roastery with Korean influence',
    specialties: ['Korean Style', 'Modern Techniques', 'Unique Processing'],
    established: '2020'
  },
  {
    name: 'Maverick & Farmer',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://www.maverickandfarmer.com',
    collections: ['https://www.maverickandfarmer.com/collections/shop-all'],
    description: 'Farm-to-cup coffee with maverick approach',
    specialties: ['Farm Direct', 'Maverick Approach', 'Farmer Relations'],
    established: '2017'
  },
  {
    name: 'Naked Coffee',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'https://nakedcoffee.in',
    collections: ['https://nakedcoffee.in/collections/whole-beans-ground'],
    description: 'Pure, unadorned coffee experience',
    specialties: ['Pure Coffee', 'Minimal Processing', 'Authentic Flavors'],
    established: '2016'
  },
  {
    name: 'Caarabi Coffee',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://caarabicoffee.com',
    collections: ['https://caarabicoffee.com/collections/shop-coffee'],
    description: 'Arabic coffee traditions with Indian touch',
    specialties: ['Arabic Traditions', 'Middle Eastern Influence', 'Traditional Brewing'],
    established: '2018'
  },
  {
    name: 'Caffinary',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'https://caffinary.com',
    collections: [
      'https://caffinary.com/collections/specialty-single-estate-origin',
      'https://caffinary.com/collections/freshly-roasted-ground-beans-freshly-roasted-whole-beans'
    ],
    description: 'Specialty single estate and freshly roasted beans',
    specialties: ['Single Estate', 'Fresh Roasting', 'Estate Origins'],
    established: '2019'
  },
  {
    name: 'Hill Tiger',
    city: 'Darjeeling',
    state: 'West Bengal',
    website: 'https://hilltiller.com',
    collections: ['https://hilltiller.com/collections/hill-tiller-coffee-roaster'],
    description: 'High altitude coffee from the hills of Darjeeling',
    specialties: ['High Altitude', 'Hill Coffee', 'Unique Terroir'],
    established: '2015'
  },
  {
    name: 'Beachville',
    city: 'Chennai',
    state: 'Tamil Nadu',
    website: 'https://beachvillecoffee.com',
    collections: ['https://beachvillecoffee.com/collections/all'],
    description: 'Coastal coffee roasting with beach vibes',
    specialties: ['Beach Culture', 'Coastal Blends', 'Relaxed Roasting'],
    established: '2019'
  },
  {
    name: 'Coffeeverse',
    city: 'Ahemedabad',
    state: 'Gujarat',
    website: 'https://coffeeverse.co.in',
    collections: ['https://coffeeverse.co.in/collections/shop-all'],
    description: 'Exploring the universe of coffee possibilities',
    specialties: ['Exploration', 'Universe of Flavors', 'Innovative Blends'],
    established: '2020'
  },
  {
    name: 'Rossette',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://rossettecoffee.com',
    collections: ['https://rossettecoffee.com/collections/coffee'],
    description: 'Elegant coffee roasting with artistic approach',
    specialties: ['Artistic Roasting', 'Elegant Blends', 'Visual Appeal'],
    established: '2018'
  },
  {
    name: 'Black Baza',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://www.blackbazacoffee.com',
    collections: ['https://www.blackbazacoffee.com/collections/coffee'],
    description: 'Bird-inspired coffee roasting with natural focus',
    specialties: ['Nature Inspired', 'Bird Conservation', 'Natural Processing'],
    established: '2017'
  },
  {
    name: 'Bombay Island',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'https://www.bombayisland.com',
    collections: ['https://www.bombayisland.com/collections/coffee'],
    description: 'Island coffee culture in the heart of Mumbai',
    specialties: ['Island Culture', 'Mumbai Blends', 'Urban Coffee'],
    established: '2019'
  },
  {
    name: 'Half Light',
    city: 'Jaipur',
    state: 'Rajasthan',
    website: 'https://halflightcoffee.com',
    collections: ['https://halflightcoffee.com/collections/coffee'],
    description: 'Coffee for the in-between moments of the day',
    specialties: ['Ambient Coffee', 'Day-to-Night Blends', 'Mood Coffee'],
    established: '2020'
  },
  {
    name: 'Ikkis Coffee',
    city: 'Chandigarh',
    state: 'Punjab',
    website: 'https://ikkis.coffee',
    collections: ['https://ikkis.coffee/collections/roasted-coffees'],
    description: '21st century coffee roasting techniques',
    specialties: ['Modern Techniques', 'Contemporary Roasting', 'Innovation'],
    established: '2021'
  },
  {
    name: 'Kaffacerrado',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://kaffacerrado.com',
    collections: [
      'https://kaffacerrado.com/collections/international-coffee',
      'https://kaffacerrado.com/collections/indian-coffee',
      'https://kaffacerrado.com/collections/tasting-packs'
    ],
    description: 'International and Indian coffee with tasting focus',
    specialties: ['International Varieties', 'Tasting Packs', 'Cupping Experience'],
    established: '2018'
  },
  {
    name: 'Capulus',
    city: 'Jaipur',
    state: 'Rajasthan',
    website: 'https://capulusbeans.com',
    collections: ['https://capulusbeans.com/collections/roasted-coffee'],
    description: 'Premium coffee beans with meticulous selection',
    specialties: ['Premium Selection', 'Meticulous Processing', 'Quality Focus'],
    established: '2019'
  },
  {
    name: 'Genetics',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://genetics.coffee',
    collections: ['https://genetics.coffee/collections/single-origins'],
    description: 'Coffee genetics and single origin focus',
    specialties: ['Coffee Genetics', 'Single Origins', 'Varietal Focus'],
    established: '2020'
  },
  {
    name: 'Roast Coffee',
    city: 'Hyderabad',
    state: 'Telangana',
    website: 'https://roastcoffee.in',
    collections: ['https://roastcoffee.in/collections/roasted-coffee-bean'],
    description: 'Simple name, exceptional roasted coffee beans',
    specialties: ['Exceptional Roasting', 'Simple Approach', 'Quality Beans'],
    established: '2017'
  },
  {
    name: 'Karma Kaapi',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://karmakaapi.com',
    collections: ['https://karmakaapi.com/collections/buy-coffee-online'],
    description: 'Ethical coffee with karma-driven approach',
    specialties: ['Ethical Sourcing', 'Karma Approach', 'Conscious Coffee'],
    established: '2018'
  },
  {
    name: 'Kumaradhara',
    city: 'Pune',
    state: 'Maharashtra',
    website: 'https://www.kumaradharacoffee.com',
    collections: ['https://www.kumaradharacoffee.com/collections/specialty-coffees'],
    description: 'River-inspired specialty coffee from coastal Karnataka',
    specialties: ['Coastal Karnataka', 'River Inspiration', 'Regional Varieties'],
    established: '2016'
  },
  {
    name: 'The Caffeine Baar',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://www.thecaffeinebaar.com',
    collections: ['https://www.thecaffeinebaar.com/collections/packaged-coffee'],
    description: 'Caffeine-focused coffee bar and roastery',
    specialties: ['Caffeine Focus', 'Bar Culture', 'Packaged Convenience'],
    established: '2019'
  },
  {
    name: 'Coffee Bean Project',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://coffeebeanproject.com',
    collections: ['https://coffeebeanproject.com/collections/all'],
    description: 'Project-based approach to coffee bean selection',
    specialties: ['Project Approach', 'Bean Selection', 'Systematic Quality'],
    established: '2018'
  },
  {
    name: 'Kafeido',
    city: 'Gurgaon',
    state: 'Haryana',
    website: 'https://www.kafeido.com',
    collections: ['https://www.kafeido.com/collections/coffee-beans'],
    description: 'Kaleidoscope of coffee flavors and experiences',
    specialties: ['Flavor Variety', 'Experience Focus', 'Colorful Blends'],
    established: '2020'
  },
  {
    name: 'Vui Vui',
    city: 'Mysore',
    state: 'Karnataka',
    website: 'https://vuivui.in',
    collections: ['https://vuivui.in/collections/all'],
    description: 'Joy-focused coffee with Vietnamese influence',
    specialties: ['Joy Focus', 'Vietnamese Style', 'Happy Coffee'],
    established: '2021'
  },
  {
    name: 'Dolshyne',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://www.dolshyne.com',
    collections: ['https://www.dolshyne.com/collections/specialty-coffee'],
    description: 'Northeast Indian specialty coffee with local terroir',
    specialties: ['Northeast India', 'Local Terroir', 'Regional Specialty'],
    established: '2019'
  },
  {
    name: 'Humble Bean',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://humblebean.com',
    collections: ['https://humblebean.com/collections/our-coffee-cart'],
    description: 'Humble approach to exceptional coffee beans',
    specialties: ['Humble Approach', 'Coffee Cart', 'Simple Excellence'],
    established: '2018'
  },
  {
    name: 'Siolim',
    city: 'Goa',
    state: 'Goa',
    website: 'https://www.siolim.coffee',
    collections: [
      'https://www.siolim.coffee/collections/roasted-coffee-shop-all',
      'https://www.siolim.coffee/collections/madeera-shop-all'
    ],
    description: 'Goan coffee culture with Portuguese influence',
    specialties: ['Goan Culture', 'Portuguese Influence', 'Coastal Roasting'],
    established: '2017'
  },
  {
    name: 'Kohi Roasters',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://kohiroasters.in',
    collections: ['https://kohiroasters.in/collections/frontpage'],
    description: 'Japanese-inspired coffee roasting techniques',
    specialties: ['Japanese Influence', 'Precision Roasting', 'Eastern Techniques'],
    established: '2019'
  },
  {
    name: 'Mokka Farms',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://www.mokkafarms.com',
    collections: [
      'https://www.mokkafarms.com/collections/roasted-coffee-beans',
      'https://www.mokkafarms.com/collections/premium-ground-coffee-1',
      'https://www.mokkafarms.com/collections/premium-ground-coffee-2'
    ],
    description: 'Farm-to-cup coffee from the heart of Coorg',
    specialties: ['Farm Direct', 'Coorg Origin', 'Estate Coffee'],
    established: '2010'
  },
  {
    name: 'Kup Coffee',
    city: 'Chennai',
    state: 'Tamil Nadu',
    website: 'https://www.kup.world',
    collections: ['https://www.kup.world/collections/globofilter-best-selling-products-index'],
    description: 'Global coffee in a cup with filter focus',
    specialties: ['Global Varieties', 'Filter Focus', 'World Coffee'],
    established: '2020'
  },
  {
    name: 'Landour Coffee',
    city: 'Mussoorie',
    state: 'Uttarakhand',
    website: 'https://www.landourcoffee.com',
    collections: ['https://www.landourcoffee.com/collections/coffee'],
    description: 'Hill station coffee with mountain terroir',
    specialties: ['Hill Station', 'Mountain Terroir', 'High Altitude'],
    established: '2018'
  },
  {
    name: 'Drum Coffee',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'https://drumcoffeeroasters.in',
    collections: ['https://drumcoffeeroasters.in/collections/all-coffee-1'],
    description: 'Rhythmic approach to coffee roasting',
    specialties: ['Rhythmic Roasting', 'Musical Approach', 'Beat-driven'],
    established: '2019'
  },
  {
    name: 'Hermit Coffee',
    city: 'Delhi',
    state: 'Delhi',
    website: 'https://hermitcoffee.in',
    collections: ['https://hermitcoffee.in/collections/beans'],
    description: 'Solitary focus on perfect coffee beans',
    specialties: ['Solitary Focus', 'Perfect Beans', 'Hermit Quality'],
    established: '2020'
  },
  {
    name: 'Ekata Coffee',
    city: 'Chikmagalur',
    state: 'Karnataka',
    website: 'https://shop.ekatacoffee.com',
    collections: ['https://shop.ekatacoffee.com/collections/shop-now'],
    description: 'Unity in coffee - bringing communities together',
    specialties: ['Unity Focus', 'Community Building', 'Social Impact'],
    established: '2018'
  },
  {
    name: 'First Crack',
    city: 'Jodhpur',
    state: 'Rajasthan',
    website: 'https://firstcrackcoffeeroasters.com',
    collections: ['https://firstcrackcoffeeroasters.com/collections/coffee-cups'],
    description: 'First crack perfection in every roast',
    specialties: ['First Crack', 'Roast Perfection', 'Technical Excellence'],
    established: '2017'
  },
  {
    name: 'Seven Beans',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'https://sevenbeans.co',
    collections: ['https://sevenbeans.co/collections/coffee'],
    description: 'Seven perfect beans make the perfect cup',
    specialties: ['Perfect Selection', 'Seven Bean Philosophy', 'Curated Quality'],
    established: '2019'
  },
  {
    name: '93 Degree',
    city: 'Gurgaon',
    state: 'Haryana',
    website: 'https://93degreescoffeeroasters.com',
    collections: ['https://93degreescoffeeroasters.com/collections/coffee'],
    description: 'Perfect temperature for perfect coffee extraction',
    specialties: ['Temperature Precision', 'Extraction Science', 'Technical Brewing'],
    established: '2018'
  },
  {
    name: 'Dope Coffee',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'https://dopecoffee.in',
    collections: ['https://dopecoffee.in/collections/coffee'],
    description: 'Exceptionally good coffee with urban appeal',
    specialties: ['Urban Appeal', 'Exceptional Quality', 'Street Culture'],
    established: '2020'
  },
  {
    name: 'Kaveri Coffee',
    city: 'Mysore',
    state: 'Karnataka',
    website: 'https://www.kavericoffee.com',
    collections: ['https://www.kavericoffee.com/collections/coffee'],
    description: 'River-blessed coffee from the Kaveri delta',
    specialties: ['River Delta', 'Regional Terroir', 'Traditional Processing'],
    established: '2015'
  }
];

// Generate location data from roasters
export const LOCATION_DATA: LocationData[] = [
  {
    state: 'Karnataka',
    cities: ['Bangalore', 'Chikmagalur', 'Coorg', 'Mangalore', 'Mysore'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Karnataka').length
  },
  {
    state: 'Maharashtra',
    cities: ['Mumbai', 'Pune', 'Nagpur'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Maharashtra').length
  },
  {
    state: 'Delhi',
    cities: ['Delhi'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Delhi').length
  },
  {
    state: 'Tamil Nadu',
    cities: ['Chennai'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Tamil Nadu').length
  },
  {
    state: 'Goa',
    cities: ['Goa'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Goa').length
  },
  {
    state: 'Kerala',
    cities: ['Kochi'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Kerala').length
  },
  {
    state: 'Telangana',
    cities: ['Hyderabad'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Telangana').length
  },
  {
    state: 'West Bengal',
    cities: ['Darjeeling'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'West Bengal').length
  },
  {
    state: 'Rajasthan',
    cities: ['Jodhpur', 'Jaipur', 'Udaipur'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Rajasthan').length
  },
  {
    state: 'Haryana',
    cities: ['Gurgaon', 'Panchkula'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Haryana').length
  },
  {
    state: 'Uttarakhand',
    cities: ['Mussoorie'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Uttarakhand').length
  },
  {
    state: 'Uttar Pradesh',
    cities: ['Noida', 'Ghaziabad', 'Lucknow'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Uttar Pradesh').length
  },
  {
    state: 'Punjab',
    cities: ['Chandigarh', 'Ludhiana'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Punjab').length
  },
  {
    state: 'Gujarat',
    cities: ['Ahmedabad', 'Surat'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Gujarat').length
  },
  {
    state: 'Madhya Pradesh',
    cities: ['Indore', 'Bhopal'],
    roasterCount: ROASTERS_DATA.filter(r => r.state === 'Madhya Pradesh').length
  }
];
