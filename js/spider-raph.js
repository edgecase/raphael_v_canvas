var SpiderRaph = {

  init: function(element, width, height, max, values) {
    this.paper = Raphael(element, width, height);
    this.width = width - 10;
    this.height = height - 10;
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
    this.paper.clear();
  },

  drawAxes: function() {
    for (var i = 0; i < this.values.length; i++) {
      this.drawAxis(i);
    }
  },

  drawAxis: function(axis) {
    var h = this.height / 2;
    var w = this.width / 2;
    var s = this.paper.set();
    var l = this.paper.path(this.pathString(w, h, w, 0));
    var e = this.paper.path(this.pathString(w -3, 0, w + 3, 0));
    s.push(l, e);
    s.rotate(axis * this.angle, w, h);
  },

  drawWeb: function() {
    var values = this.values.slice();
    var first = values.shift();
    values.push(first);

    var prev_pt = this.pointForAngle(0, first);
    for (var i = 0; i < values.length; i++) {
      var pt = this.pointForAngle(i+1, values[i]);
      this.paper.path(this.pathString(prev_pt.x, prev_pt.y, pt.x, pt.y));
      prev_pt = pt;
    }
  },

  pathString: function(sx, sy, dx, dy) {
    return "M" + sx + " " + sy + "L" + dx + " " + dy;
  },

  pointPathString: function(prev_point, point) {
    return this.pathString(prev_point.x, prev_point.y, point.x, point.y);
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
    return({x: (calculated_value * x)+(this.width/2), y: (-calculated_value * y)+(this.height/2)});
  }
}
