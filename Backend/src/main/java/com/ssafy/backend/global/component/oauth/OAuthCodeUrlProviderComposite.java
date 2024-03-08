package com.ssafy.backend.global.component.oauth;

import com.ssafy.backend.global.component.oauth.exception.OAuthError;
import com.ssafy.backend.global.component.oauth.exception.OAuthException;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

@Primary
@Component
public class OAuthCodeUrlProviderComposite implements OAuthCodeUrlProvider {

    private final Map<OAuthDomain, OAuthCodeUrlProvider> providerMap;

    public OAuthCodeUrlProviderComposite(Set<OAuthCodeUrlProvider> providers) {
        this.providerMap = providers.stream()
                .collect(toMap(OAuthCodeUrlProvider::support, identity()));
    }

    @Override
    public OAuthDomain support() {
        return null;
    }

    @Override
    public String provide(OAuthDomain oAuthDomain) {
        return getProvider(oAuthDomain).provide(oAuthDomain);
    }

    private OAuthCodeUrlProvider getProvider(OAuthDomain oAuthDomain) {
        return Optional.ofNullable(providerMap.get(oAuthDomain))
                .orElseThrow(() -> new OAuthException(OAuthError.NOT_SUPPORT_VENDOR));
    }
}
