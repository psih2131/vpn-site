export function useVpnServers() {
    const { t } = useI18n()

    return computed(() => [
        { flag: 'nl', name: t('servers.nlVless'), city: 'VLESS | TCP | Reality', badge: 'Extra Fast', badgeType: 'fast' },
        { flag: 'nl', name: t('servers.nlHysteria'), city: 'Hysteria | hysteria | TLS', badge: 'Extra Fast', badgeType: 'fast' },
        { flag: 'de', name: t('servers.deVless'), city: 'VLESS | TCP | Reality' },
        { flag: 'de', name: t('servers.deHysteria'), city: 'Hysteria | hysteria | TLS' },
        { flag: 'fi', name: t('servers.fiVless'), city: 'VLESS | TCP | Reality' },
        { flag: 'fi', name: t('servers.fiHysteria'), city: 'Hysteria | hysteria | TLS' },
        { flag: 'us', name: t('servers.usVless'), city: 'VLESS | TCP | Reality' },
        { flag: 'us', name: t('servers.usHysteria'), city: 'Hysteria | hysteria | TLS' },
        { flag: 'ru', name: t('servers.ruVless'), city: 'VLESS | TCP | Reality' },
        { flag: 'ru', name: t('servers.ruHysteria'), city: 'Hysteria | hysteria | TLS' },
        { flag: 'cz', name: t('servers.czVless'), city: 'VLESS | TCP | Reality' },
        { flag: 'globe', name: t('servers.youtube'), city: 'VLESS | xhttp | TLS', badge: 'No Ads', badgeType: 'noads' },
    ])
}
