package com.hurence.logisland.historian.service;

import com.hurence.logisland.historian.component.IAuthenticationFacade;
import org.keycloak.adapters.springsecurity.account.SimpleKeycloakAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Set;

@Service
public class SecurityService {

    private static final Logger log = LoggerFactory.getLogger(SecurityService.class);


    @Autowired
    private IAuthenticationFacade authenticationFacade;

    public String getUserName() {
        return authenticationFacade.getAuthentication().getName();
    }

    public Principal getPrincipal() {
        return (Principal) authenticationFacade.getAuthentication().getPrincipal();
    }

    public Set<String> getRoles() {
        Object details = authenticationFacade.getAuthentication().getDetails();
        if (details instanceof SimpleKeycloakAccount) {
            return ((SimpleKeycloakAccount) details).getRoles();
        } else {
            throw new IllegalStateException("Authentication is not of class SimpleKeycloakAccount");
        }
    }
}
