let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");              //формат игры 2д

let tick = 100;  //начальная скорость 1

let button = document.getElementById("addButton");
let isStarted = false;

button.onclick = () => {
	buttonClick();
	isStarted = true;
}


function buttonClick(){


canvas.height = document.getElementById("pol1").value;
canvas.width = canvas.height;
	if (canvas.height <= 100) {
		alert('Поле слишком маленькое, Вам будет неудобно играть');
		document.getElementById("pol1").value = "";
		canvas.height = document.getElementById("pol1").value;
	};


const ground = new Image();
ground.src = "фон1.png";

const food = new Image();
food.src = "еда4.png";

const box = 20;     // размер клетки поля

let score = 0;

let foodDraw = {                                   //координаты для еды
	x: Math.floor(Math.random() * (canvas.width - box)/box) * box,
	y: Math.floor(Math.random() * (canvas.height - box)/box) * box,
};

let snake = [];
snake[0] = {
	x: Math.floor(Math.random() * (canvas.width - box)/box) * box,
	y: Math.floor(Math.random() * (canvas.height - box)/box) * box,
};


document.onkeydown = direction;  //обращение к клаве

let dir; // переменная для управления
let speed;  //переменная для скорости

function direction(event) {      //какая кнопка нажата
	if((event.keyCode == 37 || event.keyCode == 65 || event.keyCode == 100) && dir != 'right')
		dir = 'left';
	else if((event.keyCode == 38 || event.keyCode == 87 || event.keyCode == 104) && dir != 'down')
		dir = 'up';
	else if((event.keyCode == 39 || event.keyCode == 68 || event.keyCode == 102) && dir != 'left')
		dir = 'right';
	else if((event.keyCode == 40 || event.keyCode == 83 || event.keyCode == 98) && dir != 'up')
		dir = 'down';		
	else if(event.keyCode == 49)
		speed = '1';
	else if(event.keyCode == 50)
		speed = '2';
	else if(event.keyCode == 51)
		speed = '3';
	else if(event.keyCode == 52) 
		speed = '4';
	else if(event.keyCode == 53)
		speed = '5';
	else if(event.keyCode == 54)
		speed = '6';
	else if(event.keyCode == 55)
		speed = '7';
	else if(event.keyCode == 56)
		speed = '8';
	else if(event.keyCode == 57)
		speed = '9';
}


function eatBody(head, arr){                   //если ест сама себя
	for(let i = 0; i < arr.length; i++){
		if(head.x == arr[i].x && head.y == arr[i].y)
			return true;
		}
	return false;
}



function draw() {                     //функция для поля
	ctx.drawImage(ground, 0, 0, canvas.width, canvas.height);
	document.getElementById('canvas').style.border = '5px solid rgb(240, 213, 213)';

	if(isStarted){
		button.disabled = true;
	} 
	
	
	ctx.drawImage(food, foodDraw.x, foodDraw.y); //отображение еды


	for(let i = 0; i < snake.length; i++){
		ctx.fillStyle = i == 0 ? "green" : "yellow";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);  //отображение змейки
	};
	
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box - 14, box * 2);
	

	let snakeX = snake[0].x;  //координаты головы змеи
	let snakeY = snake[0].y;



	if(snakeX == foodDraw.x && snakeY == foodDraw.y){  //когда съели еду, создаем новую
		score++;  
		foodDraw = {                         
			x: Math.floor(Math.random() * (canvas.width - box)/box) * box,
			y: Math.floor(Math.random() * (canvas.height - box)/box) * box,
		}; 
	} else {
			snake.pop(); //удаление последнего элемента в массиве
		}
		

	if(dir == 'left') snakeX -= box;
	if(dir == 'right') snakeX += box;
	if(dir == 'up') snakeY -= box;
	if(dir == 'down') snakeY += box;


	if(speed == '1') tick = 100;
	else if(speed == '2') tick = 90;
	else if(speed == '3') tick = 80; 
	else if(speed == '4') tick = 70;
	else if(speed == '5') tick = 60;
	else if(speed == '6') tick = 50;
	else if(speed == '7') tick = 40;
 	else if(speed == '8') tick = 30;
	else if(speed == '9') tick = 20;


	let firstEl = {    //для передачи координат головы
			x: snakeX,
			y: snakeY,
		};

	game = setTimeout(draw, tick)

	if((snakeX < 0 || snakeX > canvas.width - box || snakeY > canvas.height - box || snakeY < 0) || eatBody(firstEl, snake)){
		button.disabled = false;
		clearTimeout(game);  //это при выходе за пределы остановка игры
	}
	
	

	snake.unshift(firstEl);  //добавить новые клетки
};

let game = setTimeout(draw, tick); //вызов функции каждые сколько-то мс
   
}





