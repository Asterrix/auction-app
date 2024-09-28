package com.atlantbh.internship.auction.app.config;

import com.atlantbh.internship.auction.app.AuctionBackendApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static com.atlantbh.internship.auction.app.config.constant.RouteConstant.CLIENT_ROUTE;
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
    void CorsConfig_AllowAccessTo_Items_SpecifiedPort() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.options("/api/v1/items")
                        .header("Origin", CLIENT_ROUTE)
                        .header("Access-Control-Request-Method", HttpMethod.GET.name()))
                .andExpect(header().string("Access-Control-Allow-Origin", CLIENT_ROUTE))
                .andExpect(header().string("Access-Control-Allow-Methods", HttpMethod.GET.name()));
    }

    @Test
    void CorsConfig_DisallowRequestMethod_POST_Items_ReturnForbiddenStatus() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.options("/api/v1/items")
                        .header("Origin", CLIENT_ROUTE)
                        .header("Access-Control-Request-Method", HttpMethod.POST.name()))
                .andExpect(status().isForbidden());
    }

    @Test
    void CorsConfig_AllowAccessTo_Category_SpecifiedPort() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.options("/api/v1/category")
                        .header("Origin", CLIENT_ROUTE)
                        .header("Access-Control-Request-Method", HttpMethod.GET.name()))
                .andExpect(header().string("Access-Control-Allow-Origin", CLIENT_ROUTE))
                .andExpect(header().string("Access-Control-Allow-Methods", HttpMethod.GET.name()));
    }

    @Test
    void CorsConfig_DisallowRequestMethod_POST_Category_ReturnForbiddenStatus() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.options("/api/v1/items")
                        .header("Origin", CLIENT_ROUTE)
                        .header("Access-Control-Request-Method", HttpMethod.POST.name()))
                .andExpect(status().isForbidden());
    }
}