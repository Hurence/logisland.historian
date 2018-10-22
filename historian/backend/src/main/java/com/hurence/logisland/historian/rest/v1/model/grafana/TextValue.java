/*
 * Copyright (C) 2018 Hurence (support@hurence.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.hurence.logisland.historian.rest.v1.model.grafana;

import java.util.Objects;

public class TextValue {

    public TextValue() {
    }

    public TextValue(String text, String value) {
        this.text = text;
        this.value = value;
    }

    private String text;
    private String value;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TextValue textValue = (TextValue) o;
        return Objects.equals(text, textValue.text) &&
                Objects.equals(value, textValue.value);
    }

    @Override
    public int hashCode() {

        return Objects.hash(text, value);
    }

    @Override
    public String toString() {
        return "TextValue{" +
                "text='" + text + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
