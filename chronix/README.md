
cd ${logisland.historian}/chronix


docker run -td --name logisland-historian -p 8983:8983 -v /Users/tom/Documents/workspace/hurence/projects/logisland.historian/chronix/conf:/opt/solr/server/solr/chronix/conf hurence/chronix:latest


docker run -td --name logisland-historian -p 8983:8983  hurence/chronix:latest



matrics to grab


# network docker0, eth0, lo, wlan0

node_network_receive_bytes{device="eth0"} 2.310306e+06
node_network_receive_drop{device="eth0"} 9611
node_network_transmit_bytes{device="eth0"} 844916
node_network_transmit_packets{device="eth0"} 4136


# cpu 0 to 3

node_cpu{cpu="cpu2",mode="guest"} 0
node_cpu{cpu="cpu2",mode="idle"} 10040.87
node_cpu{cpu="cpu2",mode="iowait"} 2.87
node_cpu{cpu="cpu2",mode="irq"} 0
node_cpu{cpu="cpu2",mode="nice"} 0
node_cpu{cpu="cpu2",mode="softirq"} 0
node_cpu{cpu="cpu2",mode="steal"} 0
node_cpu{cpu="cpu2",mode="system"} 25.79
node_cpu{cpu="cpu2",mode="user"} 33.83
process_cpu_seconds_total 1.28


# memory

node_memory_Active 4.16813056e+08
node_memory_Active_anon 3.07011584e+08
node_memory_Active_file 1.09801472e+08
node_memory_Bounce 0
node_memory_Buffers 2.0238336e+07
node_memory_Cached 2.89775616e+08
node_memory_CmaFree 6.959104e+06
node_memory_CmaTotal 8.388608e+06
node_memory_CommitLimit 6.17013248e+08
node_memory_Committed_AS 1.250156544e+09
node_memory_Dirty 36864
node_memory_Inactive 1.99950336e+08
node_memory_Inactive_anon 1.2972032e+07
node_memory_Inactive_file 1.86978304e+08
node_memory_KernelStack 1.982464e+06
node_memory_Mapped 8.2010112e+07
node_memory_MemAvailable 6.279168e+08
node_memory_MemFree 3.72088832e+08
node_memory_MemTotal 1.024319488e+09
node_memory_Mlocked 0
node_memory_NFS_Unstable 0
node_memory_PageTables 2.125824e+06
node_memory_SReclaimable 1.0371072e+07
node_memory_SUnreclaim 1.0899456e+07
node_memory_Shmem 1.3238272e+07
node_memory_Slab 2.1270528e+07
node_memory_SwapCached 0
node_memory_SwapFree 1.04853504e+08
node_memory_SwapTotal 1.04853504e+08
node_memory_Unevictable 0
node_memory_VmallocChunk 0
node_memory_VmallocTotal 1.09051904e+09
node_memory_VmallocUsed 0
node_memory_Writeback 0
node_memory_WritebackTmp 0
node_sockstat_FRAG_memory 0
process_resident_memory_bytes 1.2222464e+07
process_virtual_memory_bytes 8.91265024e+08



node_filesystem_avail{device="tmpfs",fstype="tmpfs",mountpoint="/run/user/1000"} 1.02428672e+08
node_filesystem_files{device="tmpfs",fstype="tmpfs",mountpoint="/run/user/1000"} 125039
node_filesystem_files_free{device="/dev/mmcblk0p1",fstype="vfat",mountpoint="/boot"} 0
node_filesystem_readonly{device="/dev/mmcblk0p1",fstype="vfat",mountpoint="/boot"} 0
node_filesystem_size{device="/dev/mmcblk0p1",fstype="vfat",mountpoint="/boot"} 4.285696e+07

node_disk_bytes_read{device="mmcblk0"} 2.50791424e+08
node_disk_bytes_written{device="mmcblk0"} 6.9628928e+07
node_disk_io_now{device="mmcblk0"} 0
node_disk_io_time_ms{device="mmcblk0"} 21410
node_disk_io_time_weighted{device="mmcblk0"} 131070
node_disk_read_time_ms{device="mmcblk0"} 32450
node_disk_reads_completed{device="mmcblk0"} 7109
node_disk_reads_merged{device="mmcblk0"} 2652
node_disk_sectors_read{device="mmcblk0"} 489827
node_disk_sectors_written{device="mmcblk0"} 135994
node_disk_write_time_ms{device="mmcblk0"} 98570
node_disk_writes_completed{device="mmcblk0"} 3044
node_disk_writes_merged{device="mmcblk0"} 2699
