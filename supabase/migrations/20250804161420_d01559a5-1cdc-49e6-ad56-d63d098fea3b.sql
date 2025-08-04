-- Insert existing listings data into the new table with proper UUIDs
INSERT INTO public.listings (
  title, description, location, image_url, neuro_score, user_rating, 
  certification, amenities, full_description, price, capacity, hours_of_operation
) VALUES 
-- Listing 1: The Jellicoe - Fora Space
(
  'The Jellicoe - Fora Space',
  'A leading example of neuro-inclusive workspace design, offering exceptional acoustic comfort, biophilic elements, and highly flexible environments to enhance focus and creativity.',
  'King''s Cross, London, UK',
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop',
  9.5,
  4.9,
  'QSC Certified',
  '[
    {"name": "Biophilic Design", "icon": "trees"},
    {"name": "Acoustic Comfort", "icon": "headphones"},
    {"name": "Flexible Workspaces", "icon": "move"},
    {"name": "Natural Light", "icon": "sun"},
    {"name": "Quiet Pods", "icon": "volume-x"},
    {"name": "Sensory Break Room", "icon": "coffee"}
  ]'::jsonb,
  'Fora Space represents the future of neuroinclusive office design. Our Soho location has been meticulously crafted to support neurodivergent professionals through thoughtful environmental design. The space features extensive biophilic elements including living walls and natural materials that create a calming connection to nature. Advanced acoustic treatments ensure optimal sound comfort, while flexible workspace configurations allow users to find their ideal environment. Circadian lighting systems automatically adjust throughout the day, and dedicated quiet pods provide sanctuary spaces for focused work or decompression.',
  '£55/day',
  '45 people',
  '24/7 access for members'
),
-- Listing 2: The Ministry - Borough
(
  'The Ministry - Borough',
  'A vibrant and flexible workspace in a converted Victorian printworks, designed for community and productivity with diverse amenities to support different working styles.',
  'Borough, South London, UK',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
  8.5,
  4.7,
  'Self Certified',
  '[
    {"name": "Natural Light", "icon": "sun"},
    {"name": "Quiet Zones", "icon": "volume-x"},
    {"name": "Ergonomic Seating", "icon": "armchair"},
    {"name": "Community Events", "icon": "users"},
    {"name": "Good Ventilation", "icon": "wind"},
    {"name": "Fitness Facilities", "icon": "dumbbell"}
  ]'::jsonb,
  'The Ministry transforms a historic Victorian printworks into London''s most dynamic workspace community. This 50,000 sq ft space combines the energy of a members club with the productivity of a modern office. Features include abundant natural light throughout the converted industrial space, dedicated quiet zones for focused work, and ergonomic furniture selected for comfort during long work sessions. The space includes fitness facilities, in-house dining, and regular community events that foster collaboration while respecting individual working preferences.',
  '£45/day',
  '200+ people',
  '6 AM - 11 PM daily'
),
-- Listing 3: White Collar Factory - Old Street
(
  'White Collar Factory - Old Street',
  'Award-winning workspace in the heart of Tech City, featuring advanced sustainability, platinum smart building certification, and occupant well-being focus.',
  'Old Street, London, UK',
  'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop',
  9.0,
  4.8,
  'QSC Certified',
  '[
    {"name": "Natural Light", "icon": "sun"},
    {"name": "Air Filtration", "icon": "wind"},
    {"name": "Smart Building Tech", "icon": "smartphone"},
    {"name": "Bike Storage", "icon": "bike"},
    {"name": "Communal Terraces", "icon": "trees"},
    {"name": "Temperature Control", "icon": "thermometer"}
  ]'::jsonb,
  'White Collar Factory sets the standard for smart, sustainable workspace design in London''s Tech City. This 16-storey tower achieved Platinum SmartScore certification, recognizing exceptional user experiences and future-readiness. The building features floor-to-ceiling windows maximizing natural light, advanced air filtration systems for optimal air quality, and precise environmental controls. Smart building technology automatically adjusts lighting, temperature, and ventilation based on occupancy and external conditions. Multiple communal terraces provide outdoor access and biophilic relief from urban density.',
  '£65/day',
  '1000+ people',
  '24/7 access for members'
),
-- Listing 4: Mindful Coworking Studio
(
  'Mindful Coworking Studio',
  'A serene workspace designed for neurodiverse professionals in Portland''s downtown core, featuring sensory-friendly materials and advanced lighting systems.',
  'Downtown Portland, OR, USA',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  9.2,
  4.8,
  'Self Certified',
  '[
    {"name": "Quiet Zones", "icon": "volume-x"},
    {"name": "Natural Light", "icon": "sun"},
    {"name": "No Fluorescent", "icon": "lightbulb"},
    {"name": "Soundproofing", "icon": "headphones"},
    {"name": "Adjustable Lighting", "icon": "settings"},
    {"name": "Sensory Break Room", "icon": "coffee"}
  ]'::jsonb,
  'Our Mindful Coworking Studio represents the gold standard in neuro-inclusive workspace design. Every element has been carefully considered to support neurodivergent professionals. The space features advanced circadian lighting systems that automatically adjust throughout the day, eliminating harsh fluorescents entirely. Multiple quiet zones provide sanctuary for those who need to decompress, while our dedicated sensory break room offers fidget tools, weighted blankets, and calming textures.',
  '$45/day',
  '20 people',
  '24/7 access for members'
),
-- Listing 5: Calm Collective Workspace
(
  'Calm Collective Workspace',
  'Open yet peaceful environment with designated focus areas, soft textures, and excellent acoustics for concentration in San Francisco''s Mission District.',
  'Mission District, San Francisco, CA, USA',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
  8.7,
  4.6,
  'Not certified',
  '[
    {"name": "Focus Pods", "icon": "target"},
    {"name": "Soft Textures", "icon": "feather"},
    {"name": "White Noise", "icon": "radio"},
    {"name": "Plant-Filled", "icon": "leaf"},
    {"name": "Ergonomic Seating", "icon": "armchair"}
  ]'::jsonb,
  'Calm Collective redefines the traditional coworking experience with a neuro-conscious approach to space design. Our thoughtfully curated environment balances openness with privacy, featuring individual focus pods for deep work and collaborative areas with superior acoustic treatments. The space is abundantly filled with greenery, creating a biophilic environment that naturally reduces stress and improves cognitive function.',
  '$38/day',
  '35 people',
  '6 AM - 10 PM daily'
),
-- Listing 6: Tech Hub Coworking
(
  'Tech Hub Coworking',
  'Modern workspace in Seattle''s Capitol Hill with individual pods, circadian lighting, and precise environmental controls for optimal cognitive performance.',
  'Capitol Hill, Seattle, WA, USA',
  'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop',
  8.9,
  4.7,
  'Self Certified',
  '[
    {"name": "Private Pods", "icon": "shield"},
    {"name": "Circadian Light", "icon": "clock"},
    {"name": "Temperature Control", "icon": "thermometer"},
    {"name": "Ultra Quiet", "icon": "volume-x"},
    {"name": "Air Purification", "icon": "wind"},
    {"name": "Biophilic Design", "icon": "trees"}
  ]'::jsonb,
  'Tech Hub Coworking represents advanced workspace technology tailored for cognitive optimization. Each individual pod is a micro-environment where users have complete control over their sensory experience. Advanced circadian lighting systems automatically sync with your natural rhythms, while precision climate control maintains optimal temperature and humidity levels.',
  '$52/day',
  '25 people',
  '24/7 access for members'
);