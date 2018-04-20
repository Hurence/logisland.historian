/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hurence.logisland.historian.rest.v1.model;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class IdUtils {


    public static final String ID_SEPARATOR = "/";



    public static Tag setId(Tag tag)  {

        String id = ID_SEPARATOR + tag.getDomain() + ID_SEPARATOR + tag.getServer() + ID_SEPARATOR + tag.getGroup() + ID_SEPARATOR + tag.getTagName();


            return tag.id(tag.getTagName() + String.valueOf(id.hashCode()));


    }

    public static Datasource setId(Datasource ds)  {

        String id = ID_SEPARATOR + ds.getDomain() + ID_SEPARATOR + ds.getHost() + ID_SEPARATOR + ds.getClsid();


        return ds.id(ds.getClsid() + String.valueOf(id.hashCode()));


    }
}
