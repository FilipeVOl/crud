const express = require('express');
const { getAllGames, getGameById, insertGame, updateGame, deleteGameById } = require('../db/queries');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('new');
});

router.post("/create", async (req, res) => {
    try {
        const game = {
            title: req.body.title,
            price: req.body.price,
            rating: req.body.rating
        };
        await insertGame(game);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting game');
    }     
});

router.get("/", async (req, res) => {
    try {
        const games = await getAllGames();
        res.render('index', { games });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching games');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const game = await getGameById(req.params.id);
        res.render('edit', { game });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching game for update');
    }
});

router.post('/update/:id', async (req, res) => {
    try {
    const { title, price, rating, id } = req.body;
    const game = { title, price, rating, id };

    const rowCount = await updateGame(game);
    if (rowCount === 0) {
        return res.status(404).send('Game not found');
    }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating game');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const rowCount = await deleteGameById(req.params.id);
        if (rowCount === 0) {
            return res.status(404).send('Game not found');
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting game');
    }
});

module.exports = router;