package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.AuctionBackendApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = AuctionBackendApplication.class)
class CorsConfigTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void CorsConfig_AllowAccessTo_SpecifiedPort() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.options("/api/v1/items")
                        .header("Origin", "http://localhost:4200/")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200/"))
                .andExpect(header().string("Access-Control-Allow-Methods", "GET"));
    }

    @Test
    void CorsConfig_DisallowRequest_ThrowException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.options("/api/v1/items")
                        .header("Origin", "http://localhost:4200/")
                        .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isForbidden());
    }
}