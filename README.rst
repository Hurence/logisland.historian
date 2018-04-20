


Logisland
---------

Real-time data processing, historian and visualization for the process, industrial, and energy industries.


.. image:: https://travis-ci.org/Hurence/logisland.historian.svg?branch=master
   :target: https://travis-ci.org/Hurence/logisland.historian


.. image:: https://badges.gitter.im/Join%20Chat.svg
   :target: https://gitter.im/logisland/logisland?utm_source=share-link&utm_medium=link&utm_campaign=share-link
   :alt: Gitter


Download the `latest release build <https://github.com/Hurence/logisland.historian/releases>`_  and
chat with us on `gitter <https://gitter.im/logisland/logisland.historian>`_



Run & play
==========

Add the following line to your `/etc/hosts` files

    127.0.0.1       keycloak chronix redis historian

Run a compose stack 
    
    docker-compose -f historian/backend/src/main/docker/docker-compose.yml up

Keycloak admin console

    http://keycloak:8080/auth/admin/master/console/#/realms/logisland/sessions/realm

Chronix admin (chronix core for timeseries and historian core for configs)

    http://chronix:8983/solr/#/chronix
    http://chronix:8983/solr/#/historian   

Get swagger.json doc

    curl -XGET http://historian:8701/v2/api-docs 

Read the doc at `https://github.com/Hurence/logisland.historian/tree/master/historian <https://github.com/Hurence/logisland.historian/tree/master/historian>`

Logisland CEP
=============

High performance distributed, complex event processing framework.

How can it be so fast and scalable ? Logisland CEP is based on both Kafka, a distributed commit log (the most scalable & fastest Message Oriented Middleware out there) and Spark, a parralel data processing framework (wich can provide user with really high level Map/Reduce like jobs, Machine Learning at scale and streaming features overs Kafka throughout the same simple API). It's just about packaging many useful processors and making them process data with no development pain (the burden is for us :)

Logisland Historian
===================
High performance OPC data historian capable of storing over a million tags and retrieving history at a sustained rate of 50 million values per second. Logisland Historian is typically 10 to 1000 times faster at history retrieval than many of our more well known competitors.

Based on SolR Chronix wich natively speaks time series. You can store nearly every kind of data type within a time series due to its flexible design. You decide what a time series looks like. Chronix is built to store time series highly compressed and for fast access times. In comparison to related time series databases, Chronix does not only take 5 to 171 times less space, but it also saves 83% of the access time, and up to 78% off the runtime on a mix of real world queries. For the measurements we used a commodity hardware laptop computer and Chronix using the Apache Solr scenario (single node). Chronix supports three different scenarios, pursuing different goals:

Logisland Historian is available for 64-bit Windows, Linux & MacOS X operating systems. The historian components can be deployed entirely on one server or distributed across multiple servers. Regardless of the platform configuration you choose, Logisland Historian can efficiently handle thousands of simultaneously connected clients.


Logisland Grapher
=================
In our experience plotting is the most heavily used feature by operators, engineers, and managers alike, empowering them to make better operational decisions more quickly. Thus we designed the Grapher with first class plotting at the heart of the system. Some of the key features include:

- Trend plots, histograms, and XY scatter plots
- Historical or live display modes
- Overlaid or vertically stacked plots
- Built-in aggregate functions
- Multi-plot time synchronization
- Ad-hoc calculated tags
- Annotations

Logisland Search
================
Logisland Grapher provides a global search box that's always available in the corner of the screen. Unlike most data historian search tools that only search for tag names and their descriptions, our search tool provides a comprehensive search experience. In a single action it searches all tag, plot, graphic, and calculation objects for matches. It even finds the plot, graphic, and calculation objects that contain or use a specific tag name inside of them. It's like having a Google search engine for your historian and its visualizations.



Easy Installation
=================
We've eliminated the laborious installation process that's so common with other data historian systems. Many of our customers have been able to install our software, setup an initial OPC data collection, and see their data appear on a live plot in less than 30 minutes. In most cases you don't even need to reboot your computer to complete the installation.






## Docker setup

docker run jboss/keycloak --name keycloak -p 8080:8080

bin/add-user-keycloak.sh -u admin
http://localhost:8080/auth