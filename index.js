document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('game_canvas');
    var game = new Game(canvas);
    game.init();
});