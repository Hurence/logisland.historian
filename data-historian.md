
# Data historian

## Operational historian

Operational historian refers to a database software application that logs or historizes time-based process data. Historian software is used to record trends and historical information about industrial processes for future reference. It captures plant management information about production status, performance monitoring, quality assurance, tracking and genealogy, and product delivery with enhanced data capture, data compression, and data presentation capabilities.

## OPC overview

OPC is an open connectivity standard used in industrial automation and IT systems of industrial enterprises. Interoperability is provided by the creation and maintenance of open specifications standards.

OPC was designed to bridge systems based on general-purpose operating system (e.g. Windows) and process control hardware and software applications. It is an open standard that permits a consistent method of accessing and describing field data from plant-floor devices. Those methods remain the same irrespective of data type and source.

The OPC server provides many different software packages with a method of accessing data from process control devices, such as a PLC or DCS. Traditionally, whenever a package needs to access data from a device, a custom interface or driver is to be written. The purpose of OPC is to define a common interface that is written once and then reused by any business, SCADA, HMI or custom software packages. Once an OPC server is written for a particular device, it can be reused by any application that is able to act as an OPC client.

Originally based on Microsoft OLE COM (Component Object Model) and DCOM (Distributed Component Object Model) technologies, the specification defines a standard set of objects, interfaces and methods to be used in process control and manufacturing automation applications to facilitate interoperability. The COM/DCOM technologies provide the framework for software products to be developed. At present hundreds of OPC Data Access servers and clients are available.

Logisland.Historian follows the requirements of the OPC specification to provide data access to OPC clients. It implements OPC Data Access (DA) version 2.0a and 3.0. of the OPC custom interface. Furthermore, Logisland.Historian is optimized for high performance and uses multithreaded technology to provide efficient response to client requests. This approach allows multiple clients to connect to and effectively use resources of the server.

## Features

- Distributed Data Collection (scalable, high throughput  )
- Tags management (import CSV, mapping, store, tag grouping)
- Alarm and event management (event journal, replay, log book)
- Smart calculation (computable tags, engineering unit conversion, adaptative sampling)
- Open (open source, extensible, REST, OPC UA, SQL dialect, API based)
- Advanced analytics (agregations, sampling, SAX, outliers)
- Rich connectivity (OPC/SQL/MQTT/Kafka/FTP/WS/EXCEL/Hadoop/ODBC)
- ANSI & ISO compliant
- High-speed data compression & storage
- Web services/SOA
- OPC Compliant (HDA, DA, UA, A&E)
- Server & network high availability
- Centralized data management
- Extensive visualization tools (enrichment, graphics, horizon charting, history replay, zooming, sharing)
- Big Data & Machine Learning enabled (based on spark)
- Security (authorization, auth LDAP/Kerberos/AD, audit)
- Admin console (metrology, alerts, data partitionning)

## concurrent

- [Automsoft rapid](https://www.automsoft.com/?p=custom&id=84)
- [Canary labs Axiom](https://www.canarylabs.com/en/products/historian)
- [Open automation software](https://openautomationsoftware.com/products/data/data-historian/)
- [Aspen infoPlus 21](https://plantvision.se/www/se/Documents/Aspen_InfoPlus21_T3_bro_final.pdf) & [](https://fr.calameo.com/read/0036850031a17543a9d82)
- [Matrikon OPC data Historian](https://www.matrikonopc.com/portal/downloads/product_manuals/OPC-Desktop-Historian-manual.pdf)
- [Hyper Historian](http://www.iconics.com/Home/Products/Historians/Hyper-Historian.aspx#.WsOamtNuaV4)
- [Honeywell process history database](https://www.honeywellprocess.com/library/marketing/notes/uniformance-phd-pin.pdf)
- [National Instruments Citadel](http://www.ni.com/white-paper/6579/en/)
- [Iconix Hyper Historian](http://www.iconics.com/Home/Products/Historians/Hyper-Historian.aspx#.WsOamtNuaV4)
- [ABB munufacturing Operation Management](http://new.abb.com/cpm/mom-software-process-production-intelligence)
- [KEPServerEX](https://www.kepware.com/en-us/products/kepserverex/)
