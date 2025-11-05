import { databases } from "../appwriteConfig";
import { Query } from "appwrite";

const databaseId = "YOUR_DATABASE_ID";
const collectionId = "690b565b0038a47ec1f7";

export const addFavorite = async (userId, movie) => {
  await databases.createDocument(databaseId, collectionId, "unique()", {
    userId,
    movieId: movie.imdbID,
    movieTitle: movie.Title,
    moviePoster: movie.Poster,
  });
};

export const getFavorites = async (userId) => {
  const response = await databases.listDocuments(databaseId, collectionId, [
    Query.equal("userId", userId),
  ]);
  return response.documents;
};
