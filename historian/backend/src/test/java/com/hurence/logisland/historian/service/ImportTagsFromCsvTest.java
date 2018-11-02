package com.hurence.logisland.historian.service;

import com.hurence.logisland.historian.rest.v1.model.Header;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.tag.TagImportCsv;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ImportTagsFromCsvTest {

    @BeforeClass
    public void setUp() {
    }

    @DataProvider(name = "tagcsvmultipart")
    public Object[][] generateCsvFiles() throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("node_id;sampling_rate;read_mode;tag_monitored;description;datasource_id;type\n");
        sb.append("Random.Int1;10000;polling;true;hihihihi;fake datasource;double\n");
        sb.append("Triangle.wave.Int1;15000;subscribe;false;triangle wave;fake datasource;double\n");
        MockMultipartFile csv1 = new MockMultipartFile(
                "fileName",
                "fileName.txt",
                "text/plain",
                sb.toString().getBytes(StandardCharsets.UTF_8));
        List<Tag> tagExpected = new ArrayList<Tag>() {{
            add(new Tag().nodeId("Random.Int1").updateRate(10000)
                    .pollingMode(Tag.PollingModeEnum.POLLING).enabled(true)
                    .description("hihihihi").datasourceId("fake datasource")
                    .dataType(Tag.DataTypeEnum.DOUBLE)
                    .setTagName("Random.Int1")
            );
            add(new Tag().nodeId("Triangle.wave.Int1").updateRate(15000)
                    .pollingMode(Tag.PollingModeEnum.SUBSCRIBE).enabled(false)
                    .description("triangle wave").datasourceId("fake datasource")
                    .dataType(Tag.DataTypeEnum.DOUBLE)
                    .setTagName("Triangle.wave.Int1")
            );
        }};
        sb.setLength(0);
        sb.append("description;sampling_rate;read_mode;node_id;tag_monitored;datasource_id;type\n");
        sb.append("hihihihi;10000;polling;Random.Int1;true;fake datasource;double\n");
        sb.append("triangle wave;15000;subscribe;Triangle.wave.Int1;false;fake datasource;double\n");
        MockMultipartFile csvNotSameOrder = new MockMultipartFile(
                "fileName",
                "fileName.txt",
                "text/plain",
                sb.toString().getBytes(StandardCharsets.UTF_8));
        sb.setLength(0);

        return new Object[][] {
                { csv1, ';', StandardCharsets.UTF_8, tagExpected },
                { csvNotSameOrder, ';', StandardCharsets.UTF_8, tagExpected },
//                { csv3, ',', StandardCharsets.ISO_8859_1, false },
        };
    }

    @Test(groups = { "parsing csv" }, dataProvider = "tagcsvmultipart")
    public void tagCsvParsingTest(MultipartFile multiPartCsv,
                          char separator, Charset charset,
                          List<Tag> expected) throws Exception {
        Stream<Tag> tags = TagImportCsv.CsvToTags(multiPartCsv, separator, charset);
        List<Tag> result = tags.collect(Collectors.toList());
        Assert.assertEquals(result, expected);
    }

    @Test(groups = { "getting accepted/required headers" })
    public void tagCsvheaderTest() throws Exception {
        List<Header> actual = TagImportCsv.getTagsCsvHeaders();
        Assert.assertTrue(actual.size() == 10);
        Header expectedFirstHeader = new Header().setName("node_id")
                .setRequired(true).setType("string");
        Assert.assertEquals(actual.get(0), expectedFirstHeader);
    }
}
