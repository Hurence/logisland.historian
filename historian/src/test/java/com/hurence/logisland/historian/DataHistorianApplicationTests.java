package com.hurence.logisland.historian;

import com.hurence.logisland.historian.opc.OpcFactories;
import com.hurence.logisland.historian.rest.v1.model.Tag;
import com.hurence.logisland.historian.service.TagService;
import com.hurence.opc.OpcData;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.da.OpcDaConnectionProfile;
import org.assertj.core.api.BDDAssertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collection;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DataHistorianApplicationTests {

	private static final Logger logger = LoggerFactory.getLogger(DataHistorianApplicationTests.class);

	@Autowired
	private TagService tagService;

	@Autowired
	private OpcOperations<?, OpcData> opcOperations;


	@Test
	public void contextLoads() {
	}

	@Test
	public void testTags() {
		Collection<Tag> tags = tagService.getTags();
		logger.info("Available tags: {}", tags);
		BDDAssertions.assertThat(tags).isNotEmpty();
	}

	@Test
	public void testStream() {
		opcOperations.stream("Triangle Waves.Real8").limit(20).forEach(System.out::println);
	}

}
