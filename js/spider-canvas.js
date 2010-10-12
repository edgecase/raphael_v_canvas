var Spider = {

  init: function(element, max, values) {
    this.canvas = document.getElementById(element);
    this.width = this.canvas.width - 10;
    this.height = this.canvas.height - 10;
    this.context = this.canvas.getContext('2d');
    this.values = values;
    this.angle = 360 / values.length;
    this.max = max;

    this.draw();
  },

  draw: function() {
    this.clear();
    this.drawAxes();
    this.drawWeb();
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAxes: function() {
    this.context.save();
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.strokeStyle = 'rgba(85, 85, 85, .45)';
    this.context.beginPath();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

    for (var i = 0; i < this.values.length; i++) {
      this.drawAxis();
    }

    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  },

  drawAxis: function() {
    var l = this.height / 2;
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -l);
    this.context.moveTo(-5, -l);
    this.context.lineTo(5, -l);
    this.context.rotate(this.angle * Math.PI/180);
  },

  drawWeb: function() {
    this.context.save();
    this.context.strokeStyle = '#333333';
    this.context.lineWidth = 2;
    var values = this.values.slice(0);
    var first = values.shift();
    values.push(first);

    this.context.beginPath();
    var point = this.pointForAngle(0, first);
    this.context.moveTo(point.x, point.y);

    for (var i = 0; i < values.length; i++) {
      point = this.pointForAngle(i+1, values[i]);
      this.context.lineTo(point.x, point.y);
      this.context.moveTo(point.x, point.y);
    }
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  },

  pointForAngle: function(angle, value) {
    var angle_degrees = (360 / this.values.length);
    var calculated_angle = 90 - (angle * angle_degrees);
    if (calculated_angle < 0) {
      calculated_angle = 360 + calculated_angle;
    }

    var x = Math.cos(calculated_angle * Math.PI / 180);
    var y = Math.sin(calculated_angle * Math.PI / 180);

    var calculated_value = (value / this.max) * (this.width / 2);
    return({x: (calculated_value * x)+(this.canvas.width/2), y: (-calculated_value * y)+(this.canvas.height/2)});
  }
}
