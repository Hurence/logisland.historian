export type Color = String | CanvasGradient;
export type Image = String | File | HTMLImageElement;
export type Time = Date; // TODO see http://momentjs.com/docs/#/parsing/ for corresponding type

export const enum CartesianAxeType {
    LINEAR = 'linear',
    LOGARITHMIC = 'logarithmic',
    CATEGORY = 'category',
    TIME = 'time',
}

export const enum TimeUnit {
    MILLISECOND = 'millisecond',
    SECOND = 'second',
    MINUTE = 'minute',
    HOUR = 'hour',
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    QUARTER = 'quarter',
    YEAR = 'year',
}

export const enum TimeDistribution {
    LINEAR = 'linear',
    SERIES = 'series',
}

export const enum TimeBounds {
    DATA = 'data', // make sure data are fully visible, labels outside are removed
    TICKS = 'ticks', // make sure ticks are fully visible, data outside are truncated
}

export const enum TicksSource {
    AUTO = 'auto', // generates "optimal" ticks based on scale size and time options.
    DATA = 'data', // generates ticks from data (including labels from data {t|x|y} objects)
    LABELS = 'labels', // generates ticks from user given data.labels values ONLY
}

export interface Point {
    x?: number | Time;
    t?: Time;
    y: number;
}
export interface ILineChartDataset {
    data: number[] | Point[];
    label: string; // The label for the dataset which appears in the legend and tooltips.
    xAxisID?: string; // The ID of the x axis to plot this dataset on.If not specified, this defaults to the ID of the first found x axis
    yAxisID?: string; // The ID of the y axis to plot this dataset on.If not specified, this defaults to the ID of the first found y axis.
    backgroundColor?: string | CanvasGradient; // The fill color under the line.See Colors
    borderColor?: Color; // The color of the line.See Colors
    borderWidth?: number;	// The width of the line in pixels.
    borderDash?: number[];  // Length and spacing of dashes.See MDN
    borderDashOffset?: number;	// Offset for line dashes.See MDN
    borderCapStyle?: string; // Cap style of the line.See MDN
    borderJoinStyle?: string;	// Line joint style.See MDN
    cubicInterpolationMode?: string; // Algorithm used to interpolate a smooth curve from the discrete data points.more...
    fill?: boolean | string; // How to fill the area under the line.See area charts
    lineTension?: number;	// Bezier curve tension of the line.Set to 0 to draw straightlines.
    // This option is ignored if monotone cubic interpolation is used.
    pointBackgroundColor?: Color | Color[];	// The fill color for points.
    pointBorderColor?: Color | Color[];	// The border color for points.
    pointBorderWidth?: number | number[];	// The width of the point border in pixels.
    pointRadius?: number | number[]; // The radius of the point shape.If set to 0, the point is not rendered.
    pointStyle?: string | string[] | Image | Image[];	// Style of the point.more...
    pointHitRadius?: number | number[];	// The pixel size of the non - displayed point that reacts to mouse events.
    pointHoverBackgroundColor?: Color | Color[]; // Point background color when hovered.
    pointHoverBorderColor?: Color | Color[]; // Point border color when hovered.
    pointHoverBorderWidth?: number | number[]; // Border width of point when hovered.
    pointHoverRadius?: number | number[]; // The radius of the point when hovered.
    showLine?: boolean; // If false, the line is not drawn for this dataset.
    spanGaps?: boolean;	// If true, lines will be drawn between points with no or null data.
    // If false, points with NaN data will create a break in the line
    steppedLine?: boolean | string;	// If the line is shown as a stepped line.more...
}

export interface ILineChartData {
    datasets: ILineChartDataset[];
    labels?: string[] | number[];
}

export interface ILineChartTitle {
    text: string;
    display?: boolean;
    fontSize?: number;
}

export interface ILineChartLegend {
    position?: string;
}

export interface ITicks {
    autoSkip?: boolean; // true If true, automatically calculates how many labels
    // that can be shown and hides labels accordingly. Turn it off to show all labels no matter what
    autoSkipPadding?: number; // 0 	Padding between the ticks on the horizontal axis
    // when autoSkip is enabled. Note: Only applicable to horizontal scales.
    labelOffset?: number; // 0 	Distance in pixels to offset the label from the centre point of
    // the tick (in the y direction for the x axis, and the x direction for the y axis).
    // Note: this can cause labels at the edges to be cropped by the edge of the canvas
    maxRotation?: number; // 90 Maximum rotation for tick labels when rotating to
    // condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
    minRotation?: number; // 0 	Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
    mirror?: boolean; // false 	Flips tick labels around axis, displaying the labels inside
    // the chart instead of outside. Note: Only applicable to vertical scales.
    padding?: number; // 10 	Padding between the tick label and the axis.
    // When set on a vertical axis, this applies in the horizontal (X) direction.
    // When set on a horizontal axis, this applies in the vertical (Y) direction.
}

export interface ICategoryScaleTicks extends ITicks {
    labels?: string[]; // An array of labels to display.
    min?: string; // The minimum item to display. more...
    max?: string; // The maximum item to display.
}

export interface ILinearScaleTicks extends ITicks {
    beginAtZero?: boolean; // if true, scale will include 0 if it is not already included.
    min?: number; // User defined minimum number for the scale, overrides minimum value from data. more...
    max?: number; // User defined maximum number for the scale, overrides maximum value from data. more...
    maxTicksLimit?: number; // 11 Maximum number of ticks and gridlines to show.
    stepSize?: number; // User defined fixed step size for the scale. more...
    suggestedMax?: number; // Adjustment used when calculating the maximum data value. more...
    suggestedMin?: number; // Adjustment used when calculating the minimum data value. more...
}

export interface ILogarithmicScaleTicks extends ITicks {
    min?: number; // User defined minimum number for the scale, overrides minimum value from data. more...
    max?: number; // User defined maximum number for the scale, overrides maximum value from data. more...
}

export interface TimeOption {
    displayFormats?: any; // Sets how different time units are displayed. see http://momentjs.com/docs/#/displaying/format/
    isoWeekday?: boolean; // false	If true and the unit is set to 'week',
    // then the first day of the week will be Monday. Otherwise, it will be Sunday.
    max?: Time; // If defined, this will override the data maximum
    min?: Time; // If defined, this will override the data minimum
    parser?: string | Function; // Custom parser for dates. It must return a moment.js for function or be a moment.js format if string.
    round?: string; // false	If defined, dates will be rounded to the start of this unit. See Time Units below for the allowed units.
    tooltipFormat?: string; // The moment js format string to use for the tooltip.
    unit?: TimeUnit; // false	If defined, will force the unit to be a certain type. See Time Units section below for details.
    stepSize?: number; // 1	The number of units between grid lines.
    minUnit?: string; // 'millisecond'	The minimum display format to be used for a time unit.
}

export interface ITimeScaleTicks extends ITicks {
    source?: TicksSource; // auto	How ticks are generated. more...
}

export interface IAxes {
    type?: CartesianAxeType; // Type of scale being employed. Custom scales can be created and
    // registered with a string key. This allows changing the type of an axis for a chart.
    position?: string; // Position of the axis in the chart. Possible values are: 'top', 'left', 'bottom', 'right'
    offset?: boolean; // If true, extra space is added to the both edges and the axis
    // is scaled to fit into the chart area. This is set to true in the bar chart by default.
    id?: string; // The ID is used to link datasets and scale axes together.
    gridLines?: any; // Grid line configuration
    scaleLabel?: any; // Scale title configuration
    ticks?: ITicks | ICategoryScaleTicks | ILinearScaleTicks | ILogarithmicScaleTicks; // Tick configuration
    labels?: string[] | number[];
    // stacked: boolean, Seems to not be in axes doc.... strange as it works
}

export interface ITimeAxes extends IAxes {
    distribution?: TimeDistribution; // linear How data is plotted. more...
    bounds?: TimeBounds; // The bounds property controls the scale boundary strategy (bypassed by min/max time options)
    ticks?: ITimeScaleTicks;
    time?: TimeOption;
}

export interface ILineChartScale {
    xAxes?: IAxes[] | ITimeAxes[];
    yAxes?: IAxes[] | ITimeAxes[];
}

export interface ILineChartOption {
    title?: ILineChartTitle;
    legend?: ILineChartLegend;
    showLines?: boolean;
    spanGaps?: boolean;
    scales?: ILineChartScale;
}

export interface ILineChartConfig {
    type: string;
    data: ILineChartData;
    options?: ILineChartOption;
}
