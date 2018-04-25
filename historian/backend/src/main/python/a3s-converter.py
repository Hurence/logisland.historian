# -*- coding: utf-8 -*-
import csv

with open('../../../../data/DL2-001E6600156C_197001010108.csv', 'rb') as csvfile:




    spamreader = csv.DictReader(csvfile, delimiter=';', quotechar='|')

    lower_headers = ['date']
    filtered_headers = []
    for header in spamreader.fieldnames:
        head = header.lower().replace(' ','_')
        if head not in ['jahr', 'tag', 'monat', 'systemzeit', 'date/time']:
            lower_headers.append(head)
            filtered_headers.append('\'' + head + '\': ' + 'row[\'' + header + '\']' )



    print ','.join(filtered_headers)

    with open('../../../../data/DL2_001E6600156C_197001010108_converted.csv', 'w') as outCsvfile:

        outCsvfile = csv.DictWriter(outCsvfile, delimiter=';', fieldnames=lower_headers)


        outCsvfile.writeheader()

        index = 0
         #limit = 500
        for row in spamreader:
            date = row['Tag'] + '.' + row['Monat'] + '.' +row['Jahr'] + ' ' + row['Systemzeit'] + ':00.000'
            index += 1
            outCsvfile.writerow({'date': date, 'temperatur_sensor_1': row['Temperatur Sensor 1'],'temperatur_sensor_2': row['Temperatur Sensor 2'],'temperatur_sensor_3': row['Temperatur Sensor 3'],'temperatur_sensor_4': row['Temperatur Sensor 4'],'temperatur_sensor_5': row['Temperatur Sensor 5'],'temperatur_sensor_6': row['Temperatur Sensor 6'],'temperatur_sensor_7': row['Temperatur Sensor 7'],'temperatur_sensor_8': row['Temperatur Sensor 8'],'temperatur_sensor_9': row['Temperatur Sensor 9'],'temperatur_sensor_10': row['Temperatur Sensor 10'],'einstrahlung_cs': row['Einstrahlung CS'],'impulse_1_v40': row['Impulse 1 V40'],'digital_input': row['Digital Input'],'drehzahl_relais_1': row['Drehzahl Relais 1'],'drehzahl_relais_2': row['Drehzahl Relais 2'],'drehzahl_relais_3': row['Drehzahl Relais 3'],'drehzahl_relais_4': row['Drehzahl Relais 4'],'drehzahl_relais_5': row['Drehzahl Relais 5'],'drehzahl_relais_6': row['Drehzahl Relais 6'],'drehzahl_relais_7': row['Drehzahl Relais 7'],'fehlermaske': row['Fehlermaske'],'meldungen': row['Meldungen'],'system': row['System'],'schema': row['Schema'],'vorlauf_soll_hk1_modul_sensor_18': row['Vorlauf Soll HK1 Modul Sensor 18'],'status_hk1_modul': row['Status HK1 Modul'],'vorlauf_soll_hk2_modul_sensor_25': row['Vorlauf Soll HK2 Modul Sensor 25'],'status_hk2_modul': row['Status HK2 Modul'],'vorlauf_soll_hk3_modul_sensor_32': row['Vorlauf Soll HK3 Modul Sensor 32'],'status_hk3_modul': row['Status HK3 Modul'],'vorlauf_soll_heizkreis_sensor_11': row['Vorlauf Soll Heizkreis Sensor 11'],'status_heizkreis': row['Status Heizkreis'],'version': row['Version'],'temperatur_vorlauf': row['Temperatur Vorlauf'],'temperatur_rücklauf': row['Temperatur Rücklauf'],'durchfluss_sensor_8': row['Durchfluss Sensor 8'],'wärmemenge': row['Wärmemenge']
                                 })




      ##  outCsvfile.writerow({'first_name': 'Lovely', 'last_name': 'Spam'})
      #  outCsvfile.writerow({'first_name': 'Wonderful', 'last_name': 'Spam'})