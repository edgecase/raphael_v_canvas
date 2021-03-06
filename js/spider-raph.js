var SpiderRaph = {

  init: function(element, width, height, max, values) {
    this.padding = 5;
    this.paper = Raphael(element, width, height);
    this.width = width;
    this.height = height;
    this.canvas_width = width - this.padding * 2;
    this.canvas_height = height - this.padding * 2;
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
    var h = (this.height - this.padding * 2) / 2;
    var w = (this.width -  this.padding * 2) / 2;
    var s = this.paper.set();
    var l = this.paper.path(this.pathString(w, h, w, 0));
    var e = this.paper.path(this.pathString(w - 5, 0, w + 5, 0));
    s.push(l, e);
    s.attr({"stroke-width":3, "stroke-opacity": 0.45, "stroke": "#555555", "stroke-linecap": "round"});

    s.rotate(axis * this.angle, w + this.padding, h + this.padding);
  },

  drawWeb: function() {
    var values = this.values.slice();
    var first = values.shift();
    values.push(first);

    var prev_pt = this.pointForAngle(0, first);
    for (var i = 0; i < values.length; i++) {
      var pt = this.pointForAngle(i+1, values[i]);
      var path = this.paper.path(this.pathString(prev_pt.x, prev_pt.y, pt.x, pt.y));
      path.attr({"stroke-width":2, "stroke": "#333333"});
      prev_pt = pt;
    }
  },

  pathString: function(sx, sy, dx, dy) {
    return "M" + (sx + this.padding) + " " + (sy + this.padding) + "L" + (dx + this.padding) + " " + (dy + this.padding);
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

    var calculated_value = (value / this.max) * (this.canvas_width / 2);
    return({x: (calculated_value * x)+(this.canvas_width/2), y: (-calculated_value * y)+(this.canvas_height/2)});
  }
}
