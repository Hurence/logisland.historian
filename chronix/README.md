
cd ${logisland.historian}/chronix


docker run -td --name logisland-historian -p 8983:8983 -v /Users/tom/Documents/workspace/hurence/projects/logisland.historian/chronix/conf:/opt/solr/server/solr/chronix/conf hurence/chronix:latest


docker run -td --name logisland-historian -p 8983:8983  hurence/chronix:latest
