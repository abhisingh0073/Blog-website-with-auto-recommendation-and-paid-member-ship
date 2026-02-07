import express from "express";
import { Router } from "express";
import { searchPosts, searchSuggestion } from "../controllers/searchController.js";


const searchRoute = express.Router();
searchRoute.get("/", searchPosts);
searchRoute.get("/suggestions", searchSuggestion);


export default searchRoute;