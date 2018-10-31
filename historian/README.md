


# Setup micro-services environment with docker


Pre-requisites : Add the following line to your `/etc/hosts` files

    127.0.0.1       historian.hurence.com


## Option A : all-in-one docker-compose

Run a compose stack 
    
    docker-compose  up

## Option B : start dependencies only with docker 


Run dependencies services (redis/chronix & keycloak) in  Docker compose

    docker-compose -f docker-compose-dev.yml up 
    
    
## service list
    
Keycloak admin console

    http://keycloak:8080/auth/admin/master/console/#/realms/logisland/sessions/realm

Chronix admin (chronix core for timeseries and historian core for configs)

    http://historian.hurence.com:10080/solr/#/chronix
    http://historian.hurence.com:10080/solr/#/historian
    

# Build and run

Run and build Logisland Historian
    
    # Checkout the source and build

    git clone git@github.com:Hurence/logisland.historian.git
    git hf init
    cd logisland.historian

Run spring boot application on port 8701
    
    cd historian/backend
    mvn clean spring-boot:run 


# REST API

For more information please read the swagger spec in the project.


Generate some sample data

    curl -XPOST  http://historian.hurence.com:10080/api/v1/admin?flush=false
    
you can browse API 

    curl -X GET 'http://historian.hurence.com:10080/api/v1/datasources?fq=hurence'

## Token based access

    curl -X POST \
      http://historian.hurence.com:10080/auth/realms/logisland/protocol/openid-connect/token \
      -H 'Cache-Control: no-cache' \
      -H 'Content-Type: application/x-www-form-urlencoded' \
      -H 'Postman-Token: 9454e224-4b3d-4b83-841f-6d1afd1ab24a' \
      -d 'grant_type=password&client_id=logisland-historian&username=tom&password=tom'
      
should give you an access token

    {  
       "access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBeUdHWXdXSVBvd3JwWUhwMFhveWVZR0ljbEQyMUxQTXNSSzFtWlB1anJZIn0.eyJqdGkiOiJlYTE2MGY4MC0yMWI0LTQxMWYtOGFhZC1kMTlhMzZiN2E4MjgiLCJleHAiOjE1MjQyMzMwNTAsIm5iZiI6MCwiaWF0IjoxNTI0MjMyNzUwLCJpc3MiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9hdXRoL3JlYWxtcy9sb2dpc2xhbmQiLCJhdWQiOiJsb2dpc2xhbmQtaGlzdG9yaWFuIiwic3ViIjoiYTY2Yzg1NTMtMmU3MC00NDZmLWE5OTQtNDgxNTVmMWNkOTJiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibG9naXNsYW5kLWhpc3RvcmlhbiIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjA2NTUxN2MzLTNjYmQtNDlmZS05OWU3LTBlMThhNGNiN2RlZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0b20ifQ.E7AmotrO-xTd_KMJKCLhFye50uwK07hC_6RFTtUAwZINlu9KuMHD87o705LrefepYRHftnmrCgVbP5-kvVxue74FhwbX_qHroqtwge19zp0X5Lcx5k57_ULLlB4A5QIgzbJFCRIhEItT0CcX3tbiwxvXMczZP-TwwnPd_Np1-MTaL7SHlmouQtzxCcCuFQcHCNMz1p3nyi-6Q9HTA3eaVfrHc4vp2dpzM3TbqAty22Bv_wzVKRcFUbByotLBNlcxbc4Nn8efxoPi_86CqBYD_f8oBxzLsT8kp9TRf5QcxZcdDSsuExSmFt1aRDQSvJLc0po9g11YndBnXpLP7mUZOw",
       "expires_in":300,
       "refresh_expires_in":1800,
       "refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBeUdHWXdXSVBvd3JwWUhwMFhveWVZR0ljbEQyMUxQTXNSSzFtWlB1anJZIn0.eyJqdGkiOiIwNWVmZWQzMS04ZWVmLTQ3NzEtYjg0MC1mNWVlMDg2MDI2ZWYiLCJleHAiOjE1MjQyMzQ1NTAsIm5iZiI6MCwiaWF0IjoxNTI0MjMyNzUwLCJpc3MiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9hdXRoL3JlYWxtcy9sb2dpc2xhbmQiLCJhdWQiOiJsb2dpc2xhbmQtaGlzdG9yaWFuIiwic3ViIjoiYTY2Yzg1NTMtMmU3MC00NDZmLWE5OTQtNDgxNTVmMWNkOTJiIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImxvZ2lzbGFuZC1oaXN0b3JpYW4iLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIwNjU1MTdjMy0zY2JkLTQ5ZmUtOTllNy0wZTE4YTRjYjdkZWQiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fX0.FmDmVzGUOyAeT3E7ITThVUCr7SNv13WOozBcsrDm8vZX7CWKnt9eSa6anwMKD0_PL8js8footCBlYwgkFvpKEVq_z0tNUHBjna2Uh4lVFalZ7l6ms3XPAbcSUe73k5fYGCjVamwHMLZ7_pRGbupeqkyQGXRw-QrP7aUT1WOOzFyTE_3HilOzioXKUvL_R8jjZc679zXtNEbiUty5B8a8wJdp8wXx-qieuxaXg7SGi9ITw-MwODVJIcBjm1ocGHJQ7pe71bB3wLTmIBNL6yBxOirCIe4UfmrvINhe6mPgkdBIStWwsjuaOS5CyvqkSoDygOnPNoq3QSiQr89-A9p7EQ",
       "token_type":"bearer",
       "not-before-policy":0,
       "session_state":"065517c3-3cbd-49fe-99e7-0e18a4cb7ded"
    }
    
this access token can be used to access to securised API zone

    curl -X GET \
      http://historian.hurence.com:10080/api/v1/tags \
      -H 'Accept: application/json' \
      -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBeUdHWXdXSVBvd3JwWUhwMFhveWVZR0ljbEQyMUxQTXNSSzFtWlB1anJZIn0.eyJqdGkiOiJmZTE4NjZmNC03NGE4LTQzMDgtYjhhOS0yYzMwZGE5MGZhZGIiLCJleHAiOjE1MjQyMzI0MjEsIm5iZiI6MCwiaWF0IjoxNTI0MjMyMTIxLCJpc3MiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9hdXRoL3JlYWxtcy9sb2dpc2xhbmQiLCJhdWQiOiJsb2dpc2xhbmQtaGlzdG9yaWFuIiwic3ViIjoiYTY2Yzg1NTMtMmU3MC00NDZmLWE5OTQtNDgxNTVmMWNkOTJiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibG9naXNsYW5kLWhpc3RvcmlhbiIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImUzYjY5MGM3LTcwYjUtNDc0ZC05ZTU2LWVjMWM2ODk0NWY0YSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0b20ifQ.KRv-NXkVCVf1z3vC-Ky4O_hRauN8Cze41b3wIlemWH5ATOE3o6JfXpG2W--aWmlWogOWwN7cDAtb3Vz-A3wS8bD4N2EVxmrRrNUnGFGErzUX4XUmc3SDUShafXp0dC626I1Hrkhyq8GzHWnqS6nGr2BBJGkKrJ5hWAyGuPXgCW6lbIJ4x6XBg8MUsKqj6D6bVUzdbG7MPfePjMfBrcuc4NAJVe0MNVPuCHFdoT0TVIqDFhdWqA1msvSDdN9D212BL0f5GkOYTUBqsaCeJ2b9nfjx-ZYVQ-iW28hG0QXH4RaVDsWXiHb_yf0m93T4LCC8JQE9TCoMngMO_11lhQjULg' \
      -H 'Cache-Control: no-cache' \
      -H 'Content-Type: application/json' \
      -H 'Postman-Token: a1f1faef-72e2-4071-95d2-b558275876f2'
      
      
## POST Tag measures through CSV file

If you want to upload some timeseries in a bulk fashion, you can use `POST /api/v1/tags/measures` resource.


    curl -X POST \
      http://historian.hurence.com:10080/api/v1/tags/measures \
      -H 'Cache-Control: no-cache' \
      -H 'Content-Type: multipart/form-data' \
      -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
      -F file=@data/data_to_import.csv \
      -F 'csv_delimiter=;' \
      -F 'date_format=dd.MM.yyyy HH:mm:ss.SSS' \
      -F number_format=ENGLISH \
      -F 'attribute_fields=host,source' \
      -F clean_import=false
      
should return something like :

    {
        "start_time": null,
        "import_duration": 8127,
        "num_metrics_imported": 37,
        "num_points_imported": 9740653,
        "metrics": [
            "com.hurence.logisland.chronix.importer.csv.Attributes@f8ef5fe[attributes={DL2,001E6600156C,197001010108,converted.csv},metric=heat_quantity]=Pair{first=2011-12-14T21:28:00Z, second=2015-01-27T21:19:00Z}",
            "com.hurence.logisland.chronix.importer.csv.Attributes@1879900d[attributes={DL2,001E6600156C,197001010108,converted.csv},metric=speed_relay_2]=Pair{first=2011-10-28T06:29:00Z, second=2015-01-27T21:19:00Z}",
            
            ...
            
            "com.hurence.logisland.chronix.importer.csv.Attributes@7a7a8bb4[attributes={DL2,001E6600156C,197001010108,converted.csv},metric=irradiance_cs]=Pair{first=2011-10-28T06:29:00Z, second=2015-01-27T21:19:00Z}"
        ]
    }

## GET measures values

To retrieve a value for a tag just use `GET /api/v1/tags/{itemId}/measures`

    curl -X GET \
      'http://historian.hurence.com:10080/api/v1/tags/temperature_sensor_5/measures?start=1319783340000&end=1323898380000&functions=max;min;avg'
    
    
should send you back something like:

    {
        "name": "temperature_sensor_5",
        "start": 1319783340000,
        "end": 1323898380000,
        "query_duration": 79,
        "quality": null,
        "num_points": 3,
        "timestamps": [
            1319783340000,
            1323898080000,
            1323898380000
        ],
        "values": [
            96,
            18.9,
            18.9
        ],
        "functions": [
            {
                "name": "avg",
                "value": 44.6
            },
            {
                "name": "min",
                "value": 18.9
            },
            {
                "name": "max",
                "value": 96
            }
        ]
    }
    
## Get tag stats

To retrieve min, max, last values :

    curl -X GET \
      'http://historian.hurence.com:10080/api/v1/tags/temperature_sensor_1/stats?start=NOW-5MINUTES&end=NOW'
      
 the result is as follows:
 
    {
        "name": "temperature_sensor_1",
        "start": 1319783340000,
        "end": 1323965280000,
        "query_duration": 8,
        "quality": null,
        "num_points": null,
        "timestamps": null,
        "values": null,
        "functions": [
            {
                "name": "first",
                "value": 97.2
            },
            {
                "name": "avg",
                "value": 838.0296482412055
            },
            {
                "name": "min",
                "value": 26.2
            },
            {
                "name": "max",
                "value": 888.8
            },
            {
                "name": "count",
                "value": 199
            },
            {
                "name": "last",
                "value": 27.2
            }
        ]
    }
    
    
## POST data generator


Based on [TSimulus](https://rts-gen.readthedocs.io/en/latest/index.html) we can generate and inject realistic timeseries values 

    curl -X POST \
      http://historian.hurence.com:10080/api/v1/tags/measures/generator \
      -H 'Cache-Control: no-cache' \
      -H 'Content-Type: multipart/form-data' \
      -H 'Postman-Token: a593bb88-f5ea-4b01-850f-c3ff744db8e0' \
      -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
      -F file=@demo5.json

The file `demo5.json` contains the following generator timeseries

    {
      "generators": [
        {
          "name": "monthly-basis",
          "type": "monthly",
          "points": {
            "january": 3.3,
            "february": 3.7,
            "march": 6.8,
            "april": 9.8,
            "may": 13.6,
            "june": 16.2,
            "july": 18.4,
            "august": 18,
            "september": 14.9,
            "october": 11.1,
            "november": 6.8,
            "december": 3.9
          }
        },
        {
          "name": "daily-variation",
          "type": "daily",
          "points": {
            "00:00:00": -3,
            "02:00:00": -3.9,
            "04:00:00": -5,
            "06:00:00": -4.6,
            "08:00:00": -5.7,
            "10:00:00": -2.2,
            "12:00:00": 1,
            "14:00:00": 3,
            "16:00:00": 2.3,
            "18:00:00": 0.9,
            "20:00:00": -2.3,
            "22:00:00": -2.7
          }
        },
        {
          "name": "noise",
          "type": "arma",
          "origin": "2017-01-01 00:00:00",
          "model": {
            "std": 0.2,
            "c": 0,
            "seed": 1234
          },
          "timestep": 300000,
          "origin": "2017-01-01 12:34:56.789"
        },
        {
          "name": "result",
          "type": "aggregate",
          "aggregator": "sum",
          "generators": [
            "monthly-basis",
            "daily-variation",
            "noise"
          ]
        }
      ],
      "exported": [
        {
          "name": "temperator",
          "generator": "result",
          "frequency": 60000
        }
      ],
      "from": "2017-01-01 00:00:00",
      "to": "2017-12-31 23:59:59.999"
    }

Will generate 525600 measures points in about 6" and will import thme into chronix in about 2"

    {
        "start_time": null,
        "generation_duration": 6198,
        "import_duration": 1530,
        "num_metrics_imported": 1,
        "num_points_imported": 525600,
        "metrics": [
            "com.hurence.logisland.chronix.importer.csv.Attributes@2488e582[attributes={demo5.json},metric=temperator]=Pair{first=2017-01-01T00:00:00Z, second=2017-12-31T23:59:00Z}"
        ]
    }
    
To retrieve some stats :

    curl -X GET http://historian.hurence.com:10080/api/v1/tags/temperator/stats 
      
as follows :


    {
        "name": "temperator",
        "start": 1483228800000,
        "end": 1514764740000,
        "query_duration": 430,
        "values": null,
        "functions": [
            {
                "name": "first",
                "value": -0.02169185492800746
            },
            {
                "name": "avg",
                "value": 8.727500971436408
            },
            {
                "name": "min",
                "value": -3.2231646429747487
            },
            {
                "name": "max",
                "value": 22.27103032456763
            },
            {
                "name": "count",
                "value": 1051200
            },
            {
                "name": "last",
                "value": 0.3245103016176838
            }
        ]
    }
      

## REST API generation with Swagger

Generate Java code after some API modification in `backend/src/main/swagger/swagger-api.yml` : 

    ./codegen.sh

Get swagger.json doc

    curl -XGET http://historian:8701/v2/api-docs

Generate some sample data

    curl -XPOST  http://historian:8701/api/v1/admin?flush=false


## Docker packaging & publishing
 
Build and run historian as Docker container
 
    mvn -U -X package docker:build
    docker run -idt -p 8701:8701 hurence/historian:latest

    mvn -U -X clean versions:set -DnewVersion=1.0.37
    mvn -U -X package docker:build -Dpush.image=true
    
## Configuring keycloak for webapp

log in
       
    http://historian.hurence.com:10080/auth
    
then go to client, select Logisland-hitorian and add those properties :

    Valid Redirect URIs: http://historian.hurence.com:10080/*
    Web Origins: http://historian.hurence.com:10080 

Do not erase previous values just add those new ones.
Now when you go on webapp at 

    http://historian.hurence.com:10080
    
Keycloak authentification should be used if not you may not have ran the webapp, in this case tape in 'frontend' directory :

    ng serve -o
    
If this does not work you may have to rebuild 

    ./mvnw clean install    
    
# Pages of application explanation

## Import of csv tag

  Csv can use any separator and any encoding (but you should specify them as input in application form).
  Here the list of headers required or not. Non-listed headers would be ignored.

| CSV HEADER | node_id | sampling_rate | read_mode | tag_monitored | description | type | server_scan_rate | group | datasource_id | tag_name |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| REQUIRED | true | true | false | true | false | true | false | false | true | false |
TYPE | string | integer | enum:[polling, subscribe] | boolean | string | enum:[int, long, float, double, string, array, bytes, boolean] | integer | string | string | string |
| DESCRIPTION | correspond to id in opc server, it is the user responsability to enter the rigth value | number of milliseconds for fetching new values of the tag | polling mode will save a point even if there was none at each intervall of sampling_rate whereas subscribe mode will not | If this tag should be directly monitored by logisland or not | a description of the tag | type is only informative here as we only manage double tag at the moment, it is the user responsability to enter the rigth value | number of milliseconds that the opc server fetches new values for the tag, this is only an informative field, it is the user responsability to enter the rigth value | this field can be used to group tags in folders, tags with same group within a datasource will be grouped | datasource_id of the tag, corresponding datasource should already exist in historian (the value to use is the datasource name), it is the user responsability to enter the rigth value | It is an informative information that will be used in Web ui for labels. |
| WIDTH | widthhhhhhhhhhhh | widthhhhhhhhhhhhhhhhhhhh | widthhhhhhhhhhhhhhhhhhhh |widthhhhhhhhhhhhhhhhhhhh |widthhhhhhhhhhhhhhhhhhhh | widthhhhhhhhhhhhhhhhhhhh | widthhhhhhhhhhhhhhhhhhhh | widthhhhhhhhhhhhhhhhhhhh | widthhhhhhhhhhhhhhhhhhhh |widthhhhhhhhhhhhhhhhhhhh |










        