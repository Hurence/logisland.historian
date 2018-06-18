package com.hurence.logisland.historian.service;

import com.hurence.logisland.historian.component.IAuthenticationFacade;
import org.keycloak.adapters.springsecurity.account.SimpleKeycloakAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    private static final Logger log = LoggerFactory.getLogger(SecurityService.class);


    @Autowired
    private IAuthenticationFacade authenticationFacade;

    public String currentUserNameSimple() {
        Authentication authentication = authenticationFacade.getAuthentication();
        log.info("user is " + authentication.getName());
        if (authentication.getDetails() instanceof SimpleKeycloakAccount) {
            log.info("roles are " + ((SimpleKeycloakAccount) authentication.getDetails()).getRoles());
        }
        return authentication.getName();
    }

}
