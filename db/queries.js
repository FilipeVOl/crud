const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");
    return rows;
}

async function insertGame(game) {
    const { rows } = await pool.query("INSERT INTO games (title, price, rating) VALUES ($1, $2, $3)", [game.title, game.price, game.rating]);
}

async function updateGame(game) {
    const { rows } = await pool.query("UPDATE games SET title = $1, price = $2, rating = $3 WHERE id = $4", [game.title, game.price, game.rating, game.id]);
}

async function getGameById(id) {
    const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    return rows[0];
}

async function deleteGameById(id) {
    const result = await pool.query("DELETE FROM games WHERE id = $1", [id]);
    return result.rowCount;
}

module.exports = {
    getAllGames,
    insertGame,
    updateGame,
    getGameById,
    deleteGameById
}
