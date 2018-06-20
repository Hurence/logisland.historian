//package com.hurence.logisland.historian.config;
//
//import org.keycloak.adapters.KeycloakConfigResolver;
//import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
//import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
//import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
//import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
//import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
//
//import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
//
//@KeycloakConfiguration
//public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter
//{
//    /**
//     * Registers the KeycloakAuthenticationProvider with the authentication manager.
//     */
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();
//        // simple Authority Mapper to avoid ROLE_
//        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(new SimpleAuthorityMapper());
//        auth.authenticationProvider(keycloakAuthenticationProvider);
//    }
//
//    /**
//     * Defines the session authentication strategy.
//     */
//    @Bean
//    @Override
//    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
//        // required for bearer-only applications.
//        return new NullAuthenticatedSessionStrategy();
//    }
//
//    /**
//     * Required to handle spring boot configurations
//     * @return
//     */
//    @Bean
//    public KeycloakConfigResolver KeycloakConfigResolver() {
//        return new KeycloakSpringBootConfigResolver();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception
//    {
//        super.configure(http);
//        http
//                .authorizeRequests()
////                .antMatchers("/customers*").hasRole("USER")
////                .antMatchers("/admin*").hasRole("ADMIN")
//                .anyRequest().permitAll();
//
////        http
////                // disable csrf because of API mode
////                .csrf().disable()
////                .sessionManagement()
////                // use previously declared bean
////                .sessionAuthenticationStrategy(sessionAuthenticationStrategy())
////                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                // keycloak filters for securisation
//////                .and()
//////                .addFilterBefore(keycloakPreAuthActionsFilter(), LogoutFilter.class)
//////                .addFilterBefore(keycloakAuthenticationProcessingFilter(), X509AuthenticationFilter.class)
//////                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
//////                // delegate logout endpoint to spring security
//////                .and()
//////                .logout()
//////                .addLogoutHandler(keycloakLogoutHandler())
//////                .logoutUrl("/logout").logoutSuccessHandler(
//////                // logout handler for API
//////                (HttpServletRequest request, HttpServletResponse response, Authentication authentication) ->
//////                        response.setStatus(HttpServletResponse.SC_OK)
//////        )
////                .and()
////                // manage routes securisation here
////                .authorizeRequests()
////                .antMatchers(HttpMethod.OPTIONS).permitAll()
//////                .antMatchers("/logout", "/", "/unsecured").permitAll()
////                .antMatchers("/user").hasRole("USER")
////                .antMatchers("/api/v1/tags/*").hasRole("USER")
////                .antMatchers("/admin").hasRole("ADMIN")
////                .anyRequest().denyAll();
//    }
//}