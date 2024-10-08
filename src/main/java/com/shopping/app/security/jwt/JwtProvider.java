package com.shopping.app.security.jwt;

import com.shopping.app.security.UserPrinciple;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtProvider {
    String generateToken(UserPrinciple auth);
    Authentication getAuthentication(HttpServletRequest request);
    boolean isTokenValid(HttpServletRequest request);
}
