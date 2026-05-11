import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./lib/prisma.js";

// Environment variables
const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

// App
const app = express();

// Middleware
app.use(cors({ origin: ORIGIN }));
app.use(express.static("public"));

// Routes

// Get recipe by slug
app.get("/api/v1/recipes/:slug", async (req, res) => {
  const { slug } = req.params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: {
      instructions: { orderBy: { order: "asc" } },
      ingredients: { orderBy: { order: "asc" } },
      user: { select: { id: true, name: true, username: true } },
    },
  });

  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  res.json(recipe);
});

// List recipes v1
app.get("/api/v1/recipes", async (req, res) => {
  const recipes = await prisma.recipe.findMany();
  res.json(recipes);
});

// List recipes v2 (filters + pagination)
app.get("/api/v2/recipes", async (req, res) => {
  const PAGE_SIZE = 6;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const { maxPrepTime, maxCookTime, search } = req.query;

  // Build dynamic where clause
  const where = {};

  if (maxPrepTime) {
    where.prepMinutes = { lte: parseInt(maxPrepTime) };
  }

  if (maxCookTime) {
    where.cookMinutes = { lte: parseInt(maxCookTime) };
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { ingredients: { some: { name: { contains: search } } } },
    ];
  }

  // Run query + count in parallel
  const [recipes, total] = await Promise.all([
    prisma.recipe.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.recipe.count({ where }),
  ]);

  res.json({
    recipes,
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    },
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
