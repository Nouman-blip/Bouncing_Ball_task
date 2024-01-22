document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const balls = [];
  
    class Ball {
      constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = getRandomColor();
      }
  // handle collison with canvas boundaries
      update() {
        this.x += this.dx;
        this.y += this.dy;
  
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.dx *= -1;
          this.changeColor();
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.dy *= -1;
          this.changeColor();
        }
      }
  
      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
  
      changeColor() {
        this.color = getRandomColor();
      }
    }
  
    function getRandomColor() {
      return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }
  
    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      // Add an initial ball
      balls.push(new Ball(canvas.width / 2, canvas.height / 2, 10, Math.random() * 2 - 1, Math.random() * 2 - 1));
  
      // Start animation loop
      animate();
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      balls.forEach((ball) => {
        ball.update();
        ball.draw();
      });
  
      requestAnimationFrame(animate);
    }
  
    canvas.addEventListener('click', (event) => {
      const x = event.clientX;
      const y = event.clientY;
      balls.push(new Ball(x, y, 10, Math.random() * 2 - 1, Math.random() * 2 - 1));
    });
  
    init();
  });
  