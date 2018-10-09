
/* This code is inpired by https://gist.github.com/paulinm/10556397

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org> */

import * as d3 from 'd3';

export interface Range {
  from: number;
  to: number;
}

export interface GaugeConfigOptions {
  size?: number;
  label?: string;
  min?: number;
  max?: number;
  minorTicks?: number;
  majorTicks?: number;
  trackMin ?: boolean;
  trackMax ?: boolean;
  trackAvg ?: boolean;
  greenZones ?: Range[];
  yellowZones ?: Range[];
  redZones ?: Range[];
  radius ?: number;
  cx ?: number;
  cy ?: number;
  range ?: number;
  transitionDuration?: number;
}

export interface GaugeConfig {
  size: number;
  label: string;
  min: number;
  max: number;
  minorTicks: number;
  majorTicks: number;
  trackMin: boolean;
  trackMax: boolean;
  trackAvg: boolean;
  greenZones: Range[];
  yellowZones: Range[];
  redZones: Range[];
  radius: number;
  cx: number;
  cy: number;
  range: number;
  transitionDuration: number;
}

export class Gauge {

  config: GaugeConfig = {
    size: 600,
    label: 'No Label',
    min: 0,
    max: 100,
    minorTicks: 5,
    majorTicks: 6,
    trackMin : true,
    trackMax : true,
    trackAvg : true,
    greenZones: [],
    yellowZones: [],
    redZones: [],
    radius: 290,
    cx: 300,
    cy: 300,
    range: 100,
    transitionDuration: 1000
  };

  body: any;
  minValue = null;
  maxValue = null;
  avgValue = null;
  avgCounter = 0;
  _currentRotation;

  constructor(public placeholderName, configuration: GaugeConfigOptions) {
    this.configure(configuration);
  }

  configure(init?: Partial<GaugeConfig>): void {
    Object.assign(this.config, init);
    this.config.size = this.config.size * 0.9;

    this.config.radius = this.config.size * 0.97 / 2;
    this.config.cx = this.config.size / 2;
    this.config.cy = this.config.size / 2;

    this.config.trackMin = this.config.trackMin || false;
    this.config.trackMax = this.config.trackMax || false;
    this.config.trackAvg = this.config.trackAvg || false;

    this.config.min = undefined !== this.config.min ? this.config.min : 0;
    this.config.max = undefined !== this.config.max ? this.config.max : 100;
    this.config.range = this.config.max - this.config.min;

    this.config.majorTicks = this.config.majorTicks || 5;
    this.config.minorTicks = this.config.minorTicks || 2;

    this.config.transitionDuration = this.config.transitionDuration || 500;
  }

  render(): void {

    this.body = d3.select('#' + this.placeholderName)
      .append('svg:svg')
      .attr('class', 'gauge')
      .attr('width', this.config.size)
      .attr('height', this.config.size);

    this.body.append('svg:circle')
      .attr('class', 'outerRing')
      .attr('cx', this.config.cx)
      .attr('cy', this.config.cy)
      .attr('r', this.config.radius);

    this.body.append('svg:circle')
      .attr('class', 'innerCircle')
      .attr('cx', this.config.cx)
      .attr('cy', this.config.cy)
      .attr('r', 0.9 * this.config.radius);

    for (const range of this.config.greenZones) {
      this.drawBand(range.from, range.to, 'greenZone');
    }

    for (const range of this.config.yellowZones) {
      this.drawBand(range.from, range.to, 'yellowZone');
    }

    for (const range of this.config.redZones) {
      this.drawBand(range.from, range.to, 'redZone');
    }

    if (undefined !== this.config.label) {
      const fontSizeGaugeLabel = Math.round(this.config.size / 9);
      this.body.append('svg:text')
        .attr('class', 'gaugeLabel')
        .attr('x', this.config.cx)
        .attr('y', this.config.cy / 2 + fontSizeGaugeLabel / 2)
        .attr('dy', fontSizeGaugeLabel / 2)
        .attr('text-anchor', 'middle')
        .text(this.config.label)
        .style('font-size', fontSizeGaugeLabel + 'px');
    }

    let fontSize = Math.round(this.config.size / 16);
    const labelFontSize = fontSize * 0.40;
    const strokeWidth = fontSize * 0.10;

    const majorDelta = this.config.range / (this.config.majorTicks - 1);
    for (let major = this.config.min; major <= this.config.max; major += majorDelta) {
      const minorDelta = majorDelta / this.config.minorTicks;
      for (let minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta) {
        const point1MinorTick = this.valueToPoint(minor, 0.75);
        const point2MinorTick = this.valueToPoint(minor, 0.85);

        this.body.append('svg:line')
          .attr('class', 'ticks minorTick')
          .attr('x1', point1MinorTick.x)
          .attr('y1', point1MinorTick.y)
          .attr('x2', point2MinorTick.x)
          .attr('y2', point2MinorTick.y);
      }

      const point1 = this.valueToPoint(major, 0.7);
      const point2 = this.valueToPoint(major, 0.85);

      this.body.append('svg:line')
        .attr('class', 'ticks majorTick')
        .attr('x1', point1.x)
        .attr('y1', point1.y)
        .attr('x2', point2.x)
        .attr('y2', point2.y);

      if (major === this.config.min || major === this.config.max) {
        const point = this.valueToPoint(major, 0.63);

        this.body.append('svg:text')
          .attr('class', 'labels ' + (major === this.config.min ? 'lowerBoundLabel' : 'upperBoundLabel'))
          .attr('x', point.x)
          .attr('y', point.y)
          .attr('dy', fontSize / 3)
          .attr('text-anchor', major === this.config.min ? 'start' : 'end')
          .text(major)
          .style('font-size', fontSize + 'px');
      }
    }

    this.body.append('svg:text')
      .attr('class', 'labels currentValueLabel')
      .attr('x', this.config.cx + 'px')
      .attr('y', (this.config.size - this.config.cy / 4 - (fontSize * 2.2)) + 'px')
      .style('font-size', labelFontSize + 'px')
      .style('text-anchor', 'middle')
      .text('Current');

    const tip = this.valueToPoint(0, 0.85);
    const text = this.valueToPoint(0, 0.93);
    const minLblPos = this.valueToPoint(-1, 0.40);
    const avgLblPos = this.valueToPoint(0, 0.40);
    const maxLblPos = this.valueToPoint(1, 0.40);
    const baseLeft = this.valueToPoint(-1, 0.90);
    const baseRight = this.valueToPoint(1, 0.90);
    const triStr = 'M ' + tip.x + ' ' + tip.y + ' L ' + baseLeft.x + ' ' + baseLeft.y + ' L ' + baseRight.x + ' ' + baseRight.y + ' z';
    const _this = this;

    if (this.config.trackMin) {
      const targetRotation = (this.valueToDegrees(0) - 90);
      const rotStr = 'translate(' + text.x + ',' + text.y + ') rotate(' + targetRotation + ')';
      this.body.append('svg:text')
        .attr('class', 'minMarkerText')
        .attr('transform', rotStr)
        .style('stroke-width', (strokeWidth / 2) + 'px')
        .style('font-size', (fontSize / 2) + 'px')
        .style('text-anchor', 'middle')
        .text(0);

      this.body.append('svg:text')
        .attr('class', 'labels minValueLabel')
        .attr('x', (this.config.cx * 0.68))
        .attr('y', (this.config.size - this.config.cy / 2 + fontSize) + 'px')
        .style('font-size', labelFontSize + 'px')
        .style('text-anchor', 'middle')
        .text('Min');

      this.body.append('svg:text')
        .attr('class', 'minValueText')
        .attr('x', (this.config.cx * 0.68))
        .attr('y', (this.config.size - this.config.cy / 2.5 + fontSize) + 'px')
        .style('stroke-width', strokeWidth + 'px')
        .style('font-size', (fontSize * 0.80) + 'px')
        .style('text-anchor', 'middle')
        .on('mouseover', function (d) {
          _this.body.select('.minMarkerText').style('opacity', 0.90);
          _this.body.select('.minMarker').style('opacity', 0.90);
          _this.body.select('.minValueText').style('opacity', 0.90);
        })
        .on('mouseout', function (d) {
          _this.body.select('.minMarkerText').style('opacity', 0.50);
          _this.body.select('.minMarker').style('opacity', 0.50);
          _this.body.select('.minValueText').style('opacity', 0.50);
        })
        .text(0);

      this.body.append('svg:path')
        .attr('class', 'minMarker')
        .attr('d', triStr)
        .style('stroke-width', strokeWidth + 'px')
        .on('mouseover', function (d) {
          _this.body.select('.minMarkerText').style('opacity', 0.90);
          _this.body.select('.minValueText').style('opacity', 0.90);
        })
        .on('mouseout', function (d) {
          _this.body.select('.minMarkerText').style('opacity', 0.50);
          _this.body.select('.minValueText').style('opacity', 0.50);
        })
        .append('svg:title')
        .text(0);
    }
    if (this.config.trackAvg) {
      const targetRotation = (this.valueToDegrees(0) - 90);
      const rotStr = 'translate(' + text.x + ',' + text.y + ') rotate(' + targetRotation + ')';
      this.body.append('svg:text')
        .attr('class', 'avgMarkerText')
        .attr('transform', rotStr)
        .style('stroke-width', (strokeWidth / 2) + 'px')
        .style('font-size', (fontSize / 2) + 'px')
        .style('text-anchor', 'middle')
        .text(0);

      this.body.append('svg:text')
        .attr('class', 'labels avgValueLabel')
        .attr('x', this.config.cx)
        .attr('y', (this.config.size - this.config.cy / 2.60 + fontSize) + 'px')
        .style('font-size', labelFontSize + 'px')
        .style('text-anchor', 'middle')
        .text('Avg');

      this.body.append('svg:text')
        .attr('class', 'avgValueText')
        .attr('x', this.config.cx)
        .attr('y', (this.config.size - this.config.cy / 3.60 + fontSize) + 'px')
        .style('stroke-width', strokeWidth + 'px')
        .style('font-size', (fontSize * 0.80) + 'px')
        .style('text-anchor', 'middle')
        .on('mouseover', function (d) {
          _this.body.select('.avgMarkerText').style('opacity', 0.90);
          _this.body.select('.avgMarker').style('opacity', 0.90);
          _this.body.select('.avgValueText').style('opacity', 0.90);
        })
        .on('mouseout', function (d) {
          _this.body.select('.avgMarkerText').style('opacity', 0.50);
          _this.body.select('.avgMarker').style('opacity', 0.50);
          _this.body.select('.avgValueText').style('opacity', 0.50);
        })
        .text(0);

      this.body.append('svg:path')
        .attr('class', 'avgMarker')
        .attr('d', triStr)
        .style('stroke-width', strokeWidth + 'px')
        .on('mouseover', function (d) {
          _this.body.select('.avgMarkerText').style('opacity', 0.90);
          _this.body.select('.avgValueText').style('opacity', 0.90);
        })
        .on('mouseout', function (d) {
          _this.body.select('.avgMarkerText').style('opacity', 0.50);
          _this.body.select('.avgValueText').style('opacity', 0.50);
        })
        .append('svg:title')
        .text(0);
    }
    if (this.config.trackMax) {
      const targetRotation = (this.valueToDegrees(0) - 90);
      const rotStr = 'translate(' + text.x + ',' + text.y + ') rotate(' + targetRotation + ')';
      this.body.append('svg:text')
        .attr('class', 'maxMarkerText')
        .attr('transform', rotStr)
        .style('stroke-width', (strokeWidth / 2) + 'px')
        .style('font-size', (fontSize / 2) + 'px')
        .style('text-anchor', 'middle')
        .text(0);

      this.body.append('svg:text')
        .attr('class', 'labels maxValueLabel')
        .attr('x', (this.config.cx * 1.3))
        .attr('y', (this.config.size - this.config.cy / 2 + fontSize) + 'px')
        .style('font-size', labelFontSize + 'px')
        .style('text-anchor', 'middle')
        .text('Max');

      this.body.append('svg:text')
        .attr('class', 'maxValueText')
        .attr('x', (this.config.cx * 1.3))
        .attr('y', (this.config.size - this.config.cy / 2.5 + fontSize) + 'px')
        .style('stroke-width', strokeWidth + 'px')
        .style('font-size', (fontSize * 0.80) + 'px')
        .style('text-anchor', 'middle')
        .on('mouseover', function (d) {
          _this.body.select('.maxMarkerText').style('opacity', 0.90);
          _this.body.select('.maxMarker').style('opacity', 0.90);
          _this.body.select('.maxValueText').style('opacity', 0.90);
        })
        .on('mouseout', function (d) {
          _this.body.select('.maxMarkerText').style('opacity', 0.50);
          _this.body.select('.maxMarker').style('opacity', 0.50);
          _this.body.select('.maxValueText').style('opacity', 0.50);
        })
        .text(0);

      this.body.append('svg:path')
        .attr('class', 'maxMarker')
        .attr('d', triStr)
        .style('stroke-width', strokeWidth + 'px')
        .on('mouseover', function (d) {
          _this.body.select('.maxMarkerText').style('opacity', 0.90);
          _this.body.select('.maxValueText').style('opacity', 0.90);
        })
        .on('mouseout', function (d) {
          _this.body.select('.maxMarkerText').style('opacity', 0.50);
          _this.body.select('.maxValueText').style('opacity', 0.50);
        })
        .append('svg:title')
        .text(0);
    }
    const pointerContainer = this.body.append('svg:g').attr('class', 'pointerContainer');

    const midValue = (this.config.min + this.config.max) / 2;

    const pointerPath = this.buildPointerPath(midValue);

    const pointerLine = d3.line()
      .x(function (d) { return d.x; })
      .y(function (d) { return d.y; })
      .curve(d3.curveBasis);

    pointerContainer.selectAll('path')
      .data([pointerPath])
      .enter()
      .append('svg:path')
      .attr('class', 'dialPointer')
      .attr('d', pointerLine);

    pointerContainer.append('svg:circle')
      .attr('class', 'dialButton')
      .attr('cx', this.config.cx)
      .attr('cy', this.config.cy)
      .attr('r', 0.12 * this.config.radius);

    fontSize = Math.round(this.config.size / 10);
    pointerContainer.selectAll('text')
      .data([midValue])
      .enter()
      .append('svg:text')
      .attr('class', 'currentValue')
      .attr('x', this.config.cx)
      .attr('y', this.config.size - this.config.cy / 4 - fontSize)
      .attr('dy', fontSize / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', fontSize + 'px');

    this.redraw(this.config.min, 0);
  }

  buildPointerPath(value) {
    const delta = this.config.range / 13;

    const head = this.valueToPointMinusConfigCenter(value, 0.85);
    const head1 = this.valueToPointMinusConfigCenter(value - delta, 0.12);
    const head2 = this.valueToPointMinusConfigCenter(value + delta, 0.12);

    const tailValue = value - (this.config.range * (1 / (270 / 360)) / 2);
    const tail = this.valueToPointMinusConfigCenter(tailValue, 0.28);
    const tail1 = this.valueToPointMinusConfigCenter(tailValue - delta, 0.12);
    const tail2 = this.valueToPointMinusConfigCenter(tailValue + delta, 0.12);

    return [head, head1, tail2, tail, tail1, head2, head];
  }

  private valueToPointMinusConfigCenter(value, factor): any {
    const point = this.valueToPoint(value, factor);
    point.x -= this.config.cx;
    point.y -= this.config.cy;
    return point;
  }

  drawBand(start, end, zoneType) {
    if (0 >= end - start) return;

    const _this = this;
    this.body.append('svg:path')
      .attr('class', 'zones ' + zoneType)
      .attr('d', d3.arc()
        .startAngle(this.valueToRadians(start))
        .endAngle(this.valueToRadians(end))
        .innerRadius(0.65 * this.config.radius)
        .outerRadius(0.85 * this.config.radius))
      .attr('transform', function () { return 'translate(' + _this.config.cx + ', ' + _this.config.cy + ') rotate(270)'; });
  }

  redraw(value, transitionDuration) {
    const pointerContainer = this.body.select('.pointerContainer');

    pointerContainer.selectAll('text').text(Math.round(value));

    const pointer = pointerContainer.selectAll('path');
    const _this = this;
    pointer.transition()
      .duration(undefined !== transitionDuration ? transitionDuration : this.config.transitionDuration)
      .attrTween('transform', function () {
        let pointerValue = value;
        if (value > _this.config.max) pointerValue = _this.config.max + 0.02 * _this.config.range;
        else if (value < _this.config.min) pointerValue = _this.config.min - 0.02 * _this.config.range;
        const currentValueLabel = _this.body.select('.currentValueLabel');

        if (_this.config.trackMin) {
          if (pointerValue < _this.minValue) {
            _this.minValue = Math.round(pointerValue);
            const minMarker = _this.body.select('.minMarker');
            const minTitle = minMarker.select('title');
            const minMarkerText = _this.body.select('.minMarkerText');
            const minValueText = _this.body.select('.minValueText');
            const minValueLabel = _this.body.select('.minValueLabel');
            const tip = _this.valueToPoint(_this.minValue, 0.85);
            const text = _this.valueToPoint(_this.minValue, 0.93);
            const baseLeft = _this.valueToPoint((_this.minValue - 1), 0.90);
            const baseRight = _this.valueToPoint((_this.minValue + 1), 0.90);
            const triStr = 'M ' + tip.x + ' ' + tip.y + ' L ' + baseLeft.x + ' ' + baseLeft.y + ' L ' +
                            baseRight.x + ' ' + baseRight.y + ' z';
            minMarker.transition()
              .attr('d', triStr);
            minTitle.text('Min: ' + _this.minValue);

            const targetRotation1 = (_this.valueToDegrees(_this.minValue) - 90);
            const rotStr = 'translate(' + text.x + ',' + text.y + ') rotate(' + targetRotation1 + ')';
            minMarkerText.transition()
              .attr('transform', rotStr)
              .text(_this.minValue);
            minValueText.transition()
              .text(_this.minValue);
          } else if (_this.minValue == null) {
            _this.minValue = _this.config.max;
          }
        }
        if (_this.config.trackAvg) {
          if (_this.avgCounter > 1) {
            pointerValue = pointerValue;
            _this.avgValue = Math.round((((_this.avgValue * (_this.avgCounter - 1)) + pointerValue) / (_this.avgCounter)));
          } else {
            pointerValue = Math.round(pointerValue);
            _this.avgValue = pointerValue;
          }
          const avgMarker = _this.body.select('.avgMarker');
          const avgTitle = avgMarker.select('title');
          const avgMarkerText = _this.body.select('.avgMarkerText');
          const avgValueText = _this.body.select('.avgValueText');
          const tip = _this.valueToPoint(_this.avgValue, 0.85);
          const text = _this.valueToPoint(_this.avgValue, 0.93);
          const baseLeft = _this.valueToPoint((_this.avgValue - 1), 0.90);
          const baseRight = _this.valueToPoint((_this.avgValue + 1), 0.90);
          const triStr = 'M ' + tip.x + ' ' + tip.y + ' L ' + baseLeft.x + ' ' + baseLeft.y + ' L ' +
                          baseRight.x + ' ' + baseRight.y + ' z';
          avgMarker.transition()
            .attr('d', triStr);
          avgTitle.text('Avg: ' + Math.round(_this.avgValue));

          const targetRotation2 = (_this.valueToDegrees(_this.avgValue) - 90);
          const rotStr = 'translate(' + text.x + ',' + text.y + ') rotate(' + targetRotation2 + ')';
          avgMarkerText.transition()
            .attr('transform', rotStr)
            .text(Math.round(_this.avgValue));
          avgValueText.transition()
            .text(Math.round(_this.avgValue));
          _this.avgCounter = _this.avgCounter + 1;
        }
        if (_this.config.trackMax) {
          if (pointerValue > _this.maxValue) {
            _this.maxValue = Math.round(pointerValue);
            const maxMarker = _this.body.select('.maxMarker');
            const maxTitle = maxMarker.select('title');
            const maxMarkerText = _this.body.select('.maxMarkerText');
            const maxValueText = _this.body.select('.maxValueText');
            const tip = _this.valueToPoint(_this.maxValue, 0.85);
            const text = _this.valueToPoint(_this.maxValue, 0.93);
            const baseLeft = _this.valueToPoint((_this.maxValue - 1), 0.90);
            const baseRight = _this.valueToPoint((_this.maxValue + 1), 0.90);
            const triStr = 'M ' + tip.x + ' ' + tip.y + ' L ' + baseLeft.x + ' ' + baseLeft.y + ' L  ' + baseRight.x +
              ' ' + baseRight.y + ' z';
            maxMarker.transition()
              .attr('d', triStr);
            maxTitle.text('Max: ' + _this.maxValue);

            const targetRotation3 = (_this.valueToDegrees(_this.maxValue) - 90);
            const rotStr = 'translate(' + text.x + ',' + text.y + ') rotate(' + targetRotation3 + ')';
            maxMarkerText.transition()
              .attr('transform', rotStr)
              .text(_this.maxValue);
            maxValueText.transition()
              .text(_this.maxValue);
          } else if (_this.maxValue == null) {
            _this.maxValue = _this.config.min;
          }
        }

        const targetRotation = (_this.valueToDegrees(pointerValue) - 90);
        const currentRotation = _this._currentRotation || targetRotation;
        _this._currentRotation = targetRotation;

        return function (step) {
          const rotation = currentRotation + (targetRotation - currentRotation) * step;
          return 'translate(' + _this.config.cx + ', ' + _this.config.cy + ') rotate(' + rotation + ')';
        };
      });
  }

  valueToDegrees(value) {
    // thanks @closealert
    return value / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45);
  }

  valueToRadians(value) {
    return this.valueToDegrees(value) * Math.PI / 180;
  }

  valueToPoint(value, factor): any {
    return {
      x: this.config.cx - this.config.radius * factor * Math.cos(this.valueToRadians(value)),
      y: this.config.cy - this.config.radius * factor * Math.sin(this.valueToRadians(value))
    };
  }
}
