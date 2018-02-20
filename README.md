# Logisland

Real-time data processing, historian and visualization for the process, industrial, and energy industries.


## Logisland CEP
High performance distributed, complex event processing framework.

How can it be so fast and scalable ? Logisland CEP is based on both Kafka, a distributed commit log (the most scalable & fastest Message Oriented Middleware out there) and Spark, a parralel data processing framework (wich can provide user with really high level Map/Reduce like jobs, Machine Learning at scale and streaming features overs Kafka throughout the same simple API). It's just about packaging many useful processors and making them process data with no development pain (the burden is for us :)

## Logisland Historian
High performance OPC data historian capable of storing over a million tags and retrieving history at a sustained rate of 50 million values per second. CCI Historian is typically 10 to 1000 times faster at history retrieval than many of our more well known competitors.

Based on SolR Chronix wich natively speaks time series. You can store nearly every kind of data type within a time series due to its flexible design. You decide what a time series looks like. Chronix is built to store time series highly compressed and for fast access times. In comparison to related time series databases, Chronix does not only take 5 to 171 times less space, but it also saves 83% of the access time, and up to 78% off the runtime on a mix of real world queries. For the measurements we used a commodity hardware laptop computer and Chronix using the Apache Solr scenario (single node). Chronix supports three different scenarios, pursuing different goals:

Logisland Historian is available for 64-bit Windows, Linux & MacOS X operating systems. The historian components can be deployed entirely on one server or distributed across multiple servers. Regardless of the platform configuration you choose, Logisland Historian can efficiently handle thousands of simultaneously connected clients.

## Logisland Search
CCI Cake provides a global search box that's always available in the corner of the screen. Unlike most data historian search tools that only search for tag names and their descriptions, our search tool provides a comprehensive search experience. In a single action it searches all tag, plot, graphic, and calculation objects for matches. It even finds the plot, graphic, and calculation objects that contain or use a specific tag name inside of them. It's like having a Google search engine for your historian and its visualizations.

## Logisland Grapher
In our experience plotting is the most heavily used feature by operators, engineers, and managers alike, empowering them to make better operational decisions more quickly. Thus we designed the Grapher with first class plotting at the heart of the system. Some of the key features include:

Trend plots, histograms, and XY scatter plots
Add tags using drag & drop
Historical or live display modes
Overlaid or vertically stacked plots
Quickly page thru up to 1000 individual stacked plots
Scooters that display exact values at a single point in time
Range scooters that display statistics between any two points in time
Create your own aggregate functions or use the built-in ones
Publication quality effects: anti-aliasing, alpha blending, gradient shading
Unlimited levels of zoom and unzoom
Extremely fast left / right scrolling on trend plots
Constant value lines for displaying safe operating limits
Multi-plot time synchronization
Ad-hoc calculated tags
Annotations

CCI Plot is more feature rich than any similar products in the marketplace. For instance you can annotate trend plots with your comments, save these time stamped comments into the historian database, then later search for and recall your historical annotations. It's like having a visual log book integrated into your trend plots.

## Logisland Graphics
CCI Cake includes a structured drawing package for building process graphics, schematics, or other visualizations. Users can create their own basic graphics without the need for any formal training. For example, live values can be added to a graphic by simply dragging an analog tag out of the menu tree and dropping it into your graphic. Likewise a trend plot can be embedded into your graphic by quickly dragging a previously saved trend plot from menu tree and dropping it into the graphic. Graphic behaviors may be customized using the powerful Python scripting language which is integrated into CCI Cake.

## Logisland Modeling studio
Our calculation and analysis environment uses the popular open source Numeric Python (NumPy) scripting language. NumPy is similar to MATLAB, allowing CCI Cake to provide the most powerful analytical environment ever integrated into a data historian. The included libraries provide an unrivaled range of mathematical functions including modules for filtering, smoothing, spectral analysis, cross correlation analysis, and machine learning.

A unique feature is that no distinction is made between on-line and off-line calculation scripts. Thus unlike most competing products, CCI Cake allows you to back-test and plot your calculations and metrics using past historical data prior to scheduling the same calculation code to run on-line in real-time. The entire process from development to deployment can be accomplished from a single integrated graphical environment.

But the biggest advantage becomes apparent when these powerful numeric analysis tools are combined with our data historian's blisteringly fast history retrieval speed. Suddenly real-time big data analytics are possible. Huge quantities of data can be fetched from the historian and analyzed by NumPy functions in seconds instead of minutes or hours. The fast response time allows you to perform ad hoc analysis, while the direct historian access lets you analyze new data the moment it's available. There is no need to extract, transform, and load data into a separate statistical modeling tool and database-- everything can be done on one platform.



CCI Web
CCI Cake comes integrated with the popular Grafana metrics dashboard. Grafana lets non-technical users quickly build their own metric monitoring displays entirely from a web browser. Both live and historical plots can be included in your web dashboards, as well as metric calculation widgets that automatically change color based on operational targets. This can be used to create real-time monitoring displays or daily KPI reports that display aggregate values. Clicking on a failed metric target allows you to drill down for more details, helping you to quickly identify the root cause. And since Grafana dashboards use HTML5 you can even display them on your smart phone or iPad.

For more technical users we provide IPython Notebook, a web-based application that allows you to do big data analysis entirely from your web browser. Since each IPython session is hosted on the server, your data analysis functions run in the same locality as the data itself. This allows users to quickly analyze large datasets even when they're not geographically located near the data-- e.g. across the Internet or a corporate WAN.

IPython Notebook is supremely flexible allowing you to build nearly any type of visualization imaginable including bar charts, pie charts, radar charts, heat maps, and 3-D plots. Once you've built your IPython chart you can immediately share the results of your analysis with others in your organization by publishing it to a web page.

CCI Extract
Historical data can be sent to Microsoft Excel providing users with a familiar environment for analysis and building personalized reports. CCI Cake can also export your data directly to CSV, AspenTech DMCplus, or Honeywell RMPCT files. When extracting data you can request raw or aggregate values.

Scripting
All aspects of CCI Cake can be automated using the Python scripting language. You can write your own Python programs that access the historian database and deploy them anywhere on your network. Or you can use scripts to automate the building of new databases, tags, OPC interfaces, and GUI objects such as plots and menu tree folders. This allows for multiple sites to be quickly deployed and managed in a consistent manner with minimal administrative overhead.

CCI Cake also provides the ability to run scripts inside the provided CCI Script Service. Each of these background scripts can be set to run based on a schedule or whenever specific tag values change in the database. Our event based architecture can monitor over 100,000 tag value changes per second. This can be used to create powerful analytical rules that notify users via e-mail or text message (SMS) when abnormal conditions are detected.

Easy Installation
We've eliminated the laborious installation process that's so common with other data historian systems. Many of our customers have been able to install our software, setup an initial OPC data collection, and see their data appear on a live plot in less than 30 minutes. In most cases you don't even need to reboot your computer to complete the installation.

Simple Licensing
We like to keep it simple. For one reasonable price you get unlimited tags, unlimited users, and all available features. By not forcing our customers to continually pay extra for features and licenses on a "per tag" or "per user" basis as nearly all our competitors do, our customers experience greater adoption and benefits from our software within their organizations.

About CCI
CCI was founded in 1997 by AspenTech alumni Dr. Daniel O'Connor. For nearly 20 years CCI's engineers have been recognized as experts in model predictive control. But CCI is no stranger to data historians. Our engineers have been serious users of data historian software ever since the genesis of the earliest data historians. Through the implementation of our many successful control projects we've learned exactly what's required for first class data collection, trending, and calculations.

Our engineers were not happy with existing product's features and licensing terms so we set out to create our own system that could be used by our engineers for client project work. By combining our many decades of accumulated experience together with the newest open source technologies we have created a totally fresh design that's field tested and unencumbered by the legacy of an older data historian product.

The result is CCI Cake-- a historian providing the fastest data retrieval speeds possible, seamlessly integrated with the leading data analysis tools, and world class trending, with all components presented in a single intuitive user interface.

To learn more about CCI Cake please contact us at