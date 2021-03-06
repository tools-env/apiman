/*
 * Copyright 2015 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.apiman.common.logging;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Simple ISO-8601 format using local TZ.
 *
 * @author Marc Savy {@literal <msavy@redhat.com>}
 */
public class DefaultTimeImpl implements Time {
    private TimeZone zone = TimeZone.getDefault();
    private DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); //$NON-NLS-1$

    {
        format.setTimeZone(zone);
    }

    @Override
    public String currentTimeIso8601() {
        return format.format(new Date());
    }
}
