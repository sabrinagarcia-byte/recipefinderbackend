import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

async function main() {
  const adminHash = await bcrypt.hash("password", 10);
  const managerHash = await bcrypt.hash("password", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@recipefinder.com" },
    update: {},
    create: {
      name: "Admin",
      username: "admin",
      email: "admin@recipefinder.com",
      password: adminHash,
      role: "admin",
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: "content_manager@recipefinder.com" },
    update: {},
    create: {
      name: "Content Manager",
      username: "content_manager",
      email: "content_manager@recipefinder.com",
      password: managerHash,
      role: "content_manager",
    },
  });

  const recipes = [
    {
      slug: "quinoa-veggie-power-bowl",
      title: "Quinoa Veggie Power Bowl",
      summary:
        "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/quinoa-veggie-bowl_ddfjs7.webp",
      servings: 2,
      prepMinutes: 10,
      cookMinutes: 15,
      ingredients: [
        { name: "1 cup cooked quinoa (from 1/3 cup dry)", order: 1 },
        { name: "1 cup roasted sweet potato cubes", order: 2 },
        { name: "1 cup baby spinach", order: 3 },
        { name: "1/2 cup chickpeas, drained & rinsed", order: 4 },
        { name: "1/2 avocado, sliced", order: 5 },
        { name: "1 Tbsp pumpkin seeds", order: 6 },
        { name: "1 Tbsp extra-virgin olive oil", order: 7 },
        { name: "1 Tbsp fresh lemon juice", order: 8 },
        { name: "Sea salt & black pepper", order: 9 },
      ],
      instructions: [
        {
          description:
            "Cook quinoa according to package, fluff and cool slightly.",
          order: 1,
        },
        {
          description:
            "In bowls layer spinach, quinoa, sweet potato and chickpeas.",
          order: 2,
        },
        { description: "Top with avocado slices and pumpkin seeds.", order: 3 },
        {
          description:
            "Whisk olive oil, lemon juice, salt & pepper; drizzle over bowls.",
          order: 4,
        },
      ],
    },
    {
      slug: "one-pan-lemon-garlic-salmon-with-asparagus",
      title: "One-Pan Lemon Garlic Salmon with Asparagus",
      summary:
        "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/salmon-asparagus_ol3rb1.webp",
      servings: 2,
      prepMinutes: 5,
      cookMinutes: 12,
      ingredients: [
        { name: "2 salmon fillets (125 g each)", order: 1 },
        { name: "200 g asparagus spears, trimmed", order: 2 },
        { name: "1 Tbsp extra-virgin olive oil", order: 3 },
        { name: "2 garlic cloves, minced", order: 4 },
        { name: "1/2 lemon, sliced", order: 5 },
        { name: "Sea salt & black pepper", order: 6 },
      ],
      instructions: [
        {
          description: "Heat a large skillet over medium-high with olive oil.",
          order: 1,
        },
        {
          description:
            "Season salmon and asparagus with salt, pepper, and minced garlic.",
          order: 2,
        },
        {
          description: "Place salmon skin-side down; arrange asparagus around.",
          order: 3,
        },
        {
          description:
            "Cook 4 min, flip salmon, add lemon slices, cook 4-5 min more until salmon is opaque.",
          order: 4,
        },
        { description: "Serve hot with pan juices.", order: 5 },
      ],
    },
    {
      slug: "mediterranean-chickpea-salad",
      title: "Mediterranean Chickpea Salad",
      summary:
        "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/mediterranean-chickpea-salad_xzypc6.webp",
      servings: 2,
      prepMinutes: 10,
      cookMinutes: 0,
      ingredients: [
        { name: "1 can (400 g) chickpeas, drained & rinsed", order: 1 },
        { name: "1 small cucumber, diced", order: 2 },
        { name: "1 cup cherry tomatoes, halved", order: 3 },
        { name: "1/2 red bell pepper, diced", order: 4 },
        { name: "1/4 red onion, finely chopped", order: 5 },
        { name: "2 Tbsp fresh parsley, chopped", order: 6 },
        { name: "2 Tbsp extra-virgin olive oil", order: 7 },
        { name: "1 Tbsp fresh lemon juice", order: 8 },
        { name: "Sea salt & black pepper to taste", order: 9 },
      ],
      instructions: [
        {
          description:
            "In a large bowl combine chickpeas, cucumber, tomatoes, bell pepper, red onion and parsley.",
          order: 1,
        },
        { description: "Drizzle with olive oil and lemon juice.", order: 2 },
        { description: "Season with salt and pepper; toss to coat.", order: 3 },
        { description: "Serve immediately or chill up to 2 days.", order: 4 },
      ],
    },
    {
      slug: "greek-yogurt-berry-parfait",
      title: "Greek Yogurt Berry Parfait",
      summary:
        "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/greek-yogurt_fveiwl.webp",
      servings: 1,
      prepMinutes: 5,
      cookMinutes: 0,
      ingredients: [
        { name: "1 cup plain Greek yogurt", order: 1 },
        { name: "1/2 cup mixed fresh berries", order: 2 },
        { name: "2 Tbsp rolled oats", order: 3 },
        { name: "1 tsp honey", order: 4 },
        { name: "1 tsp chia seeds", order: 5 },
      ],
      instructions: [
        {
          description: "In a glass, layer half the yogurt, berries and oats.",
          order: 1,
        },
        { description: "Repeat layers and drizzle with honey.", order: 2 },
        { description: "Sprinkle chia seeds and serve.", order: 3 },
      ],
    },
    {
      slug: "banana-oat-pancakes",
      title: "Banana Oat Pancakes",
      summary: "Flour-free pancakes sweetened naturally with ripe bananas.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/banana-pancakes_yrguai.webp",
      servings: 2,
      prepMinutes: 5,
      cookMinutes: 10,
      ingredients: [
        { name: "2 ripe bananas", order: 1 },
        { name: "1 cup rolled oats", order: 2 },
        { name: "2 eggs", order: 3 },
        { name: "1 tsp baking powder", order: 4 },
        { name: "1/2 tsp cinnamon", order: 5 },
        { name: "Olive oil for cooking", order: 6 },
        { name: "Fresh fruit to serve", order: 7 },
      ],
      instructions: [
        {
          description:
            "Blend bananas, oats, eggs, baking powder and cinnamon until smooth.",
          order: 1,
        },
        {
          description:
            "Heat lightly oiled skillet on medium; pour 1/4-cup batter circles.",
          order: 2,
        },
        { description: "Cook 2-3 min each side until golden.", order: 3 },
        { description: "Serve with fresh fruit.", order: 4 },
      ],
    },
    {
      slug: "lentil-spinach-soup",
      title: "Lentil & Spinach Soup",
      summary: "A hearty 30-minute soup rich in plant protein and iron.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/lentil-soup_lj0fkp.webp",
      servings: 4,
      prepMinutes: 10,
      cookMinutes: 20,
      ingredients: [
        { name: "1 Tbsp olive oil", order: 1 },
        { name: "1 onion, diced", order: 2 },
        { name: "1 carrot, diced", order: 3 },
        { name: "1 celery stalk, diced", order: 4 },
        { name: "2 garlic cloves, minced", order: 5 },
        { name: "1 cup dry red lentils, rinsed", order: 6 },
        { name: "400 g canned diced tomatoes", order: 7 },
        { name: "4 cups vegetable broth", order: 8 },
        { name: "2 cups baby spinach", order: 9 },
        { name: "1/2 tsp ground cumin", order: 10 },
        { name: "Sea salt & black pepper", order: 11 },
      ],
      instructions: [
        {
          description: "Heat oil in a pot; sauté onion, carrot, celery 4 min.",
          order: 1,
        },
        { description: "Add garlic & cumin; cook 1 min.", order: 2 },
        {
          description: "Stir in lentils, tomatoes and broth; bring to boil.",
          order: 3,
        },
        { description: "Simmer 15 min until lentils tender.", order: 4 },
        {
          description: "Stir in spinach until wilted, season and serve.",
          order: 5,
        },
      ],
    },
    {
      slug: "sweet-potato-black-bean-tacos",
      title: "Sweet Potato Black Bean Tacos",
      summary:
        "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/sweet-potato-tacos_qadv87.webp",
      servings: 3,
      prepMinutes: 10,
      cookMinutes: 15,
      ingredients: [
        { name: "6 small corn tortillas", order: 1 },
        { name: "1 medium sweet potato, diced small", order: 2 },
        { name: "1 cup canned black beans, rinsed", order: 3 },
        { name: "1 Tbsp olive oil", order: 4 },
        { name: "1/2 tsp ground cumin", order: 5 },
        { name: "1/2 tsp smoked paprika", order: 6 },
        { name: "Juice of 1/2 lime", order: 7 },
        { name: "1/2 cup shredded red cabbage", order: 8 },
        { name: "Fresh cilantro & salsa to serve", order: 9 },
      ],
      instructions: [
        {
          description:
            "Toss sweet potato cubes with oil, cumin, paprika, salt; roast in air-fryer or oven at 200 °C for 12 min.",
          order: 1,
        },
        { description: "Warm tortillas in a dry skillet.", order: 2 },
        {
          description:
            "Fill tortillas with roasted sweet potatoes, black beans and cabbage.",
          order: 3,
        },
        {
          description: "Squeeze lime juice, add salsa and cilantro.",
          order: 4,
        },
      ],
    },
    {
      slug: "avocado-tomato-wholegrain-toast",
      title: "Avocado & Tomato Wholegrain Toast",
      summary:
        "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
      cover:
        "https://res.cloudinary.com/dpfyoxbyv/image/upload/v1778070904/avocado-tomato-wholegrain-toast_wrjzuo.webp",
      servings: 1,
      prepMinutes: 5,
      cookMinutes: 5,
      ingredients: [
        { name: "2 slices wholegrain bread", order: 1 },
        { name: "1 ripe avocado", order: 2 },
        { name: "6 cherry tomatoes, quartered", order: 3 },
        { name: "1 tsp extra-virgin olive oil", order: 4 },
        { name: "1 tsp fresh lemon juice", order: 5 },
        { name: "Sea salt, black pepper, pinch chili flakes", order: 6 },
      ],
      instructions: [
        { description: "Toast the bread to desired crispness.", order: 1 },
        {
          description: "Mash avocado with lemon juice, salt and pepper.",
          order: 2,
        },
        {
          description: "Spread avocado on toast and top with tomatoes.",
          order: 3,
        },
        {
          description: "Drizzle olive oil and sprinkle chili flakes.",
          order: 4,
        },
      ],
    },
  ];

  for (const recipe of recipes) {
    const { ingredients, instructions, ...recipeData } = recipe;

    const existing = await prisma.recipe.findUnique({
      where: { slug: recipeData.slug },
    });
    if (existing) continue;

    await prisma.recipe.create({
      data: {
        ...recipeData,
        userId: manager.id,
        ingredients: { create: ingredients },
        instructions: { create: instructions },
      },
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
